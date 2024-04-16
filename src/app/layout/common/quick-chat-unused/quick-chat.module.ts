import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FuseDrawerModule } from "@fuse/components/drawer";
import { FuseScrollbarModule } from "@fuse/directives/scrollbar";
import { QuickChatComponent } from "./quick-chat.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [QuickChatComponent],
	imports: [RouterModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, FuseDrawerModule, FuseScrollbarModule, CommonModule],
	exports: [QuickChatComponent],
})
export class QuickChatModule {}
