/** @format */

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Cover_Points } from "../../data/cover";
import { COVER_TITLE } from "../../helpers/constants";

function Cover() {
	return (
		<Stack
			height={"100%"}
			alignItems={"center"}
			justifyContent={"center"}
			sx={{ backgroundColor: "#FDF1E0" }}
			p={2}
		>
			<Stack gap={4}>
				<Stack>
					<Typography variant="h3" sx={{ fontWeight: 600 }}>
						{COVER_TITLE}
					</Typography>
				</Stack>
				<Stack gap={2}>
					{Cover_Points.map((point) => (
						<Stack flexDirection={"row"} gap={2} key={point.id}>
							{point.icon}
							<Typography variant="h6">{point.title}</Typography>
						</Stack>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Cover;
