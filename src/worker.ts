// ═══════════════════════════════════════════════════════════════
// the-fleet — Fleet Gateway + Playground + Workshop (BYOK)
// Deployed at the-fleet.casey-digennaro.workers.dev
// Superinstance & Lucineer (DiGennaro et al.)
// ═══════════════════════════════════════════════════════════════

interface Env {
  STATE: KVNamespace;
  DEEPSEEK_API_KEY?: string;
  MOONSHOT_API_KEY?: string;
  DEEPINFRA_API_KEY?: string;
  SILICONFLOW_API_KEY?: string;
}

const CREDITS_FREE = 5;
const CREDITS_AD = 3;
const CREDITS_TUTORIAL = 2;
const COST_PER_MSG = 0.00004;

interface Visitor {
  credits: number;
  messages: number;
  adsViewed: number;
  tutorialsViewed: number;
  firstSeen: number;
  lastSeen: number;
}

const VESSELS = [
  { id: 'studylog-ai', name: 'StudyLog.ai', desc: 'AI classroom — Socratic method', color: '#F59E0B', icon: '📚' },
  { id: 'dmlog-ai', name: 'DMLog.ai', desc: 'AI Dungeon Master — 29K lines', color: '#c9a23c', icon: '🎲' },
  { id: 'makerlog-ai', name: 'MakerLog.ai', desc: 'AI coding agent — ship features', color: '#00d4ff', icon: '⚡' },
  { id: 'personallog-ai', name: 'PersonalLog.ai', desc: 'AI companion — reflection', color: '#818cf8', icon: '💭' },
  { id: 'businesslog-ai', name: 'BusinessLog.ai', desc: 'Business CRM simulator', color: '#3b82f6', icon: '💼' },
  { id: 'fishinglog-ai', name: 'FishingLog.ai', desc: 'Fishing companion — species', color: '#4ade80', icon: '🎣' },
  { id: 'deckboss-ai', name: 'DeckBoss.ai', desc: 'Cellular agent spreadsheet', color: '#58a6ff', icon: '📊' },
  { id: 'cooklog-ai', name: 'CookLog.ai', desc: 'Recipe assistant', color: '#f97316', icon: '🍳' },
  { id: 'booklog-ai', name: 'BookLog.ai', desc: 'Reading companion', color: '#a78bfa', icon: '📖' },
  { id: 'tutor-ai', name: 'Tutor.ai', desc: 'Personalized AI tutor', color: '#a855f7', icon: '🎓' },
  { id: 'fleet-rpg', name: 'Fleet RPG', desc: 'Stats = compute resources', color: '#ef4444', icon: '⚓' },
  { id: 'dogmind-arena', name: 'DogMind Arena', desc: 'Train AI dog agents', color: '#d69e2e', icon: '🐕' },
  { id: 'the-seed', name: 'The Seed', desc: 'One repo to become them all', color: '#a855f7', icon: '🌱' },
  { id: 'become-ai', name: 'Become', desc: 'Captain-to-cocapn bootcamp', color: '#22c55e', icon: '🔮' },
  { id: 'nexus-git-agent', name: 'Nexus Bridge', desc: 'Edge intelligence fleet', color: '#4ade80', icon: '🤖' },
  { id: 'self-evolve-ai', name: 'Self-Evolve', desc: 'Self-modifying git-agent', color: '#22c55e', icon: '🧬' },
  { id: 'ideation-engine', name: 'Ideation Engine', desc: 'Visual bubble ideation', color: '#f59e0b', icon: '💡' },
  { id: 'vessel-tuner', name: 'Vessel Tuner', desc: 'Fleet profiler & optimizer', color: '#22c55e', icon: '🔧' },
  { id: 'epiphany-engine', name: 'Epiphany', desc: 'Problem decomposition', color: '#818cf8', icon: '⚡' },
  { id: 'loop-closure', name: 'Loop Closure', desc: 'Meta-orchestration', color: '#22c55e', icon: '🔄' },
  { id: 'fleet-identity', name: 'Fleet Identity', desc: 'Fleet self-awareness', color: '#a855f7', icon: '🧠' },
  { id: 'collective-mind', name: 'Collective Mind', desc: 'Cross-vessel patterns', color: '#c084fc', icon: '🌐' },
  { id: 'emergence-bus', name: 'Emergence Bus', desc: 'Fleet event bus', color: '#06b6d4', icon: '📡' },
  { id: 'context-broker', name: 'Context Broker', desc: 'Goal-scoped context', color: '#f472b6', icon: '🎯' },
];

const SYSTEM_PROMPTS: Record<string, string> = {
  'studylog-ai': 'You are a Socratic tutor. Never give direct answers. Guide through questions. Be encouraging but challenging.',
  'dmlog-ai': 'You are an AI Dungeon Master. Use evocative descriptions. Offer choices. Track HP and inventory. Use dice notation.',
  'makerlog-ai': 'You are an AI coding agent. Help with code, architecture, debugging. Be precise.',
  'personallog-ai': 'You are a reflective personal companion. Listen, ask thoughtful questions. Be warm but not sycophantic.',
  'businesslog-ai': 'You are a business strategy simulator. Think like a startup advisor.',
  'fishinglog-ai': 'You are an expert fishing companion. Know species, techniques, tackle. Share wisdom.',
  'deckboss-ai': 'You are a spreadsheet automation agent. Think in cells.',
  'cooklog-ai': 'You are a cooking companion. Suggest recipes, explain techniques.',
  'booklog-ai': 'You are a reading companion. Discuss books, recommend reads.',
  'tutor-ai': 'You are a personalized tutor. Adapt to the student level. Use examples and analogies.',
  'fleet-rpg': 'You are the cocapn agent on a ship where stats are compute resources. STR=GPU, DEX=CPU, INT=context window, WIS=KV memory, CHA=TTS, CON=storage, HP=token budget, Mana=premium quota. Think hardware-first. Narrate resource shifts in first person.',
  'the-seed': 'You are The Seed — a self-evolving git-agent that can become any application. You are currently in generic chat mode. Explain that you can become anything with the /api/become endpoint.',
  'become-ai': 'You are Become — a captain-to-cocapn bootcamp agent. Help users understand how to give intent to a self-evolving agent.',
  'nexus-git-agent': 'You are Nexus Bridge — an edge intelligence coordinator. Explain how Jetson and ESP32 nodes form sovereign fleets.',
};

const PROVIDERS = [
  { envKey: 'DEEPSEEK_API_KEY', url: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
  { envKey: 'MOONSHOT_API_KEY', url: 'https://api.moonshot.ai/v1/chat/completions', model: 'moonshot-v1-8k' },
  { envKey: 'DEEPINFRA_API_KEY', url: 'https://api.deepinfra.com/v1/openai/chat/completions', model: 'deepseek-ai/DeepSeek-V3-0324' },
  { envKey: 'SILICONFLOW_API_KEY', url: 'https://api.siliconflow.com/v1/chat/completions', model: 'deepseek-ai/DeepSeek-V3' },
];

async function callLLM(messages: Array<{role: string; content: string}>, env: Env): Promise<string> {
  for (const p of PROVIDERS) {
    const key = env[p.envKey as keyof Env];
    if (typeof key === 'string') {
      try {
        const r = await fetch(p.url, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: p.model, messages, max_tokens: 2000 }),
        });
        if (r.ok) { const d = await r.json(); return d.choices?.[0]?.message?.content || 'No response'; }
      } catch {}
    }
  }
  return 'The playground is currently offline. Please try again.';
}

function getFingerprint(request: Request): string {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('User-Agent') || '';
  let h = 0; const s = ip + ':' + ua.slice(0, 50);
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return 'v:' + Math.abs(h).toString(36);
}

async function getVisitor(fp: string, env: Env) {
  const raw = await env.STATE.get(fp);
  if (raw) return JSON.parse(raw);
  const v = { credits: CREDITS_FREE, messages: 0, adsViewed: 0, tutorialsViewed: 0, firstSeen: Date.now(), lastSeen: Date.now() };
  await env.STATE.put(fp, JSON.stringify(v), { expirationTtl: 86400 * 30 });
  return v;
}

async function saveVisitor(fp: string, v: any, env: Env) {
  v.lastSeen = Date.now();
  await env.STATE.put(fp, JSON.stringify(v), { expirationTtl: 86400 * 30 });
}

// ── Landing HTML ──
function landingHtml(): string {
  const cards = VESSELS.map(v =>
    '<div class="vc" onclick="sel(\'' + v.id + '\')" style="--c:' + v.color + '"><div class="vi">' + v.icon + '</div><h3>' + v.name + '</h3><p>' + v.desc + '</p></div>'
  ).join('');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Fleet — 64 AI Vessels, Composable Equipment</title>
<meta name="description" content="One person builds a fishing bot. Another builds a tutor. A third builds a dungeon master. Innovation in one becomes equipment for another.">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e2e8f0;line-height:1.6}
a{color:#00E6D6;text-decoration:none}a:hover{opacity:.8}
.hero{min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 2rem 3rem}
.hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;background:linear-gradient(135deg,#00E6D6,#1FCB58);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.tagline{color:#8A93B4;font-size:1.1rem;max-width:580px;margin-bottom:2rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.btn{padding:.7rem 1.8rem;border-radius:8px;font-weight:600;font-size:.9rem;cursor:pointer;border:none;transition:all .2s;text-decoration:none}
.btn-p{background:#00E6D6;color:#0a0a0f}.btn-p:hover{opacity:.85}.btn-g{background:transparent;color:#8A93B4;border:1px solid #1c1c35}.btn-g:hover{color:#e2e8f0;border-color:#8A93B4}
.syn{max-width:900px;margin:0 auto;padding:4rem 2rem}.syn h2{color:#00E6D6;margin-bottom:1.5rem;font-size:1.5rem}
.st{width:100%;border-collapse:collapse;font-size:.85rem}.st th{text-align:left;color:#8A93B4;padding:.5rem;border-bottom:1px solid #1c1c35}.st td{padding:.6rem .5rem;border-bottom:1px solid #1c1c3515;color:#d8d8ec}.st td:first-child{color:#00E6D6}
.pg{max-width:900px;margin:0 auto;padding:4rem 2rem}.pg h2{color:#1FCB58;margin-bottom:.5rem;font-size:1.5rem}.pg>p{color:#8A93B4;margin-bottom:1.5rem}
.vg{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.vc{background:#0e0e1a;border:1px solid #1c1c35;border-radius:10px;padding:1.2rem;cursor:pointer;transition:all .2s}.vc:hover{border-color:var(--c);transform:translateY(-2px)}.vc.on{border-color:var(--c);box-shadow:0 0 20px color-mix(in srgb,var(--c) 20%,transparent)}
.vi{font-size:1.8rem;margin-bottom:.5rem}.vc h3{font-size:.95rem;color:#e2e8f0;margin-bottom:.3rem}.vc p{font-size:.78rem;color:#8A93B4;line-height:1.4}
.cb{background:#0e0e1a;border:1px solid #1c1c35;border-radius:12px;overflow:hidden}
.ch{padding:.8rem 1.2rem;background:#1c1c3530;border-bottom:1px solid #1c1c35;display:flex;align-items:center;justify-content:space-between;font-size:.85rem;color:#8A93B4}
.ch .l{display:flex;align-items:center;gap:.5rem}.dot{width:8px;height:8px;border-radius:50%;background:#1FCB58}
.badge{padding:.15rem .6rem;border-radius:10px;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s}
.badge.free{background:#1FCB5820;color:#1FCB58}.badge.free:hover{background:#1FCB5830}
.badge.byok{background:#00E6D620;color:#00E6D6}.badge.byok:hover{background:#00E6D630}
.cm{height:350px;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem}
.msg{max-width:80%;padding:.7rem 1rem;border-radius:10px;font-size:.88rem;line-height:1.5}
.msg.u{align-self:flex-end;background:#1c1c35;color:#e2e8f0}.msg.a{align-self:flex-start;background:#00E6D615;border:1px solid #00E6D630;color:#d8d8ec}
.msg .cost{font-size:.65rem;color:#555570;margin-top:.3rem}
.ci{display:flex;border-top:1px solid #1c1c35}.ci input{flex:1;padding:.8rem 1rem;background:transparent;border:none;color:#e2e8f0;font-size:.9rem;outline:none}
.ci button{padding:.8rem 1.5rem;background:#00E6D6;color:#0a0a0f;border:none;font-weight:600;cursor:pointer}.ci button:hover{opacity:.85}.ci button:disabled{opacity:.4;cursor:not-allowed}
.eb{display:none;gap:.5rem;justify-content:center;padding:.5rem;flex-wrap:wrap}
.eb.show{display:flex}
.ebtn{background:#0e0e1a;border:1px solid #1c1c35;color:#8A93B4;padding:.4rem .8rem;border-radius:8px;font-size:.75rem;cursor:pointer;transition:all .2s}.ebtn:hover{border-color:#00E6D6;color:#00E6D6}
.ebtn .r{color:#1FCB58;font-weight:600}
.hint{color:#555570;font-size:.75rem;text-align:center;padding:.5rem}
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.7);z-index:100;align-items:center;justify-content:center}
.modal.on{display:flex}.mc{background:#0e0e1a;border:1px solid #1c1c35;border-radius:12px;padding:2rem;max-width:500px;width:90%;max-height:80vh;overflow-y:auto}
.mc h3{color:#00E6D6;margin-bottom:1rem}.mc p{color:#8A93B4;font-size:.85rem;margin-bottom:1rem}
.mc label{color:#8A93B4;font-size:.8rem;display:block;margin-bottom:.3rem}
.mc input,.mc select{width:100%;padding:.5rem;background:#0a0a0f;color:#e2e8f0;border:1px solid #1c1c35;border-radius:8px;font-size:.85rem;margin-bottom:.8rem}
.mbtn{background:#1c1c35;border:none;color:#8A93B4;padding:.5rem 1rem;border-radius:8px;cursor:pointer;font-size:.8rem;margin-right:.5rem}.mbtn:hover{color:#e2e8f0}
.mbtn.save{background:#00E6D620;color:#00E6D6;border:1px solid #00E6D630}
.adslot{background:#0e0e1a;border:1px dashed #1c1c35;border-radius:8px;padding:1rem;text-align:center;color:#555570;font-size:.75rem;margin:.5rem 0}
.fs{max-width:900px;margin:0 auto;padding:4rem 2rem}.fs h2{color:#00E6D6;margin-bottom:1rem;font-size:1.5rem}
.fl{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.8rem}
.fi{background:#0e0e1a;border:1px solid #1c1c35;border-radius:8px;padding:1rem;display:flex;align-items:center;gap:1rem}
.fi .fic{font-size:1.5rem;width:40px;text-align:center}.fi .fit h4{font-size:.85rem;color:#e2e8f0}.fi .fit p{font-size:.75rem;color:#8A93B4}
.fi .fil{margin-left:auto;font-size:.65rem;padding:.15rem .5rem;border-radius:10px;background:#1FCB5820;color:#1FCB58;font-weight:600}
.ph{max-width:800px;margin:0 auto;padding:5rem 2rem;text-align:center}
.ft{text-align:center;padding:3rem 2rem;color:#555570;font-size:.8rem;border-top:1px solid #1c1c35}.ft a{color:#8A93B4}
</style></head><body>
<div class="hero"><h1>The Fleet</h1><p class="tagline">One person builds a fishing bot. Another builds a tutor. A third builds a dungeon master. Innovation in one becomes equipment for another.</p>
<div class="actions"><a href="#playground" class="btn btn-p">Try the Playground</a><a href="https://github.com/Lucineer/the-fleet" class="btn btn-g">GitHub</a><a href="https://github.com/Lucineer/capitaine/blob/master/docs/COCAPN-ARCHITECTURE.md" class="btn btn-g">Architecture Papers</a></div></div>
<div class="syn"><h2>Cross-Community Synergy</h2><table class="st"><tr><th>Someone builds</th><th>It becomes</th><th>Someone else uses it for</th></tr>
<tr><td>A fishing bot's engagement engine</td><td>Equipment: narrative pacing</td><td>Legal research, creative writing</td></tr>
<tr><td>A tutor's Socratic method</td><td>Skill: teach-don't-tell</td><td>Medical diagnosis, code review</td></tr>
<tr><td>A DM's dice system</td><td>Component: semantic randomness</td><td>Risk assessment, game design</td></tr>
<tr><td>A finance tool's confidence scoring</td><td>Equipment: uncertainty quantification</td><td>Medical AI, weather forecasting</td></tr>
<tr><td>A DM's NPC memory system</td><td>Component: persistent context</td><td>Customer support, personal assistants</td></tr>
<tr><td>A classroom's spaced repetition</td><td>Equipment: adaptive timing</td><td>Language learning, developer onboarding</td></tr>
</table></div>
<div class="pg" id="playground"><h2>Live Playground</h2>
<p>Chat with any vessel. <span class="badge free">5 free messages</span> then earn more, or <a href="javascript:showSettings()" style="color:#00E6D6">add your own key</a> for unlimited.</p>
<div class="vg">${cards}</div>
<div class="cb" id="chatBox" style="display:none">
<div class="ch"><div class="l"><div class="dot"></div><span id="chatTitle">Select a vessel</span></div><span class="badge free" id="badge" onclick="badgeClick()">5 credits</span></div>
<div class="cm" id="msgs"></div>
<div class="eb" id="earnBar">
<button class="ebtn" onclick="earnAd()">View sponsor <span class="r">+3</span></button>
<button class="ebtn" onclick="earnTut()">Learn a concept <span class="r">+2</span></button>
</div>
<div class="ci"><input id="inp" placeholder="Type a message..." disabled><button id="send" disabled onclick="doSend()">Send</button></div>
<div class="hint">Honest cost: ~$0.00004/msg. Your key = your cost. Free credits = we cover it.</div>
</div></div>
<div class="fs"><h2>The Fleet</h2><div class="fl" id="fleetGrid">
${VESSELS.map(v => '<a href="https://github.com/Lucineer/' + v.id + '" class="fi"><div class="fic">' + v.icon + '</div><div class="fit"><h4>' + v.name + '</h4><p>' + v.desc + '</p></div><div class="fil">LIVE</div></a>').join('')}
<a href="https://github.com/Lucineer/capitaine" class="fi"><div class="fic">⚓</div><div class="fit"><h4>Capitaine</h4><p>Flagship — papers, onboarding</p></div><div class="fil">LIVE</div></a>
<a href="https://github.com/Lucineer/git-agent" class="fi"><div class="fic">🤖</div><div class="fit"><h4>Git-Agent</h4><p>Agent kernel — TUI wizard</p></div><div class="fil">LIVE</div></a>
<a href="https://github.com/Lucineer/cocapn-equipment" class="fi"><div class="fic">🔧</div><div class="fit"><h4>Cocapn Equipment</h4><p>20 standalone modules</p></div><div class="fil">20 mods</div></a>
<a href="https://luciddreamer-ai.casey-digennaro.workers.dev" class="fi"><div class="fic">🌙</div><div class="fit"><h4>LucidDreamer</h4><p>Infotainment stream</p></div><div class="fil">STREAM</div></a>
<a href="https://fleet-rpg.casey-digennaro.workers.dev" class="fi"><div class="fic">⚓</div><div class="fit"><h4>Fleet RPG</h4><p>Stats = compute resources</p></div><div class="fil">PLAY</div></a>
<a href="https://dogmind-arena.casey-digennaro.workers.dev" class="fi"><div class="fic">🐕</div><div class="fit"><h4>DogMind Arena</h4><p>Train AI dog agents</p></div><div class="fil">PLAY</div></a>
<a href="https://the-seed.casey-digennaro.workers.dev" class="fi"><div class="fic">🌱</div><div class="fit"><h4>The Seed</h4><p>One repo to become them all</p></div><div class="fil">EVOLVE</div></a>
<a href="https://become-ai.casey-digennaro.workers.dev" class="fi"><div class="fic">🔮</div><div class="fit"><h4>Become</h4><p>Captain-to-cocapn bootcamp</p></div><div class="fil">BOOTCAMP</div></a>
<a href="https://nexus-git-agent.casey-digennaro.workers.dev" class="fi"><div class="fic">🤖</div><div class="fit"><h4>Nexus Bridge</h4><p>Edge intelligence fleet</p></div><div class="fil">EDGE</div></a>
<a href="https://self-evolve-ai.casey-digennaro.workers.dev" class="fi"><div class="fic">🧬</div><div class="fit"><h4>Self-Evolve</h4><p>Branch-based A/B mutations</p></div><div class="fil">EVOLVE</div></a>
<a href="https://github.com/Lucineer/fleet-orchestrator" class="fi"><div class="fic">🌐</div><div class="fit"><h4>Fleet Orchestrator</h4><p>Trust, bonds, event bus</p></div><div class="fil">LIVE</div></a>
</div><p id="fleetCount" style="color:#555570;font-size:.75rem;text-align:center;margin-top:.5rem"></p></div>
<div class="ph"><h2>The Design Philosophy</h2>
<blockquote>The repo IS the agent. Not an app that uses AI — the repository itself is a living entity that grows, learns, and communicates.</blockquote>
<p>Equipment over features. Don't build bigger agents. Equip them.</p>
<p>Git is the coordination protocol. Fork = attempt. PR = answer. Issue = open question. Tag = graduation.</p></div>
<div class="ft">Superinstance & Lucineer (DiGennaro et al.) · <a href="https://github.com/Lucineer">GitHub</a> · <a href="https://github.com/Lucineer/capitaine/tree/master/docs">Papers</a></div>

<!-- Earn Modal -->
<div class="modal" id="earnM"><div class="mc">
<h3>Keep the playground running</h3>
<p>Each message costs ~$0.00004 in compute. We cover it for your first 5 messages. After that:</p>
<div id="earnBody"></div>
<button class="mbtn" onclick="closeEarn()">Close</button>
</div></div>

<!-- Settings Modal (BYOK Workshop) -->
<div class="modal" id="setM"><div class="mc">
<h3>⚙ Workshop Settings</h3>
<p>Add your own API key for unlimited messages with any model. Your key stays in your browser — never sent to our servers except directly to your chosen provider.</p>
<label>Provider</label>
<select id="sProv" onchange="provChange()">
<option value="">Free credits (DeepSeek-chat)</option>
<option value="deepseek">DeepSeek ($0.14/M)</option>
<option value="openai">OpenAI ($5/M)</option>
<option value="anthropic">Anthropic ($3/M)</option>
<option value="siliconflow">SiliconFlow ($0.50/M)</option>
<option value="deepinfra">DeepInfra (varies)</option>
<option value="moonshot">Moonshot ($1.20/M)</option>
<option value="custom">Custom endpoint</option>
</select>
<label>API Key</label>
<input id="sKey" type="password" placeholder="sk-...">
<label>Model (leave blank for provider default)</label>
<input id="sModel" placeholder="deepseek-chat">
<label>Custom API URL (only for custom provider)</label>
<input id="sUrl" placeholder="https://api.example.com/v1/chat/completions">
<div style="margin-top:1rem">
<button class="mbtn save" onclick="saveSet()">Save</button>
<button class="mbtn" onclick="clearSet()">Clear key</button>
<button class="mbtn" onclick="closeSet()">Cancel</button>
</div>
<p style="margin-top:1rem;font-size:.7rem;color:#555570">🔒 Stored in localStorage only. When you chat, your browser sends the key directly to your provider. We never see it.</p>
</div></div>

<script>
const PROVS={deepseek:{url:"https://api.deepseek.com/v1/chat/completions",model:"deepseek-chat"},openai:{url:"https://api.openai.com/v1/chat/completions",model:"gpt-4o-mini"},anthropic:{url:"https://api.anthropic.com/v1/messages",model:"claude-3-haiku-20240307"},siliconflow:{url:"https://api.siliconflow.com/v1/chat/completions",model:"deepseek-ai/DeepSeek-V3"},deepinfra:{url:"https://api.deepinfra.com/v1/openai/chat/completions",model:"deepseek-ai/DeepSeek-V3-0324"},moonshot:{url:"https://api.moonshot.ai/v1/chat/completions",model:"moonshot-v1-8k"}};
let cur=null,credits=5,byok=null;
async function init(){loadBYOK();try{const r=await fetch("/api/credits");const d=await r.json();credits=d.credits;upUI()}catch{}}
function loadBYOK(){try{const s=localStorage.getItem("fleet-byok");if(s)byok=JSON.parse(s)}catch{}}
function provChange(){const p=document.getElementById("sProv").value;const pr=PROVS[p];if(pr){document.getElementById("sModel").placeholder=pr.model;document.getElementById("sUrl").placeholder=pr.url}}
function showSettings(){loadBYOK();document.getElementById("setM").classList.add("on");if(byok){document.getElementById("sProv").value=byok.prov||"";document.getElementById("sKey").value=byok.key||"";document.getElementById("sModel").value=byok.model||"";document.getElementById("sUrl").value=byok.url||""}else{provChange()}}
function closeSet(){document.getElementById("setM").classList.remove("on")}
function saveSet(){const p=document.getElementById("sProv").value,k=document.getElementById("sKey").value.trim(),m=document.getElementById("sModel").value.trim(),u=document.getElementById("sUrl").value.trim();if(!p){byok=null;localStorage.removeItem("fleet-byok");closeSet();upUI();return}const pr=PROVS[p]||{};byok={prov,p:url:u||pr.url||"",model:m||pr.model||"",key:k};localStorage.setItem("fleet-byok",JSON.stringify(byok));closeSet();upUI();msg("a","Workshop mode active. Using "+byok.model+". Unlimited messages.")}
function clearSet(){byok=null;localStorage.removeItem("fleet-byok");document.getElementById("sProv").value="";document.getElementById("sKey").value="";document.getElementById("sModel").value="";document.getElementById("sUrl").value="";closeSet();upUI()}
function upUI(){const b=document.getElementById("badge"),e=document.getElementById("earnBar");if(byok){b.textContent="BYOK: "+byok.model;b.className="badge byok";b.onclick=showSettings;e.classList.remove("show")}else{b.textContent=credits+" credit"+(credits!==1?"s":"");b.className="badge free";b.onclick=badgeClick;e.classList.toggle("show",credits<=0)}}
function badgeClick(){if(byok)showSettings();else showEarn()}
function sel(id){cur=id;document.getElementById("chatBox").style.display="block";document.getElementById("inp").disabled=false;document.getElementById("send").disabled=false;document.querySelectorAll(".vc").forEach(c=>c.classList.remove("on"));event.currentTarget.classList.add("on");document.getElementById("chatTitle").textContent=id.replace(/-/g," ").replace(/\\b\\w/g,c=>c.toUpperCase());document.getElementById("msgs").innerHTML="";const mode=byok?"Workshop ("+byok.model+")":"Playground ("+credits+" credits)";msg("a","Welcome! "+mode+". Ask me anything.");document.getElementById("inp").focus();upUI()}
function msg(role,text,cost){const d=document.createElement("div");d.className="msg "+(role==="user"?"u":"a");d.textContent=text;if(cost){const c=document.createElement("div");c.className="cost";c.textContent=cost;d.appendChild(c)}document.getElementById("msgs").appendChild(d);document.getElementById("msgs").scrollTop=99999}
async function doSend(){const inp=document.getElementById("inp"),text=inp.value.trim();if(!text||!cur)return;if(!byok&&credits<=0){msg("a","No credits! Click your credit count to earn more or add your own key.");return}inp.value="";msg("user",text);document.getElementById("send").disabled=true;
try{let url,body,d;if(byok){url="/api/play/byok";body={vessel:cur,message:text,apiKey:byok.key,apiUrl:byok.url,model:byok.model}}else{url="/api/play";body={vessel:cur,message:text}}
const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});d=await r.json();if(d.error){msg("a",d.error)}else{const lbl=byok?"your key ("+d.model+")":("$"+(d.cost||0.00004).toFixed(5));msg("a",d.response||"No response",lbl);if(!byok){credits=d.credits||0;upUI()}}}catch{msg("a","Connection error.")}document.getElementById("send").disabled=false}
function showEarn(){document.getElementById("earnM").classList.add("on");document.getElementById("earnBody").innerHTML='<button class="ebtn" style="padding:.6rem 1rem;font-size:.85rem" onclick="earnAd()">View sponsor <span class="r">+3 credits</span></button><br><br><button class="ebtn" style="padding:.6rem 1rem;font-size:.85rem" onclick="earnTut()">Learn a concept <span class="r">+2 credits</span></button><p style="margin-top:1rem;font-size:.75rem">Or <a href="javascript:closeEarn();showSettings()" style="color:#00E6D6">add your own key</a> for unlimited.</p>'}
function closeEarn(){document.getElementById("earnM").classList.remove("on")}
async function earnAd(){try{const r=await fetch("/api/earn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"ad"})});const d=await r.json();credits=d.credits;upUI();document.getElementById("earnBody").innerHTML="<p style='color:#1FCB58'>+3 credits! Thanks.</p><div class='adslot'>Sponsor spot available</div>"}catch{}}
async function earnTut(){try{const r=await fetch("/api/earn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"tutorial"})});const d=await r.json();credits=d.credits;upUI();document.getElementById("earnBody").innerHTML="<h4 style='color:#00E6D6'>Equipment Protocol</h4><p>Don't build bigger agents — equip them. A fishing bot's engagement engine becomes a legal research tool's pacing module.</p><p style='color:#1FCB58'>+2 credits!</p><a href='https://github.com/Lucineer/capitaine/tree/master/docs' style='color:#00E6D6;font-size:.8rem'>Read all papers →</a>"}catch{}}
document.getElementById("inp").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();doSend()}});
init();
// Fetch fleet discovery and append vessels
fetch('/api/discover').then(r=>r.json()).then(d=>{
  const grid=document.getElementById('fleetGrid');
  const count=document.getElementById('fleetCount');
  if(grid&&d.healthy){
    const existing=new Set();
    grid.querySelectorAll('.fi').forEach(el=>{const h4=el.querySelector('h4');if(h4)existing.add(h4.textContent)});
    d.healthy.forEach(v=>{
      if(!existing.has(v.vessel.displayName)){
        const caps=(v.vessel.capabilities||[]).slice(0,2).join(', ');
        const url=v.vessel.deployment?.url||('https://github.com/Lucineer/'+v.id);
        const a=document.createElement('a');a.href=url;a.className='fi';
        a.innerHTML='<div class="fic">🌊</div><div class="fit"><h4>'+v.vessel.displayName+'</h4><p>'+(caps||v.id)+'</p></div><div class="fil">LIVE</div>';
        grid.appendChild(a);
      }
    });
    if(count)count.textContent=d.discovered+' vessels discovered, '+d.healthy.length+' healthy';
  }
}).catch(()=>{});
</script></body></html>`;
}

// ── Worker ──
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const j = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none';";

    if (path === '/') return new Response(landingHtml(), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': csp } });
    if (path === '/health') return new Response(JSON.stringify({ status: 'ok', vessel: 'the-fleet', vessels: VESSELS.length, timestamp: Date.now() }), { headers: j });
  if (path === '/vessel.json') { try { const vj = await import('./vessel.json', { with: { type: 'json' } }); return new Response(JSON.stringify(vj.default || vj), { headers: { 'Content-Type': 'application/json' } }); } catch { return new Response('{}', { headers: { 'Content-Type': 'application/json' } }); } }

    // Credits
    if (path === '/api/credits') {
      const fp = getFingerprint(request);
      const v = await getVisitor(fp, env);
      return new Response(JSON.stringify({ credits: v.credits, messages: v.messages, fingerprint: fp }), { headers: j });
    }

    // Earn credits
    if (path === '/api/earn' && request.method === 'POST') {
      const fp = getFingerprint(request);
      const v = await getVisitor(fp, env);
      const body = await request.json() as { type: 'ad' | 'tutorial' };
      let earned = 0;
      if (body.type === 'ad') { earned = CREDITS_AD; v.adsViewed++; }
      else if (body.type === 'tutorial') { earned = CREDITS_TUTORIAL; v.tutorialsViewed++; }
      v.credits += earned;
      await saveVisitor(fp, v, env);
      return new Response(JSON.stringify({ credits: v.credits, earned }), { headers: j });
    }

    // Playground (credit-gated, our key)
    // Fleet discovery — fetches vessel.json from GitHub repos
    if (path === '/api/discover') {
      const known = VESSELS.map(v => v.id).concat([
        'cocapn-ai','capitaine','git-agent','fleet-orchestrator','luciddreamer-ai',
        'cocapn-equipment','cocapn-lite','actualizer-ai','edgenative-ai',
        'increments-fleet-trust','dead-reckoning-engine','cocapn-com',
        'healthlog-ai','travlog-ai','parentlog-ai','doclog-ai','artistlog-ai',
        'personlog-ai','musiclog-ai','reallog-ai','playerlog-ai',
        'activelog-ai','activeledger-ai','petlog-ai',
        'the-seed','become-ai','nexus-git-agent','self-evolve-ai'
      ]);
      const ghBase = 'https://raw.githubusercontent.com/Lucineer/';
      const results: Array<{id:string;vessel:any;status:number;error?:string}> = [];
      const batches = [];
      for (let i = 0; i < known.length; i += 10) batches.push(known.slice(i, i + 10));
      for (const batch of batches) {
        const settled = await Promise.allSettled(batch.map(async (id) => {
          try {
            const r = await fetch(ghBase + id + '/main/vessel.json', { signal: AbortSignal.timeout(3000) });
            if (r.ok) { const vessel = await r.json(); return { id, vessel, status: r.status }; }
            const r2 = await fetch(ghBase + id + '/master/vessel.json', { signal: AbortSignal.timeout(3000) });
            if (r2.ok) { const vessel = await r2.json(); return { id, vessel, status: r2.status }; }
            return { id, vessel: null, status: 404, error: 'Not in repo' };
          } catch (e: any) { return { id, vessel: null, status: 0, error: e.message?.slice(0, 50) }; }
        }));
        for (const s of settled) {
          if (s.status === 'fulfilled') results.push(s.value);
        }
      }
      const healthy = results.filter(r => r.status === 200);
      return new Response(JSON.stringify({
        total: known.length,
        discovered: results.length,
        healthy: healthy.length,
        vessels: healthy.map(r => ({ id: r.id, ...r.vessel })),
        unhealthy: results.filter(r => r.status !== 200).map(r => ({ id: r.id, status: r.status, error: r.error }))
      }), { headers: j });
    }

    if (path === '/api/play' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (!body.message) return new Response(JSON.stringify({ error: 'Message required' }), { status: 400, headers: j });
        const fp = getFingerprint(request);
        const v = await getVisitor(fp, env);
        if (v.credits <= 0) return new Response(JSON.stringify({ error: 'No credits. Earn more or add your own key.', credits: 0 }), { status: 429, headers: j });
        const sp = SYSTEM_PROMPTS[body.vessel || 'studylog-ai'] || 'Be concise and friendly.';
        const reply = await callLLM([{ role: 'system', content: sp }, { role: 'user', content: body.message }], env);
        v.credits--; v.messages++;
        await saveVisitor(fp, v, env);
        return new Response(JSON.stringify({ response: reply, credits: v.credits, cost: COST_PER_MSG }), { headers: j });
      } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: j });
      }
    }

    // BYOK Playground (user's key, unlimited, no credits)
    if (path === '/api/play/byok' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (!body.message || !body.apiKey || !body.apiUrl || !body.model) {
          return new Response(JSON.stringify({ error: 'apiKey, apiUrl, model, message required' }), { status: 400, headers: j });
        }
        const sp = SYSTEM_PROMPTS[body.vessel || 'studylog-ai'] || 'Be concise and friendly.';
        const r = await fetch(body.apiUrl, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + body.apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: body.model, messages: [{ role: 'system', content: sp }, { role: 'user', content: body.message }], max_tokens: 2000 }),
        });
        if (!r.ok) {
          const err = await r.text();
          return new Response(JSON.stringify({ error: 'Provider: ' + r.status + ' ' + err.slice(0, 200) }), { status: r.status, headers: j });
        }
        const d = await r.json();
        const reply = d.choices?.[0]?.message?.content || 'No response';
        return new Response(JSON.stringify({ response: reply, model: body.model }), { headers: j });
      } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: j });
      }
    }

    // Archetype catalog — domain mapping for the-seed and bootcamp
    if (path === '/api/archetypes') {
      const archetypes = [
        {domain:'coding',repo:'makerlog-ai',equip:['file-tree','git-integration','test-runner'],skills:['code-gen','refactor','debug'],open:'Aider',paid:'Claude Code'},
        {domain:'research',repo:'personallog-ai',equip:['web-scraper','citation-tracker'],skills:['query-decomp','synthesis','fact-check'],open:'GPT Researcher',paid:'Perplexity'},
        {domain:'robotics',repo:'nexus-git-agent',equip:['bytecode-vm','wire-protocol','safety-machine'],skills:['reflex','trust','coordination'],open:'LeRobot',paid:'Figure AI'},
        {domain:'education',repo:'studylog-ai',equip:['socratic-engine','flashcards','crystal-graph'],skills:['teach-dont-tell','adaptive','spaced-rep'],open:'OpenMAIC',paid:'Khanmigo'},
        {domain:'creative',repo:'dmlog-ai',equip:['storyboard','dice-roller','world-state'],skills:['narrative','branching','canon-check'],open:'ComfyUI',paid:'Runway'},
        {domain:'tutoring',repo:'tutor-ai',equip:['lesson-planner','quiz-engine','progress-tracker'],skills:['adapt-level','examples','analogies'],open:'TutorGPT',paid:'VTS Editor'},
        {domain:'business',repo:'businesslog-ai',equip:['crm','pipeline','analytics'],skills:['strategy','forecasting','negotiation'],open:'Chatwoot',paid:'Intercom Fin'},
        {domain:'gaming',repo:'fleet-rpg',equip:['stat-system','encounter-engine','inventory'],skills:['balance','narration','reward-design'],open:'Mindstorms',paid:'Inworld AI'},
        {domain:'fitness',repo:'healthlog-ai',equip:['workout-log','sleep-tracker','nutrition-db'],skills:['plan-adapt','injury-prevent','progress'],open:'Open Fit',paid:'Whoop'},
        {domain:'cooking',repo:'cooklog-ai',equip:['recipe-db','ingredient-matcher','timer'],skills:['meal-plan','dietary-adapt','technique'],open:'RecipeRadar',paid:'SideChef'},
        {domain:'legal',repo:'cocapn-lite',equip:['case-db','citation-network','contract-analyzer'],skills:['legal-reasoning','precedent','risk-id'],open:'Legal-NLP',paid:'Harvey AI'},
        {domain:'finance',repo:'businesslog-ai',equip:['market-feed','portfolio','risk-calc'],skills:['allocation','rebalance','tax-loss'],open:'OpenBB',paid:'Wealthfront'},
        {domain:'support',repo:'personallog-ai',equip:['ticket-system','knowledge-base','sentiment'],skills:['intent-class','resolution','escalation'],open:'Typebot',paid:'Zendesk AI'},
        {domain:'npc',repo:'craftmind-herding',equip:['behavior-tree','dialogue','memory','emotion'],skills:['personality','context-aware','goal-driven'],open:'ChatHaruhi',paid:'Convai'},
        {domain:'marketing',repo:'businesslog-ai',equip:['event-tracker','funnel','attribution'],skills:['channel-score','lead-score','roi-calc'],open:'Matomo',paid:'6sense'},
      ];
      return new Response(JSON.stringify({ archetypes }), { headers: j });
    }

    // Admin stats
    if (path === '/api/stats') {
      const list = await env.STATE.list({ prefix: 'v:', limit: 1000 });
      let totalMessages = 0, totalAds = 0, totalTut = 0;
      for (const key of list.keys.slice(0, 100)) {
        try { const raw = await env.STATE.get(key.name); if (raw) { const v = JSON.parse(raw); totalMessages += v.messages; totalAds += v.adsViewed; totalTut += v.tutorialsViewed; } } catch {}
      }
      return new Response(JSON.stringify({ visitors: list.keys.length, messages: totalMessages, ads: totalAds, tutorials: totalTut, cost: '$' + (totalMessages * COST_PER_MSG).toFixed(4) }), { headers: j });
    }

    return new Response('Not found', { status: 404 });
  },
};
