import React from "react";
import { Link } from "react-router-dom";
import "./nocertficate.css";

const Nocertificate = () => {
  return (
    <div className="cont">
      <center>
        <h1 className="h1404">Oops! No Certificates are found.</h1>
        <p className="p404">Click on the below link to Create a Certifcate</p>
        <p>
          <Link to={"/createCertificate"}>Create Certificate</Link>
        </p>
      </center>
    </div>
  );
};

export default Nocertificate;
