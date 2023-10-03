import axios from "axios";
import React, { useState } from "react";
import { getJwtToken } from "../Utils/token";
const Validate = ({ email, exitValidateModal, certificateData }) => {
  const [option, Setoption] = useState("");

  const [display, Setdisplay] = useState(false);
  const [valid, Setvalid] = useState(false);
  const [details, setDetails] = useState({});

  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };

  const changeHandler = (e) => {
    Setoption(() => {
      return e.target.value;
    });
  };

  //console.log(email);

  const verifyHandler = () => {
    if (email === option) {
      const array = certificateData.filter((f) => f.email === option);
      const id = array[0].fileId;
      //console.log(id);
      const jwtToken = getJwtToken();

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      axios
        .get(`http://localhost:8080/certificate/${id}`, axiosConfig)
        .then((response) => {
          setDetails((previousData) => {
            return response.data;
          });
        })
        .catch((error) => console.log(error.message));
      Setvalid((previousData) => {
        return true;
      });
      Setdisplay((previousData) => {
        return true;
      });
    } else {
      Setdisplay(() => {
        return true;
      });
      Setvalid(() => {
        return false;
      });
    }
  };

  //console.log(details);

  return (
    <div className="modal show fade" style={modelStyle}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">UserDetails :</h5>
            <button
              type="button"
              className="btn-close"
              onClick={exitValidateModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h6>Select The Email from which You Have Received The Request</h6>
            <select onChange={changeHandler} value={option}>
              {certificateData.map((users) => {
                return (
                  <option key={users.id} value={users.email}>
                    {users.email}
                  </option>
                );
              })}
            </select>
            {display === true && valid === true && (
              <>
                <p>commonName: {details.commonName}</p>
                <p>organization: {details.organization}</p>
                <p>organizationalUnit: {details.organizationalUnit}</p>
                <p>country: {details.country}</p>
                <p>locality :{details.locality}</p>
                <p>state: {details.state}</p>
                <p>emailAddress: {details.emailAddress}</p>
                <p>certificateType: {details.certificateType}</p>
              </>
            )}

            {display === true && valid === false && (
              <h6>Email is not a valid</h6>
            )}

            <center>
              <button
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
                onClick={verifyHandler}
              >
                Verify
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validate;
