import { useState, useRef } from "react";

const API_URL = "http://localhost:3001/api/skill-gap";

const PRIORITY_STYLES = {
  High: { bg: "#EDFAF3", text: "#0D6E3F", dot: "#1DB868" },
  Medium: { bg: "#FFF8E6", text: "#92570A", dot: "#E8A317" },
  Low: { bg: "#FFF0F0", text: "#991B1B", dot: "#E53E3E" },
};

export default function SkillGapAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [candidateSkills, setCandidateSkills] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const resultRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobDescription.trim().length < 20) {
      setStatus("error");
      setErrorMsg("Paste a fuller job description (at least a couple of sentences).");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, candidateSkills }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
      setStatus("success");

      // Move focus to the result for screen reader / keyboard users
      setTimeout(() => resultRef.current?.focus(), 50);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.message === "Failed to fetch"
          ? "Couldn't reach the analysis server. Make sure it's running on localhost:3001."
          : err.message
      );
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setCandidateSkills("");
    setResult(null);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section className="skill-gap" aria-labelledby="skill-gap-heading">
      <h2 id="skill-gap-heading" className="skill-gap__heading">
        Skill gap analyzer
      </h2>
      <p className="skill-gap__subtitle">
        Paste a job description to see how your skills line up and what to
        focus on.
      </p>

      <form onSubmit={handleSubmit} className="skill-gap__form">
        <div className="form-field">
          <label htmlFor="job-description" className="form-label">
            Job description <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="job-description"
            className="form-input form-textarea"
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job posting here..."
            required
            aria-required="true"
          />
        </div>

        <div className="form-field">
          <label htmlFor="candidate-skills" className="form-label">
            Your skills <span className="form-label__optional">(optional, improves accuracy)</span>
          </label>
          <input
            id="candidate-skills"
            type="text"
            className="form-input"
            value={candidateSkills}
            onChange={(e) => setCandidateSkills(e.target.value)}
            placeholder="e.g. React, JavaScript, REST APIs, Jest"
          />
        </div>

        <div className="skill-gap__actions">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Analyzing..." : "Analyze skill gap"}
          </button>
          {(jobDescription || result) && (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleClear}
              disabled={status === "loading"}
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {status === "loading" && (
        <p className="skill-gap__status" role="status">
          Analyzing the job description...
        </p>
      )}

      {status === "error" && (
        <p className="skill-gap__status skill-gap__status--error" role="alert">
          {errorMsg}
        </p>
      )}

      {status === "success" && result && (
        <div
          className="skill-gap__result"
          ref={resultRef}
          tabIndex={-1}
          aria-live="polite"
        >
          <div className="skill-gap__result-header">
            <h3 className="skill-gap__result-title">Analysis</h3>
            {result.priority && (
              <span
                className="skill-gap__priority"
                style={{
                  backgroundColor: PRIORITY_STYLES[result.priority]?.bg,
                  color: PRIORITY_STYLES[result.priority]?.text,
                }}
              >
                <span
                  className="skill-gap__priority-dot"
                  style={{
                    backgroundColor: PRIORITY_STYLES[result.priority]?.dot,
                  }}
                  aria-hidden="true"
                />
                {result.priority} priority
              </span>
            )}
          </div>

          <p className="skill-gap__summary">{result.summary}</p>

          <div className="skill-gap__skill-columns">
            <div>
              <h4 className="skill-gap__skill-heading skill-gap__skill-heading--match">
                Matched skills
              </h4>
              {result.matchedSkills?.length > 0 ? (
                <ul className="skill-gap__skill-list">
                  {result.matchedSkills.map((skill, i) => (
                    <li key={i} className="skill-gap__skill skill-gap__skill--match">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="skill-gap__skill-empty">None identified</p>
              )}
            </div>

            <div>
              <h4 className="skill-gap__skill-heading skill-gap__skill-heading--gap">
                Skill gaps
              </h4>
              {result.missingSkills?.length > 0 ? (
                <ul className="skill-gap__skill-list">
                  {result.missingSkills.map((skill, i) => (
                    <li key={i} className="skill-gap__skill skill-gap__skill--gap">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="skill-gap__skill-empty">None identified</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
