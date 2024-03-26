/** @format */
import { Stack, Typography } from "@mui/material";
import React from "react";
import { SKILLS_SUBTITLE, SKILLS_TITLE } from "../../helpers/constants";

function SkillDetails() {
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{SKILLS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{SKILLS_SUBTITLE}
				</Typography>
			</Stack>
		</>
	);
}

export default SkillDetails;
