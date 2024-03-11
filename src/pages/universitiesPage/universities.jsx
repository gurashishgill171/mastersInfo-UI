/** @format */

import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SelectFilter from "../../components/filter/filter";
import SearchBar from "../../components/searchBar/search";
import University from "../../components/universityCard/university";
import { Countries } from "../../data/countries";
import { Courses } from "../../data/courses";
import { uinversityData } from "../../data/sample_university_info";

function Universities() {
	return (
		<Container maxWidth="100%" sx={{ padding: "25px" }}>
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Stack>
					<Typography variant="h4">
						Explore: Best Colleges & Universities to Study Abroad
					</Typography>
					<Typography variant="h6">
						All you need to know about university fees, courses, deadlines,
						scholarships and more.
					</Typography>
				</Stack>
				<SearchBar />
			</Stack>
			<Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
			<Stack direction={"row"} alignItems={"center"}>
				<SelectFilter list={Countries} title={"Country"} />
				<SelectFilter list={Courses} title={"Courses"} />
			</Stack>
			<Grid container spacing={5} sx={{ marginTop: "35px" }}>
				{uinversityData.map((uni) => (
					<Grid item>
						<University data={uni} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default Universities;
