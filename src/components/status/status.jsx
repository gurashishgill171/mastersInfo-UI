/** @format */

import { Stack, Typography } from "@mui/material";
import React from "react";

function Status({ title, icon, primaryColor, secondaryColor }) {
	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			gap={0.5}
			sx={{
				padding: "5px 10px",
				backgroundColor: `${secondaryColor}`,
				width: "max-content",
				borderRadius: "8px",
			}}
		>
			{icon}
			<Typography
				variant="subtitle2"
				sx={{ color: `${primaryColor}`, fontWeight: 600 }}
			>
				{title}
			</Typography>
		</Stack>
	);
}

export default Status;
