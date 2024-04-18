import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { AuthService } from "app/core/auth/auth.service";

@Component({
	selector: "auth-sign-in",
	templateUrl: "./sign-in.component.html",
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
	styleUrl: "./sign-in.component.scss",
})
export class AuthSignInComponent implements OnInit {
	icon: string =
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE4LjEyNSA0Yy0zLjMwNCAwLTYuOTg0LjU2Mi05LjcyIDMuNTk0QzUuNjczIDEwLjYyNiA0IDE1Ljg4IDQgMjV2MWg4LjY1NmMuOTkuNjI1IDIuMTAzIDEgMy4zNDQgMWMxLjI0IDAgMi4zNTUtLjM4MyAzLjM0NC0xSDI5di0xYzAtOC4xMjUtMS41Ny0xMi44NDQtMy42MjUtMTUuNTk0Yy0xLjgxLTIuNDItMy44OTItMy4wOTQtNS40MzgtMy4yNUwxOSA0LjVsLS4yOC0uNXptLS41NjMgMi4wNjNsLjgxMyAxLjQzN2wuMjguNWguNTk1YzEuMDEgMCAyLjg0OC4zNCA0LjUzIDIuNTk0QzI1LjM4NiAxMi43NCAyNi44IDE2LjgzIDI2LjkzOCAyNGgtNS4zNzVjLjExLS4xNC4yMS0uMjkyLjMxMy0uNDM4QzIzLjIzMyAyMS42MjUgMjQgMTkuMjA3IDI0IDE3aC0yYzAgMS43MjItLjY0NCAzLjgyNy0xLjc1IDUuNDA2QzE5LjE0NCAyMy45ODYgMTcuNjY1IDI1IDE2IDI1Yy0xLjY2MyAwLTMuMTQzLTEuMDEtNC4yNS0yLjU5NEMxMC42NDMgMjAuODI0IDEwIDE4LjcxIDEwIDE3YzAtLjQ0NC4wODUtLjY2Ny4yMi0uODQ0Yy4xMzItLjE3Ny4zNjQtLjMzLjcxNy0uNDY4Yy43MDctLjI4IDEuOS0uMzk1IDMuMTU3LS41YzEuMjU4LS4xMDYgMi41Ny0uMjA2IDMuNzUtLjc1QzE5LjAyNCAxMy44OTMgMjAgMTIuNjYgMjAgMTFoLTJjMCAxLjA0NC0uMjc0IDEuMzA0LS45NyAxLjYyNWMtLjY5NC4zMi0xLjg4Mi40NTgtMy4xMjQuNTYzYy0xLjI0Mi4xMDQtMi41NS4xNjMtMy43Mi42MjRjLS41ODMuMjMtMS4xNDguNTc4LTEuNTYgMS4xMjZDOC4yMSAxNS40ODUgOCAxNi4yMTggOCAxN2MwIDIuMTk4Ljc2OCA0LjU5IDIuMTI1IDYuNTNjLjExLjE2LjIyNS4zMTguMzQ0LjQ3SDYuMDZjLjEzNS04LjE2MyAxLjcxLTEyLjY5NiAzLjg0NC0xNS4wNjNjMi4wODgtMi4zMTQgNC43ODMtMi44MTUgNy42NTYtMi44NzR6TTEzIDE3YTEgMSAwIDEgMCAwIDJhMSAxIDAgMCAwIDAtMm02IDBhMSAxIDAgMSAwIDAgMmExIDEgMCAwIDAgMC0yIi8+PC9zdmc+";
	@ViewChild("signInNgForm") signInNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: "success",
		message: "",
	};
	signInForm: FormGroup;
	showAlert: boolean = false;

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _authService: AuthService,
		private _formBuilder: FormBuilder,
		private _router: Router
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Create the form
		this.signInForm = this._formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", Validators.required],
			rememberMe: [""],
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Sign in
	 */
	signIn(): void {
		sessionStorage.setItem("authenticated", "true");
		this._router.navigateByUrl("/chats");

		// Return if the form is invalid
		// if (this.signInForm.invalid) {
		// 	return;
		// }

		// Disable the form
		this.signInForm.disable();

		// Hide the alert
		this.showAlert = false;

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
