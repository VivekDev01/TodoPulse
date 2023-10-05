// Item.js

import React from "react";

const Item = (props) => {
    return (
        <div>
            <li style={{ textDecoration: props.text.isCompleted ? "line-through" : "none" }}>
                {props.text.text}
                <button onClick={() => props.onChecked(props.id)}>Move to Completed</button>
                <button onClick={props.onDelete}>Delete</button>
            </li>
        </div>
    );
};

export default Item;
