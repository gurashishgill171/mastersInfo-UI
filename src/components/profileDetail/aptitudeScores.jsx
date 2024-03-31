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
	APTITUDE_SCORES_SUBTITLE,
	APTITUDE_SCORES_TITLE,
	GRE_AWA,
	GRE_IR,
	GRE_QUANT,
	GRE_VERBAL,
	TESTDATE_TITLE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import axios from "axios";
import PrimaryButton from "../common/primaryButton";

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

function GREForm({
	maxVerbal,
	maxQuant,
	maxAWA,
	verbalScore,
	setVerbalScore,
	quantScore,
	setQuantScore,
	awaScore,
	setAwaScore,
	errors,
	testDate,
	setTestDate,
}) {
	return (
		<>
			<Stack sx={{ gap: "2rem", marginTop: "3rem" }}>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
					<TextField
						variant="outlined"
						label={GRE_VERBAL}
						placeholder={`/ ${maxVerbal}`}
						sx={{ width: "100%" }}
						value={verbalScore}
						onChange={(e) => setVerbalScore(e.target.value)}
						error={Boolean(errors.verbal)}
						helperText={errors.verbal && errors.verbal}
					/>
					<TextField
						variant="outlined"
						label={GRE_QUANT}
						placeholder={`/ ${maxQuant}`}
						sx={{ width: "100%" }}
						value={quantScore}
						onChange={(e) => setQuantScore(e.target.value)}
						error={Boolean(errors.quant)}
						helperText={errors.quant && errors.quant}
					/>
					<TextField
						variant="outlined"
						label={GRE_AWA}
						placeholder={`/ ${maxAWA}`}
						sx={{ width: "100%" }}
						value={awaScore}
						onChange={(e) => setAwaScore(e.target.value)}
						error={Boolean(errors.awa)}
						helperText={errors.awa && errors.awa}
					/>
				</Stack>
				<Stack>
					<DemoItem label={TESTDATE_TITLE}>
						<DatePicker
							sx={{ width: "50%" }}
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

function GMATForm({
	maxVerbal,
	maxQuant,
	maxAWA,
	maxIR,
	verbalScore,
	setVerbalScore,
	quantScore,
	setQuantScore,
	awaScore,
	setAwaScore,
	irScore,
	setIrScore,
	errors,
	testDate,
	setTestDate,
}) {
	return (
		<>
			<Stack sx={{ gap: "2rem", marginTop: "3rem" }}>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
					<TextField
						variant="outlined"
						label={GRE_VERBAL}
						placeholder={`/ ${maxVerbal}`}
						sx={{ width: "100%" }}
						value={verbalScore}
						onChange={(e) => setVerbalScore(e.target.value)}
						error={Boolean(errors.verbal)}
						helperText={errors.verbal && errors.verbal}
					/>
					<TextField
						variant="outlined"
						label={GRE_QUANT}
						placeholder={`/ ${maxQuant}`}
						sx={{ width: "100%" }}
						value={quantScore}
						onChange={(e) => setQuantScore(e.target.value)}
						error={Boolean(errors.quant)}
						helperText={errors.quant && errors.quant}
					/>
					<TextField
						variant="outlined"
						label={GRE_AWA}
						placeholder={`/ ${maxAWA}`}
						sx={{ width: "100%" }}
						value={awaScore}
						onChange={(e) => setAwaScore(e.target.value)}
						error={Boolean(errors.awa)}
						helperText={errors.awa && errors.awa}
					/>
					<TextField
						variant="outlined"
						label={GRE_IR}
						placeholder={`/ ${maxIR}`}
						sx={{ width: "100%" }}
						value={irScore}
						onChange={(e) => setIrScore(e.target.value)}
						error={Boolean(errors.ir)}
						helperText={errors.ir && errors.ir}
					/>
				</Stack>
				<Stack>
					<DemoItem label={TESTDATE_TITLE}>
						<DatePicker
							sx={{ width: "50%" }}
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

function AptitudeScores() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [examType, setExamType] = useState(0);
	const [verbalScore, setVerbalScore] = useState("");
	const [quantScore, setQuantScore] = useState("");
	const [awaScore, setAwaScore] = useState("");
	const [irScore, setIrScore] = useState("");
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
		if (!verbalScore.trim()) {
			newErrors.verbal = "Please enter your verbal score";
		}

		if (!quantScore.trim()) {
			newErrors.quant = "Please enter your quant score";
		}

		if (!awaScore.trim()) {
			newErrors.awa = "Please enter your AWA score";
		}

		if (examType == 1) {
			if (!irScore.trim()) {
				newErrors.ir = "Please enter your IR score";
			}
		}

		if (!testDate) {
			newErrors.testDate = "Please enter your test date";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					aptitudeTestInfo: {
						test: examType == 0 ? "GRE" : "GMAT",
						verbal: verbalScore,
						quants: quantScore,
						awa: awaScore,
						ir: examType == 0 ? -1 : irScore,
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
					{APTITUDE_SCORES_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{APTITUDE_SCORES_SUBTITLE}
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
						<Tab label="GRE" {...a11yProps(0)} />
						<Tab label="GMAT" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={examType} index={0}>
					<GREForm
						type={examType}
						maxVerbal={170}
						maxQuant={170}
						maxAWA={6}
						verbalScore={verbalScore}
						setVerbalScore={setVerbalScore}
						quantScore={quantScore}
						setQuantScore={setQuantScore}
						awaScore={awaScore}
						setAwaScore={setAwaScore}
						errors={errors}
						testDate={testDate}
						setTestDate={setTestDate}
					/>
				</CustomTabPanel>
				<CustomTabPanel value={examType} index={1}>
					<GMATForm
						type={examType}
						maxVerbal={60}
						maxQuant={60}
						maxAWA={6}
						maxIR={8}
						verbalScore={verbalScore}
						setVerbalScore={setVerbalScore}
						quantScore={quantScore}
						setQuantScore={setQuantScore}
						awaScore={awaScore}
						setAwaScore={setAwaScore}
						irScore={irScore}
						setIrScore={setIrScore}
						errors={errors}
						testDate={testDate}
						setTestDate={setTestDate}
					/>
				</CustomTabPanel>
				<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
					<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
				</Stack>
			</Stack>
		</>
	);
}

export default AptitudeScores;
