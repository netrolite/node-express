import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect, useRef } from "react";
import { addTask } from "./functions";
import Task from "./components/Task";

function App() {
	const [tasks, setTasks] = useState([]);
	const newTaskRef = useRef();
	// ID of task that currently has its actions opened
	const [taskActionsOpenID, setTaskActionsOpenID] = useState(null);


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

	console.log(tasks);


	const tasksNodes = tasks.map((task, i) => {
		return (
			<Task
				name={task.name}
				done={task.done}
				id={task._id}
				setTasks={setTasks}
				taskActionsOpenID={taskActionsOpenID}
				setTaskActionsOpenID={setTaskActionsOpenID}
				key={i}
			/>
		)
	});

	
	return (
		<div className="app">
			<h1 className="mb-4">Task manager app</h1>

			<div className="add-task-wrapper d-flex mb-5">
				<textarea ref={newTaskRef} className="w-100 rounded me-2" />
				<button
					type="button"
					className="w-50 rounded"
					onClick={() => addTask(newTaskRef, tasks, setTasks)}
				>
					Add task
				</button>
			</div>

			<div className="tasks-list">
				{tasksNodes}
			</div>
		</div>
	);
}

export default App;
