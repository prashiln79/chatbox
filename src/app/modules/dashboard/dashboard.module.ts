import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FuseCardModule } from "@fuse/components/card";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { profileRoutes } from "./dashboard.routing";

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		RouterModule.forChild(profileRoutes),
		MatButtonModule,
		MatDividerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatTooltipModule,
		FuseCardModule,
		SharedModule,
	],
})
export class DashboardModule {}
