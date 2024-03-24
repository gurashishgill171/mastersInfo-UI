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
import React from "react";
import {
	COMPOSITE_SCORE,
	ENGLISH_SCORES_SUBTITLE,
	ENGLISH_SCORES_TITLE,
	LISTENING,
	READING,
	SPEAKING,
	TESTDATE_EXAMPLE,
	TESTDATE_TITLE,
	WRITING,
} from "../../helpers/constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

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
			{value === index && (
				// <Box sx={{ p: 3 }}>
				// 	<Typography>{children}</Typography>
				// </Box>
				<>{children}</>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function ScoreForm({ type, maxScore, maxIndividualScore }) {
	return (
		<>
			<Stack sx={{ gap: "2rem", marginTop: "3rem" }}>
				<TextField
					variant="outlined"
					label={COMPOSITE_SCORE}
					placeholder={`/ ${maxScore}`}
					sx={{ width: "100%" }}
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
						/>
						<TextField
							variant="outlined"
							label={WRITING}
							placeholder={`/ ${maxIndividualScore}`}
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
							variant="outlined"
							label={LISTENING}
							placeholder={`/ ${maxIndividualScore}`}
							sx={{ width: "100%" }}
						/>
						<TextField
							variant="outlined"
							label={SPEAKING}
							placeholder={`/ ${maxIndividualScore}`}
							sx={{ width: "100%" }}
						/>
					</Stack>
				</Stack>
				<Stack>
					<DemoItem label={TESTDATE_TITLE}>
						<DatePicker />
					</DemoItem>
				</Stack>
			</Stack>
		</>
	);
}

function EnglishScores() {
	const [examType, setExamType] = React.useState(0);

	const handleChange = (event, newValue) => {
		setExamType(newValue);
	};
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
					<ScoreForm type={examType} maxScore={9} maxIndividualScore={9} />
				</CustomTabPanel>
				<CustomTabPanel value={examType} index={1}>
					<ScoreForm type={examType} maxScore={120} maxIndividualScore={30} />
				</CustomTabPanel>
				<CustomTabPanel value={examType} index={2}>
					<ScoreForm type={examType} maxScore={90} maxIndividualScore={90} />
				</CustomTabPanel>
			</Stack>
		</>
	);
}

export default EnglishScores;
