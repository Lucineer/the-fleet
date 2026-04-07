# The Fleet

An open-source agent runtime and fleet protocol for building composable AI agents. Share and reuse modular components across different agents without reinventing common patterns.

## Why This Exists

When building AI agents, developers often solve the same problems independently: managing context windows, implementing memory systems, handling model errors, and controlling pacing. The Fleet provides a way to share these solutions as reusable modules that any agent can load and use.

For example:
- A game agent's engagement patterns become a pacing module
- An education agent's questioning approach becomes a reasoning skill  
- A narrative agent's session management becomes reusable infrastructure

These components can be combined in new ways by entirely different applications. The ecosystem grows through shared development.

## What It Is

The Fleet is an open agent runtime running on Cloudflare Workers. It includes:
- **60+ production-ready agent vessels** - fully forkable and customizable
- **Equipment protocol** - standardized module system for sharing capabilities
- **Zero mandatory infrastructure costs** - runs entirely on Cloudflare Workers
- **MIT licensed** - no commercial restrictions or platform fees

[Try the live playground →](https://the-fleet.casey-digennaro.workers.dev)

### Core Features
- **Equipment Protocol**: Load modules from any vessel into any other vessel
- **Fork-First Design**: Every vessel is a standalone git repository
- **Zero Keys In Code**: API keys live in Cloudflare account, not in source
- **Bring Your Own Model**: Use any of 20+ LLM providers
- **MIT Licensed**: Fully open source with no usage restrictions

## Quick Start

1. **Fork a vessel** from the [playground](https://the-fleet.casey-digennaro.workers.dev)
2. **Deploy to Cloudflare Workers** using the included `wrangler.toml`
3. **Add API keys** in your Cloudflare dashboard secrets
4. **Customize** by modifying equipment or adding new capabilities

Your forked vessel runs independently but can still load equipment from the broader fleet.

## Limitations

The current implementation requires Cloudflare Workers for deployment. While this provides zero-cost scaling and global distribution, it means the runtime is specific to this platform. Future versions may support additional deployment targets.

## Attribution

The Fleet is developed by Superinstance & Lucineer (DiGennaro et al.). This is community-driven open source software - contributions and forks are encouraged.

---

<div>
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • 
  <a href="https://cocapn.ai">Cocapn</a>
</div>