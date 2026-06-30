import { useState, useMemo } from "react";
import { mockApplications } from "../data/mockApplications";

export function useApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    sort: "date-desc",
  });
  const [editingApp, setEditingApp] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
      );
    }

    if (filters.status !== "All") {
      result = result.filter((a) => a.status === filters.status);
    }

    result.sort((a, b) => {
      if (filters.sort === "date-desc")
        return new Date(b.dateApplied) - new Date(a.dateApplied);
      if (filters.sort === "date-asc")
        return new Date(a.dateApplied) - new Date(b.dateApplied);
      if (filters.sort === "company")
        return a.company.localeCompare(b.company);
      if (filters.sort === "role")
        return a.role.localeCompare(b.role);
      return 0;
    });

    return result;
  }, [applications, filters]);

  const addApplication = (formData) => {
    const newApp = {
      ...formData,
      id: Date.now(),
    };
    setApplications((prev) => [newApp, ...prev]);
    setShowForm(false);
  };

  const updateApplication = (formData) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === editingApp.id ? { ...a, ...formData } : a))
    );
    setEditingApp(null);
    setShowForm(false);
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const openAddForm = () => {
    setEditingApp(null);
    setShowForm(true);
  };

  const openEditForm = (app) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingApp(null);
  };

  return {
    applications,
    filtered,
    filters,
    setFilters,
    editingApp,
    showForm,
    addApplication,
    updateApplication,
    deleteApplication,
    openAddForm,
    openEditForm,
    closeForm,
  };
}
