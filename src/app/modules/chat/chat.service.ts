import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { Chat, Contact, Profile, conversation } from "./chat.types";
import { Database, getDatabase, ref, set, onValue, update } from "firebase/database";
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from "environments/environment";
import moment from "moment";
import { messages } from "app/mock-api/apps/chat/data";

@Injectable()
export class ChatService {
	private app: FirebaseApp;
	private db: Database;
	private _chatsRef;
	private _onlineUsers: BehaviorSubject<Chat[]> = new BehaviorSubject([]);
	private _chat: BehaviorSubject<Chat> = new BehaviorSubject(null);
	private _chats: BehaviorSubject<Chat[]> = new BehaviorSubject([]);
	private _contact: BehaviorSubject<Contact> = new BehaviorSubject(null);
	private _contacts: BehaviorSubject<Contact[]> = new BehaviorSubject(null);
	private _profile: BehaviorSubject<Profile> = new BehaviorSubject(null);

	/**
	 * Constructor
	 */
	constructor(private _httpClient: HttpClient) {
		this.app = initializeApp(environment.firebase);
		this.db = getDatabase(this.app);
		this._chatsRef = ref(this.db, "chats");
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for chat
	 */
	get chat$(): Observable<Chat> {
		return this._chat.asObservable();
	}

	/**
	 * Getter for chats
	 */
	get chats$(): Observable<Chat[]> {
		return this._chats.asObservable();
	}

	/**
	 * Getter for contact
	 */
	get contact$(): Observable<Contact> {
		return this._contact.asObservable();
	}

	/**
	 * Getter for contacts
	 */
	get contacts$(): Observable<Contact[]> {
		return this._contacts.asObservable();
	}

	/**
	 * Getter for profile
	 */
	get profile$(): Observable<Profile> {
		return this._profile.asObservable();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Get chats
	 */
	getChats(): Observable<any> {
		onValue(this._chatsRef, (snapshot: any) => {
			this._chats.next(snapshot.val());
		});

		return this._chats;
	}

	/**
	 * Get contact
	 *
	 * @param id
	 */
	getContact(id: string): Observable<any> {
		return this._httpClient.get<Contact>("api/apps/chat/contacts", { params: { id } }).pipe(
			tap((response: Contact) => {
				this._contact.next(response);
			})
		);
	}

	/**
	 * Get contacts
	 */
	getContacts(): Observable<any> {
		return this._httpClient.get<Contact[]>("api/apps/chat/contacts").pipe(
			tap((response: Contact[]) => {
				this._contacts.next(response);
			})
		);
	}

	/**
	 * Get profile
	 */
	getProfile(): Observable<any> {
		return this._httpClient.get<Profile>("api/apps/chat/profile").pipe(
			tap((response: Profile) => {
				this._profile.next(response);
			})
		);
	}

	/**
	 * Get chat
	 *
	 * @param id
	 */
	getChatById(senderId: string, receiverId: string): any {
		this._chat.next(this._chats.value[receiverId]);
		onValue(ref(this.db, "chats/" + senderId), (snapshot: any) => {
			this.combineSenderAndReceiverChats(senderId, snapshot.val()?.messages || []);
		});

		onValue(ref(this.db, "chats/" + receiverId + "/messages"), (snapshot: any) => {
			this.combineSenderAndReceiverChats(senderId, snapshot.val());
		});
	}

	/**
	 * Update chat
	 *
	 * @param id
	 * @param chat
	 */
	updateChat(id: string, chat: Chat): Promise<any> {
		return set(ref(this.db, "chats/" + id), chat);

		// return this.chats$.pipe(
		// 	take(1),
		// 	switchMap((chats) =>
		// 		this._httpClient
		// 			.patch<Chat>("api/apps/chat/chat", {
		// 				id,
		// 				chat,
		// 			})
		// 			.pipe(
		// 				map((updatedChat) => {
		// 					// Find the index of the updated chat
		// 					const index = chats.findIndex((item) => item.id === id);
		// 					// Update the chat
		// 					chats[index] = updatedChat;
		// 					// Update the chats
		// 					this._chats.next(chats);
		// 					// Return the updated contact
		// 					return updatedChat;
		// 				}),
		// 				switchMap((updatedChat) =>
		// 					this.chat$.pipe(
		// 						take(1),
		// 						filter((item) => item && item.id === id),
		// 						tap(() => {
		// 							// Update the chat if it's selected
		// 							this._chat.next(updatedChat);
		// 							// Return the updated chat
		// 							return updatedChat;
		// 						})
		// 					)
		// 				)
		// 			)
		// 	)
		// );
	}

	/**
	 * Reset the selected chat
	 */
	resetChat(): void {
		this._chat.next(null);
	}

	combineSenderAndReceiverChats(senderId, chats: Array<conversation>) {
		let messagesList = structuredClone(chats);
		let chat = this._chat.value;
		let currentMessagesList = structuredClone(chat?.messages || []);

		for (let id in messagesList) {
			if (
				!currentMessagesList?.map((message) => message.id).includes(messagesList[id].id) &&
				(messagesList[id].senderId == senderId || messagesList[id].receiverId == senderId)
			) {
				messagesList[id].isMine = senderId == chats[id].senderId;
				currentMessagesList.push(messagesList[id]);
			}
		}
		chat.messages = currentMessagesList;
		this._chat.next(chat);
	}
}
