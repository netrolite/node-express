import axios from "axios";
import { useState, useEffect } from "react";
import Task from "./components/Task";

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		(async () => {
			try {

				const response = await axios.get("/api/v1/tasks");
				setTasks(response.data);

			} catch (err) {
				console.error(err);
			}
		})();
	}, []);
	console.log("render");

	const tasksNodes = tasks.map((task, i) => {
		return (
			<Task
				name={task.name}
				done={task.done}
				id={task._id}
				key={i}
			/>
		)
	});

	return (
		<div className="app">
			<h1>Task manager app</h1>
			<div className="data">
				{tasksNodes}
			</div>
		</div>
	);
}

export default App;
