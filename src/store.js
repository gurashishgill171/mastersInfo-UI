/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";

const store = configureStore({
	reducer: { authReducer, postReducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: true,
});

export default store;
