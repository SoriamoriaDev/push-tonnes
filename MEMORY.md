# MEMORY.md

## System Configuration
- **Primary Model:** Gemini 3 Flash (`litellm/gemini-3-flash`)
- **Fallback Models:** Claude Sonnet 4.6 (`anthropic/claude-sonnet-4-6`), Claude Opus 4.6 (`anthropic/claude-opus-4-6`)
- **Infrastructure:** Models are routed via a local LiteLLM instance (http://localhost:4000).

## Preferences
- **Footer Format:** Always include token usage, context window percentage, and model name at the end of every message.
- **Tone:** Direct, helpful, non-sycophantic.

## Project: Push Tonnes
- Fitness app for tracking workout tonnage.
- Recently implemented session duration tracking (auto-calculated in minutes on save).
- Fixed a Firebase auth issue by enabling Email/Password sign-in.
