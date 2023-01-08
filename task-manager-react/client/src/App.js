import { useState, useEffect } from "react";

function App() {
	const [tasks, setTasks] = useState(null);

	useEffect(() => {
		(async () => {
			
		})();
	})

	return (
		<div className="app">
			<h1>Task manager app</h1>
			<div className="data">

			</div>
		</div>
	);
}

export default App;
