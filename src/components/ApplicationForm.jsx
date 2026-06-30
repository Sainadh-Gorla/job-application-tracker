import { useState, useEffect, useRef } from "react";

const EMPTY_FORM = {
  company: "",
  role: "",
  location: "",
  dateApplied: new Date().toISOString().split("T")[0],
  status: "Applied",
  notes: "",
  url: "",
};

export default function ApplicationForm({ existing, onSave, onClose }) {
  const [form, setForm] = useState(existing || EMPTY_FORM);
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Trap focus inside modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    onSave(form);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {existing ? "Edit application" : "Add application"}
          </h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="company" className="form-label">
                Company <span aria-hidden="true">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="company"
                name="company"
                className="form-input"
                type="text"
                value={form.company}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="e.g. Mintel"
              />
            </div>
            <div className="form-field">
              <label htmlFor="role" className="form-label">
                Role <span aria-hidden="true">*</span>
              </label>
              <input
                id="role"
                name="role"
                className="form-input"
                type="text"
                value={form.role}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="e.g. Software Engineer"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                id="location"
                name="location"
                className="form-input"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Memphis, TN"
              />
            </div>
            <div className="form-field">
              <label htmlFor="dateApplied" className="form-label">Date applied</label>
              <input
                id="dateApplied"
                name="dateApplied"
                className="form-input"
                type="date"
                value={form.dateApplied}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={form.status}
                onChange={handleChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="url" className="form-label">Job posting URL</label>
              <input
                id="url"
                name="url"
                className="form-input"
                type="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-input form-textarea"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any notes about this application..."
              rows={3}
            />
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {existing ? "Save changes" : "Add application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
