import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import UserDataForm from "../Components/UserDataForm";

describe("UserDataForm Component", () => {
  const formData = {
    commonName: "",
    organization: "",
    organizationalUnit: "",
    country: "",
    state: "",
    locality: "",
    emailAddress: "",
    certificateType: "Signed",
  };

  const validationErrors = {};

  const handleInputChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleReset = jest.fn();

  it("renders form elements correctly", () => {
    render(
      <UserDataForm
        formData={formData}
        validationErrors={validationErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    );

    expect(screen.getByLabelText("Common Name (CN)")).toBeInTheDocument();
    expect(screen.getByLabelText("Organization (O)")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Organizational Unit (OU)")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Country (C)")).toBeInTheDocument();
    expect(screen.getByLabelText("State or Province (ST)")).toBeInTheDocument();
    expect(screen.getByLabelText("Locality (L)")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Email Address (emailAddress)")
    ).toBeInTheDocument();
    expect(screen.getByText("Certificate Type")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", async () => {
    render(
      <UserDataForm
        formData={formData}
        validationErrors={validationErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    );
  });

  it("calls handleReset when Reset button is clicked", () => {
    render(
      <UserDataForm
        formData={formData}
        validationErrors={validationErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    );

    fireEvent.click(screen.getByText("Reset"));
    expect(handleReset).toHaveBeenCalled();
  });
});
