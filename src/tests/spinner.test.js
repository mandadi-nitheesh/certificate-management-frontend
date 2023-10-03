import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "../components/Spinner";

test("renders spinner component", () => {
  render(<Spinner />);

  // Ensure that the spinner element is present in the document
  const spinnerElement = screen.getByRole("status");
  expect(spinnerElement).toBeInTheDocument();

  // Ensure that the spinner has the correct styles
  expect(spinnerElement).toHaveStyle({
    color: "white",
    width: "3rem",
    height: "3rem",
  });

  // Ensure that the visually hidden text is present
  const visuallyHiddenText = screen.getByText("Loading...");
  expect(visuallyHiddenText).toBeInTheDocument();
});

test("renders modal with correct styles", () => {
  render(<Spinner />);

  // Ensure that the modal element is present in the document
  const modalElement = screen.getByRole("dialog");
  expect(modalElement).toBeInTheDocument();

  // Ensure that the modal has the correct styles
  expect(modalElement).toHaveStyle({
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  });

  // Ensure that the modal content has the correct styles
  const modalContentElement = screen.getByTestId("modal-content");
  expect(modalContentElement).toHaveStyle({
    top: "50%",
    left: "50%",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 0,
  });
});
