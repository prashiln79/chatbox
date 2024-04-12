import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { UserComponent } from "app/layout/common/user/user.component";
import { SelectedUnitComponent } from "./selected-unit/selected-unit.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [UserComponent, SelectedUnitComponent],
	imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, CommonModule],
	exports: [UserComponent, SelectedUnitComponent],
})
export class UserModule {}
