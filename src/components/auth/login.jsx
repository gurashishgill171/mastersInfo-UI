/** @format */

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { MOBILE_INPUT, MOBILE_NUMBER_ERROR } from "../../helpers/constants";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import PrimaryButton from "../common/primaryButton";

function Login() {
	const [phoneNumber, setPhoneNumber] = useState();
	const [phoneNumberError, setPhoneNumberError] = useState(false);

	const handlePhoneNumber = (newValue) => {
		setPhoneNumber(newValue);
		if (matchIsValidTel(newValue)) setPhoneNumberError(false);
		else setPhoneNumberError(true);
		console.log("Phone Number error", phoneNumberError);
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
				fullWidth
				variant="outlined"
				value={phoneNumber}
				onChange={handlePhoneNumber}
				sx={{ marginBottom: "2rem" }}
			/>
			<PrimaryButton title={"Request OTP"} isDisabled={phoneNumberError} />
		</form>
	);
}

export default Login;
