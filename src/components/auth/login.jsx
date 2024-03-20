/** @format */

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { MOBILE_INPUT } from "../../helpers/constants";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import PrimaryButton from "../common/primaryButton";

function Login({ handleShowOtp }) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState(false);

	const handlePhoneNumber = (newValue) => {
		setPhoneNumber(newValue);
		if (matchIsValidTel(newValue)) setPhoneNumberError(false);
		else setPhoneNumberError(true);
	};

	const handleRequestOtp = () => {
		handleShowOtp();
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
			/>
		</form>
	);
}

export default Login;