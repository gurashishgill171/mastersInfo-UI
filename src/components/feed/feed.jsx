/** @format */

import { Avatar, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LikeImage from "../../assets/like.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

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

function Feed({ data }) {
	return (
		<Stack
			sx={{
				backgroundColor: "#FFFFFF",
				border: "1px solid rgb(107 114 128)",
				borderRadius: "8px",
				cursor: "pointer",
				padding: "1rem",
				gap: "1rem",
			}}
		>
			<Stack
				sx={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Stack
					sx={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}
				>
					<Avatar {...stringAvatar(data.authorName)} />
					<Stack>
						<Typography variant="body" sx={{ fontWeight: 600 }}>
							{data.authorName}
						</Typography>
						<Typography variant="subtitle2" sx={{ color: "#697386" }}>
							{data.authorStage} | {data.authorIntake}
						</Typography>
						<Typography variant="subtitle2" sx={{ color: "#697386" }}>
							{data.postedDate}
						</Typography>
					</Stack>
				</Stack>
				<IconButton>
					<MoreHorizIcon />
				</IconButton>
			</Stack>
			<Stack>
				<Typography variant="h6">{data.content}</Typography>
				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: "0.5rem",
					}}
				>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							gap: "0.5rem",
						}}
					>
						<img
							src={LikeImage}
							alt="like"
							style={{ height: "30px", width: "30px" }}
						/>
						<Typography variant="h6" sx={{ color: "#697786" }}>
							{data.likes}
						</Typography>
					</Stack>
					<Stack>
						<Typography variant="h6" sx={{ color: "#697786" }}>
							{data.comments.length} comment
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Divider />
			<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
				<Stack sx={{ flexDirection: "row", alignItems: "center" }}>
					<ThumbUpOutlinedIcon />
					<Typography>Like</Typography>
				</Stack>
				<Stack sx={{ flexDirection: "row", alignItems: "center" }}>
					<ChatOutlinedIcon />
					<Typography>Comment</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Feed;
