/** @format */

import { Stack, Typography } from "@mui/material";
import React from "react";

function EducationDetail({ details }) {
	return (
		<Stack>
			<Typography variant="h4" fontWeight={500}>
				{details.cgpa}
				<span style={{ fontWeight: 300, fontSize: "20px", marginLeft: "5px" }}>
					CGPA
				</span>
			</Typography>
			<Typography variant="h6" fontWeight={500}>
				{details.university}
			</Typography>
			<Typography variant="h6">
				{details.isGraduate ? "UG" : "PG"} | {details.course}
			</Typography>
			<Typography variant="h6" fontWeight={500}>
				Backlogs: {details.backlogs}
			</Typography>
		</Stack>
	);
}

export default EducationDetail;
