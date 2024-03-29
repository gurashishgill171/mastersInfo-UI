/** @format */

import React, { useState, useEffect } from "react";
import {
	Modal,
	Box,
	Typography,
	Stack,
	TextField,
	Divider,
	IconButton,
} from "@mui/material";
import {
	ADD_FEED_POPUP_DETAIL,
	ADD_FEED_POPUP_INPUT,
	ADD_FEED_POPUP_TITLE,
} from "../../helpers/constants";
import PrimaryButton from "../common/primaryButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../common/error";
import { addPost } from "../../slices/postSlice";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "#ffffff",
	borderRadius: "8px",
	boxShadow: 24,
};

function AddFeedPopup({ open, handleClose }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [postTitle, setPostTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = {};

		if (postTitle == "") {
			newErrors.title = "Please add a title";
		}
		if (postDescription == "") {
			newErrors.description = "Please add a description";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/post/create", {
					postTitle,
					postDescription,
					user: userInfo._id,
				});
				console.log(res);
				dispatch(addPost(res.data.newPost));
				handleClose();
			} catch (error) {
				setErrorPopup(true);
				setApiError(error.response.data.error);
			}
		} else {
			setErrors(newErrors);
		}
	};

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, []);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "1rem",
						backgroundColor: "#F1F4F7",
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						{ADD_FEED_POPUP_TITLE}
					</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Stack sx={{ padding: "1rem", gap: "1rem" }}>
					<TextField
						id="standard-basic"
						variant="standard"
						placeholder={ADD_FEED_POPUP_INPUT}
						value={postTitle}
						onChange={(e) => setPostTitle(e.target.value)}
						InputProps={{ disableUnderline: true }}
					/>
					{errors.title && (
						<Typography variant="caption" sx={{ color: "#d32f2f" }}>
							{errors.title}
						</Typography>
					)}
					<Divider />
					<TextField
						id="standard-multiline-static"
						multiline
						rows={4}
						placeholder={ADD_FEED_POPUP_DETAIL}
						variant="standard"
						value={postDescription}
						onChange={(e) => setPostDescription(e.target.value)}
						InputProps={{ disableUnderline: true }}
					/>
					{errors.description && (
						<Typography variant="caption" sx={{ color: "#d32f2f" }}>
							{errors.description}
						</Typography>
					)}
				</Stack>
				<Divider />
				<Stack sx={{ padding: "1rem", alignItems: "flex-end" }}>
					<PrimaryButton
						title={ADD_FEED_POPUP_TITLE}
						handleClick={handleSubmit}
					/>
				</Stack>
				{errorPopup && (
					<ErrorAlert
						open={errorPopup}
						handleClose={handleCloseErrorAlert}
						message={apiError}
					/>
				)}
			</Box>
		</Modal>
	);
}

export default AddFeedPopup;
