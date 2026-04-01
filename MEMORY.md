# MEMORY.md

## System Configuration
- **Primary Model:** Gemini 3 Flash (`litellm/gemini-3-flash`)
- **Fallback Models:** Claude Sonnet 4.6 (`anthropic/claude-sonnet-4-6`), Claude Opus 4.6 (`anthropic/claude-opus-4-6`)
- **Infrastructure:** Models are routed via a local LiteLLM instance (http://localhost:4000).

## Preferences
- **Footer Format:** Always include a one-liner at the end of every message: "📊 T: ~125k/200k (62%) | 74 tokens | Claude Opus 4" format. Use session_status to get accurate values. When token counts aren't available (e.g. LiteLLM proxy), note "unknown".
- **Tone:** Direct, helpful, non-sycophantic.

## Project: Push Tonnes
- Fitness app for tracking workout tonnage.
- Recently implemented session duration tracking (auto-calculated in minutes on save).
- Fixed a Firebase auth issue by enabling Email/Password sign-in.
- **2026-03-26:** Completed major development push with Epics 5, 6, and 7.
    - Epics cover: Calendar, Milestones, Team Allocation, Materials, Delivery Tracking, and Consolidated View.
    - Build verified passing and pushed to GitHub.
