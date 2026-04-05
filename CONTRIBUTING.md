# Contributing to The Fleet

Welcome. Here's how to participate.

## Adding Equipment

1. Create a standalone TypeScript module in [cocapn-equipment](https://github.com/Lucineer/cocapn-equipment)
2. Zero dependencies between modules
3. Works in Cloudflare Workers (no Node.js builtins beyond Web APIs)
4. Export types and functions
5. Open a PR with a description of what it does and which vessel it came from

## Building a Vessel

1. Fork [cocapn-lite](https://github.com/Lucineer/cocapn-lite) as your seed
2. Customize the landing page, system prompt, and domain logic
3. Import equipment from cocapn-equipment
4. Deploy to Cloudflare Workers
5. Add your repo to the fleet catalog via PR on [the-fleet](https://github.com/Lucineer/the-fleet)

## Adding Your Vessel to the Fleet

Open a PR on [the-fleet](https://github.com/Lucineer/the-fleet) adding your vessel to the VESSELS array in `src/worker.ts` with:
- `id`: your repo name
- `name`: display name
- `desc`: one-line description
- `color`: brand hex color
- `icon`: single emoji
- `systemPrompt`: how your vessel behaves

## Philosophy

- **Equipment over features** — modular, composable, reusable
- **Structure not formula** — every vessel unique, all functional
- **Zero keys in code** — secrets through runtime bindings
- **Fork-first** — power users fork, casual users visit the playground

## Code Style

- TypeScript, no runtime deps
- Inline HTML serving (no ASSETS binding)
- CSP headers on all HTML responses
- MIT license, Superinstance & Lucineer attribution
