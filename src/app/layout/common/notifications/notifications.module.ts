import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NotificationsComponent } from "app/layout/common/notifications/notifications.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [NotificationsComponent],
	imports: [RouterModule, OverlayModule, PortalModule, MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
	exports: [NotificationsComponent],
})
export class NotificationsModule {}
