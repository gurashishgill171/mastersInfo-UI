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
		updatePost: (state, action) => {
			console.log(action);
			const updatedPostIndex = state.posts.findIndex(
				(post) => post._id === action.payload._id
			);
			if (updatedPostIndex !== -1) {
				state.posts[updatedPostIndex] = action.payload;
			}
		},
	},
});

export const { setPosts, addPost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
