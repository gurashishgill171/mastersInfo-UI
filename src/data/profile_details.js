/** @format */

import educationIcon from "../assets/education.png";
import testIcon from "../assets/test.png";
import skillsIcon from "../assets/skills.png";
import workIcon from "../assets/work.png";
import projectIcon from "../assets/project.png";

export const ProfileDetails = [
	{
		id: 1,
		title: "Educational Details",
		icon: (
			<img
				src={educationIcon}
				alt="education"
				style={{ height: "50px", width: "50px" }}
			/>
		),
	},
	{
		id: 2,
		title: "Test Scores",
		icon: (
			<img
				src={testIcon}
				alt="test"
				style={{ height: "50px", width: "50px" }}
			/>
		),
	},
	{
		id: 3,
		title: "Skills",
		icon: (
			<img
				src={skillsIcon}
				alt="skills"
				style={{ height: "50px", width: "50px" }}
			/>
		),
	},
	{
		id: 4,
		title: "Work Experience",
		icon: (
			<img
				src={workIcon}
				alt="work experience"
				style={{ height: "50px", width: "50px" }}
			/>
		),
	},
	{
		id: 5,
		title: "Projects",
		icon: (
			<img
				src={projectIcon}
				alt="projects"
				style={{ height: "50px", width: "50px" }}
			/>
		),
	},
];
