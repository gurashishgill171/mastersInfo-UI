/** @format */

import React from "react";
import {
	INTAKE_DETAILS_SUBTITLE,
	INTAKE_DETAILS_TITLE,
	START_INTAKE,
	START_YEAR,
} from "../../helpers/constants";
import {
	Stack,
	Typography,
	Divider,
	FormLabel,
	Radio,
	FormControlLabel,
	RadioGroup,
} from "@mui/material";
import FallImage from "../../assets/fall.png";
import SpringImage from "../../assets/spring.png";
import SummerImage from "../../assets/summer.png";
import WinterImage from "../../assets/winter.png";

function Year({ year }) {
	return (
		<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
			<Typography variant="subtitle1">Beginning</Typography>
			<Typography variant="h6" sx={{ fontWeight: 500 }}>
				{year}
			</Typography>
		</Stack>
	);
}

function Intake({ image, season }) {
	return (
		<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
			<img src={image} alt="season" style={{ height: "60px", width: "60px" }} />
			<Typography variant="h6" sx={{ fontWeight: 500 }}>
				{season}
			</Typography>
		</Stack>
	);
}

function IntakeDetails() {
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{INTAKE_DETAILS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{INTAKE_DETAILS_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<form>
					<Stack sx={{ gap: "3rem" }}>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="start-year"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{START_YEAR}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="start-year"
								defaultValue="female"
								name="radio-buttons-group"
								sx={{
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
								}}
							>
								<FormControlLabel
									value="2024"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Year year={2024} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="2025"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Year year={2025} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="2026"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Year year={2026} />}
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
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="start-intake"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{START_INTAKE}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="start-intake"
								defaultValue="female"
								name="radio-buttons-group"
								sx={{
									display: "grid",
									gridTemplateColumns: "repeat(2, 1fr)",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
								}}
							>
								<FormControlLabel
									value="bachelors"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Fall"} image={FallImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Spring"} image={SpringImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Summer"} image={SummerImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Winter"} image={WinterImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
							</RadioGroup>
						</Stack>
						{/* <TextField
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
							</Stack> */}
					</Stack>
				</form>
			</Stack>
		</>
	);
}

export default IntakeDetails;
