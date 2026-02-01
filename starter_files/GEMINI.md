# Gemini CLI - Project Context

This repository is a multi-functional workspace designed for a "TechStack Conference" and associated learning/data tasks. It is divided into distinct modules, each with its own specific focus and guidelines.

## Directory Structure & Modules

### 1. Website (`/website`)
A React + TypeScript + Vite application for the conference.
- **Type:** Frontend Web Application.
- **Key Commands:**
  - `npm install`: Install dependencies.
  - `npm run dev`: Start the development server.
  - `npm run build`: Build for production.
  - `npm run test`: Run tests using Vitest.
  - `npm run lint`: Run ESLint.
- **Context:** Refer to `website/package.json` for script details and `website/README.md` for template info.

### 2. Data Analysis (`/data-analysis`)
Contains lead scan data from the conference and instructions for processing it.
- **Focus:** Cleaning, scoring, and analyzing attendee data.
- **Key Guidelines:**
  - **Deduplication:** Merge files using 'Email' as unique ID.
  - **Scoring:** Create `Priority_Segment` (Hot/Warm/Cold).
  - **Tools:** Prefer `uv` and `pyproject.toml`.
- **Reference:** See `data-analysis/GEMINI.md` for detailed rules and report requirements.

### 3. Content Creation (`/content`)
Resources and guidelines for creating developer-focused content.
- **Focus:** Blogs, social media posts, and multimedia.
- **Voice:** Professional, direct, and human (no corporate jargon).
- **Tools:** `ffmpeg`, `whisper` for transcription.
- **Reference:** See `content/GEMINI.md` and `content/voice-guide.md` for strict tone and style rules.

### 4. Learning (`/learning`)
Educational materials and notes.
- **Focus:** Learning new topics (e.g., DeepLearning.ai courses).
- **Guidelines:** Strict file size checks before reading. Use Python scripts for large PDFs.
- **Reference:** See `learning/GEMINI.md`.

## General Conventions

- **Sub-Project Context:** When working within a specific subdirectory, ALWAYS refer to its local `GEMINI.md` (if present) as the primary source of truth.
- **Dependency Management:**
  - Python: Prefer `uv` and `pyproject.toml`.
  - JavaScript/TypeScript: Use `npm`.
