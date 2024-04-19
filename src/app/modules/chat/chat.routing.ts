import { Route } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { ChatChatsResolver, ChatContactsResolver, ChatProfileResolver, ChatChatResolver } from "./chat.resolvers";
import { ChatsComponent } from "./chats/chats.component";
import { ConversationComponent } from "./conversation/conversation.component";

export const chatRoutes: Route[] = [
	{
		path: "",
		component: ChatComponent,
		resolve: {
			chats: ChatChatsResolver,
			contacts: ChatContactsResolver,
			profile: ChatProfileResolver,
		},
		children: [
			{
				path: "",
				component: ChatsComponent,
				children: [
					{
						path: ":id",
						component: ConversationComponent,
						// resolve: {
						// 	conversation: ChatChatResolver,
						// },
					},
				],
			},
		],
	},
];
