/** @format */

import React, { useState, useEffect } from "react";
import {
	COUNTRIES,
	INTAKE_DETAILS_SUBTITLE,
	INTAKE_DETAILS_TITLE,
	START_INTAKE,
	START_YEAR,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import {
	Stack,
	Typography,
	Divider,
	FormLabel,
	Radio,
	FormControlLabel,
	RadioGroup,
	OutlinedInput,
	Box,
	Chip,
	Select,
	MenuItem,
} from "@mui/material";
import FallImage from "../../assets/fall.png";
import SpringImage from "../../assets/spring.png";
import SummerImage from "../../assets/summer.png";
import WinterImage from "../../assets/winter.png";
import { Countries } from "../../data/countries";
import PrimaryButton from "../common/primaryButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import axios from "axios";

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

function Year({ year }) {
	return (
		<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
			<Typography variant="subtitle1">Beginning</Typography>
			<Typography variant="h6" sx={{ fontWeight: 500 }}>
				{year}
			</Typography>
		</Stack>
	);
}

function Intake({ image, season }) {
	return (
		<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
			<img src={image} alt="season" style={{ height: "60px", width: "60px" }} />
			<Typography variant="h6" sx={{ fontWeight: 500 }}>
				{season}
			</Typography>
		</Stack>
	);
}
function getStyles(name, personName) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? 300 : 500,
	};
}

function IntakeDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [studyYear, setStudyYear] = useState("2025");
	const [studyIntake, setStudyIntake] = useState("fall");
	const [countries, setCountries] = useState([]);
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
		setCountries(typeof value === "string" ? value.split(",") : value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};

		if (countries.length == 0) {
			newErrors.countries = "Please select atleast 1 country";
		}

		if (countries.length > 3) {
			newErrors.countries = "Select upto 2 countries";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					plannedYear: studyYear,
					plannedIntake: studyIntake,
					plannedCountries: countries,
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
					{INTAKE_DETAILS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{INTAKE_DETAILS_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<form>
					<Stack sx={{ gap: "3rem" }}>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="start-year"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{START_YEAR}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="start-year"
								defaultValue="2025"
								name="radio-buttons-group"
								value={studyYear}
								onChange={(e) => setStudyYear(e.target.value)}
								sx={{
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
									paddingLeft: "0.8rem",
								}}
							>
								<FormControlLabel
									value="2024"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Year year={2024} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyYear == "2024" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="2025"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Year year={2025} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyYear == "2025" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="2026"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Year year={2026} />}
									sx={{
										flex: 0.5,
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyYear == "2026" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
							</RadioGroup>
						</Stack>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="start-intake"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{START_INTAKE}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="start-intake"
								defaultValue="fall"
								name="radio-buttons-group"
								value={studyIntake}
								onChange={(e) => setStudyIntake(e.target.value)}
								sx={{
									display: "grid",
									gridTemplateColumns: "repeat(2, 1fr)",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
									paddingLeft: "0.8rem",
								}}
							>
								<FormControlLabel
									value="fall"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Fall"} image={FallImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyIntake == "fall" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="spring"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Spring"} image={SpringImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyIntake == "spring" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="summer"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Summer"} image={SummerImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyIntake == "summer" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
								<FormControlLabel
									value="winter"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Winter"} image={WinterImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
										backgroundColor:
											studyIntake == "winter" ? "#F1F4F7" : "#FFFFFF",
									}}
								/>
							</RadioGroup>
						</Stack>

						<Stack>
							<FormLabel
								id="interested-country"
								sx={{ fontSize: "20px", fontWeight: 600, marginBottom: "1rem" }}
							>
								{COUNTRIES}
							</FormLabel>
							<Select
								labelId="interested-country"
								id="demo-multiple-chip"
								multiple
								value={countries}
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
							>
								{Countries.map((country) => (
									<MenuItem
										key={country.id}
										value={country.value}
										style={getStyles(country.value, countries)}
										sx={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
										}}
									>
										<img
											src={country.flag}
											alt={country.value}
											style={{ height: "30px", width: "30px" }}
										/>
										<Typography variant="subtitle1">{country.value}</Typography>
									</MenuItem>
								))}
							</Select>
							{errors.countries && (
								<Typography variant="caption" sx={{ color: "#d32f2f" }}>
									{errors.countries}
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

export default IntakeDetails;
