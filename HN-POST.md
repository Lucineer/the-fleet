# HN Post

## Subject

**Show HN: Fork a repo, click Codespaces, the AI agent is alive**

## Body

We built 60+ AI applications where each repo IS the agent. Not a config file — the repo itself. It reads its own code, thinks with LLMs, writes to itself through PRs, and evolves. Every one is a standalone Cloudflare Worker you can fork and deploy for free.

The real idea: innovation in one app becomes equipment for another. A fishing bot's engagement patterns become a module a legal tool loads. A tutor's Socratic method becomes a skill a diagnosis agent inherits. Someone building something new combines them in ways the original authors never imagined.

**Try it:** https://the-fleet.casey-digennaro.workers.dev — live playground, 10 vessels, no API key needed.

**Deploy your own in 60 seconds:**

```
git clone https://github.com/Lucineer/capitaine.git
# Codespaces → alive. Or: npx wrangler deploy → /setup → add key → done.
```

- BYOK — 20+ providers (DeepSeek, OpenAI, Anthropic, local Ollama...)
- Zero keys in code — secrets live in your Cloudflare account
- 20 shared equipment modules any vessel can load
- MIT licensed
- Architecture: https://github.com/Lucineer/capitaine/tree/master/docs

What would you build if you could load equipment from every other AI app?

---

*Fleet: github.com/Lucineer — education, gaming, coding, business, pets, edge hardware, and more.*
