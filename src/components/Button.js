import React, { useContext } from "react";
import { store } from "../App";
import axios from "axios";
import { useNavigate } from "react-router";
const Button = ({ children, id }) => {
  const [jwtToken, SetjwtToken] = useContext(store);

  const navigate = useNavigate();

  const axiosConfig = {
    responseType: "arraybuffer",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const downloadCertificate = () => {
    axios
      .get(`http://localhost:8080/certificate/download/${id}`, axiosConfig)
      .then((response) => {
        //console.log(response);
        const type = response.headers["content-type"];
        const url = window.URL.createObjectURL(new Blob([response.data]), {
          type: type,
        });
        let fileName =
          response.headers["content-disposition"].split("filename=")[1];
        //console.log(fileName);

        let string = fileName.substring(1, fileName.length - 1);
        //console.log(string);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${string}`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(link);
      })
      .catch((error) => {
        if (
          (error.response.data.status === 403 &&
            error.response.data.detail ===
              "token expired please login again") ||
          (error.response.data.status === 403 &&
            error.response.data.detail === "token is malformed invalid token")
        ) {
          alert("please login to download the file");
          navigate({ pathname: "/login" });
        }
      });
  };

  return (
    <button
      onClick={downloadCertificate}
      className=" btn btn-success"
      style={{ marginLeft: "10px" }}
    >
      {children}
    </button>
  );
};

export default Button;
