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
	Select,
	OutlinedInput,
	Box,
	Chip,
	MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import {
	BASIC_DETAILS_SUBTITLE,
	BASIC_DETAILS_TITLE,
	COURSE_INTEREST,
	DEGREE_PLAN,
	EMAIL,
	EMAIL_EXAMPLE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import bachelorsImage from "../../assets/bachelors.png";
import mastersImage from "../../assets/masters.png";
import { Courses } from "../../data/courses";
import PrimaryButton from "../common/primaryButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

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

function getStyles(name, personName) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? 300 : 500,
	};
}

function BasicDetails() {
	const [interestedCourses, setInterestedCourses] = useState([]);
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setInterestedCourses(typeof value === "string" ? value.split(",") : value);
	};
	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Stack
				sx={{
					maxWidth: "1240px",
					marginTop: "5rem",
					width: "100%",
					height: "100%",
					gap: "2rem",
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
						<Stack sx={{ gap: "3rem" }}>
							<TextField
								variant="outlined"
								label={EMAIL}
								placeholder={EMAIL_EXAMPLE}
							/>
							<Stack sx={{ width: "100%", gap: "1rem" }}>
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
							<Stack sx={{ gap: "1rem" }}>
								<FormLabel
									id="course-interest"
									sx={{ fontSize: "20px", fontWeight: 600 }}
								>
									{COURSE_INTEREST}
								</FormLabel>
								<Select
									labelId="course-interest"
									id="demo-multiple-chip"
									multiple
									value={interestedCourses}
									onChange={handleChange}
									input={<OutlinedInput id="select-multiple-chip" />}
									renderValue={(selected) => (
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{selected.map((value) => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
									MenuProps={MenuProps}
								>
									{Courses.map((course) => (
										<MenuItem
											key={course.id}
											value={course.value}
											style={getStyles(course.value, interestedCourses)}
										>
											{course.value}
										</MenuItem>
									))}
								</Select>
							</Stack>
							<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
								<PrimaryButton title={NEXT_BUTTON_TITLE} />
							</Stack>
						</Stack>
					</form>
				</Stack>
			</Stack>
			{/* <Stack
				sx={{
					width: "100%",
					position: "absolute",
					bottom: "0",
					borderTop: "0.1px solid #697386",
				}}
			>
				<Stack sx={{ position: "absolute", right: "0", padding: "1.5rem" }}>
					<PrimaryButton title={"Proceed To Next"} />
				</Stack>
			</Stack> */}
		</Stack>
	);
}

export default BasicDetails;
