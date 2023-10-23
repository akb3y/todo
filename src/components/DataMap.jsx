import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const DataMap = ({ data }) => {
  const handleCheckboxChange = (itemId, title, description, completed) => {
    let form = {
      title: title,
      description: description,
      completed: !completed
    };
    axios
      .put(`http://localhost:3000/tasks/${itemId}`, form)
      .then(() => {
        console.log("Successfully updated");
      })
      .catch((error) => {
        console.error("Error toggling completed status:", error);
      });
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <h3>{item.description}</h3>
          <input
            className="completedCheckbox"
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              handleCheckboxChange(item._id, item.title, item.description, item.completed)
            }
          />
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
      description: PropTypes.string,
      completed: PropTypes.bool
    })
  ).isRequired
};

export default DataMap;
