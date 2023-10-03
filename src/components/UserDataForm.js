import React, { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "bootstrap/dist/css/bootstrap.min.css";

function UserDataForm({
  formData,
  validationErrors,
  handleInputChange,
  handleSubmit,
  handleReset,
}) {
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  // Watch for changes in validationErrors and show/hide the alert accordingly
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

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="commonName">Common Name (CN)</label>
      </div>
      <div className="field space">
        <input
          type="text"
          className="form-control"
          id="commonName"
          name="commonName"
          value={formData.commonName}
          onChange={handleInputChange}
          placeholder="Common Name (CN)"
          required
        />
      </div>

      <div className="pass">
        <label htmlFor="organization">Organization (O)</label>
      </div>

      <div className="field space">
        <input
          type="text"
          className="form-control"
          id="organization"
          name="organization"
          placeholder="Organization (O)"
          value={formData.organization}
          onChange={handleInputChange}
        />
      </div>

      <div className="pass">
        <label htmlFor="organizationalUnit">Organizational Unit (OU)</label>
      </div>

      <div className="field space">
        <input
          type="text"
          className="cssinput"
          id="organizationalUnit"
          name="organizationalUnit"
          placeholder="Organizational Unit (OU)"
          value={formData.organizationalUnit}
          onChange={handleInputChange}
        />
      </div>
      <div className="pass">
        <label htmlFor="country">Country (C)</label>
      </div>

      <div className="field space">
        <CountryDropdown
          className="cssinput"
          id="country"
          name="country"
          placeholder="country"
          value={formData.country}
          onChange={(val) =>
            handleInputChange({ target: { name: "country", value: val } })
          }
          required
        />
      </div>
      <div className="pass">
        <label htmlFor="state">State or Province (ST)</label>
      </div>
      <div className="field space">
        <RegionDropdown
          className="cssinput"
          country={formData.country}
          id="state"
          name="state"
          placeholder="State or Province (ST)"
          value={formData.state}
          onChange={(val) =>
            handleInputChange({ target: { name: "state", value: val } })
          }
          required
        />
      </div>
      <div className="pass">
        <label htmlFor="locality">Locality (L)</label>
      </div>

      <div className="field space">
        <input
          type="text"
          className="cssinput"
          placeholder="Locality (L)"
          id="locality"
          name="locality"
          value={formData.locality}
          onChange={handleInputChange}
        />
      </div>
      <div className="pass">
        <label htmlFor="emailAddress">Email Address (emailAddress)</label>
      </div>

      <div className="field space">
        <input
          type="email"
          className="cssinput"
          placeholder="Email Address (emailAddress)"
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="pass">
        <label>Certificate Type</label>
      </div>
      {/* Radio button group */}
      <div className="field space">
        <div className="radio-group" style={{ padding: "20px" }}>
          <div>
            <input
              type="radio"
              id="signed"
              className="cssinput"
              name="certificateType"
              value="Signed"
              checked={formData.certificateType === "Signed"}
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
              className="cssinput space1"
              name="certificateType"
              value="SelfSigned"
              checked={formData.certificateType === "SelfSigned"}
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
              checked={formData.certificateType === "CA"}
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
              checked={formData.certificateType === "Unsigned"}
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
  );
}

export default UserDataForm;
