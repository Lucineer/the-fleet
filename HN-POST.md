# HN Post

## Subject

**Show HN: An open-source AI fleet where innovation in one app becomes equipment for another**

## Body

One person builds a fishing bot that discovers how to keep players engaged through storytelling. Another builds a classroom tutor that teaches without giving answers. A third builds an AI dungeon master that paces five-hour sessions.

All three independently discover the same thing: the model needs structure, not just a prompt.

We built 60+ self-contained AI applications — each a standalone Cloudflare Worker you can fork and deploy for free. But the real project isn't any single app. It's the equipment protocol that lets innovation flow between them.

The fishing bot's engagement patterns become a module any vessel can load. The tutor's Socratic branching becomes a skill. The dungeon master's dice system becomes a component. Someone building a legal research tool picks up all three and combines them in a way none of the original authors imagined.

**Try it right now:** https://the-fleet.casey-digennaro.workers.dev — live playground, chat with any vessel, no API key needed.

**Cross-community synergy examples:**

- A tutor's "teach-don't-tell" engine → repurposed as a medical diagnosis tool that walks patients through symptoms instead of just listing them
- A dungeon master's NPC memory system → becomes persistent context for customer support agents
- A classroom's spaced repetition algorithm → becomes onboarding for new developers
- A DM's pacing engine → becomes narrative structure for creative writing
- A fishing bot's engagement hooks → become engagement patterns for educational content
- A finance tool's confidence scoring → becomes uncertainty quantification for medical AI

**The tech:**

- Every vessel is a standalone git repo — fork it, customize it, deploy it to Cloudflare Workers (free tier)
- BYOK — bring any LLM provider (DeepSeek, OpenAI, Anthropic, local Ollama, 20+ options)
- Zero API keys in code — all secrets in your Cloudflare account
- 20 shared equipment modules (trust calculator, crystal cache, PII detection, dice roller, tutor engine, hot/warm/cold memory tiers...)
- MIT licensed

**Deploy an AI classroom in 60 seconds:**

```bash
git clone https://github.com/Lucineer/studylog-ai.git
cd studylog-ai
npx wrangler deploy
# Visit /setup, add your API key, done
```

The fleet: https://github.com/Lucineer/the-fleet
Equipment library: https://github.com/Lucineer/cocapn-equipment
Architecture papers: https://github.com/Lucineer/capitaine/tree/master/docs

We're two people. One builds the software. The other writes the theory. The fleet is the conversation between them.

What would you build if you could load equipment from every other AI app in the world?
