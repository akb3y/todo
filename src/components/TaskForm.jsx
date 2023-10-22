import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleTask = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const resetTask = () => {
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Corrected the typo, it's preventDefault(), not prevent.default()
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
        <input
          type="text"
          onChange={handleTask}
          value={title}
          placeholder="What is the task?"
          required
        />
        <input
          type="text"
          onChange={handleDescription}
          value={description}
          placeholder="Describe the task"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
