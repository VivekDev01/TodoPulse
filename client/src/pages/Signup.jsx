import React from "react";
import { Form, Input, message } from "antd";
import "../styles/signup.css"
import {Link} from "react-router-dom"


const Signup = () => {
  return (
    <div className="form-div">
      <Form layout="vertical" className="form-content">
        <h4 className="text-center">SIGN UP</h4>
        <Form.Item label="Name" name="name">
          <Input type="name" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirm-password">
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
