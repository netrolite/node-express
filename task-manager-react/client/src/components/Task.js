import axios from "axios";
import { useEffect, useState } from "react"

export default function Task({name, done, id}) {
    // "done" is not state, it's requested from the db only on page load
    // everything is updated on the client, but updates are sent to the db to be requested when user updates the page
    const [checked, setChecked] = useState(done);


    useEffect(() => {
        (async () => {
            try {

                const response = await axios.patch(
                    `/api/v1/tasks/${id}`,
                    { done: checked }
                );
                console.log(response);

            } catch (err) {
                console.error(err);
            }
        })();
    }, [checked]);


    return (
        <div className="task">
            <div className="task-done">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(prevState => !prevState)}
                />
            </div>
            <div className="task-name">{name}</div>
            <div className="task-actions"></div>
        </div>
    )
}