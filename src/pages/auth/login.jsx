/** @format */

import { Stack, Typography, Tab, Tabs, IconButton } from "@mui/material";
import React, { useState } from "react";
import Cover from "../../components/auth/cover";
import Login from "../../components/auth/login";
import Register from "../../components/auth/register";
import VerifyOTP from "../../components/auth/verifyOTP";
import {
	LOGIN_SUBTITLE,
	LOGIN_TITLE,
	SIGNUP_SUBTITLE,
	SIGNUP_TITLE,
	VERIFYOTP_SUBTITLE,
	VERIFYOTP_TITLE,
} from "../../helpers/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
	const [showOtp, setShowOtp] = useState(false);

	const handleTabChange = (event, newValue) => {
		setTableValue(newValue);
	};

	const handleShowOtp = () => {
		setShowOtp(!showOtp);
	};
	return (
		<Stack sx={{ flexDirection: "row", minHeight: "100vh" }}>
			<Stack sx={{ flex: 0.6 }}>
				<Cover />
			</Stack>
			{!showOtp ? (
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
							<Login handleShowOtp={handleShowOtp} />
						</CustomTabPanel>
						<CustomTabPanel value={tabValue} index={1}>
							<Register handleShowOtp={handleShowOtp} />
						</CustomTabPanel>
					</Stack>
				</Stack>
			) : (
				<Stack sx={{ flex: 0.4, padding: "2.5rem 0rem 5rem 5rem" }}>
					<IconButton
						onClick={handleShowOtp}
						sx={{ width: "max-content", marginBottom: "5rem" }}
					>
						<ArrowBackIcon />
					</IconButton>
					<Stack>
						<Typography variant="h4" sx={{ fontWeight: "600" }}>
							{VERIFYOTP_TITLE}
						</Typography>
						<Typography variant="h6" sx={{ color: "#697386" }}>
							{VERIFYOTP_SUBTITLE}
						</Typography>
					</Stack>
					<Stack
						sx={{
							padding: "2.5rem 5rem 5rem 0rem",
						}}
					>
						<VerifyOTP />
					</Stack>
				</Stack>
			)}
		</Stack>
	);
}

export default LoginPage;
