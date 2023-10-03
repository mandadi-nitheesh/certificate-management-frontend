import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../App";
import { isRoleExists } from "../Utils/role";
import { isTokenExists } from "../Utils/token";
import logoutimage from "../imgages/logout.png";

const Navigation = () => {
  const [jwtToken, SetjwtToken, role, Setrole] = useContext(store);
  const Navigation = useNavigate();

  //console.log(jwtToken);
  const clickHandler = () => {
    console.log("executed");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.removeItem("expiration");
    const token = isTokenExists();
    const role = isRoleExists();
    Setrole(() => role);
    SetjwtToken(() => token);
    Navigation({ pathname: "/" });
  };

  return (
    <nav
      class="navbar navbar-expand-lg navbar-light navbar-fixed-top"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" style={{ marginLeft: "550px" }}>
          <li class="nav-item active">
            <Link to={"/"} class="navbar-brand nav-link">
              Home<span class="sr-only"></span>
            </Link>
          </li>
          {role === "ROLE_USER" ? (
            <li class="nav-item navvv">
              <Link to={"/createCertificate"} class="navbar-brand nav-link">
                CreateCertificate
              </Link>
            </li>
          ) : null}

          <li class="nav-item">
            <Link to={"/displayCertificates"} class="navbar-brand nav-link">
              Certificates
            </Link>
          </li>
          {!jwtToken || jwtToken === "EXPIRED" ? (
            <li class="nav-item ">
              <Link to={"/login"} class="navbar-brand nav-link">
                Login
              </Link>
            </li>
          ) : (
            <li
              class="nav-item"
              style={{
                marginLeft: role === "ROLE_USER" ? "350px" : "500px",
              }}
            >
              <button onClick={clickHandler} className="navbar-brand nav-link">
                <span>
                  <img
                    src={logoutimage}
                    height="25px"
                    width="30px"
                    style={{ marginTop: "5px" }}
                  />
                </span>
                logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
