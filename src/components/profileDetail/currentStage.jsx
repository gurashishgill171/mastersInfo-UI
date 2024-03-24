/** @format */

import {
	Stack,
	Typography,
	Divider,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import React from "react";
import {
	CURRENT_STAGE_SUBTITLE,
	CURRENT_STAGE_TITLE,
	STUDY_PHASE,
} from "../../helpers/constants";

function Stage({ image, title }) {
	return (
		<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
			<img src={image} alt={title} style={{ height: "60px", width: "60px" }} />
			<Typography variant="subtitle1" sx={{ textAlign: "center" }}>
				{title}
			</Typography>
		</Stack>
	);
}

function CurrentStage() {
	return (
		<>
			<Stack>
				<Typography variant="h4" sx={{ fontWeight: "600" }}>
					{CURRENT_STAGE_TITLE}
				</Typography>
				<Typography variant="h6" sx={{ color: "#697386" }}>
					{CURRENT_STAGE_SUBTITLE}
				</Typography>
			</Stack>
			<Divider />
			<Stack>
				<form>
					<Stack sx={{ gap: "3rem" }}>
						<Stack sx={{ width: "100%", gap: "1rem" }}>
							<FormLabel
								id="study-phase"
								sx={{ fontSize: "20px", fontWeight: 600 }}
							>
								{STUDY_PHASE}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="study-phase"
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
									value="2024"
									control={<Radio icon={<></>} checkedIcon={<></>} />}
									label={
										<Stage
											image={""}
											title={
												<>
													Just starting,
													<br />
													research phase
												</>
											}
										/>
									}
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
									label={
										<Stage
											image={""}
											title={
												<>
													Shortlisting universities,
													<br />
													planning tests
												</>
											}
										/>
									}
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
									label={
										<Stage
											image={""}
											title={
												<>
													Tests done,
													<br />
													finalising shortlist
												</>
											}
										/>
									}
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
									label={
										<Stage
											image={""}
											title={
												<>
													Applied to a few
													<br />
													universities
												</>
											}
										/>
									}
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
									label={
										<Stage
											image={""}
											title={
												<>
													Applications done,
													<br />
													awaiting admit
												</>
											}
										/>
									}
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
									label={
										<Stage
											image={""}
											title={
												<>
													Admits
													<br />
													recieved
												</>
											}
										/>
									}
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
					</Stack>
				</form>
			</Stack>
		</>
	);
}

export default CurrentStage;
