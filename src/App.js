import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [list, setList] = useState(() => {
        const storageList = JSON.parse(localStorage.getItem("list"));
        return storageList;
    });
    const [status, setStatus] = useState("all");
    const [listChange, setListChange] = useState(list);

    const handleSubmit = () => {
        setList((prev) => {
            const newList = [
                ...prev,
                {
                    name: name,
                    id: uuidv4(),
                    status: "completed",
                },
            ];

            const jsonList = JSON.stringify(newList);
            localStorage.setItem("list", jsonList);
            return newList;
        });
        setName("");
    };

    const handleChangeStatus = (id) => {
        const nameCheck = list.filter((li) => id === li.id);

        if (nameCheck[0].status === "completed") {
            nameCheck[0].status = "uncompleted";
        } else {
            nameCheck[0].status = "completed";
        }

        console.log(nameCheck[0].status);
        console.log(list);
    };
    // setList("");
    const handleDelete = (id) => {
        const newLists = list.filter((li) => id !== li.id);
        setList(newLists);
    };

    const handleSelectChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        setListChange(list);
        if (status === "all") {
            setListChange(list);
        } else if (status === "completed") {
            const finalList = list.filter((li) => li.status === "completed");
            setListChange(finalList);
        } else {
            const finalList = list.filter((li) => li.status !== "completed");
            setListChange(finalList);
        }
    }, [name, list, status]);

    return (
        <div className="App">
            <div className="header">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={handleSubmit}>Add</button>
                <select name="lists" id="lists" onChange={(e) => handleSelectChange(e)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
            <ul>
                {listChange.map((li) => (
                    <div className="data">
                        <li key={li.id}>{li.name}</li>
                        <button
                            onClick={() => {
                                handleChangeStatus(li.id);
                            }}
                        >
                            Check
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => {
                                handleDelete(li.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default App;
