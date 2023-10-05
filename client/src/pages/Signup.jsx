import React from "react";
import { Form, Input, message } from "antd";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Seccesfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <div className="form-div">
      <Form
        layout="vertical"
        className="form-content"
        onFinish={onFinishHandler}
      >
        <h4 className="text-center">SIGN UP</h4>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input type="password" required />
        </Form.Item>

        <button className="button-style" type="submit">
          Sign Up
        </button>

        <Link className="btn-login" to="/login">
          Login
        </Link>
      </Form>
    </div>
  );
};

export default Signup;
