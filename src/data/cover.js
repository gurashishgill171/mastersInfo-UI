/** @format */

import {
	COVER_POINT1,
	COVER_POINT2,
	COVER_POINT3,
	COVER_POINT4,
} from "../helpers/constants";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export const Cover_Points = [
	{
		id: 1,
		title: COVER_POINT1,
		icon: <SchoolIcon sx={{ fontSize: "30px", color: "#E37711" }} />,
	},
	{
		id: 2,
		title: COVER_POINT2,
		icon: <GroupIcon sx={{ fontSize: "30px", color: "#E37711" }} />,
	},
	{
		id: 3,
		title: COVER_POINT3,
		icon: <CalendarMonthIcon sx={{ fontSize: "30px", color: "#E37711" }} />,
	},
	{
		id: 4,
		title: COVER_POINT4,
		icon: <WorkspacePremiumIcon sx={{ fontSize: "30px", color: "#E37711" }} />,
	},
];
