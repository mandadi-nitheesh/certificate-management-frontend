import React, { useContext, useState } from "react";
import UserDataForm from "./UserDataForm";
import "./certificationCreation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "../App";
import { useNavigate } from "react-router";
import axios from "axios";
import { getUser } from "../Utils/user";
import Spinner from "./Spinner";

const CertificateCreation = () => {
  const [jwtToken, SetjwtToken] = useContext(store);
  const navigation = useNavigate();
  //console.log(jwtToken);
  const [formData, setFormData] = useState({
    commonName: "",
    organization: "",
    organizationalUnit: "",
    country: "",
    state: "",
    locality: "",
    emailAddress: "",
    certificateType: "Signed",
  });

  const [loading, Setloading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});
  const handleInputChange = (e) => {
    setFormData((previousState) => {
      return { ...previousState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data before submission
    Setloading(() => true);
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      // No validation errors, proceed with submission
      let apiUrl = "http://localhost:8080/create/certificate";

      switch (formData.certificateType) {
        case "Signed":
          apiUrl += "/Signed";
          break;
        case "SelfSigned":
          apiUrl += "/SelfSigned";
          break;
        case "CA":
          apiUrl += "/CA";
          break;
        case "Unsigned":
          apiUrl += "/Unsigned";
          break;
        default:
          break;
      }
      const { certificateType, ...formDataWithoutCertificateType } = formData;
      sendPostRequest(formDataWithoutCertificateType, apiUrl);
      setValidationErrors({});
    } else {
      // Validation errors found, display them
      setValidationErrors(errors);
    }
  };

  function sendPostRequest(data, apiUrl) {
    const user = getUser();
    //console.log(user);
    console.log(data);
    const userdata = {
      ...data,
      username: user,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    axios
      .post(apiUrl, userdata, axiosConfig)
      .then((response) => {
        if (response.status === 201) {
          // Request was successful, handle the response if needed
          alert("certificate is created...");
          Setloading(() => false);
          handleReset();
          navigation({ pathname: "/" });
        }
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
          Setloading(() => false);
          navigation({ pathname: "/login" });
        }
      });
  }

  const handleReset = () => {
    // Reset form data and validation errors
    setFormData({
      commonName: "",
      organization: "",
      organizationalUnit: "",
      country: "",
      state: "",
      locality: "",
      emailAddress: "",
      certificateType: "Signed",
    });
    setValidationErrors({});
  };

  // Validation function
  const validateFormData = (data) => {
    const errors = {};

    // Common Name (CN) validation: Alphabets only
    if (!/^[A-Za-z\s]+$/.test(data.commonName)) {
      errors.commonName = "Common Name should contain alphabets only";
    }

    // Organization, Organizational Unit, and Locality validation: Alphanumeric and spaces
    const textRegex = /^[A-Za-z0-9\s]+$/;
    if (!textRegex.test(data.organization)) {
      errors.organization =
        "Organization should contain alphanumeric characters and spaces only";
    }
    if (!textRegex.test(data.organizationalUnit)) {
      errors.organizationalUnit =
        "Organizational Unit should contain alphanumeric characters and spaces only";
    }
    if (!textRegex.test(data.locality)) {
      errors.locality =
        "Locality should contain alphanumeric characters and spaces only";
    }

    // Email Address validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(data.emailAddress)) {
      errors.emailAddress = "Invalid email address";
    }

    return errors;
  };

  return (
    <>
      <div className="bg-img1">
        <div className="content1">
          <h2 className="header1">Certificate Creation</h2>
          <UserDataForm
            formData={formData}
            validationErrors={validationErrors} // Pass validation errors to the form component
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </div>
      </div>
      {loading === true ? <Spinner /> : null}
    </>
  );
};

export default CertificateCreation;
