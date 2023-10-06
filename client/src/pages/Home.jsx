import React, { useEffect, useState } from "react";
import "../styles/home.css";
import InputArea from "../components/InputArea";
import Item from "../components/Item";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);


  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/v1/user/fetchUserData",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        if(res.data.success){
          const userData = res.data.data;
          setItems(userData.createdTasks);
          setCompletedItems(userData.completedTasks);
          // message.success("User data fetched successfully");
        }
        else{
          message.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        message.error("Error in fetching user data");
      }
    };

    fetchUserData();
  }, []); 

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const toggleTask = async (taskId, taskType) => {
    try {
      const res = await axios.post(
        `/api/v1/user/toggleTask/${taskId}`,
        { taskType },  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const userData = res.data.data;
        setItems(userData.createdTasks);
        setCompletedItems(userData.completedTasks);
        message.success("Task toggled successfully between completed and incompleted tasks");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Error toggling task");
    }
  };

  const addToCreatedTasks = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/addToCreatedTasks",
        { text: inputText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInputText("");
      if (res.data.success) {
        const userData = res.data.data;
        setItems(userData.createdTasks);
        setCompletedItems(userData.completedTasks);
        message.success("Task added successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Error in adding task");
    }
  };


  const deleteTask = async (taskId) => {
    try {
      const res= await axios.delete(`/api/v1/user/deleteTask/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success){
        const userData = res.data.data;
        setItems(userData.createdTasks);
        setCompletedItems(userData.completedTasks);
        message.success("Task deleted successfully");
      }
    } catch (error) {
      console.error(error);
      message.error("Error in deleting task");
    }
  };

  const deleteCompletedTask = async (taskId) => {
    try {
      const res = await axios.delete(`/api/v1/user/deleteCompletedTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const userData = res.data.data;
        setCompletedItems(userData.completedTasks);
        message.success("Completed task deleted successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting completed task");
    }
  };

  const editTaskText = async (taskId, newText, isCompleted) => {
    try {
      const taskType = isCompleted ? "completedTasks" : "createdTasks";
      const res = await axios.put(
        `/api/v1/user/editTask/${taskId}`,
        { text: newText, taskType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const userData = res.data.data;
        setItems(userData.createdTasks);
        setCompletedItems(userData.completedTasks);
        message.success("Task edited successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Error editing task");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    Navigate("/login");
  };

  return (
    <div className="outermost">
      <button onClick={handleLogout} className="button-92">
        {user?.user?.name} <i className="ri-shut-down-line"></i>{" "}
      </button>

        <div className="container">
          <div className="heading">
            <h1>TodoPulse</h1>
          </div>

          <InputArea
            addItemTrig={addToCreatedTasks}
            changeTrig={handleChange}
            value={inputText}
          />

        <ul>
          {items.map((task, index) => (
            <Item
              key={index}
              id={index}
              text={task}
              onToggle={toggleTask}
              onDelete={() => deleteTask(index)}
              onEdit={editTaskText}
            />
          ))}
        
          {completedItems.map((task, index) => (
            <Item
              key={index}
              id={index}
              text={task}
              onToggle={toggleTask}
              onDelete={() => deleteCompletedTask(index)}
              onEdit={editTaskText}
            />
          ))}
        </ul>
        </div>

        <footer>
          <p>
            Copyright @  
            <a
              href="https://vivekdevshah-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Vivek Dev Shah
            </a>
            , {year}
          </p>
        </footer>
    </div>
  );
};

export default Home;
