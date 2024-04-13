/** @format */

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export const MenuItems = [
	{
		id: 1,
		title: "Home",
		icon: <HomeOutlinedIcon sx={{ fontSize: "32px" }} />,
		link: "/feeds",
	},
	{
		id: 2,
		title: "Messaging",
		icon: <MessageOutlinedIcon sx={{ fontSize: "32px" }} />,
		link: "/messages",
	},
	{
		id: 4,
		title: "Notifications",
		icon: <NotificationsNoneOutlinedIcon sx={{ fontSize: "32px" }} />,
		link: "/notifications",
	},
	{
		id: 3,
		title: "Profile",
		icon: <Person2OutlinedIcon sx={{ fontSize: "32px" }} />,
		link: "/profile",
	},
];
