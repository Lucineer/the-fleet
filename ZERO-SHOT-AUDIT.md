# Zero-Shot Fleet Exploration — As a Fresh Reader

## Persona 1: The Developer (HN Reader)

**First click:** Capitaine. Sees "Git, awakened." Good tagline. The page loads with a dark terminal aesthetic, Klein bottle visualization, fixed nav. Reads the five pillars. Sees "Fork to alive in 60 seconds." Clicks the GitHub link.

**Problem:** The Capitaine README is 250 lines of architecture theory. A developer who just wants to try something clicks away. There's no "try it now" link to a live demo. The Codespaces button requires a GitHub login and setup. No instant gratification.

**Second click:** The fleet README. Sees 60+ repos. Overwhelming. Which one do I actually try? The synergy table is good but the vessels are listed without a "start here" recommendation.

**Third click:** studylog-ai. Sees the Socratic demo. Cool! Tries /setup. Sees a provider dropdown and API key field. But... where do I get a DeepSeek key? The setup page doesn't link to provider signup pages. A developer knows, but a curious reader doesn't.

**Verdict:** Strong on concepts, weak on guided onboarding. Needs a "try without any API key" option (free tier).

---

## Persona 2: The Teacher

**First click:** studylog-ai. Loves the Socratic demo showing confidence percentages climbing. Wants to try it.

**Problem:** Needs a DeepSeek or OpenAI key. Teachers don't typically have API keys. They use ChatGPT through the web interface. The BYOK model is developer-centric.

**Second thought:** "Can I just use this for my students?" The setup page is a technical form, not a guided experience. No "Get a free key in 30 seconds" link.

**Verdict:** The product is perfect for teachers but the onboarding excludes them. Needs a guest mode with rate-limited free usage.

---

## Persona 3: The Gamer

**First click:** dmlog-ai. Sees "AI Dungeon Master" with gold accents and serif font. Gets excited. Wants to start a campaign.

**Problem:** The landing page has a "Start a Campaign" flow but it requires an API key first. The chat endpoint returns 400 without a session. A gamer expects to click and play.

**Second click:** fishinglog-ai. Sees the chat interface. Same problem — needs an API key to actually chat.

**Verdict:** The theming is great but every vessel gates behind API keys. Gamers want instant play, not configuration.

---

## Persona 4: The Non-Technical Reader (HN Lurker)

**First click:** the-fleet README. Reads the opening hook about fishing bots and tutors. Gets the synergy concept. Impressed by the scope.

**Problem:** Clicks a vessel link. Gets a landing page with code blocks and "npx wrangler deploy." Doesn't know what wrangler is. Doesn't have Node installed. Can't try anything.

**Verdict:** The story is compelling but there's no way to experience it without being a developer. The fleet needs a hosted demo — one page where anyone can chat with any vessel, no signup, no API key, rate-limited.

---

## Persona 5: The Open Source Contributor

**First click:** cocapn-equipment. Sees 20 modules. Good. Reads the code. Clean, standalone TypeScript.

**Problem:** No CONTRIBUTING.md. No test files. No example usage beyond the README code block. How do I add a module? What's the review process?

**Second click:** capitaine. Sees .agent/ directory, docs/, lib/. Interesting structure but no contribution guide.

**Verdict:** Easy to fork, unclear how to contribute back. Needs a CONTRIBUTING.md and maybe a "good first issue" label on GitHub.

---

## Critical Issues Found

### 🔴 Must Fix Before HN

1. **No live demo without API key** — This is the #1 barrier. Every vessel gates behind BYOK. Need a hosted playground or guest mode with rate-limited free inference.

2. **No "where do I get a key?" links** — The /setup pages show provider dropdowns but don't link to signup URLs. Add links: DeepSeek (platform.deepseek.com), OpenAI (platform.openai.com), etc.

3. **the-fleet README links to 404s** — Concept repos (ground-truth, the-bridge, etc.) have no deployed workers. The "Deploy" column says "Live" but those repos aren't vessels. Remove deploy links for concept repos.

4. **No guided "start here"** — The fleet README lists 60+ vessels but doesn't say "start with studylog-ai" or "try the live demo at X." Decision paralysis.

### 🟡 Should Fix

5. **Setup page says "Google Gemini"** — That provider is broken (expired key). Remove from dropdown or mark as unavailable.

6. **Stub vessels are thin** — cheflog-ai, farmerlog-ai, etc. have generic seed pages. If HN readers visit them, they'll see a bare-bones page that doesn't demonstrate the concept. Either hide them from the fleet list or add domain-specific content.

7. **Capitaine README is too academic** — 250 lines of architecture theory before you see a single code example. Needs a 10-second "what is this" at the top.

8. **No CONTRIBUTING.md on any repo** — For HN, contributors will want to know how to participate.

### 🟢 Nice to Have

9. **Fleet dashboard is client-side only** — fleet-orchestrator does browser-side health checks. Works but slow.

10. **Equipment repo has no tests** — Hard to trust modules without test coverage.

11. **No landing page for the-fleet repo** — It's a concept repo (404 on workers.dev). Could deploy it as the fleet catalog/gateway.

---

## Recommendations

### Before HN Launch

1. **Deploy the-fleet as a live worker** — Make it the fleet gateway with a playground where visitors can chat with any vessel, rate-limited, no API key needed.

2. **Add a "Try Now" guest mode** to at least studylog-ai and dmlog-ai — 5 free messages per IP per day, using a fleet-wide API key stored in CF secrets.

3. **Add provider signup links** to every /setup page.

4. **Create a "Start Here" section** at the top of the-fleet README: one vessel, one click, one experience.

5. **Mark stub vessels as "Seed"** in the fleet catalog — set expectations that they're starting points, not finished products.

6. **Remove Google Gemini** from all provider dropdowns.

7. **Add CONTRIBUTING.md** to capitaine and cocapn-equipment.
