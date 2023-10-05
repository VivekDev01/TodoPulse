import React, { useState } from "react";

const Item = (props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [editedText, setEditedText] = useState(props.text.text);
  
    const handleEdit = async () => {
      if (editedText.trim() !== "") {
        await props.onEdit(props.id, editedText, props.text.isCompleted);
        setIsEditable(false);
      }
    };

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
      {isEditable ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
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
            onClick={() => setIsEditable(true)}
          >
            <span>{props.text.text}</span>
          </li>

          <button onClick={props.onDelete}>
            <i className="ri-delete-bin-5-line" style={{ color: "#FEC600" }}></i>
          </button>
        </>
      )}
    </div>
  );
};

export default Item;
