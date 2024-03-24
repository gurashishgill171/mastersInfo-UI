/** @format */

import { Stack } from "@mui/material";
import React, { useState } from "react";
import PrimaryButton from "../../components/common/primaryButton";
import BasicDetails from "../../components/profileDetail/basicDetails";
import CurrentStage from "../../components/profileDetail/currentStage";
import EnglishScores from "../../components/profileDetail/englishScores";
import IntakeDetails from "../../components/profileDetail/intakeDetails";
import DetailsSteps from "../../components/profileDetail/stepper";
import UGDetails from "../../components/profileDetail/ugDetails";
import { NEXT_BUTTON_TITLE } from "../../helpers/constants";

const renderForm = (currentStep) => {
	switch (currentStep) {
		case 0:
			return <BasicDetails />;
		case 1:
			return <IntakeDetails />;
		case 2:
			return <CurrentStage />;
		case 3:
			return <UGDetails />;
		case 4:
			return <EnglishScores />;
		default:
			break;
	}
};

function ProfileDetails() {
	const [currentStep, setCurrentStep] = useState(0);

	const incrementStep = () => {
		setCurrentStep(currentStep + 1);
	};
	return (
		<Stack sx={{ minHeight: "100vh" }}>
			<DetailsSteps currentStep={currentStep} />
			<Stack
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Stack
					sx={{
						maxWidth: "1240px",
						marginTop: "5rem",
						marginBottom: "5rem",
						width: "100%",
						height: "100%",
						gap: "2rem",
					}}
				>
					{renderForm(currentStep)}
					<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
						<PrimaryButton
							title={NEXT_BUTTON_TITLE}
							handleClick={incrementStep}
						/>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default ProfileDetails;
