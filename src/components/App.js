import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	return (
		<>
		<AppRouter isLoggedIn={isLoggedIn} />
		<footer>&Copy; right leeseungho</footer>
		</>
	);
}

export default App;
