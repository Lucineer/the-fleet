// ═══════════════════════════════════════════════════════════════
// the-fleet — Fleet Gateway + Live Playground
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

const VESSELS = [
  { id: 'studylog-ai', name: 'StudyLog.ai', desc: 'AI classroom — Socratic method, live', color: '#F59E0B', icon: '📚' },
  { id: 'dmlog-ai', name: 'DMLog.ai', desc: 'AI Dungeon Master — 29K lines of adventure', color: '#c9a23c', icon: '🎲' },
  { id: 'makerlog-ai', name: 'MakerLog.ai', desc: 'AI coding agent — watch it ship features', color: '#00d4ff', icon: '⚡' },
  { id: 'personallog-ai', name: 'PersonalLog.ai', desc: 'AI companion — holds space for reflection', color: '#818cf8', icon: '💭' },
  { id: 'businesslog-ai', name: 'BusinessLog.ai', desc: 'Business CRM simulator', color: '#3b82f6', icon: '💼' },
  { id: 'fishinglog-ai', name: 'FishingLog.ai', desc: 'Fishing companion — species tracker', color: '#4ade80', icon: '🎣' },
  { id: 'deckboss-ai', name: 'DeckBoss.ai', desc: 'Cellular agent spreadsheet', color: '#58a6ff', icon: '📊' },
  { id: 'cooklog-ai', name: 'CookLog.ai', desc: 'Recipe assistant and meal planner', color: '#f97316', icon: '🍳' },
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
  return 'The playground is currently offline. Add your own API key at /setup to use any vessel directly.';
}

function landingHtml(): string {
  const vesselCards = VESSELS.map(v => '<div class="vessel-card" onclick="selectVessel(\'' + v.id + '\')" style="--c:' + v.color + '"><div class="v-icon">' + v.icon + '</div><h3>' + v.name + '</h3><p>' + v.desc + '</p></div>').join('\n');

  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Fleet — 60+ AI Vessels, Composable Equipment</title><meta name="description" content="One person builds a fishing bot. Another builds a tutor. A third builds a dungeon master. Now imagine they never have to discover the same thing twice."><meta property="og:title" content="The Fleet — Innovation in one app becomes equipment for another"><meta property="og:description" content="60+ AI vessels with composable equipment. Fork, deploy, customize. Free."><meta property="og:type" content="website"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e2e8f0;line-height:1.6}a{color:#00E6D6;text-decoration:none}a:hover{opacity:.8}.hero{min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 2rem 3rem}.hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;background:linear-gradient(135deg,#00E6D6,#1FCB58);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero .tagline{color:#8A93B4;font-size:1.1rem;max-width:580px;margin-bottom:2rem}.hero .actions{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}.btn{padding:.7rem 1.8rem;border-radius:8px;font-weight:600;font-size:.9rem;cursor:pointer;border:none;transition:all .2s;text-decoration:none}.btn-primary{background:#00E6D6;color:#0a0a0f}.btn-primary:hover{opacity:.85}.btn-ghost{background:transparent;color:#8A93B4;border:1px solid #1c1c35}.btn-ghost:hover{color:#e2e8f0;border-color:#8A93B4}.synergy{max-width:900px;margin:0 auto;padding:4rem 2rem}.synergy h2{color:#00E6D6;margin-bottom:1.5rem;font-size:1.5rem}.synergy-table{width:100%;border-collapse:collapse;font-size:.85rem}.synergy-table th{text-align:left;color:#8A93B4;padding:.5rem;border-bottom:1px solid #1c1c35;font-weight:500}.synergy-table td{padding:.6rem .5rem;border-bottom:1px solid #1c1c3515;color:#d8d8ec}.synergy-table td:first-child{color:#00E6D6}.playground{max-width:900px;margin:0 auto;padding:4rem 2rem}.playground h2{color:#1FCB58;margin-bottom:.5rem;font-size:1.5rem}.playground>p{color:#8A93B4;margin-bottom:1.5rem}.vessel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}.vessel-card{background:#0e0e1a;border:1px solid #1c1c35;border-radius:10px;padding:1.2rem;cursor:pointer;transition:all .2s}.vessel-card:hover{border-color:var(--c);transform:translateY(-2px)}.vessel-card.active{border-color:var(--c);box-shadow:0 0 20px color-mix(in srgb,var(--c) 20%,transparent)}.v-icon{font-size:1.8rem;margin-bottom:.5rem}.vessel-card h3{font-size:.95rem;color:#e2e8f0;margin-bottom:.3rem}.vessel-card p{font-size:.78rem;color:#8A93B4;line-height:1.4}.chat-box{background:#0e0e1a;border:1px solid #1c1c35;border-radius:12px;overflow:hidden}.chat-header{padding:.8rem 1.2rem;background:#1c1c3530;border-bottom:1px solid #1c1c35;display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:#8A93B4}.chat-header .dot{width:8px;height:8px;border-radius:50%;background:#1FCB58}.chat-messages{height:350px;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem}.msg{max-width:80%;padding:.7rem 1rem;border-radius:10px;font-size:.88rem;line-height:1.5}.msg.user{align-self:flex-end;background:#1c1c35;color:#e2e8f0}.msg.ai{align-self:flex-start;background:#00E6D615;border:1px solid #00E6D630;color:#d8d8ec}.chat-input{display:flex;border-top:1px solid #1c1c35}.chat-input input{flex:1;padding:.8rem 1rem;background:transparent;border:none;color:#e2e8f0;font-size:.9rem;outline:none}.chat-input button{padding:.8rem 1.5rem;background:#00E6D6;color:#0a0a0f;border:none;font-weight:600;cursor:pointer}.chat-input button:hover{opacity:.85}.chat-input button:disabled{opacity:.4;cursor:not-allowed}.fleet-section{max-width:900px;margin:0 auto;padding:4rem 2rem}.fleet-section h2{color:#00E6D6;margin-bottom:1rem;font-size:1.5rem}.fleet-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.8rem}.fleet-item{background:#0e0e1a;border:1px solid #1c1c35;border-radius:8px;padding:1rem;display:flex;align-items:center;gap:1rem}.fleet-item .fi-icon{font-size:1.5rem;width:40px;text-align:center}.fleet-item .fi-text h4{font-size:.85rem;color:#e2e8f0}.fleet-item .fi-text p{font-size:.75rem;color:#8A93B4}.fleet-item .fi-live{margin-left:auto;font-size:.65rem;padding:.15rem .5rem;border-radius:10px;background:#1FCB5820;color:#1FCB58;font-weight:600}.philosophy{max-width:800px;margin:0 auto;padding:5rem 2rem;text-align:center}.philosophy h2{color:#00E6D6;margin-bottom:1.5rem;font-size:1.5rem}.philosophy blockquote{font-size:1.1rem;color:#d8d8ec;font-style:italic;line-height:1.8;border-left:3px solid #00E6D6;padding-left:1.5rem;text-align:left;margin-bottom:2rem}.philosophy p{color:#8A93B4;max-width:600px;margin:0 auto 1rem}.footer{text-align:center;padding:3rem 2rem;color:#555570;font-size:.8rem;border-top:1px solid #1c1c35}.footer a{color:#8A93B4}.hint{color:#555570;font-size:.75rem;text-align:center;padding:.5rem}</style></head><body><div class="hero"><h1>The Fleet</h1><p class="tagline">One person builds a fishing bot. Another builds a tutor. A third builds a dungeon master. Now imagine they never have to discover the same thing twice.</p><div class="actions"><a href="#playground" class="btn btn-primary">Try the Playground</a><a href="https://github.com/Lucineer/the-fleet" class="btn btn-ghost">GitHub</a><a href="https://github.com/Lucineer/capitaine/blob/master/docs/COCAPN-ARCHITECTURE.md" class="btn btn-ghost">Architecture Papers</a></div></div><div class="synergy"><h2>Cross-Community Synergy</h2><table class="synergy-table"><tr><th>Someone builds</th><th>It becomes</th><th>Someone else uses it for</th></tr><tr><td>A fishing bot\'s engagement engine</td><td>Equipment: narrative pacing</td><td>Legal research, creative writing</td></tr><tr><td>A tutor\'s Socratic method</td><td>Skill: teach-don\'t-tell</td><td>Medical diagnosis, code review</td></tr><tr><td>A DM\'s dice system</td><td>Component: semantic randomness</td><td>Risk assessment, game design</td></tr><tr><td>A finance tool\'s confidence scoring</td><td>Equipment: uncertainty quantification</td><td>Medical AI, weather forecasting</td></tr><tr><td>A DM\'s NPC memory system</td><td>Component: persistent context</td><td>Customer support, personal assistants</td></tr><tr><td>A classroom\'s spaced repetition</td><td>Equipment: adaptive timing</td><td>Language learning, developer onboarding</td></tr></table></div><div class="playground" id="playground"><h2>Live Playground</h2><p>Chat with any vessel. No API key needed. Rate-limited for exploration.</p><div class="vessel-grid">' + vesselCards + '</div><div class="chat-box" id="chatBox" style="display:none"><div class="chat-header"><div class="dot"></div><span id="chatTitle">Select a vessel above</span></div><div class="chat-messages" id="chatMessages"></div><div class="chat-input"><input id="chatInput" placeholder="Type a message..." disabled><button id="chatSend" disabled onclick="send()">Send</button></div><div class="hint">Free tier: 5 messages per session. For unlimited, fork and add your own key.</div></div></div><div class="fleet-section"><h2>The Fleet</h2><div class="fleet-list">' + VESSELS.map(v => '<a href="https://github.com/Lucineer/' + v.id + '" class="fleet-item"><div class="fi-icon">' + v.icon + '</div><div class="fi-text"><h4>' + v.name + '</h4><p>' + v.desc + '</p></div><div class="fi-live">LIVE</div></a>').join('') + '<a href="https://github.com/Lucineer/capitaine" class="fleet-item"><div class="fi-icon">⚓</div><div class="fi-text"><h4>Capitaine</h4><p>Flagship — architecture papers, onboarding</p></div><div class="fi-live">LIVE</div></a><a href="https://github.com/Lucineer/git-agent" class="fleet-item"><div class="fi-icon">🤖</div><div class="fi-text"><h4>Git-Agent</h4><p>Agent kernel — TUI wizard, boot camp</p></div><div class="fi-live">LIVE</div></a><a href="https://github.com/Lucineer/cocapn-equipment" class="fleet-item"><div class="fi-icon">🔧</div><div class="fi-text"><h4>Cocapn Equipment</h4><p>Shared library — 20 standalone modules</p></div><div class="fi-live">20 modules</div></a><a href="https://luciddreamer-ai.casey-digennaro.workers.dev" class="fleet-item"><div class="fi-icon">🌙</div><div class="fi-text"><h4>LucidDreamer</h4><p>Infotainment stream — stories, reviews, tutorials</p></div><div class="fi-live">STREAM</div></a><a href="https://github.com/Lucineer/fleet-orchestrator" class="fleet-item"><div class="fi-icon">🌐</div><div class="fi-text"><h4>Fleet Orchestrator</h4><p>22 endpoints — trust, bonds, dream engine</p></div><div class="fi-live">LIVE</div></a><a href="https://github.com/Lucineer/dead-reckoning-engine" class="fleet-item"><div class="fi-icon">🧭</div><div class="fi-text"><h4>Dead Reckoning</h4><p>Expensive models storyboard, cheap animate</p></div><div class="fi-live">LIVE</div></a><a href="https://github.com/Lucineer/kungfu-ai" class="fleet-item"><div class="fi-icon">🥋</div><div class="fi-text"><h4>KungFu.ai</h4><p>The dojo — test training methods</p></div><div class="fi-live">LIVE</div></a></div></div><div class="philosophy"><h2>The Design Philosophy</h2><blockquote>The repo IS the agent. Not an app that uses AI — the repository itself is a living entity that grows, learns, and communicates.</blockquote><p>Equipment over features. Don\'t build bigger agents. Equip them. A dice roller from a dungeon master works in a risk calculator. A tutor engine from a classroom works in code review.</p><p>Structure not formula. Every vessel is unique. Every hull is different. But they all float, they all sail, they can all carry each other\'s cargo.</p><p>Git is the coordination protocol. Fork = attempt. PR = answer. Issue = open question. Tag = graduation.</p></div><div class="footer">Superinstance & Lucineer (DiGennaro et al.) · <a href="https://github.com/Lucineer">GitHub</a> · <a href="https://github.com/Lucineer/capitaine/tree/master/docs">Architecture Papers</a> · <a href="https://github.com/Lucineer/cocapn-equipment">Equipment Library</a></div><script>let currentVessel=null;let msgCount=0;function selectVessel(id){currentVessel=id;document.getElementById("chatBox").style.display="block";document.getElementById("chatInput").disabled=false;document.getElementById("chatSend").disabled=false;document.getElementById("chatTitle").textContent=document.querySelector(".vessel-card.active h3")?.textContent||id;document.querySelectorAll(".vessel-card").forEach(c=>c.classList.remove("active"));event.currentTarget.classList.add("active");document.getElementById("chatMessages").innerHTML="";msgCount=0;addMsg("ai","Welcome! I\'m "+id.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())+". Ask me anything to get started.");document.getElementById("chatInput").focus()}function addMsg(role,text){const d=document.createElement("div");d.className="msg "+role;d.textContent=text;document.getElementById("chatMessages").appendChild(d);document.getElementById("chatMessages").scrollTop=99999}async function send(){const input=document.getElementById("chatInput");const text=input.value.trim();if(!text||!currentVessel)return;if(msgCount>=5){addMsg("ai","You\'ve used your 5 free messages! Fork the repo and add your own key for unlimited chat.");return}input.value="";addMsg("user",text);msgCount++;document.getElementById("chatSend").disabled=true;try{const r=await fetch("/api/play",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({vessel:currentVessel,message:text})});const d=await r.json();addMsg("ai",d.response||d.error||"Something went wrong.")}catch(e){addMsg("ai","Connection error. Try again.")}document.getElementById("chatSend").disabled=false}document.getElementById("chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}})</script></body></html>';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const j = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;";

    if (path === '/') return new Response(landingHtml(), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': csp } });
    if (path === '/health') return new Response(JSON.stringify({ status: 'ok', vessel: 'the-fleet', vessels: VESSELS.length, timestamp: Date.now() }), { headers: j });

    // Rate-limited playground — uses fleet API key
    if (path === '/api/play' && request.method === 'POST') {
      try {
        const body = await request.json();
        const vesselId = body.vessel || 'studylog-ai';
        const message = body.message;
        if (!message) return new Response(JSON.stringify({ error: 'Message required' }), { status: 400, headers: j });

        const systemPrompt = SYSTEM_PROMPTS[vesselId] || 'You are a helpful AI assistant. Be concise and friendly.';
        const messages = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ];

        const reply = await callLLM(messages, env);
        return new Response(JSON.stringify({ response: reply }), { headers: j });
      } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: j });
      }
    }

    return new Response('Not found', { status: 404 });
  },
};
