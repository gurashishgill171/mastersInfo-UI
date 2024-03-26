/** @format */

import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Feed from "../../components/feed/feed";
import { FeedsData } from "../../data/feeds";
import { ADD_FEED_TITLE } from "../../helpers/constants";

function Feeds() {
	return (
		<Stack
			sx={{
				minHeight: "100vh",
				backgroundColor: "#F6F5F3",
				alignItems: "center",
			}}
		>
			<Stack
				sx={{
					maxWidth: "820px",
					width: "100%",
					gap: "2rem",
				}}
			>
				<Stack
					sx={{
						backgroundColor: "#ffffff",
						border: "1px solid rgb(107 114 128)",
						borderRadius: "8px",
						padding: "2rem",
						justifyContent: "center",
						cursor: "pointer",
					}}
				>
					<Typography variant="h5" sx={{ color: "#6B7280" }}>
						{ADD_FEED_TITLE}Gurashish
					</Typography>
				</Stack>
				<Divider />
				<Stack sx={{ gap: "1rem" }}>
					{FeedsData.map((feed) => (
						<Feed data={feed} />
					))}
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Feeds;
