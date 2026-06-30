const STATUS_CONFIG = {
  Applied: {
    bg: "#EEF4FF",
    text: "#2B5DB8",
    dot: "#4A7CE8",
  },
  Interview: {
    bg: "#FFF8E6",
    text: "#92570A",
    dot: "#E8A317",
  },
  Offer: {
    bg: "#EDFAF3",
    text: "#0D6E3F",
    dot: "#1DB868",
  },
  Rejected: {
    bg: "#FFF0F0",
    text: "#991B1B",
    dot: "#E53E3E",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Applied"];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        backgroundColor: config.bg,
        color: config.text,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        padding: "3px 9px",
        borderRadius: "999px",
        whiteSpace: "nowrap",
      }}
      aria-label={`Status: ${status}`}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: config.dot,
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
