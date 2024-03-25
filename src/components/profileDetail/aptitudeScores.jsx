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
	APTITUDE_SCORES_SUBTITLE,
	APTITUDE_SCORES_TITLE,
	GRE_AWA,
	GRE_IR,
	GRE_QUANT,
	GRE_VERBAL,
	TESTDATE_TITLE,
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

function GREForm({ maxVerbal, maxQuant, maxAWA }) {
	return (
		<>
			<Stack sx={{ gap: "2rem", marginTop: "3rem" }}>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
					<TextField
						variant="outlined"
						label={GRE_VERBAL}
						placeholder={`/ ${maxVerbal}`}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRE_QUANT}
						placeholder={`/ ${maxQuant}`}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRE_AWA}
						placeholder={`/ ${maxAWA}`}
						sx={{ width: "100%" }}
					/>
				</Stack>
				<Stack>
					<DemoItem label={TESTDATE_TITLE}>
						<DatePicker sx={{ width: "50%" }} />
					</DemoItem>
				</Stack>
			</Stack>
		</>
	);
}

function GMATForm({ maxVerbal, maxQuant, maxAWA, maxIR }) {
	return (
		<>
			<Stack sx={{ gap: "2rem", marginTop: "3rem" }}>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2rem" }}>
					<TextField
						variant="outlined"
						label={GRE_VERBAL}
						placeholder={`/ ${maxVerbal}`}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRE_QUANT}
						placeholder={`/ ${maxQuant}`}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRE_AWA}
						placeholder={`/ ${maxAWA}`}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRE_IR}
						placeholder={`/ ${maxIR}`}
						sx={{ width: "100%" }}
					/>
				</Stack>
				<Stack>
					<DemoItem label={TESTDATE_TITLE}>
						<DatePicker sx={{ width: "50%" }} />
					</DemoItem>
				</Stack>
			</Stack>
		</>
	);
}

function AptitudeScores() {
	const [examType, setExamType] = React.useState(0);

	const handleChange = (event, newValue) => {
		setExamType(newValue);
	};
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
					<GREForm type={examType} />
				</CustomTabPanel>
				<CustomTabPanel value={examType} index={1}>
					<GMATForm type={examType} />
				</CustomTabPanel>
			</Stack>
		</>
	);
}

export default AptitudeScores;
