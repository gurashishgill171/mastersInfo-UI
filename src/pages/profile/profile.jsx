/** @format */

import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { UniversityApplications } from "../../data/university_applications";
import Status from "../../components/status/status";
import FavoriteIcon from "@mui/icons-material/Favorite";

function stringToColor(string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

function Profile() {
	return (
		<Container
			maxWidth={"100%"}
			sx={{ display: "flex", flexDirection: "row", gap: "25px" }}
		>
			<Stack sx={{ flex: 0.4 }} gap={5}>
				<Stack
					gap={4}
					sx={{
						boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
						borderRadius: "8px",
						padding: "12px",
						cursor: "pointer",
					}}
				>
					<Stack alignItems={"center"} gap={1}>
						<Avatar {...stringAvatar("Gurashish Singh")} />
						<Typography variant="h4">Gurashish Singh</Typography>
						<Typography variant="h6">@Gurashish_2001</Typography>
					</Stack>
					<Stack gap={5} direction={"row"} justifyContent={"center"}>
						<Stack alignItems={"center"} justifyContent={"center"}>
							<Typography variant="h6">DEGREE</Typography>
							<Stack direction={"row"} alignItems={"center"}>
								<WorkspacePremiumIcon />
								<Typography variant="h6">Masters</Typography>
							</Stack>
						</Stack>
						<Stack alignItems={"center"} justifyContent={"center"}>
							<Typography variant="h6">INTAKE</Typography>
							<Stack direction={"row"} alignItems={"center"}>
								<LocalFloristIcon />
								<Typography variant="h6">Fall 2024</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
				<Stack
					sx={{
						boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
						borderRadius: "8px",
						padding: "12px",
						cursor: "pointer",
					}}
				>
					<Typography variant="h5">University Applications</Typography>
					<Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
					<Stack gap={4}>
						{UniversityApplications.map((application) => (
							<Stack direction={"row"} gap={2}>
								<Stack>
									<img
										src={application.universityLogo}
										alt={application.university}
										style={{ height: "50px", width: "50px" }}
									/>
								</Stack>
								<Stack>
									<Typography variant="h6" sx={{ fontWeight: 600 }}>
										{application.university}
									</Typography>
									<Typography variant="subtitle1" sx={{ color: "#697386" }}>
										{application.course}
									</Typography>
									<Status
										title={"Shortlisted"}
										icon={
											<FavoriteIcon
												sx={{ fontSize: "20px", color: "#D8544E" }}
											/>
										}
										primaryColor="#D8544E"
										secondaryColor="#FBEAED"
									/>
								</Stack>
							</Stack>
						))}
					</Stack>
				</Stack>
			</Stack>
			<Stack sx={{ flex: 0.6, border: "1px solid red" }}>
				<h1>Right side</h1>
			</Stack>
		</Container>
	);
}

export default Profile;
