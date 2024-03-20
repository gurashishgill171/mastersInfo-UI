/** @format */

import "./App.css";
import Universities from "./pages/universitiesPage/universities";
import Profile from "./pages/profile/profile";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import ProfileDetails from "./pages/profile/details";


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/profile" element={<Profile />} />
				<Route path="/universities" element={<Universities />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile/details" element={<ProfileDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
