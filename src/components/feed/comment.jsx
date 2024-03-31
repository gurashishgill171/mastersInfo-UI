/** @format */

import { Stack, Typography } from "@mui/material";
import React from "react";
import { timeSince } from "../../helpers/timeSince";

function Comment({ comment }) {
	return (
		<Stack
			sx={{
				backgroundColor: "#F2F2F2",
				padding: "1rem",
				borderRadius: "8px",
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
				<Typography variant="h6" sx={{ fontWeight: 600 }}>
					{comment.user.firstName + " " + comment.user.lastName}
				</Typography>
				<Typography variant="body" sx={{ color: "#697386" }}>
					{timeSince(comment.createdAt)}
				</Typography>
			</Stack>
			<Stack>
				<Typography variant="body" sx={{ color: "#697386" }}>
					{comment.comment}
				</Typography>
			</Stack>
		</Stack>
	);
}

export default Comment;
