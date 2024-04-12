import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseLoadingBarModule } from "@fuse/components/loading-bar";
import { EmptyLayoutComponent } from "app/layout/layouts/empty/empty.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [EmptyLayoutComponent],
	imports: [RouterModule, FuseLoadingBarModule, CommonModule],
	exports: [EmptyLayoutComponent],
})
export class EmptyLayoutModule {}
