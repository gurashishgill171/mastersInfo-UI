/** @format */

import { Avatar, Stack, Typography } from "@mui/material";
import SampleUser from "../../assets/sampleUser.jpeg";
import React from "react";

function Chat({ chat }) {
	return (
		<Stack sx={{ flexDirection: "row", gap: "0.6rem" }}>
			<Stack>
				<Avatar src={SampleUser} alt="user" />
			</Stack>
			<Stack sx={{ gap: "1rem" }}>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Gurashish Singh Gill
					</Typography>
					<Typography variant="body1" sx={{ color: "#697386" }}>
						8:35 pm
					</Typography>
				</Stack>
				<Typography variant="body1" sx={{ color: "#697386" }}>
					{chat.message}
				</Typography>
			</Stack>
		</Stack>
	);
}

export default Chat;
