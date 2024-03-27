/** @format */

import { Stack } from "@mui/material";
import React, { useReducer, useState } from "react";
import { VERIFYOTP_BUTTON_TITLE } from "../../helpers/constants";
import { MuiOtpInput } from "mui-one-time-password-input";
import PrimaryButton from "../common/primaryButton";
import axios from "axios";
import ErrorAlert from "../common/error";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

function VerifyOTP({ phoneNumber }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [otp, setOtp] = useState("");
	const [isOtpCorrect, setIsOtpCorrect] = useState(false);
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleChange = (newValue) => {
		setOtp(newValue);
		if (newValue.length != 5) {
			setIsOtpCorrect(false);
		} else {
			setIsOtpCorrect(true);
		}
	};

	const handleVerifyOTP = async () => {
		try {
			const res = await axios.post("http://localhost:6001/auth/verifyOTP", {
				otp,
			});
			dispatch(setCredentials(res.data));
			navigate("/profile/details");
		} catch (error) {
			setErrorPopup(true);
			setApiError(error.response.data.error);
		}
	};
	return (
		<Stack>
			<Stack gap={2}>
				<MuiOtpInput value={otp} onChange={handleChange} length={5} />
				<PrimaryButton
					title={VERIFYOTP_BUTTON_TITLE}
					handleClick={handleVerifyOTP}
					isDisabled={!isOtpCorrect}
				/>
				{errorPopup && (
					<ErrorAlert
						open={errorPopup}
						handleClose={handleCloseErrorAlert}
						message={apiError}
					/>
				)}
			</Stack>
		</Stack>
	);
}

export default VerifyOTP;
