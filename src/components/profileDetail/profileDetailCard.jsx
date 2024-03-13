/** @format */

import { Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

function ProfileDetailCard({ profile }) {
	return (
		<Stack
			sx={{
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				borderRadius: "8px",
				cursor: "pointer",
			}}
		>
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
				p={4}
			>
				<Stack direction={"row"} alignItems={"center"} gap={2}>
					{profile.icon}
					<Typography variant="h5" sx={{ fontWeight: 500 }}>
						{profile.title}
					</Typography>
				</Stack>
				<Stack
					direction={"row"}
					alignItems={"center"}
					sx={{
						padding: "5px 12px",
						border: "0.8px solid #000000",
						borderRadius: "8px",
						maxWidth: "max-content",
						cursor: "pointer",
					}}
				>
					<Typography variant="h6">Add</Typography>
					<AddIcon />
				</Stack>
			</Stack>
			<Divider
				variant="fullWidth"
				style={{ background: "rgb(242, 244, 247) / 1" }}
				sx={{
					borderBottomWidth: 8,
					width: "100%",
				}}
			/>
			<Stack></Stack>
		</Stack>
	);
}

export default ProfileDetailCard;
