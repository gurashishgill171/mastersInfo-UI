/** @format */

import { Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { MenuItems } from "../../data/menu";
import SearchBar from "../searchBar/search";

function Navbar() {
	const navigate = useNavigate();
	return (
		<Stack
			sx={{
				height: "80px",
				padding: "2rem",
				backgroundColor: "#FFFFFF",
				alignItems: "center",
				justifyContent: "center",
				boxShadow:
					"rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
				position: "sticky",
				top: 0,
				left: 0,
				zIndex: 999,
			}}
		>
			<Stack
				sx={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					maxWidth: "1280px",
					width: "100%",
				}}
			>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "1rem" }}>
					<img
						src={Logo}
						alt="logo"
						style={{ height: "100%", width: "120px" }}
						onClick={() => navigate("/feeds")}
					/>
					<SearchBar />
				</Stack>
				<Stack sx={{ flexDirection: "row", alignItems: "center", gap: "3rem" }}>
					{MenuItems.map((menu) => (
						<Stack
							sx={{
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
							}}
							onClick={() => navigate(menu.link)}
						>
							{menu.icon}
							<Typography variant="body1">{menu.title}</Typography>
						</Stack>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Navbar;
