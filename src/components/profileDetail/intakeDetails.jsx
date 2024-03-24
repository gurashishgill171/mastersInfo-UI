/** @format */

import React, { useState } from "react";
import {
	COUNTRIES,
	INTAKE_DETAILS_SUBTITLE,
	INTAKE_DETAILS_TITLE,
	START_INTAKE,
	START_YEAR,
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
	const [countries, setCountries] = useState([]);
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setCountries(typeof value === "string" ? value.split(",") : value);
	};
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
								defaultValue="female"
								name="radio-buttons-group"
								sx={{
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
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
								defaultValue="female"
								name="radio-buttons-group"
								sx={{
									display: "grid",
									gridTemplateColumns: "repeat(2, 1fr)",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "20px",
								}}
							>
								<FormControlLabel
									value="bachelors"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Fall"} image={FallImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Spring"} image={SpringImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Summer"} image={SummerImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
								<FormControlLabel
									value="masters"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={<Intake season={"Winter"} image={WinterImage} />}
									sx={{
										border: "1px solid #000000",
										borderRadius: "12px",
										padding: "10px 5px 10px 5px",
										justifyContent: "center",
									}}
								/>
							</RadioGroup>
						</Stack>

						<Stack sx={{ gap: "1rem" }}>
							<FormLabel
								id="course-interest"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{COUNTRIES}
							</FormLabel>
							<Select
								labelId="countries-interest"
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
						</Stack>
					</Stack>
				</form>
			</Stack>
		</>
	);
}

export default IntakeDetails;
