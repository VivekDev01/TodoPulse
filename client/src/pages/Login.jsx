import React from "react";
import { Form, Input, message } from "antd";
import "../styles/login.css"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
    const onFinishHandler = async(values) => {
      try {
        const res= await axios.post("/api/v1/user/login", values);
        if(res.data.success){
          message.success("Login Successfull");
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
        else{
          message.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
      }
    };

  return (
    <div className="form-div">
      <Form layout="vertical" className="form-content" onFinish={onFinishHandler}>
        <h4 className="text-center">LOGIN</h4>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <button className="button-style" type="submit">
          Login
        </button>

        <Link className="btn-signup" to="/signup">Sign Up</Link>
      </Form>
    </div>
  );
};

export default Login;
