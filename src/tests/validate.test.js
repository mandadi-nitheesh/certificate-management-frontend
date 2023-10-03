import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Validate from "../components/Validate";

jest.mock("axios");

describe("Validate Component", () => {
  test("renders Validate component", () => {
    const certificateData = [
      { id: 1, email: "test@example.com", fileId: 123 },
      // Add more sample data as needed
    ];
    const exitValidateModal = jest.fn();

    render(<Validate email="test@example.com" exitValidateModal={exitValidateModal} certificateData={certificateData} />);

    // Assertions for component rendering
  });

  test("displays user details on valid email selection", async () => {
    const certificateData = [
      { id: 1, email: "test@example.com", fileId: 123 },
      // Add more sample data as needed
    ];

    axios.get.mockResolvedValue({
      data: {
        commonName: "John Doe",
        organization: "Example Inc",
        // Add more sample data as needed
      }
    });

    const exitValidateModal = jest.fn();

    render(<Validate email="test@example.com" exitValidateModal={exitValidateModal} certificateData={certificateData} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "test@example.com" } });

    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Wait for the asynchronous operation to complete
    await waitFor(async () => {
      await expect(screen.getByText("commonName: John Doe")).toBeInTheDocument();
      await expect(screen.getByText("organization: Example Inc")).toBeInTheDocument();
      // Add more assertions for other user details as needed
    });
  });

  test("displays error message on invalid email selection", async () => {
    const certificateData = [
      { id: 1, email: "test@example.com", fileId: 123 },
      // Add more sample data as needed
    ];

    const exitValidateModal = jest.fn();

    render(<Validate email="test@example.com" exitValidateModal={exitValidateModal} certificateData={certificateData} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "invalid@example.com" } });

    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Wait for the asynchronous operation to complete
    await waitFor(async () => {
      await expect(screen.getByText("Email is not a valid")).toBeInTheDocument();
    });
  });
});
