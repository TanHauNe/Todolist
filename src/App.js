import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
function App() {
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [status, setStatus] = useState("all");

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("list"));
        if (storedList) setList(storedList);
    }, []);

    const handleSubmit = () => {
        if (name === "") {
            alert("Vui long dien them do");
        } else {
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
        }
    };

    const handleChangeStatus = (id) => {
        const index = list.findIndex((item) => item.id === id);
        const _newList = [...list];
        if (_newList[index].status === "completed") {
            _newList[index].status = "uncompleted";
        } else {
            _newList[index].status = "completed";
        }
        const jsonList = JSON.stringify(_newList);
        localStorage.setItem("list", jsonList);
        setList(_newList);
    };

    const handleDelete = (id) => {
        const newLists = list.filter((li) => id !== li.id);
        const jsonList = JSON.stringify(newLists);
        localStorage.setItem("list", jsonList);
        setList(newLists);
    };

    const handleSelectChange = (e) => {
        setStatus(e.target.value);
    };

    const handleChange = () => {
        let finalList = [];
        if (status === "all") {
            finalList = list;
        } else if (status === "completed") {
            finalList = list.filter((li) => li.status === "completed");
        } else {
            finalList = list.filter((li) => li.status !== "completed");
        }
        return finalList.map((li) => (
            <div className="data wrapper">
                <li key={li.id}>{li.name}</li>
                {li.status === "completed" ? (
                    <button
                        className="btn-xanh"
                        onClick={() => {
                            handleChangeStatus(li.id);
                        }}
                    >
                        Check
                    </button>
                ) : (
                    <button
                        className="btn-xam"
                        onClick={() => {
                            handleChangeStatus(li.id);
                        }}
                    >
                        Check
                    </button>
                )}

                <button
                    className="delete-btn"
                    onClick={() => {
                        handleDelete(li.id);
                    }}
                >
                    Delete
                </button>
            </div>
        ));
    };

    return (
        <div className="App wrapper">
            <div className="header ">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={handleSubmit}>Add</button>
                <select name="lists" id="lists" onChange={(e) => handleSelectChange(e)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
            <ul>{handleChange()}</ul>
        </div>
    );
}

export default App;
