import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ApplicationCard from "../components/ApplicationCard";

const mockApp = {
  id: 1,
  company: "Mintel",
  role: "Software Engineer",
  location: "Chicago, IL",
  dateApplied: "2025-06-01",
  status: "Interview",
  notes: "Phone screen scheduled",
  url: "https://mintel.com",
};

describe("ApplicationCard", () => {
  test("renders company name", () => {
    render(<ApplicationCard application={mockApp} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Mintel")).toBeInTheDocument();
  });

  test("renders role name", () => {
    render(<ApplicationCard application={mockApp} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  test("renders location", () => {
    render(<ApplicationCard application={mockApp} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Chicago, IL/)).toBeInTheDocument();
  });

  test("renders Edit and Delete buttons", () => {
    render(<ApplicationCard application={mockApp} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls onDelete when Delete button is clicked", () => {
    const mockDelete = jest.fn();
    render(<ApplicationCard application={mockApp} onEdit={() => {}} onDelete={mockDelete} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test("calls onEdit when Edit button is clicked", () => {
    const mockEdit = jest.fn();
    render(<ApplicationCard application={mockApp} onEdit={mockEdit} onDelete={() => {}} />);
    fireEvent.click(screen.getByText("Edit"));
    expect(mockEdit).toHaveBeenCalledWith(mockApp);
  });

  test("shows notes when View notes is clicked", () => {
    render(<ApplicationCard application={mockApp} onEdit={() => {}} onDelete={() => {}} />);
    fireEvent.click(screen.getByText("View notes"));
    expect(screen.getByText("Phone screen scheduled")).toBeInTheDocument();
  });
});