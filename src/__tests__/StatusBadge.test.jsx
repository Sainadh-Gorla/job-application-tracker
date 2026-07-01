import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StatusBadge from "../components/StatusBadge";

describe("StatusBadge", () => {
  test("renders the correct status text", () => {
    render(<StatusBadge status="Applied" />);
    expect(screen.getByText("Applied")).toBeInTheDocument();
  });

  test("renders Interview status", () => {
    render(<StatusBadge status="Interview" />);
    expect(screen.getByText("Interview")).toBeInTheDocument();
  });

  test("renders Offer status", () => {
    render(<StatusBadge status="Offer" />);
    expect(screen.getByText("Offer")).toBeInTheDocument();
  });

  test("renders Rejected status", () => {
    render(<StatusBadge status="Rejected" />);
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  test("has correct aria-label", () => {
    render(<StatusBadge status="Applied" />);
    expect(screen.getByLabelText("Status: Applied")).toBeInTheDocument();
  });
});