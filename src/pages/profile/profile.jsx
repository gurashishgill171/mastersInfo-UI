/** @format */

import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { UniversityApplications } from "../../data/university_applications";
import Status from "../../components/status/status";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProfileDetails } from "../../data/profile_details";
import ProfileDetailCard from "../../components/profileDetail/profileDetailCard";

function stringToColor(string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

function Profile() {
	return <>prfoile page</>;
}

export default Profile;
