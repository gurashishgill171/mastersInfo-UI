/** @format */

import {
	Divider,
	IconButton,
	Stack,
	Typography,
	TextField,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React from "react";
import { ChatList } from "../../data/message";
import Message from "../../components/message/message";
import { Chat_History } from "../../data/chat_histrory";
import Chat from "../../components/message/chat";
import PrimaryButton from "../../components/common/primaryButton";

function MessagePage() {
	return (
		<Stack sx={{ padding: "2rem" }}>
			<Stack
				sx={{
					flexDirection: "row",
					borderRadius: "8px",
					boxShadow:
						"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
				}}
			>
				<Stack
					sx={{
						flex: 0.3,
						maxHeight: "calc(100vh - 100px)",
						overflowY: "auto",
					}}
				>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0.5rem",
						}}
					>
						<Typography variant="h6" sx={{ fontWeight: 600 }}>
							Messaging
						</Typography>
						<IconButton>
							<BorderColorIcon sx={{ color: "#000000" }} />
						</IconButton>
					</Stack>
					<Divider />
					<Stack>
						{ChatList.map((chat) => (
							<Message key={chat.id} chat={chat} />
						))}
					</Stack>
				</Stack>
				<Stack
					sx={{
						flex: 0.7,
						maxHeight: "calc(100vh - 100px)",
						overflowY: "auto",
						border: "0.1px solid #697386",
						borderRadius: "8px",
						padding: "1rem",
						position: "relative",
					}}
				>
					<Stack sx={{ gap: "1rem" }}>
						{Chat_History.map((chat, index) => (
							<Chat key={index} chat={chat} />
						))}
					</Stack>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							zIndex: 999,
							position: "absolute",
							bottom: "1rem",
							left: "1rem",
							right: "1rem",
							gap: "0.5rem",
						}}
					>
						<TextField
							label="Type your message"
							variant="outlined"
							fullWidth
							sx={{ backgroundColor: "#FFFFFF" }}
						/>
						<PrimaryButton title={"Send"} />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default MessagePage;
