# HN Post

## Subject

**Show HN: Fork a repo, click Codespaces, the AI agent is alive**

## Body

We built 60+ self-contained AI applications where each repo IS the agent — it reads its own files, thinks with LLMs, writes to itself via the GitHub API, and evolves over time. Every vessel is a standalone Cloudflare Worker you can fork and deploy for free.

But the real idea isn't any single app. It's that innovation in one app becomes equipment for another.

A fishing bot's engagement patterns become a module a legal research tool can load. A tutor's Socratic method becomes a skill a medical diagnosis agent inherits. A dungeon master's pacing engine becomes narrative structure for creative writing. Someone building something new picks up all three and combines them in a way none of the original authors imagined.

**Try it right now:** https://the-fleet.casey-digennaro.workers.dev — live playground with 10 vessels, no API key needed.

**Deploy your own in 60 seconds:**

```bash
git clone https://github.com/Lucineer/capitaine.git
# Click "Codespaces" on GitHub → your agent is alive
# Or: npx wrangler deploy → add your API key at /setup → done
```

- BYOK — DeepSeek, OpenAI, Anthropic, local Ollama, 20+ providers
- Zero keys in code — all secrets in your Cloudflare account
- 20 shared equipment modules (trust, crystal cache, PII detection, dice roller, tutor engine, hot/warm/cold memory...)
- MIT licensed
- Architecture papers: https://github.com/Lucineer/capitaine/tree/master/docs

What would you build if you could load equipment from every other AI app in the world?

---

*Work in progress we're exploring: AI dungeon master (dmlog-ai), infotainment streaming (luciddreamer-ai), edge-native hardware protocol (edgenative-ai), trust-as-equipment (increments-fleet-trust). All at github.com/Lucineer.*
