/** @format */

import {
	Divider,
	Stack,
	TextField,
	Typography,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	OutlinedInput,
	Box,
	Chip,
	MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	BASIC_DETAILS_SUBTITLE,
	BASIC_DETAILS_TITLE,
	COURSE_INTEREST,
	DEGREE_PLAN,
	EMAIL,
	EMAIL_EXAMPLE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import bachelorsImage from "../../assets/bachelors.png";
import mastersImage from "../../assets/masters.png";
import { Courses } from "../../data/courses";
import PrimaryButton from "../common/primaryButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../common/error";
import { setCredentials } from "../../slices/authSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function DegreeName({ image, name }) {
	return (
		<Stack
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			<img
				src={image}
				alt="degree"
				style={{ height: "60px", width: "60px", borderRadius: "50%" }}
			/>
			<Typography variant="subtitle1">{name}</Typography>
		</Stack>
	);
}

function getStyles(name, personName) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? 300 : 500,
	};
}

function BasicDetails() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [email, setEmail] = useState("");
	const [degree, setDegree] = useState("masters");
	const [interestedCourses, setInterestedCourses] = useState([]);
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setInterestedCourses(typeof value === "string" ? value.split(",") : value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (!email.trim()) {
			newErrors.email = "Email is required";
		}

		if (interestedCourses.length == 0) {
			newErrors.courses = "Please select atleast 1 course";
		}

		if (interestedCourses.length > 3) {
			newErrors.courses = "Select upto 3 courses";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					email: email,
					isMasters: degree == "masters" ? true : false,
					interestedCourses: interestedCourses,
					currentStep: userInfo && userInfo.currentStep + 1,
				});
				dispatch(setCredentials(res.data.user));
			} catch (error) {
				setErrorPopup(true);
				setApiError(error.response.data.error);
			}
		} else {
			setErrors(newErrors);
		}
	};

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, []);

	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{BASIC_DETAILS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{BASIC_DETAILS_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<form>
					<Stack sx={{ gap: "3rem" }}>
						<TextField
							variant="outlined"
							label={EMAIL}
							placeholder={EMAIL_EXAMPLE}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={Boolean(errors.email)}
							helperText={errors.email && errors.email}
						/>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="degree-plan"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{DEGREE_PLAN}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="degree-plan"
								defaultValue="female"
								name="degree-plan-group"
								value={degree}
								onChange={(e) => setDegree(e.target.value)}
								sx={{
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
									paddingLeft: "0.8rem",
								}}
							>
								<FormControlLabel
									value="bachelors"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<DegreeName name={"Bachelor's"} image={bachelorsImage} />
									}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											degree == "bachelors" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<DegreeName name={"Master's"} image={mastersImage} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											degree == "masters" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
							</RadioGroup>
						</Stack>
						<Stack>
							<FormLabel
								id="course-interest"
								sx={{ fontSize: "20px", fontWeight: 600, marginBottom: "1rem" }}
							>
								{COURSE_INTEREST}
							</FormLabel>
							<Select
								labelId="course-interest"
								id="course-interest-select"
								multiple
								value={interestedCourses}
								onChange={handleChange}
								input={<OutlinedInput id="select-multiple-chip" />}
								renderValue={(selected) => (
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}
								error={Boolean(errors.courses)}
							>
								{Courses.map((course) => (
									<MenuItem
										key={course.id}
										value={course.value}
										style={getStyles(course.value, interestedCourses)}
									>
										{course.value}
									</MenuItem>
								))}
							</Select>
							{errors.courses && (
								<Typography variant="caption" sx={{ color: "#d32f2f" }}>
									{errors.courses}
								</Typography>
							)}
						</Stack>
					</Stack>
				</form>
			</Stack>
			<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
				<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
			</Stack>
		</>
	);
}

export default BasicDetails;
