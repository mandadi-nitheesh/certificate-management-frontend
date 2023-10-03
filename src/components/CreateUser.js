import axios from "axios";
import React, { useState } from "react";
import UserForm from "./UserForm";

const CreateUser = () => {
  return (
    <div className="bg-img">
      <div className="content">
        <h2 className="header">SignUp</h2>
        <UserForm endpoint="createUser" />
      </div>
    </div>
  );
};

export default CreateUser;
