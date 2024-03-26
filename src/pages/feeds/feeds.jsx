/** @format */

import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddFeedPopup from "../../components/feed/addFeedPopup";
import Feed from "../../components/feed/feed";
import { FeedsData } from "../../data/feeds";
import { ADD_FEED_TITLE } from "../../helpers/constants";

function Feeds() {
	const [openAddFeed, setOpenAddFeed] = useState(false);
	const handleAddFeedOpen = () => setOpenAddFeed(true);
	const handleAddFeedClose = () => setOpenAddFeed(false);
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
				<Box
					sx={{
						backgroundColor: "#ffffff",
						border: "1px solid rgb(107 114 128)",
						borderRadius: "8px",
						padding: "2rem",
						justifyContent: "center",
						cursor: "pointer",
					}}
					onClick={handleAddFeedOpen}
				>
					<Typography variant="h5" sx={{ color: "#6B7280" }}>
						{ADD_FEED_TITLE}Gurashish
					</Typography>
					{openAddFeed && (
						<AddFeedPopup open={openAddFeed} handleClose={handleAddFeedClose} />
					)}
				</Box>
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
