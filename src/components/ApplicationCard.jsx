import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function ApplicationCard({ application, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const { company, role, location, dateApplied, status, notes, url } =
    application;

  const formattedDate = new Date(dateApplied).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className="app-card"
      aria-label={`${role} at ${company}`}
    >
      <div className="app-card__header">
        <div className="app-card__company-block">
          <div className="app-card__company-initial" aria-hidden="true">
            {company.charAt(0)}
          </div>
          <div>
            <h3 className="app-card__role">{role}</h3>
            <p className="app-card__company">
              {company}
              {location && (
                <span className="app-card__location"> · {location}</span>
              )}
            </p>
          </div>
        </div>
        <div className="app-card__meta">
          <StatusBadge status={status} />
          <p className="app-card__date">Applied {formattedDate}</p>
        </div>
      </div>

      {notes && (
        <button
          className="app-card__notes-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={`notes-${application.id}`}
        >
          {expanded ? "Hide notes" : "View notes"}
        </button>
      )}

      {expanded && notes && (
        <p
          id={`notes-${application.id}`}
          className="app-card__notes"
        >
          {notes}
        </p>
      )}

      <div className="app-card__actions">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card__link"
            aria-label={`Open ${company} website`}
          >
            View posting ↗
          </a>
        )}
        <button
          className="app-card__btn app-card__btn--edit"
          onClick={() => onEdit(application)}
          aria-label={`Edit ${role} at ${company}`}
        >
          Edit
        </button>
        <button
          className="app-card__btn app-card__btn--delete"
          onClick={() => onDelete(application.id)}
          aria-label={`Delete ${role} at ${company}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
