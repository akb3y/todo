import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleTask = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    const descriptionArray = e.target.value.split(",");
    setDescription(descriptionArray);
  };

  const resetTask = () => {
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = {
      title: title,
      description: description,
      completed: completed
    };
    axios
      .post("http://localhost:3000/tasks", form)
      .then(() => resetTask())
      .catch((err) => console.error(err));
  };

  return (
    <div className="taskForm">
      <form onSubmit={handleSubmit}>
        <label>Enter a task: </label>
        <input
          type="text"
          onChange={handleTask}
          value={title}
          placeholder="Task"
          maxLength={15}
          required
        />
        <br />
        <label>Describe the task: </label>
        <input
          type="text"
          onChange={handleDescription}
          value={description}
          placeholder="Separate subtasks by a comma"
          maxLength={35}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
