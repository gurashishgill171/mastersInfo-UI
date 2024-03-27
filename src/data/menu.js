/** @format */
import MessageIcon from "../assets/message.png";
import NotificationIcon from "../assets/notification.png";

export const MenuItems = [
	{
		id: 1,
		title: "Feeds",
		link: "/feeds",
	},
	{
		id: 2,
		title: "College Finder",
		link: "/universities",
	},
	{
		id: 3,
		title: "Admits & Rejects",
		link: "/universities",
	},
];

export const MenuItems2 = [
	{
		id: 1,
		component: (
			<img
				src={MessageIcon}
				alt="message-icon"
				style={{ height: "40px", width: "40px" }}
			/>
		),
		link: "/messages",
	},
	{
		id: 2,
		component: (
			<img
				src={NotificationIcon}
				alt="notification-icon"
				style={{ height: "40px", width: "40px" }}
			/>
		),
		link: "/notifications",
	},
	// {
	// 	id: 3,
	// 	component: (
	// 		<>
	// 			<Ava
	// 		</>
	// 	),
	// 	link: "/notifications",
	// },
];
