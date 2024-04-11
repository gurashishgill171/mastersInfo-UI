/** @format */

import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CompletedImage from "../../assets/completed.jpg";

function Completed() {
	return (
		<Stack
			sx={{
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
				<img src={CompletedImage} alt="completed" style={{ height: "520px" }} />
				<Typography variant="h5" sx={{ textAlign: "center" }}>
					Your profile has been completed successfully
					<br />
					Return <Link to={"/feeds"}>Home</Link>
				</Typography>
			</Stack>
		</Stack>
	);
}

export default Completed;
