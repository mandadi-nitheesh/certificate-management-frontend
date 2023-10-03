import React from "react";

const Spinner = () => {
  //console.log("executed");

  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };
  return (
    <>
      <div
        className="modal modal-dialog-centered"
        style={modelStyle}
        role="dialog"
      >
        <div
          className="modal-content"
          style={{
            top: "50%",
            left: "50%",
            backgroundColor: "rgba(0,0,0,0.8)",
            width: 0,
          }}
          data-testid="modal-content"
        >
          <div className="modal-body">
            <div className="text-center">
              <div
                className="spinner-border"
                role="status"
                style={{ color: "white", width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
