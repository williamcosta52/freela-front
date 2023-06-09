import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import tokenContext from "./contexts/token.context";

function App() {
	const [mode, setMode] = useState("#ffffff");
	const [userInfo, setUserInfo] = useState("");
	const context = {
		userInfo,
		setUserInfo,
	};
	return (
		<tokenContext.Provider value={context}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/signup"
						element={<Signup mode={mode} setMode={setMode} />}
					/>
					<Route path="/" element={<Signin mode={mode} setMode={setMode} />} />
					<Route
						path="/profile"
						element={<Profile mode={mode} setMode={setMode} />}
					/>
				</Routes>
			</BrowserRouter>
		</tokenContext.Provider>
	);
}

export default App;
