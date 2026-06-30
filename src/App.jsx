import { useState } from "react";
import { useApplications } from "./hooks/useApplications";
import ApplicationCard from "./components/ApplicationCard";
import FilterControls from "./components/FilterControls";
import ApplicationForm from "./components/ApplicationForm";
import StatsBar from "./components/StatsBar";
import CareerTipsFeed from "./components/CareerTipsFeed";
import SkillGapAnalyzer from "./components/SkillGapAnalyzer";
import "./App.css";

export default function App() {
  const {
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
  } = useApplications();

  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const handleSave = (formData) => {
    if (editingApp) {
      updateApplication(formData);
    } else {
      addApplication(formData);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="layout">
        <header className="header" role="banner">
          <div className="header__inner">
            <div className="header__brand">
              <span className="header__logo" aria-hidden="true">⬡</span>
              <span className="header__title">JobTrack</span>
            </div>
            <div className="header__actions">
              <button
                className="btn btn--secondary"
                onClick={() => setShowAnalyzer((prev) => !prev)}
                aria-expanded={showAnalyzer}
                aria-controls="skill-gap-panel"
              >
                {showAnalyzer ? "Hide skill analyzer" : "Skill gap analyzer"}
              </button>
              <button
                className="btn btn--primary"
                onClick={openAddForm}
                aria-label="Add a new job application"
              >
                + Add application
              </button>
            </div>
          </div>
        </header>

        {showAnalyzer && (
          <div id="skill-gap-panel" className="skill-gap-panel">
            <SkillGapAnalyzer />
          </div>
        )}

        <main id="main-content" className="main">
          <div className="main__grid">
            <div className="main__primary">
              <section aria-label="Application statistics">
                <StatsBar applications={applications} />
              </section>

              <FilterControls
                filters={filters}
                onChange={setFilters}
                totalCount={applications.length}
                filteredCount={filtered.length}
              />

              {filtered.length === 0 ? (
                <div className="empty-state" role="status">
                  <p className="empty-state__icon" aria-hidden="true">📋</p>
                  <p className="empty-state__heading">No applications found</p>
                  <p className="empty-state__sub">
                    {applications.length === 0
                      ? "Add your first application to get started."
                      : "Try adjusting your filters."}
                  </p>
                </div>
              ) : (
                <ul className="card-list" aria-label="Job applications">
                  {filtered.map((app) => (
                    <li key={app.id}>
                      <ApplicationCard
                        application={app}
                        onEdit={openEditForm}
                        onDelete={deleteApplication}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="main__sidebar" aria-label="Career tips sidebar">
              <CareerTipsFeed />
            </aside>
          </div>
        </main>
      </div>

      {showForm && (
        <ApplicationForm
          existing={editingApp}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </>
  );
}