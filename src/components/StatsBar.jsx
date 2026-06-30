const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

const STATUS_COLORS = {
  Applied: "#4A7CE8",
  Interview: "#E8A317",
  Offer: "#1DB868",
  Rejected: "#E53E3E",
};

export default function StatsBar({ applications }) {
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = applications.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <div className="stats-bar" role="region" aria-label="Application summary">
      {STATUSES.map((status) => (
        <div key={status} className="stats-bar__item">
          <span
            className="stats-bar__dot"
            style={{ backgroundColor: STATUS_COLORS[status] }}
            aria-hidden="true"
          />
          <span className="stats-bar__count">{counts[status]}</span>
          <span className="stats-bar__label">{status}</span>
        </div>
      ))}
    </div>
  );
}
