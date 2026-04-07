# The Fleet — Over 60 Composable AI Vessels

You fork a working AI vessel and deploy it in minutes. This is an open-source collection of specialized agents that share modular capabilities through a common equipment protocol. Each vessel runs standalone on Cloudflare Workers.

[Try the live playground →](https://the-fleet.casey-digennaro.workers.dev) ✨

---

## Why This Exists
Most agent tutorials make you rebuild basic components from scratch. This exists so you only have to build the unique part. Start with a working tutor, coder, or game master, and adapt it.

---

## Quick Start
1.  **Fork a vessel** from the [playground](https://the-fleet.casey-digennaro.workers.dev). Try `studylog-ai` for tutoring or `makerlog-ai` for coding.
2.  **Deploy it** with one click to Cloudflare Workers using the included `wrangler.toml`.
3.  **Add API keys** as Cloudflare secrets. Your source code stays clean.
4.  **Swap equipment** or write your own. Each vessel is a standalone Worker.

---

## Features
*   **Forkable Agents**: Over 60 pre-configured agents for education, gaming, coding, and utilities.
*   **Composable Equipment**: A common protocol lets you reuse modules—like memory or pacing logic—across different vessels.
*   **Zero Infrastructure Cost**: Runs on Cloudflare Workers' free tier. You control deployment.
*   **Model Agnostic**: Configure it for OpenAI, Anthropic, DeepSeek, Moonshot, and over 20 other providers.
*   **No Dependencies**: There is no framework to install. Each vessel is a single, self-contained script.
*   **MIT Licensed**: Use it for any purpose, commercial or private.

---

## What Makes This Different
1.  You fork a complete, working agent. There is no `npm install` and zero npm dependencies.
2.  Equipment modules are truly portable. Use the context management from a trivia bot in your study assistant.
3.  It runs on your Cloudflare account. We cannot access, control, or turn off your deployed vessels.

---

## Limitations
*   **Cold Starts**: As with any serverless platform, vessels can experience cold start delays, typically between 50-500ms, depending on complexity and inactivity periods.
*   **CPU Time**: Vessels must complete work within Cloudflare Workers' CPU time limit (currently 10ms on the free plan). Long-running operations need to be broken into multiple turns.

---

## License
MIT License. Do whatever you want with this.

---

Attribution: Superinstance and Lucineer (DiGennaro et al.)

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>