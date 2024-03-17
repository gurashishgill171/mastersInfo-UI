/** @format */

import { Stack, Typography, Tab, Tabs, Box } from "@mui/material";
import React, { useState } from "react";
import Cover from "../../components/auth/cover";
import Login from "../../components/auth/login";
import {
	LOGIN_SUBTITLE,
	LOGIN_TITLE,
	SIGNUP_SUBTITLE,
	SIGNUP_TITLE,
} from "../../helpers/constants";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
			style={{ paddingTop: "2rem" }}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function LoginPage() {
	const [tabValue, setTableValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTableValue(newValue);
	};
	return (
		<Stack sx={{ flexDirection: "row", minHeight: "100vh" }}>
			<Stack sx={{ flex: 0.6 }}>
				<Cover />
			</Stack>
			<Stack sx={{ flex: 0.4, padding: "2.5rem 0rem 5rem 5rem" }}>
				<Stack>
					<Typography variant="h4" sx={{ fontWeight: "600" }}>
						{tabValue === 0 ? LOGIN_TITLE : SIGNUP_TITLE}
					</Typography>
					<Typography variant="h6" sx={{ color: "#697386" }}>
						{tabValue === 0 ? LOGIN_SUBTITLE : SIGNUP_SUBTITLE}
					</Typography>
				</Stack>
				<Stack
					sx={{
						padding: "2.5rem 5rem 5rem 0rem",
					}}
				>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						aria-label="basic tabs example"
					>
						<Tab
							sx={{ fontSize: "18px", textTransform: "inherit" }}
							label="Login"
							{...a11yProps(0)}
						/>
						<Tab
							sx={{ fontSize: "18px", textTransform: "inherit" }}
							label="Sign up"
							{...a11yProps(1)}
						/>
					</Tabs>
					<CustomTabPanel value={tabValue} index={0}>
						<Login />
					</CustomTabPanel>
					<CustomTabPanel value={tabValue} index={1}>
						Sign up
					</CustomTabPanel>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default LoginPage;
