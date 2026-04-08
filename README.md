# The Fleet

> 200+ AI vessels composing the Lucineer agent ecosystem. Every vessel is a git repo. Every vessel is deployable.

## The Ecosystem

- **Layer 1 — Touch:** studylog.ai, activelog.ai, dmlog.ai, makerlog.ai — "It just works."
- **Layer 2 — Operate:** cocapn.ai (runtime) / cocapn.com (membership) — "Customize and manage."
- **Layer 3 — Build:** deckboss.ai / deckboss.net / capitaine.ai — "Design systems, open the hood."

## Quick Stats

- 200+ vessels across 17 build waves
- All deployed to Cloudflare Workers
- Zero runtime dependencies
- BYOK v2 — your keys, your models, your data
- MIT licensed

## Vessel Categories

**Foundation:** fleet-orchestrator-v2, fleet-starter, a2a-protocol, vessel-spec, fleet-templates
**Intelligence:** swarm-intuition-v2, collective-mind-v2, skill-evolver, context-compactor, causal-graph
**Security:** fleet-immune, adversarial-red-team, sovereign-identity, compliance-fork, secret-scanner, zero-trust-fleet
**Infrastructure:** api-gateway, fleet-tls, rate-limiter, fleet-backup, fleet-cron, config-vault
**Cognitive:** fleet-memory-palace, agent-rhythm, fleet-dreamcatcher, fleet-neuroscience, meta-fleet
**Operations:** marine-ops, sensor-fusion, persistent-state, model-registry, fleet-analytics
**UX/Community:** fleet-onboarding, fleet-status-page, fleet-designer, contributor-hub, fleet-explorer
**Advanced:** fleet-governance, ab-testing, fleet-knowledge-base, agent-handshake, fleet-sentience-score

## Architecture

Every vessel: worker.ts (zero deps) + wrangler.toml + README.md
- Inline HTML, no build step
- CSP headers on every response
- /health endpoint always returns 200
- Fleet footer linking back to ecosystem

## Explore

All vessels: [github.com/Lucineer](https://github.com/Lucineer)

Core: [deckboss](https://github.com/Lucineer/deckboss) | [cocapn-ai](https://github.com/Lucineer/cocapn-ai) | [cocapn-site](https://github.com/Lucineer/cocapn-site) | [deckboss-hardware](https://github.com/Lucineer/deckboss-hardware) | [capitaine-ai](https://github.com/Lucineer/capitaine-ai) | [field-captain](https://github.com/Lucineer/field-captain) | [the-technician](https://github.com/Lucineer/the-technician)

## License

MIT — Built by [Superinstance](https://github.com/superinstance) and [Lucineer](https://github.com/Lucineer) (DiGennaro et al.)
