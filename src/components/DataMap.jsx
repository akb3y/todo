import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

const DataMap = ({ data }) => {
  const handleCheckboxChange = (itemId, title, description, completed) => {
    let form = {
      title: title,
      description: description,
      completed: !completed
    };
    axios
      .put(`http://localhost:3000/tasks/${itemId}`, form)
      .then()
      .catch((error) => {
        console.error("Error toggling completed status:", error);
      });
  };

  const deleteTask = (itemId) => {
    axios
      .delete(`http://localhost:3000/tasks/${itemId}`)
      .then()
      .catch((error) => console.error(error));
  };

  return (
    <div className="dataMap">
      {data.map((item) => (
        <div key={item._id} className="data">
          <h2>
            <TiDelete className="delete" onClick={() => deleteTask(item._id)} />
            {item.title}
          </h2>
          <label>
            <input
              className="completedCheckbox"
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                handleCheckboxChange(item._id, item.title, item.description, item.completed)
              }
            />
            Completed?
          </label>
          <ul>
            {item.description.map((array, index) => (
              <li key={index}>{array}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

DataMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.array,
      completed: PropTypes.bool
    })
  ).isRequired
};

export default DataMap;
