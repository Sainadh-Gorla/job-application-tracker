import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error(
    "Missing OPENAI_API_KEY. Create a .env file in /server with OPENAI_API_KEY=sk-..."
  );
  process.exit(1);
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const SYSTEM_PROMPT = `You are a career assistant helping a job seeker understand a job description.
Given a pasted job description, produce a short, plain-English skill gap summary.

Respond ONLY with valid JSON in this exact shape, no markdown, no preamble:
{
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "summary": "2-3 sentence plain-English summary of how strong a fit this role looks like and what to focus on",
  "priority": "High" | "Medium" | "Low"
}

"priority" reflects how worth prioritizing this application is, based on how approachable the skill gap looks.
Keep arrays to at most 6 items each. Do not invent skills not implied by the text.`;

app.post("/api/skill-gap", async (req, res) => {
  const { jobDescription, candidateSkills } = req.body;

  if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 20) {
    return res.status(400).json({ error: "Please provide a valid job description (at least a few sentences)." });
  }

  const userContent = candidateSkills
    ? `Candidate's known skills: ${candidateSkills}\n\nJob description:\n${jobDescription}`
    : `Job description:\n${jobDescription}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", response.status, errText);
      return res.status(502).json({ error: "OpenAI API request failed." });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(502).json({ error: "No content returned from OpenAI." });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return res.status(502).json({ error: "Failed to parse OpenAI response." });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Job Tracker proxy server running on http://localhost:${PORT}`);
});
