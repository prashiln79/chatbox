import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MessagesComponent } from "app/layout/common/messages/messages.component";
import { SharedModule } from "app/modules/shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [MessagesComponent],
	imports: [RouterModule, OverlayModule, PortalModule, MatButtonModule, MatIconModule, MatTooltipModule, SharedModule, CommonModule],
	exports: [MessagesComponent],
})
export class MessagesModule {}
