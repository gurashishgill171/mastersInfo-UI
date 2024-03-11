/** @format */

import React from "react";
import {
	FormControl,
	InputLabel,
	Select,
	Box,
	MenuItem,
	OutlinedInput,
	Chip,
} from "@mui/material";

function getStyles(name, selected) {
	return {
		fontWeight: selected.indexOf(name) === -1 ? 300 : 500,
	};
}

function SelectFilter({ list, title }) {
	const [selected, setSelected] = React.useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setSelected(typeof value === "string" ? value.split(",") : value);
	};
	return (
		<div>
			<FormControl sx={{ m: 1, width: "280px" }}>
				<InputLabel id="filter" sx={{ fontSize: "18px", fontWeight: 600 }}>
					{title}
				</InputLabel>
				<Select
					labelId="filter"
					id="select-filter"
					multiple
					sx={{ fontSize: "18px" }}
					value={selected}
					onChange={handleChange}
					input={<OutlinedInput id="select-filter" label="filter" />}
					renderValue={(selected) => (
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 0.5,
								fontSize: "18px",
							}}
						>
							{selected.map((value) => (
								<Chip key={value} label={value} sx={{ fontSize: "18px" }} />
							))}
						</Box>
					)}
				>
					{list.map((item) => (
						<MenuItem
							key={item.id}
							value={item.code}
							style={getStyles(item, selected)}
							sx={{ fontSize: "18px" }}
						>
							{item.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default SelectFilter;
