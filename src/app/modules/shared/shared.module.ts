import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule,MatChipsModule],
	exports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatChipsModule],
})
export class SharedModule {}
