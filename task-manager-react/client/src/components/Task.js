import { FiMoreHorizontal } from "react-icons/fi"
import { changeChecked, deleteTask } from "../functions";
import { useState } from "react"

export default function Task({name, done, id, setTasks, setTaskActionsOpenID, taskActionsOpenID}) {
    // "done" is not state, it's requested from the db only on page load
    // everything is updated on the client, but updates are sent to the db to be requested when user updates the page
    const showActions = id === taskActionsOpenID ? true : false;


    function toggleShowActions() {
        setTaskActionsOpenID(prev => {
            if (prev === id) return null;
            return id;
        });
    }


    return (
        <div className={`task${done ? " done" : ""} d-flex w-100 justify-content-between`}>
            <div className={`task-checked`}>
                <input
                    type="checkbox"
                    className="form-check-input p-2"
                    checked={done}
                    onChange={() => changeChecked(setTasks, done, id)}
                />
            </div>

            <div className="task-name w-100 px-3">
                {name}
            </div>

            <div className="task-actions">
                <FiMoreHorizontal
                    className="icon"
                    onClick={toggleShowActions}
                    title="actions"
                />
                <div className={`actions-content position-absolute${showActions ? "" : " d-none"}`}>
                    <button className="mb-2 w-100" onClick={() => deleteTask(setTasks, id, setTaskActionsOpenID)}>
                        Delete
                    </button>
                    <button className="w-100">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}