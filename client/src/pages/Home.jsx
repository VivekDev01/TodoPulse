import React, { useState } from "react";
import "../styles/home.css";
import InputArea from "../components/InputArea";
import Item from "../components/Item";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {

const user = useSelector((state) => state.user);
const Navigate = useNavigate();


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

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    Navigate("/login");
  };


  return (
    <div className="outermost">
      
      <button onClick={handleLogout} class="button-92" >{user?.user?.name} <i class="ri-shut-down-line"></i> </button>
    

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
