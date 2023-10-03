import React, { useContext } from "react";
import UserForm from "./UserForm";
import "./login.css";
const Login = () => {
  return (
    <div className="bg-img">
      <div className="content">
        <h1 className="header">Login</h1>
        <UserForm endpoint="login" />
      </div>
    </div>
  );
};

export default Login;
