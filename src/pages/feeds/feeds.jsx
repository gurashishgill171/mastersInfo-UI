/** @format */

import { Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddFeedPopup from "../../components/feed/addFeedPopup";
import Feed from "../../components/feed/feed";
import { FeedsData } from "../../data/feeds";
import { ADD_FEED_TITLE } from "../../helpers/constants";
import { setPosts } from "../../slices/postSlice";

function Feeds() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer.posts);
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [openAddFeed, setOpenAddFeed] = useState(false);
	const handleAddFeedOpen = () => setOpenAddFeed(true);
	const handleAddFeedClose = () => setOpenAddFeed(false);

	const fetchPosts = async () => {
		try {
			const res = await axios.get("http://localhost:6001/post/get");
			dispatch(setPosts(res.data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
		fetchPosts();
	}, []);

	return (
		<Stack
			sx={{
				minHeight: "100vh",
				backgroundColor: "#F6F5F3",
				alignItems: "center",
				flexDirection: "row",
				overflow: "hidden",
				gap: "1rem",
			}}
		>
			<Box
				sx={{
					flex: 0.3,
					height: "100vh",
					overflow: "auto",
					padding: "2rem",
				}}
			>
				left thing
			</Box>
			<Box
				sx={{
					flex: 0.4,
					gap: "2rem",
					overflowY: "auto",
					height: "100vh",
					padding: "2rem",
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
				<Stack sx={{ gap: "1rem", marginTop: "2rem" }}>
					{posts.map((feed) => (
						<Feed data={feed} />
					))}
				</Stack>
			</Box>
			<Box
				sx={{
					flex: 0.3,
					height: "100vh",
					overflow: "auto",
					padding: "2rem",
				}}
			>
				right thing
			</Box>
		</Stack>
	);
}

export default Feeds;
