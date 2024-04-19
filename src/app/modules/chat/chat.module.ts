import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SharedModule } from "../shared/shared.module";
import { ChatComponent } from "./chat.component";
import { chatRoutes } from "./chat.routing";
import { ChatsComponent } from "./chats/chats.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { ConversationComponent } from "./conversation/conversation.component";
import { NewChatComponent } from "./new-chat/new-chat.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChatService } from "./chat.service";
import { ChatChatsResolver, ChatContactsResolver, ChatProfileResolver } from "./chat.resolvers";

@NgModule({
	declarations: [ChatComponent, ChatsComponent, ContactInfoComponent, ConversationComponent, NewChatComponent, ProfileComponent],
	imports: [
		RouterModule.forChild(chatRoutes),
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatSidenavModule,
		SharedModule,
	],
	providers: [ChatService, ChatChatsResolver, ChatProfileResolver, ChatContactsResolver],
})
export class ChatModule {}
