/** @format */

import { Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";

let USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function University({ data }) {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				width: "32rem",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				borderRadius: "8px",
				padding: "12px",
				cursor: "pointer",
			}}
		>
			<Stack direction={"row"} justifyContent={"space-between"}>
				<Stack>
					<img
						src={data.universityLogo}
						alt={data.name}
						style={{ width: "160px", height: "80px" }}
					/>
					<Typography sx={{ fontWeight: 500 }} variant="h6">
						{data.name}
					</Typography>
					<Typography sx={{ color: "#697386" }} variant="subtitle1">
						{data.location}
					</Typography>
				</Stack>
				<Stack>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"5px"}
						sx={{
							border: "0.8px solid rgb(227 232 238/1)",
							borderRadius: "5px",
							padding: "2px 8px",
						}}
					>
						<StarIcon sx={{ color: "#5B6575" }} />
						<Typography variant="subtitle1" sx={{ color: "#5B6575" }}>
							Wachlist
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Divider />
			<Stack>
				<Stack>
					<Typography sx={{ color: "#5B6575" }} variant="h6">
						Average Tuition Fee
					</Typography>
					<Typography sx={{ color: "#008744" }} variant="h6">
						{USDollar.format(data.averageTuitionFees)}
					</Typography>
				</Stack>
			</Stack>
		</Container>
	);
}

export default University;
