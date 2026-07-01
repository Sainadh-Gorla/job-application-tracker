# Job Application Tracker

A full-stack React dashboard for tracking job applications across the hiring pipeline — built with a headless WordPress CMS, OpenAI API integration, and Jest unit tests.

## Features

- **Application dashboard** — Add, edit, and delete job applications with company, role, location, status, and notes
- **Pipeline tracking** — Filter and sort applications by status (Applied, Interview, Offer, Rejected), company, or role
- **Career tips feed** — Live sidebar pulling posts from a headless WordPress CMS via the REST API
- **Skill gap analyzer** — Paste any job description to get a plain-English AI summary of matched skills, skill gaps, and application priority (powered by OpenAI GPT-4o Mini)
- **Accessible** — Semantic HTML landmarks, ARIA labels, keyboard navigation, and live region announcements
- **Tested** — 20 Jest unit tests across core components using React Testing Library

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, JavaScript, HTML, CSS |
| Build tool | Vite |
| CMS | WordPress (headless) via REST API |
| AI | OpenAI API (GPT-4o Mini) |
| Backend proxy | Node.js, Express |
| Testing | Jest, React Testing Library |

## Getting Started

### Prerequisites
- Node.js v18+
- [LocalWP](https://localwp.com/) for the WordPress CMS
- OpenAI API key ([platform.openai.com](https://platform.openai.com))

### 1. Clone the repository
```bash
git clone https://github.com/Sainadh-Gorla/job-application-tracker.git
cd job-application-tracker
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Set up the proxy server
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder: