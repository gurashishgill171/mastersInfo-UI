/** @format */

import { Button } from "@mui/material";
import React from "react";

function PrimaryButton({ title, isDisabled, handleClick }) {
	return (
		<Button
			disabled={isDisabled}
			variant="contained"
			sx={{
				textTransform: "inherit",
				width: "100%",
				fontSize: "18px",
				backgroundColor: "#E37712",
				":hover": {
					bgcolor: "#E37712",
				},
			}}
			onClick={handleClick}
		>
			{title}
		</Button>
	);
}

export default PrimaryButton;
