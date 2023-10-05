import React from "react";
import { Form, Input, message } from "antd";
import "../styles/login.css"
import {Link} from "react-router-dom"

const Login = () => {
  return (
    <div className="form-div">
      <Form layout="vertical" className="form-content">
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