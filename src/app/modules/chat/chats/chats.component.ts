import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ChatService } from "../chat.service";
import { Chat, Profile } from "../chat.types";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import moment from "moment";

@Component({
	selector: "chat-chats",
	templateUrl: "./chats.component.html",
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnInit, OnDestroy {
	form: FormGroup;
	message = "";

	chats: Chat[] = [];
	drawerComponent: "profile" | "new-chat";
	drawerOpened: boolean = false;
	filteredChats: Chat[];
	profile: Profile;
	selectedChat: Chat;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(private _chatService: ChatService, private _changeDetectorRef: ChangeDetectorRef, private _router: Router) {
		// this.app = initializeApp(environment.firebase);
		// this.db = getDatabase(this.app);
		if (sessionStorage.getItem("user")) {
			this.profile = JSON.parse(sessionStorage.getItem("user"));
		} else {
			this._router.navigate(["/sign-out"]);
		}
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Chats

		this._chatService.chats$.pipe(takeUntil(this._unsubscribeAll)).subscribe((chats: Chat[]) => {
			for (let id in chats) {
				if (!this.chats.map((chat) => chat.id).includes(id)) {
					chats[id]["lastMessageAt"] = moment(chats[id]["lastMessageAt"]).format("DD/MM/YYYY");
					this.chats.push(chats[id]);
				}
			}

			this.filteredChats = this.chats;
			this._changeDetectorRef.markForCheck();
		});

		// Profile
		this.profile = JSON.parse(sessionStorage.getItem("user"));
		this._changeDetectorRef.markForCheck();
		// this._chatService.profile$.pipe(takeUntil(this._unsubscribeAll)).subscribe((profile: Profile) => {
		// 	this.profile = profile;

		// 	// Mark for check
		// 	this._changeDetectorRef.markForCheck();
		// });

		// Selected chat
		this._chatService.chat$.pipe(takeUntil(this._unsubscribeAll)).subscribe((chat: Chat) => {
			this.selectedChat = chat;

			// Mark for check
			this._changeDetectorRef.markForCheck();
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Filter the chats
	 *
	 * @param query
	 */
	filterChats(query: string): void {
		// Reset the filter
		if (!query) {
			this.filteredChats = this.chats;
			return;
		}

		this.filteredChats = this.chats.filter((chat) => chat.contact.name.toLowerCase().includes(query.toLowerCase()));
	}

	/**
	 * Open the new chat sidebar
	 */
	openNewChat(): void {
		this.drawerComponent = "new-chat";
		this.drawerOpened = true;

		// Mark for check
		this._changeDetectorRef.markForCheck();
	}

	/**
	 * Open the profile sidebar
	 */
	openProfile(): void {
		this.drawerComponent = "profile";
		this.drawerOpened = true;

		// Mark for check
		this._changeDetectorRef.markForCheck();
	}

	/**
	 * Track by function for ngFor loops
	 *
	 * @param index
	 * @param item
	 */
	trackByFn(index: number, item: any): any {
		return item.id || index;
	}

	/**
	 * Sign out
	 */
	signOut(): void {
		//	this._authService.signOut();
		sessionStorage.clear();
		this._router.navigate(["/sign-out"]);
	}

	onUserClick(chat): void {
		this._chatService.getChatById(chat.id);
	}
}
