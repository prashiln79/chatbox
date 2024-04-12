import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "selected-unit",
	templateUrl: "./selected-unit.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedUnitComponent {
	public selectedUnit: string = localStorage.getItem("reportingUnitName") || "";
	/**
	 * Constructor
	 */
	constructor() {}

	/**
	 * On init
	 */
	ngOnInit(): void {}
}
