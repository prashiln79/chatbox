import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "profile",
	templateUrl: "./dashboard.component.html",
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
	/**
	 * Constructor
	 */
	constructor() {}
}
