import axios from "axios";
import { useState } from "react"

export default function Task({name, done, id}) {
    // "done" is not state, it's requested from the db only on page load
    // everything is updated on the client, but updates are sent to the db to be requested when user updates the page
    const [checked, setChecked] = useState(done);


    function changeChecked() {
        (async () => {
            try {
                setChecked(prev => !prev);

                // reversing "checked" because "setChecked" (right above) doesn't update it at this point in code
                const response = await axios.patch(
                    `/api/v1/tasks/${id}`,
                    { done: !checked }
                );
            } catch (err) {
                console.error(err);
            }
        })();
    }
    


    return (
        <div className="task">
            <div className="task-done">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={changeChecked}
                />
            </div>
            <div className="task-name">{name}</div>
            <div className="task-actions"></div>
        </div>
    )
}