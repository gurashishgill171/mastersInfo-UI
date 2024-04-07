/** @format */

import {
	Stack,
	Typography,
	Divider,
	RadioGroup,
	FormControlLabel,
	Radio,
	TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	PROJECT_DESCRIPTION,
	PROJECT_DESCRIPTION_EXAMPLE,
	PROJECT_DURATION,
	PROJECT_FALSE,
	PROJECT_SUBTITLE,
	PROJECT_TITLE,
	PROJECT_TRUE,
	PROJECT_URL,
	PROJECT_URL_EXAMPLE,
	TEAM_SIZE,
	TEAM_SIZE_EXAMPLE,
	TITLE,
	TITLE_EXAMPLE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import { setCredentials } from "../../slices/authSlice";
import PrimaryButton from "../common/primaryButton";

function ProjectDetails() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [hasProject, setHasProject] = useState(true);
	const [title, setTitle] = useState("");
	const [duration, setDuration] = useState(0);
	const [url, setUrl] = useState("");
	const [size, setSize] = useState(1);
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (hasProject) {
			if (!title.trim()) {
				newErrors.title = "Enter your project title";
			}

			if (duration <= 0) {
				newErrors.duration = "Enter a valid duration";
			}

			if (size <= 0) {
				newErrors.size = "Enter a valid team size";
			}

			if (!description.trim()) {
				newErrors.description = "Enter your project description";
			}
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					project: {
						hasProject,
						projectDetails: {
							title,
							duration,
							url,
							size,
							description,
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
					{PROJECT_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{PROJECT_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack sx={{ gap: "2rem" }}>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue={true}
					name="radio-buttons-group"
					value={hasProject.toString()}
					onChange={(e) => setHasProject(e.target.value === "true")}
				>
					<FormControlLabel
						value="true"
						control={<Radio />}
						label={PROJECT_TRUE}
					/>
					<FormControlLabel
						value="false"
						control={<Radio />}
						label={PROJECT_FALSE}
					/>
				</RadioGroup>
				{hasProject && (
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
								label={TITLE}
								placeholder={TITLE_EXAMPLE}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								error={Boolean(errors.title)}
								helperText={errors.title && errors.title}
							/>
						</Stack>
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
								label={PROJECT_DURATION}
								type="number"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								error={Boolean(errors.duration)}
								helperText={errors.duration && errors.duration}
							/>
							<TextField
								fullWidth
								variant="outlined"
								label={PROJECT_URL}
								placeholder={PROJECT_URL_EXAMPLE}
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</Stack>
						<TextField
							fullWidth
							variant="outlined"
							label={TEAM_SIZE}
							placeholder={TEAM_SIZE_EXAMPLE}
							type="number"
							value={size}
							onChange={(e) => setSize(e.target.value)}
							error={Boolean(errors.size)}
							helperText={errors.size && errors.size}
						/>
						<Stack>
							<TextField
								id="project-description"
								label={PROJECT_DESCRIPTION}
								placeholder={PROJECT_DESCRIPTION_EXAMPLE}
								multiline
								rows={4}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								error={Boolean(errors.description)}
								helperText={errors.description && errors.description}
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

export default ProjectDetails;
