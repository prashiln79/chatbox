import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	NgZone,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { ChatService } from "../chat.service";
import { Chat, Profile } from "../chat.types";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

@Component({
	selector: "chat-conversation",
	templateUrl: "./conversation.component.html",
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnInit, OnDestroy {
	profile: Profile;
	@ViewChild("messageInput") messageInput: ElementRef;
	chat: Chat;
	drawerMode: "over" | "side" = "side";
	drawerOpened: boolean = false;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _chatService: ChatService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _ngZone: NgZone
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Decorated methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Resize on 'input' and 'ngModelChange' events
	 *
	 * @private
	 */
	@HostListener("input")
	@HostListener("ngModelChange")
	private _resizeMessageInput(): void {
		// This doesn't need to trigger Angular's change detection by itself
		this._ngZone.runOutsideAngular(() => {
			setTimeout(() => {
				// Set the height to 'auto' so we can correctly read the scrollHeight
				this.messageInput.nativeElement.style.height = "auto";

				// Detect the changes so the height is applied
				this._changeDetectorRef.detectChanges();

				// Get the scrollHeight and subtract the vertical padding
				this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;

				// Detect the changes one more time to apply the final height
				this._changeDetectorRef.detectChanges();
			});
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Chat
		this._chatService.chat$.pipe(takeUntil(this._unsubscribeAll)).subscribe((chat: Chat) => {
			this.chat = chat;
			// Mark for check
			this._changeDetectorRef.markForCheck();
		});

		// Subscribe to media changes
		this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
			// Set the drawerMode if the given breakpoint is active
			if (matchingAliases.includes("lg")) {
				this.drawerMode = "side";
			} else {
				this.drawerMode = "over";
			}

			// Mark for check
			this._changeDetectorRef.markForCheck();
		});
		this.profile = JSON.parse(localStorage.getItem("user"));
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
	 * Open the contact info
	 */
	openContactInfo(): void {
		// Open the drawer
		this.drawerOpened = true;

		// Mark for check
		this._changeDetectorRef.markForCheck();
	}

	/**
	 * Reset the chat
	 */
	resetChat(): void {
		this._chatService.resetChat();

		// Close the contact info in case it's opened
		this.drawerOpened = false;

		// Mark for check
		this._changeDetectorRef.markForCheck();
	}

	/**
	 * Toggle mute notifications
	 */
	toggleMuteNotifications(): void {
		// Toggle the muted
		this.chat.muted = !this.chat.muted;

		// Update the chat on the server
		this._chatService.updateChat(this.chat.id, this.chat).then();
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

	sendMsg(msg) {
		this.chat.unreadCount++;
		this.chat.lastMessageAt = moment().format("DD/MM/YYYY");
		this.chat.lastMessage = msg;
		this.chat.messages.push({
			id: uuidv4(),
			senderId: this.profile.id,
			receiverId: this.chat.id,
			isMine: true,
			value: msg,
			createdAt: new Date().toString(),
		});
		this._chatService.updateChat(this.chat.id, this.chat).then(() => {});
		this.messageInput.nativeElement.value = "";
	}
}
