/* tslint:disable:max-line-length */
import { FuseNavigationItem } from "@fuse/components/navigation";
import { random } from "lodash";

export const defaultNavigation: FuseNavigationItem[] = [
	{
		id: "landing",
		title: "Home",
		type: "basic",
		link: "/chats",
		icon: "heroicons_outline:home",
	},
	//ACM
	{
		id: "aboutUs",
		title: "About Us",
		type: "collapsable",
		icon: "heroicons_outline:question-mark-circle",

		children: [
			{
				id: "dashboard",
				title: "Test",
				type: "basic",
				link: "/acm/acmdashboard",
				icon: "heroicons_outline:view-grid",
			},
		],
	},
];
export const compactNavigation = defaultNavigation;
export const futuristicNavigation = defaultNavigation;
export const horizontalNavigation = defaultNavigation;
