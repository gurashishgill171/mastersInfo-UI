/** @format */

import {
	Stack,
	Typography,
	Divider,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	Box,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
	BACKLOGS,
	BACKLOGS_EXAMPLE,
	COLLEGE_EXAMPLE,
	COLLEGE_NAME,
	COURSE_EXAMPLE,
	COURSE_NAME,
	GRAD_EXAMPLE,
	GRAD_YEAR,
	SCORE,
	SCORE_EXAMPLE,
	SCORE_TYPE,
	UG_DETAILS_SUBTITLE,
	UG_DETAILS_TITLE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import SearchIcon from "@mui/icons-material/Search";
import { ScoreTypes } from "../../data/scoreTypes";
import axios from "axios";
import PrimaryButton from "../common/primaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

function UGDetails() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [query, setQuery] = useState("");
	const [college, setCollege] = useState("");
	const [course, setCourse] = useState("");
	const [scoreType, setScoreType] = useState("");
	const [score, setScore] = useState("");
	const [gradYear, setGradYear] = useState("");
	const [backlogs, setBacklogs] = useState(0);
	const [colleges, setColleges] = useState([]);
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const fetchColleges = async () => {
		try {
			const response = await axios.get(
				`http://universities.hipolabs.com/search?name=${query}`
			);
			setColleges(response.data.slice(0, 10));
		} catch (error) {
			console.error("Error fetching colleges:", error);
		}
	};

	const handleScoreTypeChange = (event) => {
		setScoreType(event.target.value);
	};

	const handleSelectCollege = (college) => {
		setCollege(college.name);
		setQuery("");
		setColleges([]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (!college.trim()) {
			newErrors.college = "Please select your college";
		}

		if (!course.trim()) {
			newErrors.course = "Please enter your course name";
		}

		if (!scoreType.trim()) {
			newErrors.scoreType = "Please select your performance matrix";
		}

		if (!score.trim()) {
			newErrors.score = "Please enter your score";
		}

		if (!gradYear.trim()) {
			newErrors.gradYear = "Please enter your graduation year";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					ugInfo: {
						college,
						course,
						score: score + scoreType,
						graduationYear: gradYear,
						backlogs,
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
		const timerId = setTimeout(() => {
			if (query) {
				fetchColleges();
			} else {
				setColleges([]);
			}
		}, 500);
		return () => clearTimeout(timerId);
	}, [query]);
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{UG_DETAILS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{UG_DETAILS_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack sx={{ gap: "2rem" }}>
				<Stack
					sx={{
						flexDirection: "row",
						justifyContent: "center",
						gap: "2rem",
					}}
				>
					<Box width={"100%"}>
						<TextField
							variant="outlined"
							label={COLLEGE_NAME}
							placeholder={COLLEGE_EXAMPLE}
							value={college ? college : query}
							onChange={(e) => setQuery(e.target.value)}
							error={Boolean(errors.college)}
							helperText={errors.college && errors.college}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
							sx={{ width: "100%" }}
						/>
						<List>
							{colleges.map((college, index) => (
								<ListItem
									key={index}
									onClick={() => handleSelectCollege(college)}
									button
								>
									<ListItemText primary={college.name} />{" "}
								</ListItem>
							))}
						</List>
					</Box>
					<TextField
						variant="outlined"
						label={COURSE_NAME}
						placeholder={COURSE_EXAMPLE}
						value={course}
						onChange={(e) => setCourse(e.target.value)}
						sx={{ width: "100%" }}
						error={Boolean(errors.course)}
						helperText={errors.course && errors.course}
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
					<Stack sx={{ flexDirection: "row", width: "100%" }}>
						<Select
							id="score_type"
							labelId="demo-simple-select-helper-label"
							label={SCORE_TYPE}
							// value={scoreType}
							onChange={handleScoreTypeChange}
							sx={{ width: "100%" }}
							defaultValue={"CGPA"}
						>
							{ScoreTypes.map((type) => (
								<MenuItem key={type.id} value={type.type}>
									{type.type}
								</MenuItem>
							))}
						</Select>
						<TextField
							fullWidth
							id="score"
							variant="outlined"
							label={SCORE}
							placeholder={SCORE_EXAMPLE}
							value={score}
							onChange={(e) => setScore(e.target.value)}
							error={Boolean(errors.score)}
							helperText={errors.score && errors.score}
						/>
					</Stack>
					<TextField
						variant="outlined"
						label={GRAD_YEAR}
						placeholder={GRAD_EXAMPLE}
						value={gradYear}
						onChange={(e) => setGradYear(e.target.value)}
						sx={{ width: "100%" }}
					/>
				</Stack>
				<Stack sx={{ marginRight: "2rem" }}>
					<TextField
						variant="outlined"
						label={BACKLOGS}
						placeholder={BACKLOGS_EXAMPLE}
						value={backlogs}
						onChange={(e) => setBacklogs(e.target.value)}
						sx={{ width: "50%" }}
					/>
				</Stack>
				<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
					<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
				</Stack>
			</Stack>
		</>
	);
}

export default UGDetails;
