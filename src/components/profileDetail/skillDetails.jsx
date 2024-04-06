/** @format */
import {
	Divider,
	Stack,
	Typography,
	TextField,
	IconButton,
	Chip,
} from "@mui/material";
import React, { useState } from "react";
import {
	SKILLS_SUBTITLE,
	SKILLS_TITLE,
	NEXT_BUTTON_TITLE,
} from "../../helpers/constants";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PrimaryButton from "../common/primaryButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCredentials } from "../../slices/authSlice";

function SkillDetails() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	const [inputValue, setInputValue] = useState("");
	const [skills, setSkills] = useState([]);
	const [errors, setErrors] = useState({});
	const [errorPopup, setErrorPopup] = useState(false);
	const [apiError, setApiError] = useState("");

	const handleCloseErrorAlert = () => {
		setErrorPopup(false);
	};

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddSkill = () => {
		const newSkills = inputValue
			.split(",")
			.map((skill) => skill.trim())
			.filter((skill) => skill !== "" && !skills.includes(skill));
		if (newSkills.length > 0) {
			setSkills([...skills, ...newSkills]);
			setInputValue("");
		}
	};

	const handleDeleteSkill = (skillToDelete) => () => {
		setSkills(skills.filter((skill) => skill !== skillToDelete));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (skills.length == 0) {
			newErrors.skills = "Please enter at least 1 skill";
		}

		if (Object.keys(newErrors).length === 0) {
			try {
				const res = await axios.post("http://localhost:6001/auth/save", {
					phoneNumber: userInfo && userInfo.phoneNumber,
					skills,
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
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{SKILLS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{SKILLS_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<TextField
					label="Enter Skills"
					variant="outlined"
					value={inputValue}
					onChange={handleChange}
					fullWidth
					InputProps={{
						endAdornment: (
							<IconButton onClick={handleAddSkill}>
								<AddCircleOutlineIcon />
							</IconButton>
						),
					}}
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							handleAddSkill();
						}
					}}
					error={Boolean(errors.skills)}
					helperText={errors.skills && errors.skills}
				/>
				<Stack direction="row" spacing={1} marginTop={2}>
					{skills.map((skill, index) => (
						<Chip
							key={index}
							label={skill}
							onDelete={handleDeleteSkill(skill)}
							color="primary"
						/>
					))}
				</Stack>
				<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
					<PrimaryButton title={NEXT_BUTTON_TITLE} handleClick={handleSubmit} />
				</Stack>
			</Stack>
		</>
	);
}

export default SkillDetails;
