/** @format */

import {
	Stack,
	Typography,
	Divider,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
	CURRENT_STAGE_SUBTITLE,
	CURRENT_STAGE_TITLE,
	STUDY_PHASE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import ResearchImage from "../../assets/research.png";
import ListImage from "../../assets/list.png";
import TestsDoneImage from "../../assets/testdone.png";
import AppliedImage from "../../assets/applied.png";
import WaitingImage from "../../assets/waiting.png";
import AdmittedImage from "../../assets/admitted.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/primaryButton";
import axios from "axios";
import { setCredentials } from "../../slices/authSlice";

function Stage({ image, title }) {
	return (
		<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
			<img src={image} alt={title} style={{ height: "60px", width: "60px" }} />
			<Typography variant="subtitle1" sx={{ textAlign: "center" }}>
				{title}
			</Typography>
		</Stack>
	);
}

function CurrentStage() {
	const [stage, setStage] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (stage == "") {
			newErrors.stage = "Please select your current stage.";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					currentStage: stage,
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

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, []);
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{CURRENT_STAGE_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{CURRENT_STAGE_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<form>
					<Stack sx={{ gap: "3rem" }}>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="study-phase"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{STUDY_PHASE}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="study-phase"
								defaultValue="Exploring"
								name="radio-buttons-group"
								value={stage}
								onChange={(e) => setStage(e.target.value)}
								sx={{
									display: "grid",
									gridTemplateColumns: "repeat(2, 1fr)",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
									paddingLeft: "1rem",
								}}
							>
								<FormControlLabel
									value="Exploring"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={ResearchImage}
											title={
												<>
													Just starting,
													<br />
													research phase
												</>
											}
										/>
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											stage == "Exploring" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="Shortlisting"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={ListImage}
											title={
												<>
													Shortlisting universities,
													<br />
													planning tests
												</>
											}
										/>
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											stage == "Shortlisting" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="Finalising"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={TestsDoneImage}
											title={
												<>
													Tests done,
													<br />
													finalising shortlist
												</>
											}
										/>
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											stage == "Finalising" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="Applied"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={AppliedImage}
											title={
												<>
													Applied to a few
													<br />
													universities
												</>
											}
										/>
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor: stage == "Applied" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="Waiting"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={WaitingImage}
											title={
												<>
													Applications done,
													<br />
													awaiting admit
												</>
											}
										/>
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor: stage == "Waiting" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="Admitted"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={AdmittedImage}
											title={
												<>
													Admits
													<br />
													recieved
												</>
											}
										/>
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											stage == "Admitted" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
							</RadioGroup>
							{errors.stage && (
								<Typography variant="caption" sx={{ color: "#d32f2f" }}>
									{errors.stage}
								</Typography>
							)}
						</Stack>
					</Stack>
				</form>
			</Stack>
			<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
				<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
			</Stack>
		</>
	);
}

export default CurrentStage;
