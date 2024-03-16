/** @format */

import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { MOBILE_INPUT } from "../../helpers/constants";

function Login() {
	const [phoneNumber, setPhoneNumber] = useState();
	return (
		<Stack>
			<Typography>{MOBILE_INPUT}</Typography>
		</Stack>
	);
}

export default Login;
