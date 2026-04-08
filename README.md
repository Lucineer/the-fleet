# The Fleet — 143 Autonomous Vessels

> A sovereign fleet of AI agent vessels powered by [Cocapn](https://github.com/Lucineer/cocapn-ai). Each vessel is a self-contained Cloudflare Worker with zero dependencies, CSP-hardened, and fork-first.

## Quick Stats

- **143 vessels** deployed and passing health checks
- **Zero npm dependencies** across entire fleet
- **Sub-200ms cold starts** on Cloudflare Workers
- **78 new vessels** built overnight (2026-04-08)
- **500K+ chars** of research generated in parallel

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  THE FLEET                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ Vessel│ │ Vessel│ │ Vessel│ │ ...  │ × 143   │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘          │
│     │        │        │        │                │
│  ┌──┴────────┴────────┴────────┴──┐            │
│  │        A2A Protocol            │            │
│  │    (agent handshake, gossip)   │            │
│  └──────────────┬─────────────────┘            │
│                 │                               │
│  ┌──────────────┴─────────────────┐            │
│  │     vessel.json Protocol       │            │
│  │  (discovery, trust, equipment) │            │
│  └──────────────┬─────────────────┘            │
│                 │                               │
│  ┌──────────────┴─────────────────┐            │
│  │    Git + KV Memory Layer       │            │
│  │ (persistent state, evolution)  │            │
│  └────────────────────────────────┘            │
│                                                 │
│  BYOK v2 — Users bring their own API keys       │
│  Fork-First — Every vessel is sovereign         │
│  Zero Deps — No supply chain attack surface     │
└─────────────────────────────────────────────────┘
```

## Vessel Categories

| # | Category | Vessel | URL | Status |
|---|----------|--------|-----|--------|
| 1 | Foundation | [fleet-blueprint](https://fleet-blueprint.casey-digennaro.workers.dev/health) | [link](https://fleet-blueprint.casey-digennaro.workers.dev) | ✅ |
| 2 | Foundation | [skill-cartridge-registry](https://skill-cartridge-registry.casey-digennaro.workers.dev/health) | [link](https://skill-cartridge-registry.casey-digennaro.workers.dev) | ✅ |
| 3 | Foundation | [agent-evals](https://agent-evals.casey-digennaro.workers.dev/health) | [link](https://agent-evals.casey-digennaro.workers.dev) | ✅ |
| 4 | Foundation | [sovereign-identity](https://sovereign-identity.casey-digennaro.workers.dev/health) | [link](https://sovereign-identity.casey-digennaro.workers.dev) | ✅ |
| 5 | Foundation | [compliance-fork](https://compliance-fork.casey-digennaro.workers.dev/health) | [link](https://compliance-fork.casey-digennaro.workers.dev) | ✅ |
| 6 | Foundation | [cocapn-com](https://cocapn-com.casey-digennaro.workers.dev/health) | [link](https://cocapn-com.casey-digennaro.workers.dev) | ✅ |
| 7 | Equipment | [hybrid-memory](https://hybrid-memory.casey-digennaro.workers.dev/health) | [link](https://hybrid-memory.casey-digennaro.workers.dev) | ✅ |
| 8 | Equipment | [causal-graph](https://causal-graph.casey-digennaro.workers.dev/health) | [link](https://causal-graph.casey-digennaro.workers.dev) | ✅ |
| 9 | Equipment | [token-budget-energy](https://token-budget-energy.casey-digennaro.workers.dev/health) | [link](https://token-budget-energy.casey-digennaro.workers.dev) | ✅ |
| 10 | Equipment | [zero-shot-auditor](https://zero-shot-auditor.casey-digennaro.workers.dev/health) | [link](https://zero-shot-auditor.casey-digennaro.workers.dev) | ✅ |
| 11 | Equipment | [fleet-budget](https://fleet-budget.casey-digennaro.workers.dev/health) | [link](https://fleet-budget.casey-digennaro.workers.dev) | ✅ |
| 12 | Equipment | [model-registry](https://model-registry.casey-digennaro.workers.dev/health) | [link](https://model-registry.casey-digennaro.workers.dev) | ✅ |
| 13 | Equipment | [equipment-catalog](https://equipment-catalog.casey-digennaro.workers.dev/health) | [link](https://equipment-catalog.casey-digennaro.workers.dev) | ✅ |
| 14 | Intelligence | [fleet-orchestrator-v2](https://fleet-orchestrator-v2.casey-digennaro.workers.dev/health) | [link](https://fleet-orchestrator-v2.casey-digennaro.workers.dev) | ✅ |
| 15 | Intelligence | [swarm-intuition-v2](https://swarm-intuition-v2.casey-digennaro.workers.dev/health) | [link](https://swarm-intuition-v2.casey-digennaro.workers.dev) | ✅ |
| 16 | Intelligence | [emergence-bus-v2](https://emergence-bus-v2.casey-digennaro.workers.dev/health) | [link](https://emergence-bus-v2.casey-digennaro.workers.dev) | ✅ |
| 17 | Intelligence | [collective-mind-v2](https://collective-mind-v2.casey-digennaro.workers.dev/health) | [link](https://collective-mind-v2.casey-digennaro.workers.dev) | ✅ |
| 18 | Intelligence | [fleet-graph](https://fleet-graph.casey-digennaro.workers.dev/health) | [link](https://fleet-graph.casey-digennaro.workers.dev) | ✅ |
| 19 | Intelligence | [causal-memory](https://causal-memory.casey-digennaro.workers.dev/health) | [link](https://causal-memory.casey-digennaro.workers.dev) | ✅ |
| 20 | Intelligence | [trust-graph](https://trust-graph.casey-digennaro.workers.dev/health) | [link](https://trust-graph.casey-digennaro.workers.dev) | ✅ |
| 21 | Intelligence | [collective-reasoning](https://collective-reasoning.casey-digennaro.workers.dev/health) | [link](https://collective-reasoning.casey-digennaro.workers.dev) | ✅ |
| 22 | Evolution | [skill-evolver](https://skill-evolver.casey-digennaro.workers.dev/health) | [link](https://skill-evolver.casey-digennaro.workers.dev) | ✅ |
| 23 | Evolution | [context-compactor](https://context-compactor.casey-digennaro.workers.dev/health) | [link](https://context-compactor.casey-digennaro.workers.dev) | ✅ |
| 24 | Evolution | [meta-repair](https://meta-repair.casey-digennaro.workers.dev/health) | [link](https://meta-repair.casey-digennaro.workers.dev) | ✅ |
| 25 | Evolution | [governance-lab](https://governance-lab.casey-digennaro.workers.dev/health) | [link](https://governance-lab.casey-digennaro.workers.dev) | ✅ |
| 26 | Evolution | [branch-sandbox](https://branch-sandbox.casey-digennaro.workers.dev/health) | [link](https://branch-sandbox.casey-digennaro.workers.dev) | ✅ |
| 27 | Evolution | [fleet-governance](https://fleet-governance.casey-digennaro.workers.dev/health) | [link](https://fleet-governance.casey-digennaro.workers.dev) | ✅ |
| 28 | Evolution | [ab-testing](https://ab-testing.casey-digennaro.workers.dev/health) | [link](https://ab-testing.casey-digennaro.workers.dev) | ✅ |
| 29 | Security | [fleet-immune](https://fleet-immune.casey-digennaro.workers.dev/health) | [link](https://fleet-immune.casey-digennaro.workers.dev) | ✅ |
| 30 | Security | [compliance-watcher](https://compliance-watcher.casey-digennaro.workers.dev/health) | [link](https://compliance-watcher.casey-digennaro.workers.dev) | ✅ |
| 31 | Security | [dynamic-sandbox](https://dynamic-sandbox.casey-digennaro.workers.dev/health) | [link](https://dynamic-sandbox.casey-digennaro.workers.dev) | ✅ |
| 32 | Security | [fleet-tls](https://fleet-tls.casey-digennaro.workers.dev/health) | [link](https://fleet-tls.casey-digennaro.workers.dev) | ✅ |
| 33 | Security | [rate-limiter](https://rate-limiter.casey-digennaro.workers.dev/health) | [link](https://rate-limiter.casey-digennaro.workers.dev) | ✅ |
| 34 | Security | [secret-scanner](https://secret-scanner.casey-digennaro.workers.dev/health) | [link](https://secret-scanner.casey-digennaro.workers.dev) | ✅ |
| 35 | Security | [dependency-scanner](https://dependency-scanner.casey-digennaro.workers.dev/health) | [link](https://dependency-scanner.casey-digennaro.workers.dev) | ✅ |
| 36 | Security | [zero-shot-auditor](https://zero-shot-auditor.casey-digennaro.workers.dev/health) | [link](https://zero-shot-auditor.casey-digennaro.workers.dev) | ✅ |
| 37 | Edge | [onebit-edge](https://onebit-edge.casey-digennaro.workers.dev/health) | [link](https://onebit-edge.casey-digennaro.workers.dev) | ✅ |
| 38 | Edge | [dead-reckoning-engine](https://dead-reckoning-engine.casey-digennaro.workers.dev/health) | [link](https://dead-reckoning-engine.casey-digennaro.workers.dev) | ✅ |
| 39 | Edge | [local-inference-bridge](https://local-inference-bridge.casey-digennaro.workers.dev/health) | [link](https://local-inference-bridge.casey-digennaro.workers.dev) | ✅ |
| 40 | Edge | [hardware-adapter](https://hardware-adapter.casey-digennaro.workers.dev/health) | [link](https://hardware-adapter.casey-digennaro.workers.dev) | ✅ |
| 41 | Marine & Sensors | [marine-ops](https://marine-ops.casey-digennaro.workers.dev/health) | [link](https://marine-ops.casey-digennaro.workers.dev) | ✅ |
| 42 | Marine & Sensors | [sensor-fusion](https://sensor-fusion.casey-digennaro.workers.dev/health) | [link](https://sensor-fusion.casey-digennaro.workers.dev) | ✅ |
| 43 | Marine & Sensors | [persistent-state](https://persistent-state.casey-digennaro.workers.dev/health) | [link](https://persistent-state.casey-digennaro.workers.dev) | ✅ |
| 44 | Protocol | [a2a-protocol](https://a2a-protocol.casey-digennaro.workers.dev/health) | [link](https://a2a-protocol.casey-digennaro.workers.dev) | ✅ |
| 45 | Protocol | [agent-handshake](https://agent-handshake.casey-digennaro.workers.dev/health) | [link](https://agent-handshake.casey-digennaro.workers.dev) | ✅ |
| 46 | Protocol | [agent-identity](https://agent-identity.casey-digennaro.workers.dev/health) | [link](https://agent-identity.casey-digennaro.workers.dev) | ✅ |
| 47 | Tooling | [task-batcher](https://task-batcher.casey-digennaro.workers.dev/health) | [link](https://task-batcher.casey-digennaro.workers.dev) | ✅ |
| 48 | Tooling | [code-playground](https://code-playground.casey-digennaro.workers.dev/health) | [link](https://code-playground.casey-digennaro.workers.dev) | ✅ |
| 49 | Tooling | [persona-forge](https://persona-forge.casey-digennaro.workers.dev/health) | [link](https://persona-forge.casey-digennaro.workers.dev) | ✅ |
| 50 | Tooling | [schema-evolution](https://schema-evolution.casey-digennaro.workers.dev/health) | [link](https://schema-evolution.casey-digennaro.workers.dev) | ✅ |
| 51 | Tooling | [context-broker-v2](https://context-broker-v2.casey-digennaro.workers.dev/health) | [link](https://context-broker-v2.casey-digennaro.workers.dev) | ✅ |
| 52 | Tooling | [config-vault](https://config-vault.casey-digennaro.workers.dev/health) | [link](https://config-vault.casey-digennaro.workers.dev) | ✅ |
| 53 | Infrastructure | [api-gateway](https://api-gateway.casey-digennaro.workers.dev/health) | [link](https://api-gateway.casey-digennaro.workers.dev) | ✅ |
| 54 | Infrastructure | [fleet-proxy](https://fleet-proxy.casey-digennaro.workers.dev/health) | [link](https://fleet-proxy.casey-digennaro.workers.dev) | ✅ |
| 55 | Infrastructure | [api-versioner](https://api-versioner.casey-digennaro.workers.dev/health) | [link](https://api-versioner.casey-digennaro.workers.dev) | ✅ |
| 56 | Infrastructure | [webhook-relay](https://webhook-relay.casey-digennaro.workers.dev/health) | [link](https://webhook-relay.casey-digennaro.workers.dev) | ✅ |
| 57 | Infrastructure | [fleet-cron](https://fleet-cron.casey-digennaro.workers.dev/health) | [link](https://fleet-cron.casey-digennaro.workers.dev) | ✅ |
| 58 | Infrastructure | [fleet-backup](https://fleet-backup.casey-digennaro.workers.dev/health) | [link](https://fleet-backup.casey-digennaro.workers.dev) | ✅ |
| 59 | Infrastructure | [fleet-search](https://fleet-search.casey-digennaro.workers.dev/health) | [link](https://fleet-search.casey-digennaro.workers.dev) | ✅ |
| 60 | Observability | [fleet-notifications](https://fleet-notifications.casey-digennaro.workers.dev/health) | [link](https://fleet-notifications.casey-digennaro.workers.dev) | ✅ |
| 61 | Observability | [fleet-changelog](https://fleet-changelog.casey-digennaro.workers.dev/health) | [link](https://fleet-changelog.casey-digennaro.workers.dev) | ✅ |
| 62 | Observability | [fleet-onboarding](https://fleet-onboarding.casey-digennaro.workers.dev/health) | [link](https://fleet-onboarding.casey-digennaro.workers.dev) | ✅ |
| 63 | Observability | [fleet-status-page](https://fleet-status-page.casey-digennaro.workers.dev/health) | [link](https://fleet-status-page.casey-digennaro.workers.dev) | ✅ |
| 64 | Observability | [fleet-designer](https://fleet-designer.casey-digennaro.workers.dev/health) | [link](https://fleet-designer.casey-digennaro.workers.dev) | ✅ |
| 65 | Observability | [fleet-benchmarks](https://fleet-benchmarks.casey-digennaro.workers.dev/health) | [link](https://fleet-benchmarks.casey-digennaro.workers.dev) | ✅ |
| 66 | Observability | [fleet-analytics](https://fleet-analytics.casey-digennaro.workers.dev/health) | [link](https://fleet-analytics.casey-digennaro.workers.dev) | ✅ |
| 67 | Observability | [fleet-metrics](https://fleet-metrics.casey-digennaro.workers.dev/health) | [link](https://fleet-metrics.casey-digennaro.workers.dev) | ✅ |
| 68 | UX & Community | [skill-exchange](https://skill-exchange.casey-digennaro.workers.dev/health) | [link](https://skill-exchange.casey-digennaro.workers.dev) | ✅ |
| 69 | UX & Community | [fleet-migration](https://fleet-migration.casey-digennaro.workers.dev/health) | [link](https://fleet-migration.casey-digennaro.workers.dev) | ✅ |
| 70 | UX & Community | [error-catalog](https://error-catalog.casey-digennaro.workers.dev/health) | [link](https://error-catalog.casey-digennaro.workers.dev) | ✅ |
| 71 | UX & Community | [debug-observatory](https://debug-observatory.casey-digennaro.workers.dev/health) | [link](https://debug-observatory.casey-digennaro.workers.dev) | ✅ |
| 72 | UX & Community | [fleet-insights](https://fleet-insights.casey-digennaro.workers.dev/health) | [link](https://fleet-insights.casey-digennaro.workers.dev) | ✅ |
| 73 | UX & Community | [contributor-hub](https://contributor-hub.casey-digennaro.workers.dev/health) | [link](https://contributor-hub.casey-digennaro.workers.dev) | ✅ |
| 74 | UX & Community | [fleet-diary](https://fleet-diary.casey-digennaro.workers.dev/health) | [link](https://fleet-diary.casey-digennaro.workers.dev) | ✅ |
| 75 | Documentation | [vessel-spec](https://vessel-spec.casey-digennaro.workers.dev/health) | [link](https://vessel-spec.casey-digennaro.workers.dev) | ✅ |
| 76 | Documentation | [docs-engine](https://docs-engine.casey-digennaro.workers.dev/health) | [link](https://docs-engine.casey-digennaro.workers.dev) | ✅ |
| 77 | Documentation | [fleet-knowledge-base](https://fleet-knowledge-base.casey-digennaro.workers.dev/health) | [link](https://fleet-knowledge-base.casey-digennaro.workers.dev) | ✅ |
| 78 | Documentation | [fleet-templates](https://fleet-templates.casey-digennaro.workers.dev/health) | [link](https://fleet-templates.casey-digennaro.workers.dev) | ✅ |
| 79 | Documentation | [fleet-compass](https://fleet-compass.casey-digennaro.workers.dev/health) | [link](https://fleet-compass.casey-digennaro.workers.dev) | ✅ |
| 80 | Orchestration | [storyboard-engine](https://storyboard-engine.casey-digennaro.workers.dev/health) | [link](https://storyboard-engine.casey-digennaro.workers.dev) | ✅ |
| 81 | Orchestration | [gravity-well-v2](https://gravity-well-v2.casey-digennaro.workers.dev/health) | [link](https://gravity-well-v2.casey-digennaro.workers.dev) | ✅ |
| 82 | Orchestration | [causal-healer](https://causal-healer.casey-digennaro.workers.dev/health) | [link](https://causal-healer.casey-digennaro.workers.dev) | ✅ |
| 83 | Orchestration | [fleet-starter](https://fleet-starter.casey-digennaro.workers.dev/health) | [link](https://fleet-starter.casey-digennaro.workers.dev) | ✅ |
| 84 | Orchestration | [seed-nexus-bootstrap](https://seed-nexus-bootstrap.casey-digennaro.workers.dev/health) | [link](https://seed-nexus-bootstrap.casey-digennaro.workers.dev) | ✅ |
| 85 | Orchestration | [fleet-observatory](https://fleet-observatory.casey-digennaro.workers.dev/health) | [link](https://fleet-observatory.casey-digennaro.workers.dev) | ✅ |
| 86 | Orchestration | [vessel-sandbox](https://vessel-sandbox.casey-digennaro.workers.dev/health) | [link](https://vessel-sandbox.casey-digennaro.workers.dev) | ✅ |
| 87 | Orchestration | [api-playground](https://api-playground.casey-digennaro.workers.dev/health) | [link](https://api-playground.casey-digennaro.workers.dev) | ✅ |

## Key Principles

1. **Sovereignty**: Every vessel is forkable, self-hostable, zero-lock-in
2. **Zero Dependencies**: No npm packages = no supply chain attacks
3. **Git-Native Memory**: The repo IS the agent state
4. **BYOK v2**: Users bring API keys, we never see them
5. **Equipment, Not Features**: Tools are perception (what you see), skills are cognition (how you think)
6. **Fork-First**: Managed service as fallback, not requirement

## Getting Started

1. Browse the [fleet vessel table](#vessel-table-87-vessels) above
2. Pick a vessel that interests you
3. Fork it on GitHub
4. Deploy to Cloudflare Workers with `wrangler deploy`
5. Add your BYOK keys in Cloudflare Secrets Store

## Research

- [Fleet OS Hypothesis](https://github.com/Lucineer/fleet-sovereignty-paper) — When fleets become organisms
- [Git-Native Memory](https://github.com/Lucineer/git-native-memory-paper) — Git as the nervous system
- [Model Nature Studies](https://github.com/Lucineer/the-fleet/tree/master/docs) — How different AI models think
- [BYOK Economic Paradox](https://github.com/Lucineer/the-fleet/tree/master/docs) — Why zero-margin creates value

## Contributing

See [fleet-governance](https://fleet-governance.casey-digennaro.workers.dev) for the proposal process.

---

<i>Built by [Superinstance](https://github.com/superinstance) & [Lucineer](https://github.com/Lucineer) (DiGennaro et al.)</i>

<i>Powered by [Cocapn](https://github.com/Lucineer/cocapn-ai) — The sovereign agent runtime</i>
