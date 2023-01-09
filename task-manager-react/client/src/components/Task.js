import { FiMoreHorizontal } from "react-icons/fi"
import { changeChecked, editTask, saveEdit, deleteTask, toggleShowActions } from "../functions";
import { useState, useRef } from "react"

export default function Task({name, done, id, setTasks, setTaskActionsOpenID, taskActionsOpenID}) {
    // "done" is not state, it's requested from the db only on page load
    // everything is updated on the client, but updates are sent to the db to be requested when user updates the page
    const showActions = id === taskActionsOpenID ? true : false;
    const [editMode, setEditMode] = useState(false);
    const taskContents = useRef();

    
    // element that shows up when three dots are clicked
    let actionsPanel;
    if (showActions && editMode) {
        actionsPanel = (
            <div className={`actions-content position-absolute`}>
                <button
                    onClick={() => saveEdit(taskContents, setEditMode, setTaskActionsOpenID, id)}
                >
                    Save
                </button>
            </div>
        )
    }
    else if (showActions && !editMode) {
        actionsPanel = (
            <div className={`actions-content position-absolute`}>
                <button
                    className="mb-2 w-100"
                    onClick={() => deleteTask(setTasks, id, setTaskActionsOpenID)}
                >
                    Delete
                </button>
                <button
                    className="w-100"
                    onClick={() => editTask(setEditMode, taskContents)}
                >
                    Edit
                </button>
            </div>
        )
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

            <div
                className="task-name w-100 px-3"
                ref={taskContents}
                contentEditable={editMode ? "true" : "false"}
                suppressContentEditableWarning={true}
            >
                {name}
            </div>

            <div className="task-actions">
                <FiMoreHorizontal
                    className="icon"
                    onClick={() => toggleShowActions(setTaskActionsOpenID, id)}
                    title="actions"
                />
                {actionsPanel}
            </div>
        </div>
    )
}