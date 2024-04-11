/** @format */

import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AptitudeScores from "../../components/profileDetail/aptitudeScores";
import BasicDetails from "../../components/profileDetail/basicDetails";
import Completed from "../../components/profileDetail/completed";
import CurrentStage from "../../components/profileDetail/currentStage";
import EnglishScores from "../../components/profileDetail/englishScores";
import Experience from "../../components/profileDetail/experience";
import IntakeDetails from "../../components/profileDetail/intakeDetails";
import ProjectDetails from "../../components/profileDetail/projectDetails";
import ResearchDetails from "../../components/profileDetail/researchDetails";
import SkillDetails from "../../components/profileDetail/skillDetails";
import DetailsSteps from "../../components/profileDetail/stepper";
import UGDetails from "../../components/profileDetail/ugDetails";

function ProfileDetails() {
	const navigate = useNavigate();
	// const [currentStep, setCurrentStep] = useState(0);
	const userInfo = useSelector((state) => state.authReducer.userInfo);

	// const incrementStep = () => {
	// 	setCurrentStep(currentStep + 1);
	// };

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
			case 5:
				return <AptitudeScores />;
			case 6:
				return <SkillDetails />;
			case 7:
				return <Experience />;
			case 8:
				return <ProjectDetails />;
			case 9:
				return <ResearchDetails />;
			case 10:
				return <Completed />;
			default:
				break;
		}
	};

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, []);

	return (
		<Stack sx={{ minHeight: "100vh" }}>
			<DetailsSteps currentStep={userInfo && userInfo.currentStep} />
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
					{renderForm(userInfo && userInfo.currentStep)}
				</Stack>
			</Stack>
		</Stack>
	);
}

export default ProfileDetails;
