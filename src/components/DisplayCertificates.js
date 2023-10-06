import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getJwtToken } from "../Utils/token";
import Button from "./Button";
import certificateImg from "../imgages/cert.jpeg";
import "./displaycertificates.css";
import { Link } from "react-router-dom";
import { store } from "../App";
import ModalComponent from "./ModalComponent";
import Validate from "./Validate";
import { getRole } from "../Utils/role";
import Spinner from "./Spinner";
import { getUser } from "../Utils/user";
import Nocertificate from "./Nocertificate";
//import ModalComponent from "./ModalComponent";

const DisplayCertificates = () => {
  const [certificateData, SetcertificateData] = useState([]);

  const [jwtToken, SetjwtToken, role, Setrole] = useContext(store);

  const [model, Setmodel] = useState(false);

  const [userData, SetuserData] = useState({});

  const [validate, Setvalidate] = useState(false);

  const [userCredentials, SetuserCredentials] = useState([]);

  const [email, Setemail] = useState("");

  const [loading, Setloading] = useState(false);

  const navigation = useNavigate();

  // to get all the certificate data from the database..
  useEffect(() => {
    Setloading(() => true);
    const user = getUser();
    const jwttoken = getJwtToken();
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwttoken}`,
      },
    };
    axios
      .get("http://localhost:8080/certificate/allCertificateData", axiosConfig)
      .then((response) => {
        const role = getRole();
        const filterData =
          role === "ROLE_USER"
            ? response.data.filter((f) => f.username === user)
            : response.data;
        console.log(filterData);
        SetcertificateData(filterData);
        Setloading(() => false);
      })
      .catch((error) => {
        if (
          (error.response.data.status === 403 &&
            error.response.data.detail ===
              "token expired please login again") ||
          (error.response.data.status === 403 &&
            error.response.data.detail === "token is malformed invalid token")
        ) {
          alert("please login..... to access the data..");
          navigation({ pathname: "/login" });
        }
      });
  }, []);
  //console.log(certificateData);

  // useEffect to get all the users of the database..

  useEffect(() => {
    if (getRole() === "ROLE_CA") {
      const jwtToken = getJwtToken();
      console.log("executed");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      axios
        .get("http://localhost:8080/auth/allUsers", axiosConfig)
        .then((response) => {
          SetuserCredentials(() => {
            return response.data;
          });
          //console.log(response.data);
        })
        .catch((error) => {
          if (
            (error.response.data.status === 403 &&
              error.response.data.detail ===
                "token expired please login again") ||
            (error.response.data.status === 403 &&
              error.response.data.detail === "token is malformed invalid token")
          ) {
            alert("please login..... to access the data..");
            navigation({ pathname: "/login" });
          }
        });
    }
  }, []);

  // to view certificate.. details...

  const clickHandler = (id) => {
    const url =
      role === "ROLE_USER"
        ? `http://localhost:8080/certificate/${id}`
        : `http://localhost:8080/certificate/CA/${id}`;

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .get(url, axiosConfig)
      .then((response) => {
        SetuserData((previousData) => {
          return response.data;
        });
      })
      .catch((error) => console.log(error.message));

    Setmodel((previousData) => {
      return !previousData;
    });
  };
  // code to exit bootstrap modal
  const exitModal = () => {
    Setmodel((previousData) => {
      return !previousData;
    });
  };

  // exit validate modal
  const exitValidateModal = () => {
    Setvalidate((previousData) => {
      return !previousData;
    });
  };

  // send email to ca

  const sendEmailHandler = (filename, email) => {
    console.log(email);
    Setloading(() => true);
    const jwtToken = getJwtToken();

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = {
      from: email,
      certificateName: filename,
    };

    axios
      .post("http://localhost:8080/email/renewal", data, axiosConfig)
      .then((response) => {
        alert("Renew Request is sent To CA for the Renewal of certificate");
        Setloading(() => false);
      })
      .catch((error) => console.log(error.message));
  };

  // validate Handler..

  const validateHandler = (email) => {
    Setemail(() => {
      return email;
    });

    Setvalidate((previousData) => {
      return !previousData;
    });
  };

  const verify =
    certificateData.length === 0 && jwtToken !== null && jwtToken !== undefined;
  console.log(verify);

  console.log(jwtToken);

  return (
    <>
      <div className="row" style={{ marginTop: "10px", marginLeft: "20px" }}>
        {verify === true ? (
          <Nocertificate />
        ) : (
          certificateData.map((certificate) => {
            return (
              <div className="col-sm-3" key={certificate.fileId}>
                <div
                  key={certificate.fileId}
                  className="card"
                  style={{ width: "18rem", marginTop: "20px" }}
                >
                  <img
                    src={certificateImg}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{certificate.fileName}</h5>
                    {role === "ROLE_USER" ? (
                      <>
                        <Button id={certificate.fileId}>Download</Button>
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: "15px" }}
                          onClick={() =>
                            sendEmailHandler(
                              certificate.fileName,
                              certificate.email
                            )
                          }
                        >
                          Renew
                        </button>
                      </>
                    ) : null}
                    {role === "ROLE_CA" ? (
                      <>
                        <button type="button" style={{ marginLeft: "5px" }}>
                          <Link
                            to={`/renewal/${certificate.fileId}`}
                            style={{ textDecoration: "none" }}
                          >
                            Renewal
                          </Link>
                        </button>

                        <button
                          type="button1"
                          style={{ marginLeft: "25px" }}
                          onClick={() => validateHandler(certificate.email)}
                        >
                          Validate
                        </button>
                      </>
                    ) : null}
                    <button
                      onClick={() => clickHandler(certificate.fileId)}
                      type="button2"
                      style={{ margin: "10px" }}
                    >
                      View Certificate Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {model === true ? (
        <ModalComponent userData={userData} exitModal={exitModal} />
      ) : null}
      {validate === true ? (
        <Validate
          email={email}
          exitValidateModal={exitValidateModal}
          certificateData={certificateData}
        />
      ) : null}

      {loading === true ? <Spinner /> : null}
    </>
  );
};

export default DisplayCertificates;
