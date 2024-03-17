/** @format */

import React from "react";
import Snackbar from "@mui/material/Snackbar";

function ErrorAlert({ open, handleClose, message }) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
			message={message}
		/>
	);
}

export default ErrorAlert;
