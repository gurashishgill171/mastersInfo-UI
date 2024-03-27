/** @format */

import { Button } from "@mui/material";
import React from "react";

function PrimaryButton({ title, isDisabled, handleClick, isLoading }) {
	return (
		<Button
			disabled={isDisabled || isLoading}
			variant="contained"
			sx={{
				textTransform: "inherit",
				width: "max-content",
				fontSize: "18px",
				backgroundColor: "#E37712",
				":hover": {
					bgcolor: "#E37712",
				},
			}}
			onClick={handleClick}
		>
			{!isLoading ? title : "LOADING..."}
		</Button>
	);
}

export default PrimaryButton;
