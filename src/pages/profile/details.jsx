/** @format */

import { Stack } from "@mui/material";
import React from "react";
import BasicDetails from "../../components/profileDetail/basicDetails";
import DetailsSteps from "../../components/profileDetail/stepper";

function ProfileDetails() {
	return (
		<Stack sx={{}}>
			<DetailsSteps />
			<Stack sx={{}}>
				<BasicDetails />
			</Stack>
		</Stack>
	);
}

export default ProfileDetails;
