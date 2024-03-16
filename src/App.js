/** @format */

import "./App.css";
import Universities from "./pages/universitiesPage/universities";
import Profile from "./pages/profile/profile";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/auth/login";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/profile" element={<Profile />} />
				<Route path="/universities" element={<Universities />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Router>
	);
}

export default App;
