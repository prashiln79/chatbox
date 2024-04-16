import { Route } from "@angular/router";
import { AuthGuard } from "app/core/auth/guards/auth.guard";
import { NoAuthGuard } from "app/core/auth/guards/noAuth.guard";
import { LayoutComponent } from "app/layout/layout.component";
import { InitialDataResolver } from "app/app.resolvers";

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
	// Auth routes for guests
	{
		path: "",
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		data: {
			layout: "empty",
		},
		children: [
			{ path: "", loadChildren: () => import("app/modules/auth/sign-in/sign-in.module").then((m) => m.AuthSignInModule) },
			{
				path: "confirmation-required",
				loadChildren: () =>
					import("app/modules/auth/confirmation-required/confirmation-required.module").then((m) => m.AuthConfirmationRequiredModule),
			},
			{
				path: "forgot-password",
				loadChildren: () => import("app/modules/auth/forgot-password/forgot-password.module").then((m) => m.AuthForgotPasswordModule),
			},
			{
				path: "reset-password",
				loadChildren: () => import("app/modules/auth/reset-password/reset-password.module").then((m) => m.AuthResetPasswordModule),
			},
			{ path: "sign-up", loadChildren: () => import("app/modules/auth/sign-up/sign-up.module").then((m) => m.AuthSignUpModule) },
		],
	},
	{
		path: "",
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		resolve: {
			initialData: InitialDataResolver,
		},
		children: [
			{
				path: "dashboard",
				children: [{ path: "", loadChildren: () => import("app/modules/dashboard/dashboard.module").then((m) => m.DashboardModule) }],
			},
		],
	},
	{
		path: "sign-out",
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: "empty",
		},
		children: [
			{ path: "", loadChildren: () => import("app/modules/auth/sign-out/sign-out.module").then((m) => m.AuthSignOutModule) },
			{
				path: "unlock-session",
				loadChildren: () => import("app/modules/auth/unlock-session/unlock-session.module").then((m) => m.AuthUnlockSessionModule),
			},
		],
	},

	{
		path: "chat",
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		data: {
			layout: "empty",
		},
		children: [{ path: "", loadChildren: () => import("app/modules/chat/chat.module").then((m) => m.ChatModule) }],
	},
];
