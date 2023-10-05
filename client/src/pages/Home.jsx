import React, { useState } from "react";
import "../styles/home.css";
import InputArea from "../components/InputArea";
import Item from "../components/Item";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="outermost">
      <div className="inner">
        <div className="container">
          <div className="heading">
            <h1>TodoPulse</h1>
          </div>

          <InputArea
            addItemTrig={addItem}
            changeTrig={handleChange}
            value={inputText}
          />

          <div>
            <ul>
              {items.map((todoItem, index) => (
                <Item
                  key={index}
                  id={index}
                  text={todoItem}
                  onChecked={deleteItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
