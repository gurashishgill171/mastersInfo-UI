/** @format */

import {
	Divider,
	Stack,
	TextField,
	Typography,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import React from "react";
import {
	BASIC_DETAILS_SUBTITLE,
	BASIC_DETAILS_TITLE,
	COURSE_INTEREST,
	DEGREE_PLAN,
	EMAIL,
	EMAIL_EXAMPLE,
} from "../../helpers/constants";
import bachelorsImage from "../../assets/bachelors.png";
import mastersImage from "../../assets/masters.png";

function DegreeName({ image, name }) {
	return (
		<Stack
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			<img
				src={image}
				alt="degree"
				style={{ height: "60px", width: "60px", borderRadius: "50%" }}
			/>
			<Typography variant="subtitle1">{name}</Typography>
		</Stack>
	);
}

function BasicDetails() {
	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
				minHeight: "90vh",
			}}
		>
			<Stack
				sx={{
					maxWidth: "1240px",
					width: "100%",
				}}
			>
				<Stack>
					<Typography variant="h4" sx={{ fontWeight: "600" }}>
						{BASIC_DETAILS_TITLE}
					</Typography>
					<Typography variant="h6" sx={{ color: "#697386" }}>
						{BASIC_DETAILS_SUBTITLE}
					</Typography>
				</Stack>
				<Divider />
				<Stack>
					<form>
						<Stack>
							<TextField
								variant="outlined"
								label={EMAIL}
								placeholder={EMAIL_EXAMPLE}
							/>
							<Stack sx={{ width: "100%" }}>
								<FormLabel
									id="degree-plan"
									sx={{ fontSize: "20px", fontWeight: 600 }}
								>
									{DEGREE_PLAN}
								</FormLabel>
								<RadioGroup
									row
									aria-labelledby="degree-plan"
									defaultValue="female"
									name="radio-buttons-group"
									sx={{
										alignItems: "center",
										justifyContent: "space-between",
										gap: "20px",
									}}
								>
									<FormControlLabel
										value="bachelors"
										control={<Radio icon={<></>} checkedIcon={<></>} />}
										label={
											<DegreeName name={"Bachelor's"} image={bachelorsImage} />
										}
										sx={{
											flex: 0.5,
											border: "1px solid #000000",
											borderRadius: "12px",
											padding: "10px 5px 10px 5px",
											justifyContent: "center",
										}}
									/>
									<FormControlLabel
										value="masters"
										control={<Radio icon={<></>} checkedIcon={<></>} />}
										label={
											<DegreeName name={"Master's"} image={mastersImage} />
										}
										sx={{
											flex: 0.5,
											border: "1px solid #000000",
											borderRadius: "12px",
											padding: "10px 5px 10px 5px",
											justifyContent: "center",
										}}
									/>
								</RadioGroup>
							</Stack>
							<Stack>
								<FormLabel
									id="course-interest"
									sx={{ fontSize: "20px", fontWeight: 600 }}
								>
									{COURSE_INTEREST}
								</FormLabel>
							</Stack>
						</Stack>
					</form>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default BasicDetails;
