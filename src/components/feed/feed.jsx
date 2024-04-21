/** @format */

import {
	Avatar,
	Box,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LikeImage from "../../assets/like.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { timeSince } from "../../helpers/timeSince";
import CommentSection from "./commentSection";
import Comment from "./comment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../slices/postSlice";

function stringToColor(string) {
	let hash = 0;
	let i;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

function Feed({ data }) {
	const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [isFeedLikedByCurrentUser, setIsFeedLikedByCurrentUser] = useState(
		data.likedBy.includes(userInfo._id)
	);
	const [isExpanded, setIsExpanded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsFeedLikedByCurrentUser(data.likedBy.includes(userInfo._id));
	}, [data.likedBy, userInfo._id]);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	const style = isExpanded
		? {}
		: {
				display: "-webkit-box",
				WebkitBoxOrient: "vertical",
				WebkitLineClamp: 3,
				overflow: "hidden",
				textOverflow: "ellipsis",
		  };

	const handleFeedLike = async () => {
		try {
			const res = await axios.post(
				`http://localhost:6001/post/${data._id}/like`,
				{ userId: userInfo._id }
			);
			dispatch(updatePost(res.data.post));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Stack
			sx={{
				backgroundColor: "#FFFFFF",
				borderRadius: "8px",
				cursor: "pointer",
				padding: "1rem",
				gap: "1rem",
				boxShadow:
					"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
			}}
		>
			<Stack
				sx={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Stack
					sx={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}
				>
					<Avatar
						{...stringAvatar(data.user.firstName + " " + data.user.lastName)}
					/>
					<Stack>
						<Typography variant="body1" sx={{ fontWeight: 600 }}>
							{data.user.firstName + " " + data.user.lastName}
						</Typography>
						<Typography variant="subtitle2" sx={{ color: "#697386" }}>
							{data.user.currentStage} | {data.user.plannedIntake}
						</Typography>
						<Typography variant="subtitle2" sx={{ color: "#697386" }}>
							{timeSince(data.createdAt)}
						</Typography>
					</Stack>
				</Stack>
				<IconButton>
					<MoreHorizIcon />
				</IconButton>
			</Stack>
			<Stack>
				<div
					dangerouslySetInnerHTML={{ __html: data.postDescription }}
					style={style}
				/>
				<Typography
					onClick={toggleExpanded}
					sx={{ color: "#E37712", textDecoration: "underline" }}
				>
					{isExpanded ? "Less" : "More"}
				</Typography>
				{data.postImage.url !== null && (
					<Stack style={{ height: "480px" }}>
						<img
							src={data.postImage.url}
							alt="postImage"
							style={{ width: "100%", height: "100%", objectFit: "contain" }}
						/>
					</Stack>
				)}

				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: "0.5rem",
					}}
				>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							gap: "0.5rem",
						}}
					>
						<img
							src={LikeImage}
							alt="like"
							style={{ height: "25px", width: "25px" }}
						/>
						<Typography variant="body1" sx={{ color: "#697786" }}>
							{data.likes}
						</Typography>
					</Stack>
					<Stack>
						<Typography variant="body1" sx={{ color: "#697786" }}>
							{data.comments.length} comment
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Divider />
			<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
				<IconButton
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "0.2rem",
					}}
					onClick={handleFeedLike}
				>
					<ThumbUpOutlinedIcon
						sx={{ color: isFeedLikedByCurrentUser && "#2191EC" }}
					/>
					<Typography sx={{ color: isFeedLikedByCurrentUser && "#2191EC" }}>
						Like
					</Typography>
				</IconButton>
				<IconButton
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "0.2rem",
					}}
					onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
				>
					<ChatOutlinedIcon />
					<Typography>Comment</Typography>
				</IconButton>
			</Stack>
			{isCommentSectionOpen && <CommentSection data={data} />}
			{isCommentSectionOpen &&
				data.comments.map((comment) => (
					<Comment key={comment._id} comment={comment} />
				))}
		</Stack>
	);
}

export default Feed;
