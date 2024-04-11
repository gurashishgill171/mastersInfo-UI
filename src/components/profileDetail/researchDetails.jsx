/** @format */

import {
	Divider,
	Stack,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	TextField,
	FormLabel,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	PAPER_TITLE,
	PAPER_TITLE_EXAMPLE,
	PUBLICATION_LEVEL,
	RESEARCH_DESCRIPTION,
	RESEARCH_DESCRIPTION_EXAMPLE,
	RESEARCH_FALSE,
	RESEARCH_SUBTITLE,
	RESEARCH_TITLE,
	RESEARCH_TRUE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import { setCredentials } from "../../slices/authSlice";
import PrimaryButton from "../common/primaryButton";

function Level({ level }) {
	return <Typography>{level}</Typography>;
}

function ResearchDetails() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [hasResearch, setHasResearch] = useState(true);
	const [title, setTitle] = useState("");
	const [publicationLevel, setPublicationLevel] = useState("National");
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
		if (hasResearch) {
			if (!title.trim()) {
				newErrors.title = "Enter your research title";
			}

			if (!description.trim()) {
				newErrors.description = "Enter your research description";
			}
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					research: {
						hasResearch,
						researchDetails: {
							title,
							publicationLevel,
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
					{RESEARCH_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{RESEARCH_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack sx={{ gap: "2rem" }}>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue={true}
					name="radio-buttons-group"
					value={hasResearch.toString()}
					onChange={(e) => setHasResearch(e.target.value === "true")}
				>
					<FormControlLabel
						value="true"
						control={<Radio />}
						label={RESEARCH_TRUE}
					/>
					<FormControlLabel
						value="false"
						control={<Radio />}
						label={RESEARCH_FALSE}
					/>
				</RadioGroup>
				{hasResearch && (
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
								label={PAPER_TITLE}
								placeholder={PAPER_TITLE_EXAMPLE}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								error={Boolean(errors.title)}
								helperText={errors.title && errors.title}
							/>
						</Stack>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="start-intake"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{PUBLICATION_LEVEL}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="start-intake"
								defaultValue="fall"
								name="radio-buttons-group"
								value={publicationLevel}
								onChange={(e) => setPublicationLevel(e.target.value)}
								sx={{
									display: "grid",
									gridTemplateColumns: "repeat(3, 1fr)",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
									paddingLeft: "0.8rem",
								}}
							>
								<FormControlLabel
									value="Local"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Level level="Local" />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											publicationLevel == "Local" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="National"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Level level="National" />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											publicationLevel == "National" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="International"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Level level="International" />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											publicationLevel == "International"
												? "#F1F4F7"
												: "#FFFFFF",
									}}
								/>
							</RadioGroup>
						</Stack>
						<Stack>
							<TextField
								id="project-description"
								label={RESEARCH_DESCRIPTION}
								placeholder={RESEARCH_DESCRIPTION_EXAMPLE}
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

export default ResearchDetails;
