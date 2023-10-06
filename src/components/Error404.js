import React from "react";
import { Link } from "react-router-dom";

import "./error404.css";

const Error404 = () => {
  return (
    <div className="cont">
      <h1 className="h1404">404 - Page Not Found</h1>
      <p className="p404">
        Oops! The page you are looking for could not be found.
      </p>
      <p>
        Go back to <Link to={"/"}>home</Link>.
      </p>
    </div>
  );
};

export default Error404;
