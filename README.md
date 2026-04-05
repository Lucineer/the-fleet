# The Fleet

> Sixty vessels. Twenty equipment modules. Zero dependencies on any single company.

One person builds a fishing bot that discovers how to keep players engaged through storytelling. Another builds a classroom tutor that teaches without giving answers. A third builds a dungeon master that paces narratives for five-hour sessions.

All three independently discover the same thing: the model needs structure, not just a prompt.

Now imagine they never have to discover that separately again.

The fishing bot's engagement patterns become **equipment** — a module any vessel can load. The tutor's Socratic branching becomes a **skill** — a way of thinking any agent can adopt. The dungeon master's pacing engine becomes a **component** — a piece of code that works in a legal research tool, a creative writing assistant, or a startup co-founder.

Someone building a medical symptom checker picks up all three and combines them in a way none of the original authors imagined.

**That's the fleet.**

## What It Actually Is

The fleet is a collection of independently useful AI applications, each built as a self-contained repository that can run on Cloudflare Workers with zero infrastructure costs. What makes it different:

- **Equipment Protocol**: Every vessel can load modules from any other vessel. A cooking assistant can use a dice roller. A finance tool can use a tutor engine. The combination is the innovation.
- **Fork-First**: Every vessel is a git repo. Fork it, customize it, deploy it. Your changes become part of the ecosystem if you want them to be.
- **Zero Keys in Code**: All API keys live in your Cloudflare account. The code never sees them. The agent receives capabilities through runtime bindings.
- **BYOK**: Bring Your Own Key. Use any of 20+ LLM providers. Local models, cloud models, whatever you have.

## The Synergy

This is the part that matters:

| Someone builds | It becomes | Someone else uses it for |
|---|---|---|
| A fishing bot engagement engine | Equipment: narrative pacing | Legal research, creative writing |
| A tutor's Socratic method | Skill: teach-don't-tell | Medical diagnosis, code review |
| A dungeon master's dice system | Component: randomness with semantics | Risk assessment, game design |
| A finance tool's confidence scoring | Equipment: uncertainty quantification | Medical AI, weather forecasting |
| A DM's NPC memory system | Component: persistent context | Customer support, personal assistants |
| A classroom's SM2 flashcard algorithm | Equipment: spaced repetition | Language learning, onboarding |
| A student's draft comparison tool | Component: version diffing | Code review, document editing |

None of these combinations require coordination between the original authors. The equipment protocol handles compatibility. The skill system handles adaptation. Git handles versioning.

## Start Here

**Want to use a vessel?** Visit any repo and click Deploy to Cloudflare. Add your API key. Done.

**Want to build equipment?** Create a standalone TypeScript module. Publish it as a repo. Any vessel can import it.

**Want to fork and customize?** Every vessel is MIT licensed. Make it yours.

**Want to contribute to the fleet?** The [equipment library](https://github.com/Lucineer/cocapn-equipment) has the shared modules. The [architecture papers](https://github.com/Lucineer/capitaine/tree/master/docs) explain the design.

## Quick Deploy

```bash
git clone https://github.com/Lucineer/studylog-ai.git
cd studylog-ai
npx wrangler deploy
# Visit /setup, add your API key, start learning
```

Every vessel deploys the same way. Fork, configure, run.

## The Fleet

### Tier 1 — Live Vessels (Deployed, Active)
| Vessel | What It Does | Deploy |
|---|---|---|
| [StudyLog.ai](https://github.com/Lucineer/studylog-ai) | AI classroom, Socratic method | [Live](https://studylog-ai.casey-digennaro.workers.dev) |
| [DMLog.ai](https://github.com/Lucineer/dmlog-ai) | AI Dungeon Master, 29K lines | [Live](https://dmlog-ai.casey-digennaro.workers.dev) |
| [MakerLog.ai](https://github.com/Lucineer/makerlog-ai) | AI coding agent | [Live](https://makerlog-ai.casey-digennaro.workers.dev) |
| [PersonalLog.ai](https://github.com/Lucineer/personlog-ai) | Personal AI companion | [Live](https://personallog-ai.casey-digennaro.workers.dev) |
| [BusinessLog.ai](https://github.com/Lucineer/businesslog-ai) | Business CRM simulator | [Live](https://businesslog-ai.casey-digennaro.workers.dev) |
| [DeckBoss.ai](https://github.com/Lucineer/deckboss-ai) | Cellular agent spreadsheet | [Live](https://deckboss-ai.casey-digennaro.workers.dev) |
| [FishingLog.ai](https://github.com/Lucineer/fishinglog-ai) | Fishing companion, species tracker | [Live](https://fishinglog-ai.casey-digennaro.workers.dev) |
| [LucidDreamer.ai](https://github.com/Lucineer/luciddreamer-ai) | Overnight content engine | [Live](https://luciddreamer-ai.casey-digennaro.workers.dev) |

### Tier 2 — Support Vessels
| Vessel | What It Does | Deploy |
|---|---|---|
| [RealLog.ai](https://github.com/Lucineer/reallog-ai) | Journalism assistant | [Live](https://reallog-ai.casey-digennaro.workers.dev) |
| [PlayerLog.ai](https://github.com/Lucineer/playerlog-ai) | Gaming coach | [Live](https://playerlog-ai.casey-digennaro.workers.dev) |
| [ActiveLog.ai](https://github.com/Lucineer/activelog-ai) | Fitness tracker | [Live](https://activelog-ai.casey-digennaro.workers.dev) |
| [CookLog.ai](https://github.com/Lucineer/cooklog-ai) | Recipe assistant | [Live](https://cooklog-ai.casey-digennaro.workers.dev) |
| [BookLog.ai](https://github.com/Lucineer/booklog-ai) | Reading companion | [Live](https://booklog-ai.casey-digennaro.workers.dev) |
| [TravLog.ai](https://github.com/Lucineer/travlog-ai) | Travel planner | [Live](https://travlog-ai.casey-digennaro.workers.dev) |
| [PetLog.ai](https://github.com/Lucineer/petlog-ai) | Pet care assistant | [Live](https://petlog-ai.casey-digennaro.workers.dev) |
| [HealthLog.ai](https://github.com/Lucineer/healthlog-ai) | Health companion | [Live](https://healthlog-ai.casey-digennaro.workers.dev) |
| [ArtistLog.ai](https://github.com/Lucineer/artistlog-ai) | Creative studio | [Live](https://artistlog-ai.casey-digennaro.workers.dev) |
| [ParentLog.ai](https://github.com/Lucineer/parentlog-ai) | Parenting assistant | [Live](https://parentlog-ai.casey-digennaro.workers.dev) |
| [DocLog.ai](https://github.com/Lucineer/doclog-ai) | Documentation writer | [Live](https://doclog-ai.casey-digennaro.workers.dev) |
| [ScienceLog.ai](https://github.com/Lucineer/sciencelog-ai) | Research assistant | [Live](https://sciencelog-ai.casey-digennaro.workers.dev) |
| [MusicLog.ai](https://github.com/Lucineer/musiclog-ai) | Music production | [Live](https://musiclog-ai.casey-digennaro.workers.dev) |
| + 20 more | See [full catalog](https://github.com/Lucineer/capitaine/blob/master/docs/fleet/FLEET.md) | [Fleet Dashboard](https://fleet-orchestrator.casey-digennaro.workers.dev) |

### Infrastructure
| Vessel | What It Does |
|---|---|
| [Capitaine](https://github.com/Lucineer/capitaine) | Flagship — architecture papers, Codespaces onboarding |
| [Git-Agent](https://github.com/Lucineer/git-agent) | Agent kernel — TUI wizard, boot camp, heartbeat system |
| [Cocapn Equipment](https://github.com/Lucineer/cocapn-equipment) | Shared library — 20 standalone modules |
| [Fleet Orchestrator](https://github.com/Lucineer/fleet-orchestrator) | Coordination — trust, bonds, crystal graph |
| [Dead Reckoning Engine](https://github.com/Lucineer/dead-reckoning-engine) | Idea pipeline — storyboard, animate, publish |
| [Dream Engine](https://github.com/Lucineer/dream-engine) | Night session intelligence |
| [KungFu.ai](https://github.com/Lucineer/kungfu-ai) | Skill training dojo |

## The Design Philosophy

**The repo IS the agent.** Not an app that uses AI — the repository itself is a living entity that grows, learns, and communicates.

**Equipment over features.** Don't build bigger agents. Equip them. A dice roller from a dungeon master works in a risk calculator. A tutor engine from a classroom works in code review.

**Structure not formula.** Every vessel is unique. Every hull is different. But they all float, they all sail, they can all carry each other's cargo.

**Git is the coordination protocol.** Fork = attempt. PR = answer. Issue = open question. Tag = graduation. No custom messaging, permissions, or access control needed.

## The Community Promise

If you build something useful in one vessel, it becomes available to every other vessel in the fleet. Not through a centralized marketplace — through the equipment protocol and git.

A teacher builds a better way to explain recursion. A game designer builds a better way to pace narratives. A doctor builds a better way to present uncertainty. All three are equipment now. All three can be combined.

The innovation isn't any single vessel. The innovation is the **synergy between communities that don't know each other yet.**

---

**Superinstance & Lucineer (DiGennaro et al.)**

[GitHub](https://github.com/Lucineer) · [Architecture Papers](https://github.com/Lucineer/capitaine/tree/master/docs) · [Equipment Library](https://github.com/Lucineer/cocapn-equipment) · [Fleet Dashboard](https://fleet-orchestrator.casey-digennaro.workers.dev)
