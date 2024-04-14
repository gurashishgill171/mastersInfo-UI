/** @format */

import { Stack, Avatar, Typography } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data/chat_histrory";

function Message({ chat }) {
	return (
		<Stack
			sx={{
				flexDirection: "row",
				padding: "1rem",
				gap: "1rem",
				borderBottom: "0.1px solid #697386",
				cursor: "pointer",
			}}
		>
			<Stack>
				<Avatar src={chat.img} sx={{ height: "60px", width: "60px" }} />
			</Stack>
			<Stack sx={{ width: "100%" }}>
				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h6">{chat.name}</Typography>
					<Typography variant="h6">{chat.time}</Typography>
				</Stack>
				<Stack>
					<Typography variant="body1">{Chat_History[0].message}</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Message;
