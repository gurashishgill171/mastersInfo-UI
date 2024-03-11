/** @format */

import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
	return (
		<FormControl variant="outlined" sx={{ m: 1, width: "420px" }}>
			<InputLabel htmlFor="search-bar" sx={{ fontSize: "18px" }}>
				Search by university or course name
			</InputLabel>
			<OutlinedInput
				id="search-bar"
				sx={{ fontSize: "18px" }}
				type="text"
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="toggle password visibility" edge="end">
							<SearchIcon sx={{ fontSize: "35px" }} />
						</IconButton>
					</InputAdornment>
				}
				label="Search by university or course name"
			/>
		</FormControl>
	);
}

export default SearchBar;
