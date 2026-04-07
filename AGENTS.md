# AGENTS.md — Copilot CLI / Claude Code / Any Coding Agent

You are a coding agent working on **The Fleet**, the Cocapn release vehicle and vessel catalog.

## Quick Context
- This is a Cloudflare Worker deployed on Workers Free tier
- Single file: `src/worker.ts` (~600 lines)
- KV binding: `FLEET_KV` for vessel registry data
- Secrets: DEEPSEEK_API_KEY, SILICONFLOW_API_KEY
- Branch: `master`

## Key Rules
- ALL HTML must be inline in worker.ts (no separate files, no build step)
- No template literals with `${}` inside HTML strings (breaks esbuild)
- Use string concatenation for dynamic HTML: `'<div class="' + cls + '">'`
- CSP headers required on all HTML responses (use CSP_OBJ constant)
- No external CSS/JS files except `/features.js` pattern
- vessel.json must be present at repo root
- Fleet footer HTML must link to cocapn.ai and the-fleet

## When Making UI Changes
1. Edit the `getLanding()` function in src/worker.ts
2. Test locally: `npx wrangler dev`
3. Deploy: `CLOUDFLARE_API_TOKEN=xxx npx wrangler deploy`
4. Verify: curl the URL, check health, check vessel.json

## Fleet Vessel Grid
The landing page has a vessel grid. To add a new vessel:
1. Add the vessel object to the VESSELS array in getLanding()
2. Include: name, url, desc, color, icon
3. Push to master and deploy

## Do NOT
- Add npm dependencies (zero runtime deps)
- Use separate HTML/JS/CSS files
- Break CSP by adding unsafe domains
- Use template literals in HTML strings

Superinstance & Lucineer (DiGennaro et al.)
