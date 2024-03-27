/** @format */

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { MOBILE_INPUT } from "../../helpers/constants";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import PrimaryButton from "../common/primaryButton";
import axios from "axios";
import ErrorAlert from "../common/error";

function Login({ handleShowOtp }) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState(false);
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handlePhoneNumber = (newValue) => {
		setPhoneNumber(newValue);
		if (matchIsValidTel(newValue)) setPhoneNumberError(false);
		else setPhoneNumberError(true);
	};

	const handleRequestOtp = async () => {
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:6001/auth/login", {
				phoneNumber,
			});
			handleShowOtp();
		} catch (error) {
			setErrorPopup(true);
			setApiError(error.response.data.error);
		}
		setLoading(false);
	};

	return (
		<form>
			<Typography
				variant="subtitle1"
				sx={{ fontWeight: "600", marginBottom: "0.5rem" }}
			>
				{MOBILE_INPUT}
			</Typography>
			<MuiTelInput
				defaultCountry="IN"
				fullWidth
				variant="outlined"
				value={phoneNumber}
				onChange={handlePhoneNumber}
				sx={{ marginBottom: "2rem" }}
			/>
			<PrimaryButton
				title={"Request OTP"}
				isDisabled={phoneNumberError}
				handleClick={handleRequestOtp}
				isLoading={loading}
			/>
			{errorPopup && (
				<ErrorAlert
					open={errorPopup}
					handleClose={handleCloseErrorAlert}
					message={apiError}
				/>
			)}
		</form>
	);
}

export default Login;
