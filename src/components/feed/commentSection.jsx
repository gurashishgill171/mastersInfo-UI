/** @format */

import { Avatar, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, COMMENT } from "../../helpers/constants";
import { updatePost } from "../../slices/postSlice";
import PrimaryButton from "../common/primaryButton";

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

function CommentSection({ data }) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const userInfo = useSelector((state) => state.authReducer.userInfo);

	const handleSubmit = async () => {
		if (comment != "") {
			try {
				const res = await axios.post("http://localhost:6001/post/update", {
					postId: data._id,
					comment,
					userId: userInfo._id,
				});
				setComment("");
				dispatch(updatePost(res.data.post));
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Stack>
			<Stack
				sx={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "2rem",
				}}
			>
				<Avatar
					{...stringAvatar(data.user.firstName + " " + data.user.lastName)}
				/>
				<TextField
					fullWidth
					variant="outlined"
					placeholder={COMMENT}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<PrimaryButton title={ADD_COMMENT} handleClick={handleSubmit} />
			</Stack>
		</Stack>
	);
}

export default CommentSection;
