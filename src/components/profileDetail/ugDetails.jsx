/** @format */

import {
	Stack,
	Typography,
	Divider,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import {
	BACKLOGS,
	BACKLOGS_EXAMPLE,
	COLLEGE_EXAMPLE,
	COLLEGE_NAME,
	COURSE_EXAMPLE,
	COURSE_NAME,
	GRAD_EXAMPLE,
	GRAD_YEAR,
	SCORE,
	SCORE_EXAMPLE,
	UG_DETAILS_SUBTITLE,
	UG_DETAILS_TITLE,
} from "../../helpers/constants";
import SearchIcon from "@mui/icons-material/Search";
import { ScoreTypes } from "../../data/scoreTypes";

function UGDetails() {
	const [scoreType, setScoreType] = useState("");

	const handleScoreTypeChange = (event) => {
		setScoreType(event.target.value);
	};
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{UG_DETAILS_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{UG_DETAILS_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack sx={{ gap: "2rem" }}>
				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: "2rem",
					}}
				>
					<TextField
						variant="outlined"
						label={COLLEGE_NAME}
						placeholder={COLLEGE_EXAMPLE}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={COURSE_NAME}
						placeholder={COURSE_EXAMPLE}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						sx={{ width: "100%" }}
					/>
				</Stack>
				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: "2rem",
					}}
				>
					<TextField
						id="score"
						variant="outlined"
						label={SCORE}
						placeholder={SCORE_EXAMPLE}
						InputProps={{
							endAdornment: (
								<Select
									variant="standard"
									margin="normal"
									labelId="score"
									id="score_type"
									value={scoreType}
									onChange={handleScoreTypeChange}
									sx={{ width: "30%" }}
								>
									{ScoreTypes.map((type) => (
										<MenuItem key={type.id} value={type.type}>
											{type.type}
										</MenuItem>
									))}
								</Select>
							),
						}}
						sx={{ width: "100%" }}
					/>
					<TextField
						variant="outlined"
						label={GRAD_YEAR}
						placeholder={GRAD_EXAMPLE}
						sx={{ width: "100%" }}
					/>
				</Stack>
				<Stack sx={{ marginRight: "2rem" }}>
					<TextField
						variant="outlined"
						label={BACKLOGS}
						placeholder={BACKLOGS_EXAMPLE}
						sx={{ width: "50%" }}
					/>
				</Stack>
			</Stack>
		</>
	);
}

export default UGDetails;
