/** @format */

import {
	Divider,
	Stack,
	Typography,
	Box,
	Tabs,
	Tab,
	TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
	COMPOSITE_SCORE,
	ENGLISH_SCORES_SUBTITLE,
	ENGLISH_SCORES_TITLE,
	LISTENING,
	READING,
	SPEAKING,
	TESTDATE_TITLE,
	WRITING,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import PrimaryButton from "../common/primaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function ScoreForm({
	type,
	maxScore,
	maxIndividualScore,
	totalScore,
	setTotalScore,
	readingScore,
	setReadingScore,
	writingScore,
	setWritingScore,
	speakingScore,
	setSpeakingScore,
	listeningScore,
	setListeningScore,
	testDate,
	setTestDate,
	errors,
}) {
	return (
		<>
			<Stack sx={{ gap: "2rem", marginTop: "3rem" }}>
				<TextField
					variant="outlined"
					label={COMPOSITE_SCORE}
					placeholder={`/ ${maxScore}`}
					sx={{ width: "100%" }}
					value={totalScore}
					onChange={(e) => setTotalScore(e.target.value)}
					error={Boolean(errors.totalScore)}
					helperText={errors.totalScore && errors.totalScore}
				/>
				<Divider />
				<Stack sx={{ gap: "2rem" }}>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: "2rem",
						}}
					>
						<TextField
							variant="outlined"
							label={READING}
							placeholder={`/ ${maxIndividualScore}`}
							sx={{ width: "100%" }}
							value={readingScore}
							onChange={(e) => setReadingScore(e.target.value)}
							error={Boolean(errors.readingScore)}
							helperText={errors.readingScore && errors.readingScore}
						/>
						<TextField
							variant="outlined"
							label={WRITING}
							placeholder={`/ ${maxIndividualScore}`}
							sx={{ width: "100%" }}
							value={writingScore}
							onChange={(e) => setWritingScore(e.target.value)}
							error={Boolean(errors.writingScore)}
							helperText={errors.writingScore && errors.writingScore}
						/>
					</Stack>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: "2rem",
						}}
					>
						<TextField
							variant="outlined"
							label={LISTENING}
							placeholder={`/ ${maxIndividualScore}`}
							sx={{ width: "100%" }}
							value={listeningScore}
							onChange={(e) => setListeningScore(e.target.value)}
							error={Boolean(errors.listeningScore)}
							helperText={errors.listeningScore && errors.listeningScore}
						/>
						<TextField
							variant="outlined"
							label={SPEAKING}
							placeholder={`/ ${maxIndividualScore}`}
							sx={{ width: "100%" }}
							value={speakingScore}
							onChange={(e) => setSpeakingScore(e.target.value)}
							error={Boolean(errors.speakingScore)}
							helperText={errors.speakingScore && errors.speakingScore}
						/>
					</Stack>
				</Stack>
				<Stack>
					<DemoItem label={TESTDATE_TITLE}>
						<DatePicker
							value={testDate}
							onChange={(newValue) => setTestDate(newValue)}
						/>
						{errors.testDate && (
							<Typography variant="caption" sx={{ color: "#d32f2f" }}>
								{errors.testDate}
							</Typography>
						)}
					</DemoItem>
				</Stack>
			</Stack>
		</>
	);
}

function EnglishScores() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [examType, setExamType] = useState(0);
	const [totalScore, setTotalScore] = useState("");
	const [readingScore, setReadingScore] = useState("");
	const [writingScore, setWritingScore] = useState("");
	const [speakingScore, setSpeakingScore] = useState("");
	const [listeningScore, setListeningScore] = useState("");
	const [testDate, setTestDate] = useState("");
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleChange = (event, newValue) => {
		setExamType(newValue);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (!totalScore.trim()) {
			newErrors.totalScore = "Please enter your total score";
		}

		if (!readingScore.trim()) {
			newErrors.readingScore = "Please enter your reading score";
		}

		if (!writingScore.trim()) {
			newErrors.writingScore = "Please enter your writing score";
		}

		if (!speakingScore.trim()) {
			newErrors.speakingScore = "Please enter your speaking score";
		}

		if (!listeningScore.trim()) {
			newErrors.listeningScore = "Please enter your listening score";
		}

		if (!testDate) {
			newErrors.testDate = "Please enter your test date";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					englishTestInfo: {
						test: examType == 0 ? "IELTS" : examType == 1 ? "TOEFL" : "PTE",
						totalScore,
						reading: readingScore,
						writing: writingScore,
						listening: listeningScore,
						speaking: speakingScore,
						testDate,
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

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, []);

	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{ENGLISH_SCORES_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{ENGLISH_SCORES_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={examType}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="IELTS" {...a11yProps(0)} />
						<Tab label="TOEFL" {...a11yProps(1)} />
						<Tab label="PTE" {...a11yProps(2)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={examType} index={0}>
					<ScoreForm
						type={examType}
						maxScore={9}
						maxIndividualScore={9}
						totalScore={totalScore}
						setTotalScore={setTotalScore}
						readingScore={readingScore}
						setReadingScore={setReadingScore}
						writingScore={writingScore}
						setWritingScore={setWritingScore}
						speakingScore={speakingScore}
						setSpeakingScore={setSpeakingScore}
						listeningScore={listeningScore}
						setListeningScore={setListeningScore}
						testDate={testDate}
						setTestDate={setTestDate}
						errors={errors}
					/>
				</CustomTabPanel>
				<CustomTabPanel value={examType} index={1}>
					<ScoreForm
						type={examType}
						maxScore={120}
						maxIndividualScore={30}
						totalScore={totalScore}
						setTotalScore={setTotalScore}
						readingScore={readingScore}
						setReadingScore={setReadingScore}
						writingScore={writingScore}
						setWritingScore={setWritingScore}
						speakingScore={speakingScore}
						setSpeakingScore={setSpeakingScore}
						listeningScore={listeningScore}
						setListeningScore={setListeningScore}
						testDate={testDate}
						setTestDate={setTestDate}
						errors={errors}
					/>
				</CustomTabPanel>
				<CustomTabPanel value={examType} index={2}>
					<ScoreForm
						type={examType}
						maxScore={90}
						maxIndividualScore={90}
						totalScore={totalScore}
						setTotalScore={setTotalScore}
						readingScore={readingScore}
						setReadingScore={setReadingScore}
						writingScore={writingScore}
						setWritingScore={setWritingScore}
						speakingScore={speakingScore}
						setSpeakingScore={setSpeakingScore}
						listeningScore={listeningScore}
						setListeningScore={setListeningScore}
						testDate={testDate}
						setTestDate={setTestDate}
						errors={errors}
					/>
				</CustomTabPanel>
			</Stack>
			<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
				<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
			</Stack>
		</>
	);
}

export default EnglishScores;
