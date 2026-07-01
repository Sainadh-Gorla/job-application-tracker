import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterControls from "../components/FilterControls";

const defaultFilters = {
  search: "",
  status: "All",
  sort: "date-desc",
};

describe("FilterControls", () => {
  test("renders search input", () => {
    render(<FilterControls filters={defaultFilters} onChange={() => {}} totalCount={5} filteredCount={5} />);
    expect(screen.getByPlaceholderText("Company or role...")).toBeInTheDocument();
  });

  test("renders status dropdown", () => {
    render(<FilterControls filters={defaultFilters} onChange={() => {}} totalCount={5} filteredCount={5} />);
    expect(screen.getByLabelText("Filter by pipeline status")).toBeInTheDocument();
  });

  test("renders sort dropdown", () => {
    render(<FilterControls filters={defaultFilters} onChange={() => {}} totalCount={5} filteredCount={5} />);
    expect(screen.getByLabelText("Sort applications")).toBeInTheDocument();
  });

  test("shows correct application count", () => {
    render(<FilterControls filters={defaultFilters} onChange={() => {}} totalCount={5} filteredCount={3} />);
    expect(screen.getByText("Showing 3 of 5 applications")).toBeInTheDocument();
  });

  test("calls onChange when search input changes", () => {
    const mockChange = jest.fn();
    render(<FilterControls filters={defaultFilters} onChange={mockChange} totalCount={5} filteredCount={5} />);
    fireEvent.change(screen.getByPlaceholderText("Company or role..."), {
      target: { value: "Mintel" },
    });
    expect(mockChange).toHaveBeenCalled();
  });

  test("calls onChange when status filter changes", () => {
    const mockChange = jest.fn();
    render(<FilterControls filters={defaultFilters} onChange={mockChange} totalCount={5} filteredCount={5} />);
    fireEvent.change(screen.getByLabelText("Filter by pipeline status"), {
      target: { value: "Interview" },
    });
    expect(mockChange).toHaveBeenCalled();
  });

  test("shows clear button when search is active", () => {
    const activeFilters = { ...defaultFilters, search: "Mintel" };
    render(<FilterControls filters={activeFilters} onChange={() => {}} totalCount={5} filteredCount={1} />);
    expect(screen.getByText("Clear filters")).toBeInTheDocument();
  });

  test("does not show clear button when no filters active", () => {
    render(<FilterControls filters={defaultFilters} onChange={() => {}} totalCount={5} filteredCount={5} />);
    expect(screen.queryByText("Clear filters")).not.toBeInTheDocument();
  });
});