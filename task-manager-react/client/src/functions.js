import axios from "axios";


async function getAllTasks(setTasks) {
    try {

        const response = await axios.get("/api/v1/tasks");
        setTasks(response.data);

    } catch (err) {
        console.error(err);
    }
}


function addTask(newTaskRef, setTasks) {
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


function editTask(setEditMode, taskContents) {
    setEditMode(true);
    // focus on task (it's contentEditable). Using timeout because when executed synchronously, div is not yet contentEditable
    setTimeout(() => taskContents.current.focus(), 0);
}


function saveEdit(taskContents, setEditMode, setTaskActionsOpenID, id) {
    (async () => {
        try {

            const newTaskName = taskContents.current.textContent;

            // send new task name to the db
            await axios.patch(`/api/v1/tasks/${id}`, {
                name: newTaskName
            });
            setEditMode(false);
            setTaskActionsOpenID(null);

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


function toggleShowActions(setTaskActionsOpenID, id) {
    setTaskActionsOpenID(prev => {
        if (prev === id) return null;
        return id;
    });
}


export {
    getAllTasks,
    addTask,
    changeChecked,
    editTask,
    saveEdit,
    deleteTask,
    toggleShowActions
}