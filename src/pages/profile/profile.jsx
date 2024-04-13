/** @format */

import { Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UserImage from "../../assets/sampleUser.jpeg";
import BackgroundImage from "../../assets/background.jpg";
import SendIcon from "@mui/icons-material/Send";
import PrimaryButton from "../../components/common/primaryButton";

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
	const userInfo = useSelector((state) => state.authReducer.userInfo);
	return (
		<Stack
			sx={{
				flexDirection: "row",
				alignItems: "center",
				padding: "2rem",
				gap: "2rem",
				backgroundColor: "#F6F5F3",
			}}
		>
			<Stack sx={{ flex: 0.6 }}>
				<Stack
					sx={{
						borderRadius: "8px",
						backgroundColor: "#FFFFFF",
						boxShadow:
							"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
					}}
				>
					<Stack
						sx={{
							height: "320px",
							backgroundImage: `url(${BackgroundImage})`,
							backgroundRepeat: "no-repeat",
							borderBottomLeftRadius: "8px",
							borderBottomRightRadius: "8px",
						}}
					></Stack>
					<Stack
						sx={{
							position: "absolute",
							top: "320px",
							left: "120px",
						}}
					>
						<img
							src={UserImage}
							alt="user"
							style={{
								height: "200px",
								width: "200px",
								objectFit: "cover",
								borderRadius: "50%",
							}}
						/>
					</Stack>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							padding: "2rem",
						}}
					>
						<Stack>
							<Typography variant="h4" sx={{ fontWeight: 600 }}>
								{userInfo.firstName + " " + userInfo.lastName}
							</Typography>
							<Typography variant="body1" sx={{ color: "#6B7280" }}>
								{userInfo.ugInfo.college}
							</Typography>
							<Typography variant="body1" sx={{ color: "#6B7280" }}>
								Gurugram, India
							</Typography>
							<Stack sx={{ marginTop: "1rem" }}>
								<PrimaryButton title={"Send Message"} icon={<SendIcon />} />
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Stack sx={{ flex: 0.4 }}>
				<Stack sx={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Similar profiles
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Profile;
