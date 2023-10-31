import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm.jsx";
import DataMap from "./components/DataMap.jsx";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [data]);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Task Master</h1>
      <TaskForm />
      <DataMap data={data} />
    </div>
  );
};

export default App;
