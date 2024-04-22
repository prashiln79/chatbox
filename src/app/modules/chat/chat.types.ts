export interface Profile {
	id?: string;
	name?: string;
	email?: string;
	avatar?: string;
	about?: string;
}

export interface Contact {
	id?: string;
	avatar?: string;
	name?: string;
	about?: string;
	details?: {
		emails?: {
			email?: string;
			label?: string;
		}[];
		phoneNumbers?: {
			country?: string;
			phoneNumber?: string;
			label?: string;
		}[];
		title?: string;
		company?: string;
		birthday?: string;
		address?: string;
	};
	attachments?: {
		media?: any[];
		docs?: any[];
		links?: any[];
	};
}

export interface Chat {
	id?: string;
	name: string;
	online: boolean;
	contactId?: string;
	contact?: Contact;
	unreadCount?: number;
	muted?: boolean;
	lastMessage?: string;
	lastMessageAt?: string;
	messages?: {
		id?: string;
		senderId: string;
		receiverId: string;
		isMine?: boolean;
		value?: string;
		createdAt?: string;
	}[];
}

export interface conversation {
	id?: string;
	senderId: string;
	receiverId: string;
	isMine?: boolean;
	value?: string;
	createdAt?: string;
}
