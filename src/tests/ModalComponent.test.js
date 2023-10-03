import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalComponent from "../components/ModalComponent";
import { getRole } from "../Utils/role";

// Mock the getRole function
jest.mock("../Utils/role");

describe("ModalComponent", () => {
  beforeEach(() => {
    // Mock the getRole function to return "ROLE_USER" by default
    getRole.mockReturnValue("ROLE_USER");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders certificate details for ROLE_USER", () => {
    const userData = {
      commonName: "Test Common Name",
      organization: "Test Organization",
      organizationalUnit: "Test OU",
      country: "Test Country",
      locality: "Test Locality",
      state: "Test State",
      emailAddress: "test@example.com",
      certificateType: "Test Certificate Type",
    };

    render(<ModalComponent userData={userData} exitModal={() => {}} />);

    // Verify that certificate details are rendered
    expect(screen.getByText("Certificate Details :")).toBeInTheDocument();
    expect(screen.getByText("commonName: Test Common Name")).toBeInTheDocument();
    expect(screen.getByText("organization: Test Organization")).toBeInTheDocument();
    // Add more assertions for other details
  });

  it("renders certificate details for ROLE_ADMIN", () => {
    // Mock the getRole function to return "ROLE_ADMIN"
    getRole.mockReturnValue("ROLE_ADMIN");

    const userData = {
      commonName: "Test Common Name",
      createdDate: "2023-09-28",
      expiryDate: "2024-09-28",
    };

    render(<ModalComponent userData={userData} exitModal={() => {}} />);

    // Verify that certificate details for ROLE_ADMIN are rendered
    expect(screen.getByText("Certificate Details :")).toBeInTheDocument();
    expect(screen.getByText("commonName: Test Common Name")).toBeInTheDocument();
    expect(screen.getByText("CreationDate: 2023-09-28")).toBeInTheDocument();
    expect(screen.getByText("ExpirationDate: 2024-09-28")).toBeInTheDocument();
  });

  it("calls exitModal when close button is clicked", () => {
    const exitModalMock = jest.fn();

    render(<ModalComponent userData={{}} exitModal={exitModalMock} />);

    // Click the close button
    fireEvent.click(screen.getByText("×"));

    // Verify that exitModal function is called
    expect(exitModalMock).toHaveBeenCalled();
  });
});
