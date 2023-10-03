import React, { useContext, useEffect } from "react";
import "./home.css";
import castudyImg from "../imgages/casestudyimg.jpg";
import certificateIcon from "../imgages/certificate-icon.jpeg";
import search from "../imgages/search-icon.jpeg";
import renewable from "../imgages/renewable.jpeg";
import { Link } from "react-router-dom";
import { store } from "../App";
import { getDuration, isTokenExists, RemoveToken } from "../Utils/token";
import { isRoleExists, removeRole } from "../Utils/role";

const Home = () => {
  const [jwtToken, SetjwtToken, role, Setrole] = useContext(store);

  //console.log(isTokenExists());

  useEffect(() => {
    console.log(jwtToken);
    console.log(getDuration());

    if (!jwtToken) {
      return;
    }
    if (jwtToken === "EXPIRED") {
      RemoveToken();
      removeRole();
      SetjwtToken(() => isTokenExists());
      Setrole(() => isRoleExists());

      console.log(jwtToken);
      return;
    }

    const tokeDuration = getDuration();
    //console.log(tokeDuration);

    setTimeout(() => {
      RemoveToken();
      removeRole();
      SetjwtToken(() => isTokenExists);
      Setrole(() => isRoleExists());
    }, tokeDuration);
  }, [jwtToken]);
  return (
    <body>
      <header>
        <h1>Certificate Management System</h1>
      </header>
      <div>
        <h2 style={{ color: "black", textAlign: "center" }}>
          Manage x.509v3 Certificates Safely and Securly
        </h2>
        <img src={castudyImg} width="1550" height="600" />
      </div>
      <section class="features">
        <h2>Key Features</h2>
        <div class="feature">
          <Link to={"/createCertificate"}>
            <img src={certificateIcon} alt="Certificate Icon" />
          </Link>
          <h3>Certificate Generation</h3>
          <p>Easily generate certificates for individuals or organizations.</p>
        </div>
        <div class="feature">
          <Link to={"/displayCertificates"}>
            <img src={search} alt="Search Icon" />
          </Link>
          <h3>Search and Retrieve</h3>
          <p>Quickly search and retrieve certificates when needed.</p>
        </div>
        <div class="feature">
          <Link to={"/"}>
            <img src={renewable} alt="Renew Icon" />
          </Link>
          <h3>Renewal of Certificates</h3>
          <p>Effortlessly renew certificates with our system.</p>
        </div>
      </section>
      <footer>
        &copy; CASE STUDY:- Certificate Management System by Group 1
      </footer>
    </body>
  );
};

export default Home;
