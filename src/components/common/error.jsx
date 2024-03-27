/** @format */

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function ErrorAlert({ open, handleClose, message }) {
	return (
		<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity="error"
				variant="filled"
				sx={{ width: "100%" }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default ErrorAlert;
