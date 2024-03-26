/** @format */

import React from "react";
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

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "#ffffff",
	// border: "1px solid #000",
	borderRadius: "8px",
	boxShadow: 24,
};

function AddFeedPopup({ open, handleClose }) {
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
						InputProps={{ disableUnderline: true }}
					/>
					<Divider />
					<TextField
						id="standard-multiline-static"
						multiline
						rows={4}
						placeholder={ADD_FEED_POPUP_DETAIL}
						variant="standard"
						InputProps={{ disableUnderline: true }}
					/>
				</Stack>
				<Divider />
				<Stack sx={{ padding: "1rem", alignItems: "flex-end" }}>
					<PrimaryButton title={ADD_FEED_POPUP_TITLE} />
				</Stack>
			</Box>
		</Modal>
	);
}

export default AddFeedPopup;
