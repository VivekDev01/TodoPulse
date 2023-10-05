import React from "react";
import add from "../images/add-circle-fill.png"

function InputArea(props) {
  return (
    <div className="form">
      <input onChange={props.changeTrig} type="text" value={props.value} />
      <button onClick={props.addItemTrig}>
        <img src={add}  alt="" />
      </button>
    </div>
  );
}

export default InputArea;