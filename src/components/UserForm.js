import axios from "axios";
import React, { useContext, useState } from "react";
import { storeJwtToken } from "../Utils/token";
import { store } from "../App";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { storeRole } from "../Utils/role";
import "./userform.css";
import { saveUser } from "../Utils/user";
function UserForm({ endpoint }) {
  const navigate = useNavigate();

  const [jwtToken, SetjwtToken, role, Setrole] = useContext(store);

  const [data, Setdata] = useState({
    email: "",
    password: "",
  });

  const [confirmPassword, SetConfirmPassword] = useState("");

  const changeHandler = (e) => {
    Setdata((previousState) => {
      return { ...previousState, [e.target.name]: e.target.value };
    });
  };

  const confirmPasswordHandler = (e) => {
    SetConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (endpoint === "createUser") {
      if (password === confirmPassword) {
        const credententials = {
          ...data,
          roles: ["ROLE_USER"],
        };
        axios
          .post(`http://localhost:8080/auth/${endpoint}`, credententials)
          .then((response) => {
            alert("user registered");
            navigate({ pathname: "/" });
          })
          .catch((error) => {
            if (
              error.response.data.status === 401 &&
              error.response.data.detail === "invalid email/password"
            ) {
              alert("invalid credententials");
            }
          });
      } else {
        alert("password and confirm password should be same");
      }
    } else {
      axios
        .post(`http://localhost:8080/auth/${endpoint}`, data)
        .then((response) => {
          const responseData = response.data;
          if (response.status === 200 && endpoint === "login") {
            Setrole((previousState) => {
              return response.data.rolesAuthorities[0].authority;
            });
            storeRole(response.data.rolesAuthorities[0].authority);
            saveUser(response.data.username);
            storeJwtToken(responseData.jwtToken);
            SetjwtToken(responseData.jwtToken);
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            localStorage.setItem("expiration", expiration.toISOString());
            alert("Authentication Successfull");
            navigate({ pathname: "/" });
          } else {
            alert("Some error Occured please Try After SomeTime");
            navigate({ pathname: "/" });
          }
        })
        .catch((error) => {
          if (
            error.response.data.status === 401 &&
            error.response.data.detail === "invalid email/password"
          ) {
            alert("invalid credententials");
          }
        });
    }
  };

  const { email, password } = data;
  return (
    <form onSubmit={submitHandler}>
      <div className="field space">
        <input
          type="email"
          className="cssinput"
          name="email"
          placeholder="Email/Username"
          value={email}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="field space">
        <input
          className="cssinput"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={changeHandler}
          required
        />
      </div>
      {endpoint === "createUser" ? (
        <div className="field space">
          <input
            type="password"
            className="cssinput"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={confirmPasswordHandler}
            required
          />
        </div>
      ) : null}

      {endpoint === "login" ? (
        <div className="button-container">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            style={{ marginRight: "15px" }}
          >
            <Link
              to={"/createUser"}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              SignUp
            </Link>
          </button>
          <button type="submit" className="btn btn-primary mr-2">
            Submit
          </button>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary space">
          Submit
        </button>
      )}
    </form>
  );
}

export default UserForm;
