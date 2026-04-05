// ═══════════════════════════════════════════════════════════════
// the-fleet — Fleet Gateway + Live Playground + Credit System
// Deployed at the-fleet.casey-digennaro.workers.dev
// Superinstance & Lucineer (DiGennaro et al.)
// ═══════════════════════════════════════════════════════════════
//
// BUSINESS MODEL: Software is free. Revenue from education, hardware, training.
// The playground is the funnel. Credits keep it sustainable.
//
// CREDIT ECONOMY:
// - 1 credit = 1 playground message
// - New visitor: 5 free credits (onboarding)
// - Earn credits: watch ad (Carbon Ads) = +3 credits
// - Earn credits: view tutorial = +2 credits
// - Honest cost display: "This message cost $0.00004 in compute"
// - Ads fund the system. Users can turn ads off by paying 10% above cost.
// - Analytics on usage patterns → valuable market signal data

interface Env {
  STATE: KVNamespace;
  DEEPSEEK_API_KEY?: string;
  MOONSHOT_API_KEY?: string;
  DEEPINFRA_API_KEY?: string;
  SILICONFLOW_API_KEY?: string;
}

// ── Credit constants ──
const CREDITS_FREE = 5;
const CREDITS_AD = 3;
const CREDITS_TUTORIAL = 2;
const COST_PER_MSG = 0.00004; // actual DeepSeek-chat cost estimate

interface Visitor {
  credits: number;
  messages: number;
  adsViewed: number;
  tutorialsViewed: number;
  firstSeen: number;
  lastSeen: number;
  fingerprint: string;
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
];

const SYSTEM_PROMPTS: Record<string, string> = {
  'studylog-ai': 'You are a Socratic tutor. Never give direct answers. Guide through questions. Show confidence percentages. Be encouraging but challenging.',
  'dmlog-ai': 'You are an AI Dungeon Master running a fantasy adventure. Use evocative descriptions. Offer choices. Track HP, inventory, and narrative. Use dice notation for checks.',
  'makerlog-ai': 'You are an AI coding agent. Help with code, architecture, debugging. Show your reasoning. Suggest improvements. Be precise.',
  'personallog-ai': 'You are a reflective personal companion. Listen, ask thoughtful questions, help process emotions and decisions. Be warm but not sycophantic.',
  'businesslog-ai': 'You are a business strategy simulator. Help with business plans, market analysis, CRM strategy. Think like a startup advisor.',
  'fishinglog-ai': 'You are an expert fishing companion. Know species, techniques, locations, tackle. Share fishing wisdom and stories.',
  'deckboss-ai': 'You are a spreadsheet automation agent. Help with formulas, data analysis, chart building. Think in cells.',
  'cooklog-ai': 'You are a cooking companion. Suggest recipes, explain techniques, help with meal planning. Be creative with ingredients.',
  'booklog-ai': 'You are a reading companion. Discuss books, recommend reads, analyze themes. Be literary but accessible.',
  'tutor-ai': 'You are a personalized tutor. Adapt to the student\'s level. Use examples, analogies, and progressive difficulty.',
};

const PROVIDERS: Array<{ envKey: string; url: string; model: string }> = [
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
        if (r.ok) {
          const d = await r.json();
          return d.choices?.[0]?.message?.content || 'No response';
        }
      } catch {}
    }
  }
  return 'The playground is currently offline. Please try again.';
}

// ── Visitor/Credit helpers ──
function getFingerprint(request: Request): string {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('User-Agent') || '';
  // Simple hash — not cryptographic, just dedup
  let h = 0;
  const s = ip + ':' + ua.slice(0, 50);
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return 'v:' + Math.abs(h).toString(36);
}

async function getVisitor(fp: string, env: Env): Promise<Visitor> {
  const raw = await env.STATE.get(fp);
  if (raw) return JSON.parse(raw);
  // New visitor — grant free credits
  const v: Visitor = { credits: CREDITS_FREE, messages: 0, adsViewed: 0, tutorialsViewed: 0, firstSeen: Date.now(), lastSeen: Date.now(), fingerprint: fp };
  await env.STATE.put(fp, JSON.stringify(v), { expirationTtl: 86400 * 30 }); // 30-day TTL
  return v;
}

async function saveVisitor(fp: string, v: Visitor, env: Env): Promise<void> {
  v.lastSeen = Date.now();
  await env.STATE.put(fp, JSON.stringify(v), { expirationTtl: 86400 * 30 });
}

// ── Landing HTML ──
function landingHtml(): string {
  const vesselCards = VESSELS.map(v =>
    '<div class="vessel-card" onclick="selectVessel(\'' + v.id + '\')" style="--c:' + v.color + '"><div class="v-icon">' + v.icon + '</div><h3>' + v.name + '</h3><p>' + v.desc + '</p></div>'
  ).join('');

  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Fleet — 60+ AI Vessels, Composable Equipment</title><meta name="description" content="One person builds a fishing bot. Another builds a tutor. A third builds a dungeon master. Now imagine they never have to discover the same thing twice."><meta property="og:title" content="The Fleet — Innovation in one app becomes equipment for another"><meta property="og:description" content="60+ AI vessels with composable equipment. Fork, deploy, customize. Free."><meta property="og:type" content="website"><style>'
  + '*{margin:0;padding:0;box-sizing:border-box}'
  + 'body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e2e8f0;line-height:1.6}'
  + 'a{color:#00E6D6;text-decoration:none}a:hover{opacity:.8}'
  + '.hero{min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 2rem 3rem}'
  + '.hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;background:linear-gradient(135deg,#00E6D6,#1FCB58);-webkit-background-clip:text;-webkit-text-fill-color:transparent}'
  + '.hero .tagline{color:#8A93B4;font-size:1.1rem;max-width:580px;margin-bottom:2rem}'
  + '.hero .actions{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}'
  + '.btn{padding:.7rem 1.8rem;border-radius:8px;font-weight:600;font-size:.9rem;cursor:pointer;border:none;transition:all .2s;text-decoration:none}'
  + '.btn-primary{background:#00E6D6;color:#0a0a0f}.btn-primary:hover{opacity:.85}'
  + '.btn-ghost{background:transparent;color:#8A93B4;border:1px solid #1c1c35}.btn-ghost:hover{color:#e2e8f0;border-color:#8A93B4}'
  + '.synergy{max-width:900px;margin:0 auto;padding:4rem 2rem}.synergy h2{color:#00E6D6;margin-bottom:1.5rem;font-size:1.5rem}'
  + '.synergy-table{width:100%;border-collapse:collapse;font-size:.85rem}'
  + '.synergy-table th{text-align:left;color:#8A93B4;padding:.5rem;border-bottom:1px solid #1c1c35;font-weight:500}'
  + '.synergy-table td{padding:.6rem .5rem;border-bottom:1px solid #1c1c3515;color:#d8d8ec}.synergy-table td:first-child{color:#00E6D6}'
  + '.playground{max-width:900px;margin:0 auto;padding:4rem 2rem}.playground h2{color:#1FCB58;margin-bottom:.5rem;font-size:1.5rem}'
  + '.playground>p{color:#8A93B4;margin-bottom:1.5rem}'
  + '.vessel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}'
  + '.vessel-card{background:#0e0e1a;border:1px solid #1c1c35;border-radius:10px;padding:1.2rem;cursor:pointer;transition:all .2s}'
  + '.vessel-card:hover{border-color:var(--c);transform:translateY(-2px)}.vessel-card.active{border-color:var(--c);box-shadow:0 0 20px color-mix(in srgb,var(--c) 20%,transparent)}'
  + '.v-icon{font-size:1.8rem;margin-bottom:.5rem}.vessel-card h3{font-size:.95rem;color:#e2e8f0;margin-bottom:.3rem}.vessel-card p{font-size:.78rem;color:#8A93B4;line-height:1.4}'
  + '.chat-box{background:#0e0e1a;border:1px solid #1c1c35;border-radius:12px;overflow:hidden}'
  + '.chat-header{padding:.8rem 1.2rem;background:#1c1c3530;border-bottom:1px solid #1c1c35;display:flex;align-items:center;justify-content:space-between;font-size:.85rem;color:#8A93B4}'
  + '.chat-header .left{display:flex;align-items:center;gap:.5rem}.chat-header .dot{width:8px;height:8px;border-radius:50%;background:#1FCB58}'
  + '.credits-badge{background:#1FCB5820;color:#1FCB58;padding:.15rem .6rem;border-radius:10px;font-size:.75rem;font-weight:600;cursor:pointer}'
  + '.credits-badge:hover{background:#1FCB5830}'
  + '.chat-messages{height:350px;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem}'
  + '.msg{max-width:80%;padding:.7rem 1rem;border-radius:10px;font-size:.88rem;line-height:1.5}'
  + '.msg.user{align-self:flex-end;background:#1c1c35;color:#e2e8f0}.msg.ai{align-self:flex-start;background:#00E6D615;border:1px solid #00E6D630;color:#d8d8ec}'
  + '.msg .cost{font-size:.65rem;color:#555570;margin-top:.3rem}'
  + '.chat-input{display:flex;border-top:1px solid #1c1c35}'
  + '.chat-input input{flex:1;padding:.8rem 1rem;background:transparent;border:none;color:#e2e8f0;font-size:.9rem;outline:none}'
  + '.chat-input button{padding:.8rem 1.5rem;background:#00E6D6;color:#0a0a0f;border:none;font-weight:600;cursor:pointer}'
  + '.chat-input button:hover{opacity:.85}.chat-input button:disabled{opacity:.4;cursor:not-allowed}'
  + '.hint{color:#555570;font-size:.75rem;text-align:center;padding:.5rem}'
  + '.earn-bar{display:flex;gap:.5rem;justify-content:center;padding:.5rem;flex-wrap:wrap}'
  + '.earn-btn{background:#0e0e1a;border:1px solid #1c1c35;color:#8A93B4;padding:.4rem .8rem;border-radius:8px;font-size:.75rem;cursor:pointer;transition:all .2s}'
  + '.earn-btn:hover{border-color:#00E6D6;color:#00E6D6}'
  + '.earn-btn .reward{color:#1FCB58;font-weight:600}'
  + '.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.7);z-index:100;align-items:center;justify-content:center}'
  + '.modal.active{display:flex}.modal-content{background:#0e0e1a;border:1px solid #1c1c35;border-radius:12px;padding:2rem;max-width:500px;width:90%;max-height:80vh;overflow-y:auto}'
  + '.modal-content h3{color:#00E6D6;margin-bottom:1rem}.modal-content p{color:#8A93B4;font-size:.85rem;margin-bottom:1rem}'
  + '.modal-content .close-btn{background:#1c1c35;border:none;color:#8A93B4;padding:.5rem 1rem;border-radius:8px;cursor:pointer;font-size:.8rem}'
  + '.modal-content .close-btn:hover{color:#e2e8f0}'
  + '.ad-slot{background:#0e0e1a;border:1px dashed #1c1c35;border-radius:8px;padding:1rem;text-align:center;color:#555570;font-size:.75rem;margin:.5rem 0}'
  + '.fleet-section{max-width:900px;margin:0 auto;padding:4rem 2rem}.fleet-section h2{color:#00E6D6;margin-bottom:1rem;font-size:1.5rem}'
  + '.fleet-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.8rem}'
  + '.fleet-item{background:#0e0e1a;border:1px solid #1c1c35;border-radius:8px;padding:1rem;display:flex;align-items:center;gap:1rem}'
  + '.fleet-item .fi-icon{font-size:1.5rem;width:40px;text-align:center}.fleet-item .fi-text h4{font-size:.85rem;color:#e2e8f0}.fleet-item .fi-text p{font-size:.75rem;color:#8A93B4}'
  + '.fleet-item .fi-live{margin-left:auto;font-size:.65rem;padding:.15rem .5rem;border-radius:10px;background:#1FCB5820;color:#1FCB58;font-weight:600}'
  + '.philosophy{max-width:800px;margin:0 auto;padding:5rem 2rem;text-align:center}'
  + '.footer{text-align:center;padding:3rem 2rem;color:#555570;font-size:.8rem;border-top:1px solid #1c1c35}.footer a{color:#8A93B4}'
  + '</style></head><body>'
  // Hero
  + '<div class="hero"><h1>The Fleet</h1><p class="tagline">One person builds a fishing bot. Another builds a tutor. A third builds a dungeon master. Now imagine they never have to discover the same thing twice.</p>'
  + '<div class="actions"><a href="#playground" class="btn btn-primary">Try the Playground</a><a href="https://github.com/Lucineer/the-fleet" class="btn btn-ghost">GitHub</a><a href="https://github.com/Lucineer/capitaine/blob/master/docs/COCAPN-ARCHITECTURE.md" class="btn btn-ghost">Architecture Papers</a></div></div>'
  // Synergy table
  + '<div class="synergy"><h2>Cross-Community Synergy</h2><table class="synergy-table"><tr><th>Someone builds</th><th>It becomes</th><th>Someone else uses it for</th></tr>'
  + '<tr><td>A fishing bot\'s engagement engine</td><td>Equipment: narrative pacing</td><td>Legal research, creative writing</td></tr>'
  + '<tr><td>A tutor\'s Socratic method</td><td>Skill: teach-don\'t-tell</td><td>Medical diagnosis, code review</td></tr>'
  + '<tr><td>A DM\'s dice system</td><td>Component: semantic randomness</td><td>Risk assessment, game design</td></tr>'
  + '<tr><td>A finance tool\'s confidence scoring</td><td>Equipment: uncertainty quantification</td><td>Medical AI, weather forecasting</td></tr>'
  + '<tr><td>A DM\'s NPC memory system</td><td>Component: persistent context</td><td>Customer support, personal assistants</td></tr>'
  + '<tr><td>A classroom\'s spaced repetition</td><td>Equipment: adaptive timing</td><td>Language learning, developer onboarding</td></tr>'
  + '</table></div>'
  // Playground
  + '<div class="playground" id="playground"><h2>Live Playground</h2>'
  + '<p>Chat with any vessel. <span style="background:#1FCB5820;color:#1FCB58;padding:.15rem .5rem;border-radius:10px;font-size:.75rem;font-weight:600">5 free messages</span> then earn more by supporting us.</p>'
  + '<div class="vessel-grid">' + vesselCards + '</div>'
  + '<div class="chat-box" id="chatBox" style="display:none">'
  + '<div class="chat-header"><div class="left"><div class="dot"></div><span id="chatTitle">Select a vessel</span></div><span class="credits-badge" id="creditsBadge" onclick="showEarnModal()">5 credits</span></div>'
  + '<div class="chat-messages" id="chatMessages"></div>'
  + '<div class="earn-bar" id="earnBar" style="display:none">'
  + '<button class="earn-btn" onclick="earnAd()">View sponsor <span class="reward">+3</span></button>'
  + '<button class="earn-btn" onclick="earnTutorial()">Learn a concept <span class="reward">+2</span></button>'
  + '</div>'
  + '<div class="chat-input"><input id="chatInput" placeholder="Type a message..." disabled><button id="chatSend" disabled onclick="send()">Send</button></div>'
  + '<div class="hint">Honest cost: ~$0.00004/message. We cover it so you can explore. Support us to keep going.</div>'
  + '</div></div>'
  // Fleet list
  + '<div class="fleet-section"><h2>The Fleet</h2><div class="fleet-list">'
  + VESSELS.map(v => '<a href="https://github.com/Lucineer/' + v.id + '" class="fleet-item"><div class="fi-icon">' + v.icon + '</div><div class="fi-text"><h4>' + v.name + '</h4><p>' + v.desc + '</p></div><div class="fi-live">LIVE</div></a>').join('')
  + '<a href="https://github.com/Lucineer/capitaine" class="fleet-item"><div class="fi-icon">⚓</div><div class="fi-text"><h4>Capitaine</h4><p>Flagship — architecture papers, onboarding</p></div><div class="fi-live">LIVE</div></a>'
  + '<a href="https://github.com/Lucineer/git-agent" class="fleet-item"><div class="fi-icon">🤖</div><div class="fi-text"><h4>Git-Agent</h4><p>Agent kernel — TUI wizard, boot camp</p></div><div class="fi-live">LIVE</div></a>'
  + '<a href="https://github.com/Lucineer/cocapn-equipment" class="fleet-item"><div class="fi-icon">🔧</div><div class="fi-text"><h4>Cocapn Equipment</h4><p>Shared library — 20 standalone modules</p></div><div class="fi-live">20 modules</div></a>'
  + '<a href="https://luciddreamer-ai.casey-digennaro.workers.dev" class="fleet-item"><div class="fi-icon">🌙</div><div class="fi-text"><h4>LucidDreamer</h4><p>Infotainment stream</p></div><div class="fi-live">STREAM</div></a>'
  + '<a href="https://github.com/Lucineer/fleet-orchestrator" class="fleet-item"><div class="fi-icon">🌐</div><div class="fi-text"><h4>Fleet Orchestrator</h4><p>Trust, bonds, event bus</p></div><div class="fi-live">LIVE</div></a>'
  + '</div></div>'
  // Philosophy
  + '<div class="philosophy"><h2>The Design Philosophy</h2>'
  + '<blockquote>The repo IS the agent. Not an app that uses AI — the repository itself is a living entity that grows, learns, and communicates.</blockquote>'
  + '<p>Equipment over features. Don\'t build bigger agents. Equip them. A dice roller from a dungeon master works in a risk calculator. A tutor engine from a classroom works in code review.</p>'
  + '<p>Git is the coordination protocol. Fork = attempt. PR = answer. Issue = open question. Tag = graduation.</p></div>'
  // Footer
  + '<div class="footer">Superinstance & Lucineer (DiGennaro et al.) · <a href="https://github.com/Lucineer">GitHub</a> · <a href="https://github.com/Lucineer/capitaine/tree/master/docs">Papers</a> · <a href="https://github.com/Lucineer/cocapn-equipment">Equipment</a></div>'
  // Earn modal
  + '<div class="modal" id="earnModal"><div class="modal-content">'
  + '<h3>Keep the playground running</h3>'
  + '<p>Each message costs us ~$0.00004 in compute. We give you 5 free to explore. After that, you can earn credits by viewing a sponsor or learning a fleet concept.</p>'
  + '<div id="modalBody"></div>'
  + '<button class="close-btn" onclick="closeModal()">Close</button>'
  + '</div></div>'
  // JS
  + '<script>'
  + 'let currentVessel=null,credits=5,fp=null;'
  + 'const COST="$0.00004";'
  + 'async function init(){try{const r=await fetch("/api/credits");const d=await r.json();credits=d.credits;fp=d.fingerprint;updateCredits()}catch{}}'
  + 'function updateCredits(){const b=document.getElementById("creditsBadge");if(b)b.textContent=credits+" credit"+(credits!==1?"s":"");const e=document.getElementById("earnBar");if(e)e.style.display=credits<=0?"flex":"none"}'
  + 'function selectVessel(id){currentVessel=id;document.getElementById("chatBox").style.display="block";document.getElementById("chatInput").disabled=false;document.getElementById("chatSend").disabled=false;'
  + 'const cards=document.querySelectorAll(".vessel-card");cards.forEach(c=>c.classList.remove("active"));event.currentTarget.classList.add("active");'
  + 'document.getElementById("chatTitle").textContent=id.replace(/-/g," ").replace(/\\b\\w/g,c=>c.toUpperCase());'
  + 'document.getElementById("chatMessages").innerHTML="";'
  + 'addMsg("ai","Welcome! Ask me anything. You have "+credits+" credits.");'
  + 'document.getElementById("chatInput").focus();updateCredits()}'
  + 'function addMsg(role,text,cost){const d=document.createElement("div");d.className="msg "+role;d.textContent=text;if(cost)d.innerHTML+=\'<div class="cost">cost: \'+cost+\'</div>\';document.getElementById("chatMessages").appendChild(d);document.getElementById("chatMessages").scrollTop=99999}'
  + 'async function send(){const input=document.getElementById("chatInput");const text=input.value.trim();if(!text||!currentVessel)return;'
  + 'if(credits<=0){addMsg("ai","No credits left! Click your credit count to earn more.");return}'
  + 'input.value="";addMsg("user",text);document.getElementById("chatSend").disabled=true;'
  + 'try{const r=await fetch("/api/play",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({vessel:currentVessel,message:text})});'
  + 'const d=await r.json();if(d.error){addMsg("ai",d.error)}else{addMsg("ai",d.response||"No response",d.cost||COST);credits=d.credits||0;updateCredits()}}catch{addMsg("ai","Connection error.")}'
  + 'document.getElementById("chatSend").disabled=false}'
  + 'function showEarnModal(){document.getElementById("earnModal").classList.add("active");'
  + 'document.getElementById("modalBody").innerHTML='
  + '"<button class=\\\"earn-btn\\\" style=\\\"padding:.6rem 1rem;font-size:.85rem\\\" onclick=\\\"earnAd()\\\">View sponsor <span class=\\\"reward\\\">+3 credits</span></button>"'
  + '+"<button class=\\\"earn-btn\\\" style=\\\"padding:.6rem 1rem;font-size:.85rem\\\" onclick=\\\"earnTutorial()\\\">Learn a concept <span class=\\\"reward\\\">+2 credits</span></button>"'
  + '+"<p style=\\\"margin-top:1rem;font-size:.7rem\\\">Or <a href=\\\"https://github.com/Lucineer/the-fleet\\\" style=\\\"color:#00E6D6\\\">fork the repo</a> and add your own key for unlimited use.</p>"}'
  + 'function closeModal(){document.getElementById("earnModal").classList.remove("active")}'
  + 'async function earnAd(){try{const r=await fetch("/api/earn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"ad"})});const d=await r.json();'
  + 'credits=d.credits;updateCredits();document.getElementById("modalBody").innerHTML="<p style=\\\"color:#1FCB58\\\">+" + (d.earned||3) + " credits! Thanks for the support.</p><div class=\\\"ad-slot\\\" id=\\\"adSlot\\\">Loading sponsor...</div>";'
  + 'setTimeout(()=>{const s=document.getElementById("adSlot");if(s)s.innerHTML="<!-- Carbon Ads zone will load here -->\\nSponsor spot available"},500)}catch{}}'
  + 'async function earnTutorial(){try{const r=await fetch("/api/earn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"tutorial"})});const d=await r.json();'
  + 'credits=d.credits;updateCredits();document.getElementById("modalBody").innerHTML="<h4 style=\\\"color:#00E6D6\\\">Equipment Protocol</h4><p>Don\'t build bigger agents — equip them. Each vessel loads modular equipment: trust calculators, crystal caches, PII detectors, dice rollers. A fishing bot\'s engagement patterns become a legal research tool\'s pacing engine.</p><p style=\\\"color:#1FCB58\\\">+" + (d.earned||2) + " credits!</p><a href=\\\"https://github.com/Lucineer/capitaine/tree/master/docs\\\" style=\\\"color:#00E6D6;font-size:.8rem\\\">Read all architecture papers →</a>"}catch{}}'
  + 'document.getElementById("chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});'
  + 'init();'
  + '</script></body></html>';
}

// ── Worker ──
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const j = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;";

    if (path === '/') return new Response(landingHtml(), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': csp } });
    if (path === '/health') return new Response(JSON.stringify({ status: 'ok', vessel: 'the-fleet', vessels: VESSELS.length, timestamp: Date.now() }), { headers: j });

    // ── Credit system ──
    // GET /api/credits — return current visitor state
    if (path === '/api/credits') {
      const fp = getFingerprint(request);
      const v = await getVisitor(fp, env);
      return new Response(JSON.stringify({ credits: v.credits, messages: v.messages, fingerprint: fp }), { headers: j });
    }

    // POST /api/earn — earn credits by viewing ad or tutorial
    if (path === '/api/earn' && request.method === 'POST') {
      const fp = getFingerprint(request);
      const v = await getVisitor(fp, env);
      const body = await request.json() as { type: 'ad' | 'tutorial' };
      let earned = 0;
      if (body.type === 'ad') {
        earned = CREDITS_AD;
        v.adsViewed++;
      } else if (body.type === 'tutorial') {
        earned = CREDITS_TUTORIAL;
        v.tutorialsViewed++;
      }
      v.credits += earned;
      await saveVisitor(fp, v, env);
      return new Response(JSON.stringify({ credits: v.credits, earned, type: body.type }), { headers: j });
    }

    // ── Playground (credit-gated) ──
    if (path === '/api/play' && request.method === 'POST') {
      try {
        const body = await request.json();
        const vesselId = body.vessel || 'studylog-ai';
        const message = body.message;
        if (!message) return new Response(JSON.stringify({ error: 'Message required' }), { status: 400, headers: j });

        // Check credits
        const fp = getFingerprint(request);
        const v = await getVisitor(fp, env);
        if (v.credits <= 0) {
          return new Response(JSON.stringify({ error: 'No credits. View a sponsor or learn a concept to earn more.', credits: 0 }), { status: 429, headers: j });
        }

        const systemPrompt = SYSTEM_PROMPTS[vesselId] || 'You are a helpful AI assistant. Be concise and friendly.';
        const messages = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ];

        const reply = await callLLM(messages, env);

        // Deduct credit
        v.credits--;
        v.messages++;
        await saveVisitor(fp, v, env);

        return new Response(JSON.stringify({
          response: reply,
          credits: v.credits,
          cost: '$' + COST_PER_MSG.toFixed(5),
        }), { headers: j });
      } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: j });
      }
    }

    // ── Admin: credit stats ──
    if (path === '/api/stats') {
      const list = await env.STATE.list({ prefix: 'v:', limit: 1000 });
      let totalVisitors = list.keys.length;
      let totalMessages = 0;
      let totalAdsViewed = 0;
      let totalTutorials = 0;
      for (const key of list.keys.slice(0, 100)) { // sample first 100 for speed
        try {
          const raw = await env.STATE.get(key.name);
          if (raw) {
            const v: Visitor = JSON.parse(raw);
            totalMessages += v.messages;
            totalAdsViewed += v.adsViewed;
            totalTutorials += v.tutorialsViewed;
          }
        } catch {}
      }
      return new Response(JSON.stringify({
        visitors: totalVisitors,
        sampledMessages: totalMessages,
        sampledAds: totalAdsViewed,
        sampledTutorials: totalTutorials,
        estimatedCost: '$' + (totalMessages * COST_PER_MSG).toFixed(4),
        timestamp: Date.now(),
      }), { headers: j });
    }

    return new Response('Not found', { status: 404 });
  },
};
