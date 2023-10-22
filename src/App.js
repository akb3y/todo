import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm.jsx";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [data]);

  return (
    <div>
      <TaskForm />
    </div>
  );
};

export default App;
