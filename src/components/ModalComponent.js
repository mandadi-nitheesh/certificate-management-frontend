//import "./modalcomponent.css";

import { getRole } from "../Utils/role";

const ModalComponent = ({ userData, exitModal }) => {
  const role = getRole();

  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };
  //console.log(userData);
  return (
    <div className="modal show fade" style={modelStyle}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Certificate Details :</h5>
            <button type="button" className="btn-close" onClick={exitModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {role === "ROLE_USER" ? (
              <>
                <p>commonName: {userData.commonName}</p>
                <p>organization: {userData.organization}</p>
                <p>organizationalUnit: {userData.organizationalUnit}</p>
                <p>country: {userData.country}</p>
                <p>locality :{userData.locality}</p>
                <p>state: {userData.state}</p>
                <p>emailAddress: {userData.emailAddress}</p>
                <p>certificateType: {userData.certificateType}</p>
              </>
            ) : (
              <>
                <p>commonName: {userData.commonName}</p>
                <p>CreationDate: {userData.createdDate}</p>
                <p>ExpirationDate: {userData.expiryDate}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
