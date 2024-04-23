import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Chat, Contact, Profile, conversation } from "./chat.types";
import { Database, getDatabase, ref, set, onValue, update, query } from "firebase/database";
import { collection, limit, where } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from "environments/environment";
import moment from "moment";
import { messages } from "app/mock-api/apps/chat/data";

@Injectable()
export class ChatService {
	private app: FirebaseApp;
	private db: Database;
	private _chatsRef;
	private _loginUserChat: BehaviorSubject<Chat> = new BehaviorSubject(null);
	private _chats: BehaviorSubject<Chat[]> = new BehaviorSubject([]);
	private _contact: BehaviorSubject<Contact> = new BehaviorSubject(null);
	private _contacts: BehaviorSubject<Contact[]> = new BehaviorSubject(null);
	private _profile: BehaviorSubject<Profile> = new BehaviorSubject(null);
	private _conversation: BehaviorSubject<Array<conversation>> = new BehaviorSubject(null);

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
	get loginUserChat$(): Observable<Chat> {
		return this._loginUserChat.asObservable();
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

	/**
	 * Getter for conversation
	 */
	get conversation$(): Observable<Array<conversation>> {
		return this._conversation.asObservable();
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
	getChatById(senderId: string): any {
		this._loginUserChat.next(this._chats.value[senderId]);
	}

	/**
	 * Get Conversation
	 */
	setConversationBetween(senderId: string, receiverId: string): void {
		if (senderId) {
			onValue(ref(this.db, "chats/" + senderId + "/messages"), (snapshot: any) => {
				this.combineSenderAndReceiverChats(senderId, receiverId, snapshot.val() || []);
			});
		}

		if (receiverId) {
			onValue(ref(this.db, "chats/" + receiverId + "/messages"), (snapshot: any) => {
				this.combineSenderAndReceiverChats(senderId, receiverId, snapshot.val() || []);
			});
		}
	}

	/**
	 * Get chat
	 *
	 * @param senderId
	 * @param receiverId
	 */
	getConversation(): Observable<Array<conversation>> {
		return this._conversation;
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
		this._loginUserChat.next(null);
	}

	combineSenderAndReceiverChats(senderId, receiverId, chats: Array<conversation>) {
		let newConversationList = (chats || []).filter(
			(i: conversation) => (i.senderId == senderId && i.receiverId == receiverId) || (i.senderId == receiverId && i.receiverId == senderId)
		);
		let currentConversationList = (this._conversation.value || []).filter(
			(i: conversation) => (i.senderId == senderId && i.receiverId == receiverId) || (i.senderId == receiverId && i.receiverId == senderId)
		);

		for (let id in newConversationList) {
			if (!currentConversationList?.map((message) => message.id).includes(newConversationList[id].id)) {
				let input = structuredClone(newConversationList[id]);
				input.isMine = input.senderId == senderId;
				currentConversationList.push(input);
			}
		}
		this._conversation.next(currentConversationList);
	}
}
