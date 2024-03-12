/** @format */

import "./App.css";
import Universities from "./pages/universitiesPage/universities";
import Profile from "./pages/profile/profile";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/profile" element={<Profile />}/>
				<Route path="/universities" element={<Universities />}/>
			</Routes>
		</Router>
	);
}

export default App;
