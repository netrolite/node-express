import axios from "axios";


function addTask(newTaskRef, tasks, setTasks) {
    (async () => {
        try {

            const taskName = newTaskRef.current.value;
            newTaskRef.current.value = "";

            if (!taskName.trim()) throw new Error("Name can't be emtpy!");

            const response = await axios.post("/api/v1/tasks", {
                name: taskName
            });
            const task = response.data;

            setTasks(prev => {
                return [
                    ...prev,
                    task
                ]
            })

        } catch (err) {
            console.error(err);
        }

    })();
}


function changeChecked(setTasks, currDone, id) {
    (async () => {
        try {

            
            // reversing "checked" because "setChecked" (right above) doesn't update it at this point in code
            await axios.patch(
                `/api/v1/tasks/${id}`,
                { done: !currDone }
            );

            const allTasks = await axios.get("/api/v1/tasks");
            setTasks(allTasks.data);

        } catch (err) {
            console.error(err);
        }
    })();
}


function deleteTask(setTasks, id, setTaskActionsOpenID) {
    (async () => {
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            const allTasks = await axios.get("/api/v1/tasks");

            setTasks(allTasks.data);
            setTaskActionsOpenID(null);
        } catch (err) {
            console.error(err);
        }
    })();
}


export {
    addTask,
    changeChecked,
    deleteTask
}