// Item.js

import React from "react";

const Item = (props) => {

    const isCompleted = props.text.isCompleted;

    const handleToggle = () => {
      if (isCompleted) {
        props.onToggle(props.id, "completedTasks");
      } else {
        props.onToggle(props.id, "createdTasks");
      }
    };

  return (
    <div className="list-item-div">
      <input
        checked={isCompleted}
        type="checkbox"
        onClick={handleToggle}
        name=""
        id=""
      />

      <li
        className="list-item"
        style={{
          textDecoration: props.text.isCompleted ? "line-through" : "none",
        }}
      >
        <span>{props.text.text}</span>
      </li>

      <button onClick={props.onDelete}>
        <i className="ri-delete-bin-5-line" style={{ color: "#FEC600" }}></i>
      </button>
    </div>
  );
};

export default Item;
