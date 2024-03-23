/** @format */

import { Stepper, Step, StepLabel } from "@mui/material";
import React, { useState } from "react";
import { Steps } from "../../data/steps";
import { styled } from "@mui/material/styles";
import StepConnector, {
	stepConnectorClasses,
} from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: "calc(-50% + 16px)",
		right: "calc(50% + 16px)",
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "#784af4",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "#784af4",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor:
			theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
	color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
	display: "flex",
	height: 22,
	alignItems: "center",
	...(ownerState.active && {
		color: "#784af4",
	}),
	"& .QontoStepIcon-completedIcon": {
		color: "#784af4",
		zIndex: 1,
		fontSize: 18,
	},
	"& .QontoStepIcon-circle": {
		width: 8,
		height: 8,
		borderRadius: "50%",
		backgroundColor: "currentColor",
	},
}));

function QontoStepIcon(props) {
	const { active, completed, className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	);
}

function DetailsSteps({currentStep}) {
	return (
		<Stepper
			alternativeLabel
			activeStep={currentStep}
			connector={<QontoConnector />}
		>
			{Steps.map((step) => (
				<Step key={step.id}>
					<StepLabel StepIconComponent={QontoStepIcon}>{step.title}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}

export default DetailsSteps;
