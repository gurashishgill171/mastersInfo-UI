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
	UG_DETAILS_SUBTITLE,
	UG_DETAILS_TITLE,
} from "../../helpers/constants";
import SearchIcon from "@mui/icons-material/Search";
import { ScoreTypes } from "../../data/scoreTypes";
import axios from "axios";

function UGDetails() {
	const [query, setQuery] = useState("");
	const [college, setCollege] = useState("");
	const [course, setCourse] = useState("");
	const [scoreType, setScoreType] = useState("");
	const [score, setScore] = useState("");
	const [gradYear, setGradYear] = useState("");
	const [backlogs, setBacklogs] = useState("");
	const [colleges, setColleges] = useState([]);

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
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						sx={{ width: "100%" }}
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
						id="score"
						variant="outlined"
						label={SCORE}
						placeholder={SCORE_EXAMPLE}
						value={score}
						onChange={(e) => setScore(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Select
										variant="standard"
										margin="normal"
										labelId="score"
										id="score_type"
										value={scoreType}
										onChange={handleScoreTypeChange}
										sx={{ width: "100%" }}
									>
										{ScoreTypes.map((type) => (
											<MenuItem key={type.id} value={type.type}>
												{type.type}
											</MenuItem>
										))}
									</Select>
								</InputAdornment>
							),
						}}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRAD_YEAR}
						placeholder={GRAD_EXAMPLE}
						sx={{ width: "100%" }}
					/>
				</Stack>
				<Stack sx={{ marginRight: "2rem" }}>
					<TextField
						variant="outlined"
						label={BACKLOGS}
						placeholder={BACKLOGS_EXAMPLE}
						sx={{ width: "50%" }}
					/>
				</Stack>
			</Stack>
		</>
	);
}

export default UGDetails;
