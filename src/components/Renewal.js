import axios from "axios";
import React, { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useNavigate, useParams } from "react-router";
import { getJwtToken } from "../Utils/token";
import Spinner from "./Spinner";

const Renewal = () => {
  const params = useParams();
  const id = params.id;

  const navigation = useNavigate();
  //console.log(id);
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const [loading, Setloading] = useState(false);

  const [data, Setdata] = useState({
    commonName: "",
    organization: "",
    organizationalUnit: "",
    country: "",
    state: "",
    locality: "",
    emailAddress: "",
    certificateType: "signed",
  });

  const handleInputChange = (e) => {
    Setdata((previousState) => {
      return { ...previousState, [e.target.name]: e.target.value };
    });
  };

  //
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setShowValidationAlert(true);
      const timer = setTimeout(() => {
        setShowValidationAlert(false);
      }, 5000); // Hide alert after 5 seconds (adjust as needed)
      return () => clearTimeout(timer);
    } else {
      setShowValidationAlert(false);
    }
  }, [validationErrors]);

  //

  useEffect(() => {
    const jwtToken = getJwtToken();

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    axios
      .get(`http://localhost:8080/certificate/${id}`, axiosConfig)
      .then((response) => {
        Setdata(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  const handleReset = () => {
    // Reset form data and validation errors
    Setdata({
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

  const Submithandler = (e) => {
    e.preventDefault();

    Setloading(() => true);

    const jwtToken = getJwtToken();

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    //console.log(data);

    axios
      .put(
        `http://localhost:8080/renewal/certificate/${data.certificateType}/${id}`,
        data,
        axiosConfig
      )
      .then((response) => {
        handleReset();
        alert("certificate renewed...");
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
          Setloading(() => false);
          navigation({ pathname: "/login" });
        }
      });
  };

  return (
    <>
      <div className="bg-img2">
        <div className="content2">
          <h3 className="header1">Renewal Form</h3>
          <form onSubmit={Submithandler}>
            {/* Validation error banners */}
            {showValidationAlert && (
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                {Object.values(validationErrors).map((error, index) => (
                  <p key={error}>{error}</p>
                ))}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setShowValidationAlert(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="pass">
              <label>Common Name (CN)</label>
            </div>

            <div className="field space">
              <input
                type="text"
                className="cssinput"
                id="commonName"
                name="commonName"
                value={data.commonName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="pass">
              <label>Organization (O)</label>
            </div>

            <div className="field space">
              <input
                type="text"
                className="cssinput"
                id="organization"
                name="organization"
                value={data.organization}
                onChange={handleInputChange}
              />
            </div>
            <div className="pass">
              <label>Organizational Unit (OU)</label>
            </div>

            <div className="field space">
              <input
                type="text"
                className="cssinput"
                id="organizationalUnit"
                name="organizationalUnit"
                value={data.organizationalUnit}
                onChange={handleInputChange}
              />
            </div>
            <div className="pass">
              <label>Country (C)</label>
            </div>

            <div className="field space">
              <CountryDropdown
                className="cssinput"
                id="country"
                name="country"
                value={data.country}
                onChange={(val) =>
                  handleInputChange({ target: { name: "country", value: val } })
                }
                required
              />
            </div>
            <div className="pass">
              <label>State or Province (ST)</label>
            </div>

            <div className="field space">
              <RegionDropdown
                className="cssinput"
                country={data.country}
                id="state"
                name="state"
                value={data.state}
                onChange={(val) =>
                  handleInputChange({ target: { name: "state", value: val } })
                }
                required
              />
            </div>
            <div className="pass">
              <label>Locality (L)</label>
            </div>

            <div className="field space">
              <input
                type="text"
                className="cssinput"
                id="locality"
                name="locality"
                value={data.locality}
                onChange={handleInputChange}
              />
            </div>

            <div className="pass">
              <label>Email Address (emailAddress)</label>
            </div>
            <div className="field space">
              <label htmlFor="emailAddress"></label>
              <input
                type="email"
                className="cssinput"
                id="emailAddress"
                name="emailAddress"
                value={data.emailAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="pass">
              <label>Certificate Type</label>
            </div>

            {/* Radio button group */}
            <div className="field space">
              <div className="radio-group">
                <div>
                  <input
                    type="radio"
                    id="signed"
                    className="cssinput"
                    name="certificateType"
                    value="Signed"
                    checked={data.certificateType === "Signed"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="signed" className="ml-2">
                    Signed
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="selfSigned"
                    className="cssinput"
                    name="certificateType"
                    value="SelfSigned"
                    checked={data.certificateType === "SelfSigned"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="selfSigned" className="ml-2">
                    Self-Signed
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ca"
                    name="certificateType"
                    className="cssinput"
                    value="CA"
                    checked={data.certificateType === "CA"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="ca" className="ml-2">
                    Certificate Authority
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="unsigned"
                    name="certificateType"
                    className="cssinput"
                    value="Unsigned"
                    checked={data.certificateType === "Unsigned"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="unsigned" className="ml-2">
                    Unsigned
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="button-container">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading === true ? <Spinner /> : null}
    </>
  );
};

export default Renewal;
