/** @format */

import { Button } from "@mui/material";
import React from "react";

function PrimaryButton({ title, isDisabled }) {
	return (
		<Button
			disabled={isDisabled}
			variant="contained"
			sx={{
				textTransform: "inherit",
				width: "100%",
				fontSize: "18px",
				backgroundColor: "#E37712",
			}}
		>
			{title}
		</Button>
	);
}

export default PrimaryButton;
