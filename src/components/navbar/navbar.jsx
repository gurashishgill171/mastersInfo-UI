/** @format */

import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { MenuItems, MenuItems2 } from "../../data/menu";

function Navbar() {
	return (
		<Stack
			sx={{
				backgroundColor: "#FFFFFF",
				width: "100%",
				height: "3.5rem",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Stack
				sx={{
					flexDirection: "row",
					alignItems: "center",
					gap: "2rem",
					height: "100%",
				}}
			>
				{MenuItems.map((menu) => (
					<Link key={menu.id} to={menu.link}>
						<Typography>{menu.title}</Typography>
					</Link>
				))}
			</Stack>
			<Stack
				sx={{
					flexDirection: "row",
					alignItems: "center",
					gap: "2rem",
					height: "100%",
				}}
			>
				{MenuItems2.map((menu) => (
					<Box key={menu.id}>{menu.component}</Box>
				))}
			</Stack>
		</Stack>
	);
}

export default Navbar;
