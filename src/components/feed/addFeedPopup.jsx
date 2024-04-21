/** @format */

import React, { useState, useEffect } from "react";
import {
	Modal,
	Box,
	Typography,
	Stack,
	Divider,
	IconButton,
	Button,
} from "@mui/material";
import { ADD_FEED_POPUP_TITLE } from "../../helpers/constants";
import PrimaryButton from "../common/primaryButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../common/error";
import { addPost } from "../../slices/postSlice";
import { Editor } from "primereact/editor";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

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
	const [postDescription, setPostDescription] = useState("");
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(false);
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleImage = (e) => {
		const file = e.target.files[0];
		const size = e.target.files[0].size;
		if (size >= 5e6) {
			setImageError(true);
		} else {
			setImageError(false);
		}
		setFiletoBase(file);
	};

	const setFiletoBase = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newErrors = {};

		if (!postDescription) {
			newErrors.description = "Please add a description";
		}

		if (Object.keys(newErrors).length === 0 && !imageError) {
			try {
				const res = await axios.post("http://localhost:6001/post/create", {
					postDescription,
					user: userInfo._id,
					image,
				});
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
					<Editor
						value={postDescription}
						onTextChange={(e) => setPostDescription(e.htmlValue)}
						style={{ height: "320px" }}
					/>
					{errors.description && (
						<Typography variant="caption" sx={{ color: "#d32f2f" }}>
							{errors.description}
						</Typography>
					)}

					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUpload />}
					>
						Upload Image
						<VisuallyHiddenInput type="file" onChange={handleImage} />
					</Button>
					{imageError && (
						<Typography variant="caption" sx={{ color: "#d32f2f" }}>
							File size should be less than 5MB
						</Typography>
					)}
					{!imageError && image && (
						<img src={image} style={{ height: "60px", width: "60px" }} />
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
