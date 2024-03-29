/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		addPost: (state, action) => {
			state.posts.push(action.payload);
		},
	},
});

export const { setPosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;
