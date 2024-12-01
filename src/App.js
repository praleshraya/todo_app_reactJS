import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // Add Task
    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, task]);
            setTask(''); // Clear input field
        }
    };

    // Delete Task
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Download Tasks
    const downloadTasks = () => {
        const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tasks.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Upload Tasks
    const uploadTasks = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const uploadedTasks = JSON.parse(e.target.result);
                if (Array.isArray(uploadedTasks)) {
                    setTasks(uploadedTasks);
                } else {
                    alert("Invalid file format.");
                }
            } catch (error) {
                alert("Error reading file.");
            }
        };
        reader.readAsText(file); // Ensure this is executed
    };

    return (
        <div className='app'>
            <h1>Pralesh, ToDo APP</h1>

            {/* Input Field */}
            <div className="input-container">
                <input
                    type="text"
                    value={task}
                    placeholder="Add a new task."
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {tasks.map((t, index) => (
                    <li key={index} className="task-item">
                        {t}
                        <button onClick={() => deleteTask(index)}>Delete Task</button>
                    </li>
                ))}
            </ul>

            {/* Download and Upload Buttons */}
            <div>
                <button onClick={downloadTasks}>Download Tasks</button>
                <input type="file" accept="application/json" onChange={uploadTasks} />
            </div>
        </div>
    );
};

export default App;
