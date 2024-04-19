import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { AuthService } from "app/core/auth/auth.service";
import { Chat } from "app/modules/chat/chat.types";
import { environment } from "environments/environment";

import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

@Component({
	selector: "auth-sign-in",
	templateUrl: "./sign-in.component.html",
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
	styleUrl: "./sign-in.component.scss",
})
export class AuthSignInComponent implements OnInit {
	app: FirebaseApp = initializeApp(environment.firebase);
	db: Database = getDatabase(this.app);
	@ViewChild("signInNgForm") signInNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: "success",
		message: "",
	};
	signInForm: FormGroup = this._formBuilder.group({
		userName: ["", Validators.required],
	});
	showAlert: boolean = false;

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _authService: AuthService,
		private _formBuilder: FormBuilder,
		private _router: Router
	) {
		let user = sessionStorage.getItem("user");
		if (user) {
			this._router.navigateByUrl("/chats");
		}
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Create the form
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Sign in
	 */
	signIn(): void {
		this._router.navigateByUrl("/chats");

		// Return if the form is invalid
		// if (this.signInForm.invalid) {
		// 	return;
		// }

		// Disable the form
		this.signInForm.disable();

		// Hide the alert
		this.showAlert = false;

		const chat: Chat = {
			id: uuidv4(),
			name: this.signInForm.get("userName").value,
			unreadCount: 0,
			muted: false,
			lastMessage: "",
			lastMessageAt: new Date().toString(),
			messages: [],
		};
		set(ref(this.db, `chats/${chat.id}`), chat);
		sessionStorage.setItem("user", JSON.stringify({ id: chat.id, name: this.signInForm.get("userName").value }));

		// // Sign in
		// this._authService.signIn(this.signInForm.value)
		//     .subscribe(
		//         () => {

		//             // Set the redirect url.
		//             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
		//             // to the correct page after a successful sign in. This way, that url can be set via
		//             // routing file and we don't have to touch here.
		//             const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

		//             // Navigate to the redirect url
		//             this._router.navigateByUrl(redirectURL);

		//         },
		//         (response) => {

		//             // Re-enable the form
		//             this.signInForm.enable();

		//             // Reset the form
		//             this.signInNgForm.resetForm();

		//             // Set the alert
		//             this.alert = {
		//                 type   : 'error',
		//                 message: 'Wrong email or password'
		//             };

		//             // Show the alert
		//             this.showAlert = true;
		//         }
		//     );
	}
}
