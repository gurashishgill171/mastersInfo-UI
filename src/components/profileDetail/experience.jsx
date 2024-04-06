/** @format */

import {
	Divider,
	Stack,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
	FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import {
	CURRENTLY_WORKING,
	END_DATE,
	EXPERIENCE_FALSE,
	EXPERIENCE_SUBTITLE,
	EXPERIENCE_TITLE,
	EXPERIENCE_TRUE,
	FULL_TIME,
	INTERNSHIP,
	JD,
	JD_EXAMPLE,
	NATURE_JOB,
	ORGANISATION,
	ORGANISATION_EXAMPLE,
	PART_TIME,
	POSITION,
	POSITION_EXAMPLE,
	START_DATE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import PrimaryButton from "../common/primaryButton";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function JobNature({ jobNature }) {
	return <Typography>{jobNature}</Typography>;
}

function Experience() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [hasExperience, setHasExperience] = useState(true);
	const [currentlyWorking, setCurrentlyWorking] = useState(false);
	const [position, setPosition] = useState("");
	const [organisation, setOrganisation] = useState("");
	const [natureOfJob, setNatureOfJob] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (hasExperience) {
			if (!position.trim()) {
				newErrors.position = "Enter your role";
			}

			if (!organisation.trim()) {
				newErrors.organisation = "Enter name of your organisation";
			}

			if (!startDate) {
				newErrors.startDate = "Enter your job start date";
			}

			if (!currentlyWorking) {
				if (!endDate) {
					newErrors.endDate = "Enter your job end date";
				}
			}

			if (!jobDescription.trim()) {
				newErrors.jd = "Enter your job description";
			}
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					workExperience: {
						hasExperience,
						experience: {
							position,
							organisation,
							nature: natureOfJob,
							currentJob: currentlyWorking,
							startDate,
							endDate,
							description: jobDescription,
						},
					},
					currentStep: userInfo && userInfo.currentStep + 1,
				});
				dispatch(setCredentials(res.data.user));
			} catch (error) {
				setErrorPopup(true);
				setApiError(error.response.data.error);
			}
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{EXPERIENCE_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{EXPERIENCE_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack sx={{ gap: "2rem" }}>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue={true}
					name="radio-buttons-group"
					value={hasExperience.toString()}
					onChange={(e) => setHasExperience(e.target.value === "true")}
				>
					<FormControlLabel
						value="true"
						control={<Radio />}
						label={EXPERIENCE_TRUE}
					/>
					<FormControlLabel
						value="false"
						control={<Radio />}
						label={EXPERIENCE_FALSE}
					/>
				</RadioGroup>
				{hasExperience && (
					<Stack sx={{ gap: "2rem" }}>
						<Stack
							sx={{
								flexDirection: "row",
								alignItems: "center",
								width: "100%",
								gap: "1rem",
							}}
						>
							<TextField
								fullWidth
								variant="outlined"
								label={POSITION}
								placeholder={POSITION_EXAMPLE}
								value={position}
								onChange={(e) => setPosition(e.target.value)}
								error={Boolean(errors.position)}
								helperText={errors.position && errors.position}
							/>
							<TextField
								fullWidth
								variant="outlined"
								label={ORGANISATION}
								placeholder={ORGANISATION_EXAMPLE}
								value={organisation}
								onChange={(e) => setOrganisation(e.target.value)}
								error={Boolean(errors.organisation)}
								helperText={errors.organisation && errors.organisation}
							/>
						</Stack>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="nature-of-job"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{NATURE_JOB}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="nature-of-job"
								defaultValue={FULL_TIME}
								name="nature-of-job-group"
								value={natureOfJob}
								onChange={(e) => setNatureOfJob(e.target.value)}
								sx={{
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
									paddingLeft: "0.8rem",
								}}
							>
								<FormControlLabel
									value={FULL_TIME}
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<JobNature jobNature={FULL_TIME} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											natureOfJob == FULL_TIME ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value={PART_TIME}
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<JobNature jobNature={PART_TIME} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											natureOfJob == PART_TIME ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value={INTERNSHIP}
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<JobNature jobNature={INTERNSHIP} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											natureOfJob == INTERNSHIP ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
							</RadioGroup>
						</Stack>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue={false}
							name="radio-button-group"
							value={currentlyWorking.toString()}
							onChange={(e) => setCurrentlyWorking(e.target.value === "true")}
						>
							<FormControlLabel
								value={"true"}
								control={<Radio />}
								label={CURRENTLY_WORKING}
							/>
						</RadioGroup>
						<Stack
							sx={{
								flexDirection: "row",
								alignItems: "center",
								width: "100%",
								gap: "1rem",
							}}
						>
							<DemoItem label={START_DATE} sx={{ width: "100%" }}>
								<DatePicker
									value={startDate}
									onChange={(newValue) => setStartDate(newValue)}
								/>
								{errors.startDate && (
									<Typography variant="caption" sx={{ color: "#d32f2f" }}>
										{errors.startDate}
									</Typography>
								)}
							</DemoItem>
							{!currentlyWorking && (
								<DemoItem label={END_DATE} sx={{ width: "100%" }}>
									<DatePicker
										value={endDate}
										onChange={(newValue) => setEndDate(newValue)}
									/>
									{errors.endDate && (
										<Typography variant="caption" sx={{ color: "#d32f2f" }}>
											{errors.endDate}
										</Typography>
									)}
								</DemoItem>
							)}
						</Stack>
						<Stack>
							<TextField
								id="job-description"
								label={JD}
								placeholder={JD_EXAMPLE}
								multiline
								rows={4}
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
								error={Boolean(errors.jd)}
								helperText={errors.jd && errors.jd}
							/>
						</Stack>
					</Stack>
				)}
				<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
					<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
				</Stack>
			</Stack>
		</>
	);
}

export default Experience;
