/* CODE 7 — story game engine (web) */
'use strict';

/* =============== setup =============== */
const SUPABASE_URL = 'https://cbzpfwivbkjhxuzxnhqc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNienBmd2l2YmtqaHh1enhuaHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNzczNDQsImV4cCI6MjExMDc1MzM0NH0.-3PD1kPWcBB_qrW31NrVb_on1llii8AWhyV8GWSWi-4';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* lines that will have recorded voice files (audio/H-xxx.mp3) — all other lines are text-only */
const RECORDED = new Set(['H-001','H-002','H-003','H-004','H-005','H-006','H-007','H-010','H-011','H-012','H-013','H-014','H-015','H-020','H-021','H-022','H-023','H-024','H-030','H-031','H-032','H-033','H-034','H-040','H-041','H-045','H-046','H-047','H-050','H-051','H-055','H-056','H-057','H-058','H-059','H-060','H-061','H-062','H-063','H-064','H-070','H-071','H-072','H-075','H-080','H-090','H-100','H-101','H-102','H-110','H-111','H-112','H-113','H-114','H-115','H-116','H-120','H-121','H-122','H-123','H-124','H-125','H-130','H-131','H-132','H-133','H-134','H-135','H-140','H-141','H-142','H-143','H-144','H-145','H-150','H-151','H-152','H-153','H-154','H-155','H-160','H-161','H-162','H-163','H-164','H-165','H-170','H-171','H-172','H-173','H-174','H-180','H-181','H-200','H-201','H-210','H-211','H-212','H-213','H-214','H-215','H-220','H-221','H-222','H-223','H-224','H-225','H-230','H-231','H-232','H-233','H-234','H-235','H-236','H-240','H-241','H-242','H-243','H-244','H-245','H-260','H-261','H-262','H-263','H-264','H-265','H-270','H-271','H-290','H-291','H-292','H-293','H-294','H-295','H-296','H-297']);
const METERS = {cas:'سلامة المصابين', trust:'ثقة المجتمع', team:'سلامة الفريق', prin:'الالتزام بالمبادئ'};
const DIFFS = {calm:{label:'هادئ', secs:0}, pressure:{label:'ضغط', secs:15}, nightmare:{label:'كابوس', secs:8}};
const VISITOR_DOMAIN = 'code7.ercsinai.app';

const el = id => document.getElementById(id);
const AR = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const todayStr = () => new Date().toISOString().slice(0, 10);

let DATA = {seasons: [], lines: {}, bank: null};
let ME = null;            // {userId, type, name, phone}
let P = null;             // progress object (see defaultProgress)
let SETTINGS = JSON.parse(localStorage.getItem('code7-settings') || '{}');
if (!SETTINGS.difficulty) SETTINGS.difficulty = 'pressure';
if (SETTINGS.muted === undefined) SETTINGS.muted = false;
function saveSettings() { localStorage.setItem('code7-settings', JSON.stringify(SETTINGS)); }

function defaultProgress() {
  return {episodes: {}, current_ep: 's1e1', free_points: 0, streak_count: 0, streak_last: null, daily_last: null, seen_seasons: []};
}
function storyPoints() { return Object.values(P.episodes).reduce((s, e) => s + (e.points || 0), 0); }
function totalPoints() { return storyPoints() + (P.free_points || 0); }
function totalStars() { return Object.values(P.episodes).reduce((s, e) => s + (e.stars || 0), 0); }
function rankFor(pts) { return pts >= 400 ? 'قائد فريق' : pts >= 240 ? 'مسعف ميداني' : pts >= 100 ? 'متطوع نشط' : 'متطوع جديد'; }
function epDone(id) { return !!P.episodes[id]; }
function seasonDone(snum) { return DATA.seasons[snum - 1].episodes.every(e => epDone(e.id)); }
function allEpisodes() { return DATA.seasons.flatMap(s => s.episodes.map(e => ({...e, season: s}))); }
function nextEpisodeId(id) { const all = allEpisodes(); const i = all.findIndex(e => e.id === id); return i >= 0 && i < all.length - 1 ? all[i + 1].id : null; }
function epUnlocked(ep) {
  const all = allEpisodes(); const i = all.findIndex(e => e.id === ep.id);
  if (i === 0) return true;
  return epDone(all[i - 1].id);
}

/* =============== audio =============== */
const _audio = {};
function snd(name) {
  if (SETTINGS.muted) return null;
  if (!_audio[name]) { const a = new Audio('assets/snd-' + name + '.wav'); a.preload = 'auto'; _audio[name] = a; }
  const a = _audio[name];
  try { a.currentTime = 0; a.play().catch(() => {}); } catch (e) {}
  return a;
}
let hb = {cur: null, name: null};
function heartbeat(mode) { // 'normal' | 'slow' | 'dying' | null
  if (hb.name === mode) return;
  if (hb.cur) { try { hb.cur.pause(); } catch (e) {} hb.cur = null; }
  hb.name = mode;
  if (!mode || SETTINGS.muted) return;
  const name = mode === 'normal' ? 'heartbeat' : mode === 'slow' ? 'heartbeat-slow' : 'heartbeat-dying';
  if (!_audio[name]) { const a = new Audio('assets/snd-' + name + '.wav'); a.loop = true; _audio[name] = a; }
  hb.cur = _audio[name];
  try { hb.cur.currentTime = 0; hb.cur.play().catch(() => {}); } catch (e) {}
}
function stopHeartbeat() { heartbeat(null); }
let CURRENT_LINE_AUDIO = null;
function stopLineAudio() {
  if (CURRENT_LINE_AUDIO) {
    try { CURRENT_LINE_AUDIO.pause(); CURRENT_LINE_AUDIO.currentTime = 0; } catch (e) {}
    CURRENT_LINE_AUDIO = null;
  }
}
function lineAudio(lineId) {
  if (!lineId || !RECORDED.has(lineId) || SETTINGS.muted) return null;
  stopLineAudio(); // Haneen speaks one line at a time — never two voices together
  const a = new Audio('audio/' + lineId + '.mp3');
  CURRENT_LINE_AUDIO = a;
  const pr = a.play(); if (pr && pr.catch) pr.catch(() => { try { a.dispatchEvent(new Event('playfailed')); } catch (e) {} });
  return a;
}

/* =============== typewriter =============== */
function typewrite(node, text, lineId) {
  if (node._tw) { clearTimeout(node._tw); node._tw = null; }
  node.textContent = '';
  const __aud = lineAudio(lineId);
  let i = 0;
  const full = text || '';
  let per = 26; // ms per char when there is no voice to follow
  if (__aud) {
    const setPace = () => { if (isFinite(__aud.duration) && __aud.duration > 0) per = Math.max(16, (__aud.duration * 880) / Math.max(full.length, 1)); };
    if (isFinite(__aud.duration) && __aud.duration > 0) setPace(); else __aud.addEventListener('loadedmetadata', setPace, { once: true });
  }
  const step = () => { if (i < full.length) { i++; node.textContent = full.slice(0, i); node._tw = setTimeout(step, per); } else node._tw = null; };
  step();
  node.onclick = () => { if (node._tw) { clearTimeout(node._tw); node._tw = null; } node.textContent = full; };
  return __aud;
}
function bubbleHTML(img, who) {
  return `<div class="haneen-row"><img src="assets/${img || 'haneen-full.webp'}" alt="القائدة حنين">
    <div class="bubble"><div class="who">${who || 'القائدة حنين'}</div><div class="txt"></div></div></div>`;
}
const HANEEN_LINES = new Set(['H-001','H-002','H-003','H-004','H-005','H-006','H-007','H-010','H-011','H-012','H-013','H-014','H-015','H-020','H-021','H-022','H-023','H-024','H-030','H-031','H-032','H-033','H-034','H-040','H-041','H-055','H-056','H-058','H-059','H-060','H-061','H-062','H-063','H-064','H-090']);
function setBubble(container, line, img) {
  const mine = HANEEN_LINES.has(line.id);
  container.innerHTML = bubbleHTML(mine ? img : 'volunteer.webp', mine ? 'القائدة حنين' : 'متطوعة الهلال الأحمر');
  return typewrite(container.querySelector('.txt'), line.text, line.id);
}
function lineById(id) { return DATA.lines[id] || {id, text: ''}; }

/* =============== screens =============== */
const SCREENS = ['scr-auth', 'scr-home', 'scr-play', 'scr-free', 'scr-board', 'scr-card', 'scr-library'];
function show(id) {
  SCREENS.forEach(s => el(s).classList.toggle('hidden', s !== id));
  stopHeartbeat();
  window.scrollTo(0, 0);
}

/* =============== persistence =============== */
function saveLocal() { if (ME) localStorage.setItem('code7-progress-' + ME.userId, JSON.stringify(P)); }
async function syncUp() {
  if (!ME) return;
  saveLocal();
  const row = {
    user_id: ME.userId, player_type: ME.type, display_name: ME.name, phone: ME.phone || null,
    total_points: totalPoints(), episodes: P.episodes, current_ep: P.current_ep,
    free_points: P.free_points || 0, streak_count: P.streak_count || 0,
    streak_last: P.streak_last, daily_last: P.daily_last, seen_seasons: P.seen_seasons || [],
    updated_at: new Date().toISOString()
  };
  try { await sb.from('game_progress').upsert(row); } catch (e) { /* offline: local copy stands */ }
}
async function loadProgress(userId) {
  let server = null;
  try {
    const r = await sb.from('game_progress').select('*').eq('user_id', userId).maybeSingle();
    if (r.data) server = r.data;
  } catch (e) {}
  const local = JSON.parse(localStorage.getItem('code7-progress-' + userId) || 'null');
  if (server) {
    const sp = {episodes: server.episodes || {}, current_ep: server.current_ep || 's1e1',
      free_points: server.free_points || 0, streak_count: server.streak_count || 0,
      streak_last: server.streak_last, daily_last: server.daily_last || null, seen_seasons: server.seen_seasons || []};
    const localPts = local ? Object.values(local.episodes || {}).reduce((s, e) => s + (e.points || 0), 0) + (local.free_points || 0) : -1;
    const serverPts = Object.values(sp.episodes).reduce((s, e) => s + (e.points || 0), 0) + sp.free_points;
    P = Object.assign(defaultProgress(), localPts > serverPts ? local : sp);
    ME.type = server.player_type; ME.name = server.display_name; ME.phone = server.phone;
    return true;
  }
  if (local) { P = Object.assign(defaultProgress(), local); return true; }
  P = defaultProgress();
  return false;
}
function touchStreak() {
  const t = todayStr();
  if (P.streak_last === t) return null;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  const gap = P.streak_last && P.streak_last !== y;
  P.streak_count = (P.streak_last === y) ? (P.streak_count || 0) + 1 : 1;
  P.streak_last = t;
  if (gap && P.streak_count === 1) return lineById('H-058');
  if (P.streak_count === 3) return lineById('H-055');
  if (P.streak_count === 7) return lineById('H-056');
  return null;
}

/* =============== auth =============== */
function msg(node, text, ok) { node.textContent = text || ''; node.className = 'msg ' + (ok ? 'ok' : 'err'); }
function visitorEmail(phone) { return 'v' + String(phone).replace(/\D/g, '') + '@' + VISITOR_DOMAIN; }

async function enterGame() {
  await syncUp();
  renderHome();
  show('scr-home');
}
async function makeVolunteerRow(user, profile) {
  let name = (profile && (profile.full_name || profile.name)) || '';
  if (!name && profile && profile.membership_no) {
    try { const r = await sb.rpc('check_membership', {p_no: String(profile.membership_no)}); if (r.data && r.data.full_name) name = r.data.full_name; } catch (e) {}
  }
  ME = {userId: user.id, type: 'volunteer', name: name || 'متطوع الهلال', phone: (profile && profile.phone) || null};
  const had = await loadProgress(user.id);
  ME.type = 'volunteer';
  if (!had) P = defaultProgress();
  if (name) ME.name = name;
  await enterGame();
}
async function routeAfterLogin(user) {
  const had = await loadProgress(user.id);
  if (had && ME.type) { await enterGame(); return; }
  let profile = null;
  try { const r = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle(); profile = r.data; } catch (e) {}
  if (profile && profile.membership_no) { await makeVolunteerRow(user, profile); return; }
  if ((user.email || '').endsWith('@' + VISITOR_DOMAIN)) {
    ME = {userId: user.id, type: 'visitor', name: 'زائر', phone: null};
    P = defaultProgress();
    await enterGame(); return;
  }
  ME = {userId: user.id, type: 'volunteer', name: '', phone: null};
  el('authMain').classList.add('hidden');
  el('authVisitor').classList.add('hidden');
  el('authVolunteer').classList.remove('hidden');
  el('volLoggedOut').classList.add('hidden');
  el('volSignup').classList.add('hidden');
  el('volClaim').classList.remove('hidden');
  show('scr-auth');
}

function wireAuth() {
  el('btnIamVolunteer').onclick = () => { snd('click'); el('authMain').classList.add('hidden'); el('authVisitor').classList.add('hidden'); el('authVolunteer').classList.remove('hidden'); };
  el('btnIamVisitor').onclick = () => { snd('click'); el('authMain').classList.add('hidden'); el('authVolunteer').classList.add('hidden'); el('authVisitor').classList.remove('hidden'); };
  document.querySelectorAll('[data-back]').forEach(b => b.onclick = () => {
    el('authVolunteer').classList.add('hidden'); el('authVisitor').classList.add('hidden'); el('authMain').classList.remove('hidden');
  });
  el('linkVolSignup').onclick = () => { el('volLoggedOut').classList.add('hidden'); el('volSignup').classList.remove('hidden'); };

  el('btnVolLogin').onclick = async () => {
    const email = el('vEmail').value.trim(), pass = el('vPass').value;
    if (!email || !pass) return msg(el('volMsg'), 'اكتب البريد وكلمة السر.');
    el('btnVolLogin').disabled = true;
    const r = await sb.auth.signInWithPassword({email, password: pass});
    el('btnVolLogin').disabled = false;
    if (r.error) return msg(el('volMsg'), 'الدخول ما تمش: تأكد من البريد وكلمة السر.');
    routeAfterLogin(r.data.user);
  };
  el('btnVolSignup').onclick = async () => {
    const email = el('sEmail').value.trim(), pass = el('sPass').value,
          no = el('sMemberNo').value.trim(), phone = el('sPhone').value.trim();
    if (!email || pass.length < 6 || !no || !phone) return msg(el('signupMsg'), 'كمّل كل الخانات، وكلمة السر ٦ أحرف على الأقل.');
    el('btnVolSignup').disabled = true;
    const chk = await sb.rpc('check_membership', {p_no: no}).catch(() => null);
    if (chk && chk.data && chk.data.ok === false) { el('btnVolSignup').disabled = false; return msg(el('signupMsg'), 'رقم العضوية ده مش نشط أو مش موجود. راجع إدارة الفرع.'); }
    const r = await sb.auth.signUp({email, password: pass});
    if (r.error) { el('btnVolSignup').disabled = false; return msg(el('signupMsg'), 'الحساب ما اتعملش: ' + (r.error.message.includes('already') ? 'البريد ده مسجل قبل كده، جرّب الدخول.' : 'حصلت مشكلة، جرّب تاني.')); }
    const cl = await sb.rpc('claim_membership', {p_no: no, p_phone: phone}).catch(() => null);
    el('btnVolSignup').disabled = false;
    if (cl && cl.error) return msg(el('signupMsg'), 'الحساب اتعمل بس ربط العضوية فشل. ادخل وسنربطه من جوه.');
    const user = r.data.user || (await sb.auth.getUser()).data.user;
    if (user) routeAfterLogin(user); else msg(el('signupMsg'), 'الحساب اتعمل. ادخل دلوقتي من زر دخول المتطوعين.', true);
  };
  el('btnVolClaim').onclick = async () => {
    const no = el('cMemberNo').value.trim(), phone = el('cPhone').value.trim();
    if (!no || !phone) return msg(el('claimMsg'), 'اكتب رقم العضوية والتليفون.');
    el('btnVolClaim').disabled = true;
    const cl = await sb.rpc('claim_membership', {p_no: no, p_phone: phone}).catch(() => null);
    el('btnVolClaim').disabled = false;
    if (!cl || cl.error) return msg(el('claimMsg'), 'الربط ما تمش: تأكد إن الرقم نشط وإن محدش ربطه قبلك.');
    const user = (await sb.auth.getUser()).data.user;
    let profile = null;
    try { const r = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle(); profile = r.data; } catch (e) {}
    makeVolunteerRow(user, profile || {membership_no: no, phone});
  };

  el('tabVisNew').onclick = () => { el('tabVisNew').classList.add('on'); el('tabVisOld').classList.remove('on'); el('visNew').classList.remove('hidden'); el('visOld').classList.add('hidden'); };
  el('tabVisOld').onclick = () => { el('tabVisOld').classList.add('on'); el('tabVisNew').classList.remove('on'); el('visOld').classList.remove('hidden'); el('visNew').classList.add('hidden'); };
  el('btnVisSignup').onclick = async () => {
    const name = el('gName').value.trim(), phone = el('gPhone').value.trim(), pin = el('gPin').value;
    if (name.length < 3) return msg(el('visNewMsg'), 'اكتب اسمك (٣ أحرف على الأقل).');
    if (!/^0\d{10}$/.test(phone.replace(/\s/g, ''))) return msg(el('visNewMsg'), 'رقم التليفون لازم يكون ١١ رقم ويبدأ بـ ٠.');
    if (pin.length < 6) return msg(el('visNewMsg'), 'الرقم السري لازم ٦ أحرف/أرقام على الأقل.');
    el('btnVisSignup').disabled = true;
    const r = await sb.auth.signUp({email: visitorEmail(phone), password: pin});
    el('btnVisSignup').disabled = false;
    if (r.error) return msg(el('visNewMsg'), r.error.message.includes('already') ? 'الرقم ده مسجل قبل كده — ادخل من «عندي حساب».' : 'التسجيل ما تمش، جرّب تاني.');
    ME = {userId: r.data.user.id, type: 'visitor', name, phone};
    P = defaultProgress();
    await enterGame();
  };
  el('btnVisLogin').onclick = async () => {
    const phone = el('gPhone2').value.trim(), pin = el('gPin2').value;
    if (!phone || !pin) return msg(el('visOldMsg'), 'اكتب التليفون والرقم السري.');
    el('btnVisLogin').disabled = true;
    const r = await sb.auth.signInWithPassword({email: visitorEmail(phone), password: pin});
    el('btnVisLogin').disabled = false;
    if (r.error) return msg(el('visOldMsg'), 'الدخول ما تمش: تأكد من الرقم والرقم السري.');
    ME = {userId: r.data.user.id, type: 'visitor', name: 'زائر', phone};
    const had = await loadProgress(r.data.user.id);
    if (!had) { ME.name = 'زائر'; P = defaultProgress(); }
    await enterGame();
  };
  el('btnLogout').onclick = async () => { await sb.auth.signOut(); location.reload(); };
}

/* =============== home =============== */
function renderHome() {
  el('pcAvatar').textContent = (ME.name || '؟').trim().charAt(0);
  el('pcName').textContent = ME.name;
  el('pcMeta').textContent = (ME.type === 'volunteer' ? 'متطوع — الهلال الأحمر' : 'زائر') + ' · الرتبة: ' + rankFor(totalPoints());
  el('pcPoints').textContent = AR(totalPoints());
  el('pcStars').textContent = AR(totalStars()) + ' / ' + AR(allEpisodes().length * 3);
  el('pcStreak').textContent = AR(P.streak_count || 0);
  el('btnMute').textContent = SETTINGS.muted ? '🔇' : '🔊';
  document.querySelectorAll('#diffRow button').forEach(b => b.classList.toggle('on', b.dataset.diff === SETTINGS.difficulty));
  // home bubble: streak / daily / welcome lines
  let line = null;
  if (P.daily_last !== todayStr() && seasonDone(1)) line = lineById('H-080');
  if (!line) line = pick([lineById('H-013'), lineById('H-014'), lineById('H-015')]);
  el('homeBubble').innerHTML = '';
  const wrap = document.createElement('div');
  el('homeBubble').appendChild(wrap);
  setBubble(wrap, line, 'haneen-welcome.webp');
  // journey
  const j = el('journey'); j.innerHTML = '';
  DATA.seasons.forEach((s, si) => {
    const locked = si > 0 && !seasonDone(si);
    const h = document.createElement('div');
    h.className = 'season-title';
    h.innerHTML = `الموسم ${AR(s.num)}: «${s.title}» ${locked ? '<span class="lock-note">🔒 بيفتح بعد الموسم اللي قبله</span>' : ''}`;
    j.appendChild(h);
    s.episodes.forEach(ep => {
      const b = document.createElement('button');
      const un = epUnlocked(ep) && !locked;
      const done = epDone(ep.id);
      b.className = 'ep' + (done ? ' done' : (P.current_ep === ep.id && un ? ' cur' : '')) + (!un ? ' locked' : '');
      const st = done ? P.episodes[ep.id].stars : 0;
      b.innerHTML = `<span class="n">${done ? '✓' : AR(ep.num)}</span>
        <span class="t"><b>الحلقة ${AR(ep.num)}: ${ep.title}</b><span>${done ? 'خلصتها — العبها تاني لتحسين نتيجتك' : un ? 'جاهزة للعب' : 'مقفولة'}</span></span>
        <span class="stars">${'★'.repeat(st)}${'☆'.repeat(3 - st)}</span>`;
      if (un) b.onclick = () => { snd('click'); startEpisode(s, ep); };
      j.appendChild(b);
    });
  });
  const free = seasonDone(1);
  el('btnFree').disabled = !free;
  el('freeNote').textContent = free ? 'مواقف سريعة من بنك التدريب' : 'بيتفتح بعد الموسم الأول';
}
function wireHome() {
  el('btnMute').onclick = () => { SETTINGS.muted = !SETTINGS.muted; saveSettings(); if (SETTINGS.muted) stopHeartbeat(); el('btnMute').textContent = SETTINGS.muted ? '🔇' : '🔊'; };
  document.querySelectorAll('#diffRow button').forEach(b => b.onclick = () => {
    SETTINGS.difficulty = b.dataset.diff; saveSettings(); snd('click');
    document.querySelectorAll('#diffRow button').forEach(x => x.classList.toggle('on', x === b));
    const id = SETTINGS.difficulty === 'calm' ? 'H-010' : SETTINGS.difficulty === 'pressure' ? 'H-011' : 'H-012';
    const wrap = el('homeBubble'); wrap.innerHTML = ''; setBubble(wrap, lineById(id), 'haneen-focus.webp');
  });
  el('btnFree').onclick = () => { snd('click'); openFree(); };
  el('btnBoard').onclick = () => { snd('click'); show('scr-board'); loadBoard('all'); };
  el('btnCard').onclick = () => { snd('click'); show('scr-card'); drawCard(); };
  el('btnLibrary').onclick = () => { snd('click'); renderLibrary(); show('scr-library'); };
  document.querySelectorAll('[data-home]').forEach(b => b.onclick = () => { renderHome(); show('scr-home'); });
  document.querySelectorAll('[data-board]').forEach(b => b.onclick = () => {
    document.querySelectorAll('[data-board]').forEach(x => x.classList.toggle('on', x === b));
    loadBoard(b.dataset.board);
  });
  el('btnDownloadCard').onclick = () => {
    el('cardCanvas').toBlob(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'code7-card.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    });
  };
  el('btnShareCard').onclick = () => {
    el('cardCanvas').toBlob(async blob => {
      const file = new File([blob], 'code7-card.png', {type: 'image/png'});
      if (navigator.canShare && navigator.canShare({files: [file]})) {
        try { await navigator.share({files: [file], title: 'CODE 7'}); } catch (e) {}
      } else el('btnDownloadCard').click();
    });
  };
}

/* =============== episode engine =============== */
let EP = null; // active episode state
function renderMeters() {
  el('meters').innerHTML = Object.keys(METERS).map(k => {
    const v = Math.max(0, EP.meters[k]);
    return `<div class="meter ${v <= 34 ? 'low' : ''}">${METERS[k]} — ${AR(v)}٪<div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`;
  }).join('');
}
function startEpisode(season, ep) {
  EP = {season, ep, idx: 0, meters: {cas: 100, trust: 100, team: 100, prin: 100},
        wrongs: 0, points: 0, correctCount: 0, hintUsed: false, failed: false, timer: null, remain: 0};
  EP.vitalsKind = VITALS_KIND[ep.id] || null;
  EP.vitals = EP.vitalsKind ? 100 : null;
  el('vitalsLabel').textContent = EP.vitalsKind === 'psych' ? 'الحالة النفسية للمصاب' : 'حالة المصاب';
  el('vitalsPanel').classList.toggle('psych', EP.vitalsKind === 'psych');
  updateVitals();
  el('playTitle').textContent = `الموسم ${AR(season.num)} — الحلقة ${AR(ep.num)}`;
  show('scr-play');
  const rv = el('bgRain');
  if (rv) { const on = season.num === 2; rv.hidden = !on; if (on) { const pr = rv.play(); if (pr && pr.catch) pr.catch(() => {}); } else { rv.pause(); } }
  renderMeters();
  const body = el('playBody'); body.innerHTML = '';
  const introLines = [];
  if (!P.seen_seasons.includes(season.id)) { introLines.push(...season.introLines); P.seen_seasons.push(season.id); }
  introLines.push(...(ep.introLines || []));
  if (ep.scene) { const sc = document.createElement('div'); sc.className = 'scene-txt'; sc.textContent = ep.scene; body.appendChild(sc); }
  const btn = document.createElement('button'); btn.className = 'btn btn-red'; btn.textContent = 'ابدأ الحلقة';
  btn.onclick = () => { snd('click'); btn.remove(); renderDecision(); };
  if (introLines.length) {
    // play Haneen's intro lines as stacked chat bubbles, one after another
    let step = 0;
    const playNext = () => {
      if (step >= introLines.length || !document.body.contains(btn)) return;
      const w = document.createElement('div'); body.insertBefore(w, btn);
      const aud = setBubble(w, introLines[step], 'haneen-focus.webp');
      const wait = Math.max(2400, introLines[step].text.length * 46);
      step++;
      if (aud) {
        let advanced = false, ended = false, minDone = false;
        const adv = () => { if (!advanced) { advanced = true; playNext(); } };
        const tryAdv = () => { if (ended && minDone) adv(); };
        aud.onended = () => { ended = true; tryAdv(); };
        setTimeout(() => { minDone = true; tryAdv(); }, Math.min(wait, 2600));
        let fbTimer = setTimeout(adv, wait + 9000); // safety net only — the voice decides when we move on
        aud.onloadedmetadata = () => { clearTimeout(fbTimer); fbTimer = setTimeout(adv, (aud.duration || 0) * 1000 + 2500); };
        aud.addEventListener('playfailed', () => { clearTimeout(fbTimer); fbTimer = setTimeout(adv, wait); });
      } else {
        setTimeout(playNext, wait);
      }
    };
    body.appendChild(btn);
    playNext();
  } else {
    body.appendChild(btn);
  }
  el('btnQuitEp').onclick = () => { stopEpTimer(); const r2 = el('bgRain'); if (r2) { r2.pause(); r2.hidden = true; } renderHome(); show('scr-home'); };
}
function stopEpTimer() { if (EP && EP.timer) { clearInterval(EP.timer); EP.timer = null; } stopHeartbeat(); stopLineAudio(); }

/* =============== casualty vitals (live state the player can see) =============== */
const VITALS_KIND = { s1e3: 'life', s1e4: 'life', s1e5: 'life', s2e3: 'life', s2e4: 'life', s2e5: 'psych' };
function updateVitals() {
  const p = el('vitalsPanel'); if (!p) return;
  if (!EP || EP.vitals == null) { p.classList.add('hidden'); return; }
  p.classList.remove('hidden');
  const v = Math.max(0, Math.round(EP.vitals));
  const fill = el('vitalsFill');
  fill.style.width = v + '%';
  fill.style.background = v >= 55 ? 'var(--ok)' : v >= 30 ? '#f5a623' : 'var(--bad)';
  p.classList.toggle('crit', v < 30);
  const meta = el('vitalsMeta');
  if (EP.vitalsKind === 'psych') {
    meta.textContent = 'التوتر: ' + (v >= 55 ? 'منخفض' : v >= 30 ? 'متوسط' : 'عالٍ جدًا');
  } else {
    const bpm = v >= 55 ? Math.round(72 + (100 - v) * 0.5) : Math.round(40 + v * 0.6);
    meta.textContent = bpm + ' نبضة/دقيقة';
    const ecg = el('vitalsEcg');
    ecg.style.animationDuration = v >= 55 ? '1s' : v >= 30 ? '0.6s' : '0.38s';
    ecg.style.stroke = v >= 55 ? '#2ecc71' : v >= 30 ? '#f5a623' : '#e63946';
  }
}

function renderDecision() {
  stopLineAudio();
  const ep = EP.ep, d = ep.decisions[EP.idx];
  EP.hintUsed = false;
  renderMeters();
  const body = el('playBody'); body.innerHTML = '';
  const diff = DIFFS[SETTINGS.difficulty];
  // a living image for every decision
  const fig = document.createElement('div'); fig.className = 'scene-fig';
  fig.innerHTML = `<img src="assets/scenes/${ep.id}-d${EP.idx + 1}.webp" alt="">`;
  body.appendChild(fig);
  if (EP.idx === 0 && ep.scene) { const sc = document.createElement('div'); sc.className = 'scene-txt'; sc.textContent = ep.scene; body.appendChild(sc); }
  const q = document.createElement('div'); q.className = 'dec-prompt';
  q.textContent = `قرار ${AR(EP.idx + 1)} من ${AR(ep.decisions.length)}: ${d.prompt}`;
  body.appendChild(q);
  // timer
  let timerWrap = null, timerFill = null, timerNum = null;
  if (diff.secs > 0) {
    timerWrap = document.createElement('div'); timerWrap.className = 'timer-wrap';
    timerFill = document.createElement('div'); timerFill.className = 'timer-fill';
    timerWrap.appendChild(timerFill); body.appendChild(timerWrap);
    timerNum = document.createElement('div'); timerNum.className = 'timer-num'; body.appendChild(timerNum);
  }
  const optsWrap = document.createElement('div'); body.appendChild(optsWrap);
  const order = shuffle(d.options.map((t, i) => ({t, i})));
  order.forEach(o => {
    const b = document.createElement('button');
    b.className = 'opt'; b.textContent = o.t;
    b.onclick = () => chooseOption(o.i, b, optsWrap);
    optsWrap.appendChild(b);
  });
  if (SETTINGS.difficulty === 'calm') {
    const hb2 = document.createElement('button');
    hb2.className = 'btn btn-ghost small'; hb2.style.marginTop = '12px'; hb2.textContent = '💡 تلميح (−٣ نقاط)';
    hb2.onclick = () => {
      EP.hintUsed = true; hb2.remove(); snd('click');
      const hint = pick([lineById('H-045'), lineById('H-046'), lineById('H-047')]);
      const w = document.createElement('div'); w.style.marginTop = '12px'; body.appendChild(w);
      setBubble(w, hint, 'haneen-focus.webp');
    };
    body.appendChild(hb2);
  }
  // feedback placeholder
  const fb = document.createElement('div'); fb.className = 'feedback'; fb.id = 'epFeedback'; body.appendChild(fb);
  // timer run
  if (diff.secs > 0) {
    EP.remain = diff.secs * 10; // tenths
    heartbeat('normal');
    EP.timer = setInterval(() => {
      EP.remain--;
      if (EP.vitals != null) {
        EP.vitals = Math.max(0, EP.vitals - (SETTINGS.difficulty === 'nightmare' ? 0.16 : 0.09));
        updateVitals();
        if (EP.vitals <= 0) { stopEpTimer(); snd('flatline'); chooseOption(-1, null, optsWrap); return; }
      }
      const frac = EP.remain / (diff.secs * 10);
      if (timerFill) { timerFill.style.width = (frac * 100) + '%'; timerFill.style.background = frac < 0.25 ? 'var(--bad)' : 'var(--red)'; }
      if (timerNum) timerNum.textContent = Math.ceil(EP.remain / 10) + 's';
      heartbeat(frac > 0.5 ? 'normal' : frac > 0.25 ? 'slow' : 'dying');
      if (EP.remain <= 0) { stopEpTimer(); snd('flatline'); chooseOption(-1, null, optsWrap); }
    }, 100);
  }
}
function chooseOption(chosen, btn, optsWrap) {
  stopEpTimer();
  const d = EP.ep.decisions[EP.idx];
  const diff = DIFFS[SETTINGS.difficulty];
  const timedOut = chosen === -1;
  const correct = !timedOut && chosen === d.correct;
  // mark options
  [...optsWrap.children].forEach(b => {
    b.disabled = true;
    const txt = b.textContent;
    const origIdx = d.options.indexOf(txt);
    if (origIdx === d.correct) { b.classList.add('picked-ok'); b.insertAdjacentHTML('beforeend', ' <span class="tag" style="color:var(--ok)">✓ الصح</span>'); }
    else if (b === btn) { b.classList.add('picked-bad'); b.insertAdjacentHTML('beforeend', ' <span class="tag" style="color:var(--bad)">✗ اختيارك</span>'); }
    else b.classList.add('dim');
  });
  let gained = 0;
  if (correct) {
    gained = 10;
    if (diff.secs > 0) gained += Math.round(5 * Math.max(0, EP.remain) / (diff.secs * 10));
    if (EP.hintUsed) gained = Math.max(0, gained - 3);
    EP.points += gained; EP.correctCount++;
    snd('correct');
  } else {
    EP.wrongs++;
    EP.meters[d.meter] = Math.max(0, EP.meters[d.meter] - 34);
    if (!timedOut) snd('wrong');
    renderMeters();
  }
  let vitalsDead = false;
  if (EP.vitals != null) {
    EP.vitals = Math.max(0, Math.min(100, EP.vitals + (correct ? 6 : -16)));
    updateVitals();
    vitalsDead = EP.vitals <= 0;
  }
  const fb = el('epFeedback');
  const line = timedOut ? pick([lineById('H-040'), lineById('H-041')]) : (correct ? d.okLine : d.badLine);
  const fbAud = setBubble(fb, line, correct ? 'haneen-proud.webp' : 'haneen-serious.webp');
  const info = document.createElement('p');
  info.style.cssText = 'font-weight:800; margin:10px 2px 0';
  info.textContent = correct ? `قرار صح ✅ +${AR(gained)} نقطة` : (timedOut ? 'الوقت خلص ⏱ القرار ده راح عليك' : 'قرار غلط ✗ العدادات اتأثرت');
  fb.appendChild(info);
  if (vitalsDead) info.textContent = EP.vitalsKind === 'psych' ? 'الحالة النفسية انهارت تمامًا… الحلقة انتهت' : 'حالة المصاب وصلت صفر… فقدناه';
  // fail conditions
  const meterDead = Object.values(EP.meters).some(v => v <= 0);
  const nightmareFail = SETTINGS.difficulty === 'nightmare' && EP.wrongs >= 2;
  const next = document.createElement('button');
  next.className = 'btn ' + ((meterDead || nightmareFail || vitalsDead) ? 'btn-dark' : 'btn-red');
  const isLast = EP.idx >= EP.ep.decisions.length - 1;
  next.textContent = (meterDead || nightmareFail || vitalsDead) ? 'شوف نتيجة الحلقة' : isLast ? 'خلاصة الحلقة' : 'القرار اللي بعده';
  next.onclick = () => {
    snd('click');
    if (meterDead || nightmareFail || vitalsDead) return finishEpisode(true);
    if (isLast) return finishEpisode(false);
    EP.idx++; renderDecision();
  };
  fb.appendChild(next);
  if (fbAud) {
    next.disabled = true;
    const unlock = () => { next.disabled = false; };
    fbAud.onended = unlock;
    fbAud.addEventListener('playfailed', () => setTimeout(unlock, Math.max(2400, (LINES[line] || '').length * 46)));
    setTimeout(unlock, (isFinite(fbAud.duration) && fbAud.duration ? fbAud.duration * 1000 : 9000) + 2500);
  }
}
async function finishEpisode(failed) {
  const rvF = el('bgRain'); if (rvF) { rvF.pause(); rvF.hidden = true; }
  stopEpTimer();
  const ep = EP.ep;
  const body = el('playBody'); body.innerHTML = '';
  const wrap = document.createElement('div'); body.appendChild(wrap);
  if (failed) {
    EP.failed = true;
    setBubble(wrap, lineById('H-064'), 'haneen-serious.webp');
    const box = document.createElement('div'); box.className = 'fail-box';
    box.innerHTML = `<div class="big">💔</div><p style="line-height:1.9">الحلقة وقفت هنا — ${SETTINGS.difficulty === 'nightmare' && EP.wrongs >= 2 ? 'غلطتين في مستوى الكابوس بيعيدوا الحلقة.' : 'عداد من العدادات وصل صفر.'}<br>المحاولة دي مش هتتحسب. راجع وارجع أقوى.</p>`;
    body.appendChild(box);
    const r = document.createElement('button'); r.className = 'btn btn-red'; r.textContent = 'إعادة الحلقة';
    r.onclick = () => startEpisode(EP.season, ep);
    const h = document.createElement('button'); h.className = 'btn btn-ghost'; h.textContent = 'رجوع للرحلة';
    h.onclick = () => { renderHome(); show('scr-home'); };
    body.appendChild(r); body.appendChild(h);
    return;
  }
  // stars
  let stars = EP.correctCount === 3 ? 3 : EP.correctCount === 2 ? 2 : EP.correctCount === 1 ? 1 : 0;
  const minMeter = Math.min(...Object.values(EP.meters));
  if (stars === 3 && minMeter <= 34) stars = 2;
  if (stars === 2 && minMeter <= 34 && EP.correctCount === 2) stars = 1;
  const oldRank = rankFor(totalPoints());
  const prev = P.episodes[ep.id];
  const improved = !prev || EP.points > prev.points;
  if (improved) P.episodes[ep.id] = {stars: Math.max(stars, prev ? prev.stars : 0), points: EP.points};
  else if (prev && stars > prev.stars) prev.stars = stars;
  const nx = nextEpisodeId(ep.id);
  if (nx && (!prev || improved || P.current_ep === ep.id)) P.current_ep = nx;
  const streakLine = touchStreak();
  await syncUp();
  const newRank = rankFor(totalPoints());
  // outro lines + summary
  const outro = ep.outroLines && ep.outroLines.length ? ep.outroLines[0] : null;
  const starLine = stars === 3 ? lineById('H-060') : stars === 2 ? lineById('H-061') : stars === 1 ? lineById('H-062') : lineById('H-063');
  setBubble(wrap, outro || starLine, stars >= 2 ? 'haneen-celebrate.webp' : 'haneen-welcome.webp');
  const sum = document.createElement('div'); sum.className = 'card';
  sum.innerHTML = `<div class="stars-big">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    <div class="summary-nums">
      <div class="stat"><b>${AR(EP.points)}</b><span>نقطة في المحاولة</span></div>
      <div class="stat"><b>${AR(EP.correctCount)} / ${AR(ep.decisions.length)}</b><span>قرارات صح</span></div>
      <div class="stat"><b>${AR(totalPoints())}</b><span>إجمالي نقاطك</span></div>
    </div>
    ${improved ? '<p style="color:var(--ok); font-weight:700; margin:10px 0 0">دي أحسن محاولة ليك في الحلقة دي ✅</p>' : '<p style="color:var(--muted); margin:10px 0 0">نتيجتك المحفوظة أعلى من المحاولة دي — العب تاني وحسّنها.</p>'}`;
  body.appendChild(sum);
  renderMetersInto(sum);
  if (ep.card) {
    const kc = document.createElement('div'); kc.className = 'know-card';
    kc.innerHTML = `<h4>📖 بطاقة معرفة جديدة: ${ep.card.title}</h4><ul>${ep.card.lines.map(l => `<li>${l}</li>`).join('')}</ul><p style="font-size:12.5px; color:#c9a44e; margin:8px 0 0">اتحفظت في مكتبة المعرفة بتاعتك.</p>`;
    body.appendChild(kc);
  }
  if (streakLine) { const w2 = document.createElement('div'); w2.style.marginTop = '12px'; body.appendChild(w2); setBubble(w2, streakLine, 'haneen-celebrate.webp'); }
  if (newRank !== oldRank) {
    const w3 = document.createElement('div'); w3.style.marginTop = '12px'; body.appendChild(w3);
    const rl = newRank === 'متطوع نشط' ? lineById('H-070') : newRank === 'مسعف ميداني' ? lineById('H-071') : lineById('H-072');
    setBubble(w3, rl, 'haneen-celebrate.webp');
    snd('success');
  }
  // season oath after s1e6
  if (ep.id === 's1e6' && EP.season.oath) {
    const oc = document.createElement('div'); oc.className = 'card';
    oc.innerHTML = '<h3>وعد الموسم الأول</h3>' + EP.season.oath.filter(o => !['H-170', 'H-174'].includes(o.id)).map(o => `<p style="line-height:2; margin:6px 0">✋ ${o.text}</p>`).join('');
    body.appendChild(oc);
  }
  const done = document.createElement('button'); done.className = 'btn btn-red'; done.textContent = nx ? 'كمّل الرحلة' : 'رجوع للرحلة';
  done.onclick = () => { renderHome(); show('scr-home'); };
  body.appendChild(done);
  snd('success');
}
function renderMetersInto(parent) {
  const m = document.createElement('div'); m.className = 'meters'; m.style.marginTop = '14px';
  m.innerHTML = Object.keys(METERS).map(k => {
    const v = Math.max(0, EP.meters[k]);
    return `<div class="meter ${v <= 34 ? 'low' : ''}">${METERS[k]} — ${AR(v)}٪<div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`;
  }).join('');
  parent.appendChild(m);
}

/* =============== free training =============== */
let FREE = null;
function openFree() {
  show('scr-free');
  const body = el('freeBody'); body.innerHTML = '';
  const intro = document.createElement('div'); body.appendChild(intro);
  setBubble(intro, {id: null, text: 'التدريب الحر: مواقف سريعة من بنك التدريب. كل إجابة صح بتزوّد نقاطك، والغلط هنا للتعلم بس.'}, 'haneen-focus.webp');
  const cats = DATA.bank.meta.categories;
  const grid = document.createElement('div'); grid.className = 'menu-grid';
  Object.keys(cats).filter(k => k !== 'all').forEach(k => {
    const b = document.createElement('button');
    b.innerHTML = `${cats[k]}<small>${AR(DATA.bank.scenarios.filter(s => s.cat === k).length)} موقف</small>`;
    b.onclick = () => startFreeRun(DATA.bank.scenarios.filter(s => s.cat === k), cats[k]);
    grid.appendChild(b);
  });
  body.appendChild(grid);
  const rnd = document.createElement('button'); rnd.className = 'btn btn-red';
  rnd.textContent = '🎲 مهمة عشوائية — ٥ مواقف من كل الأقسام';
  rnd.onclick = () => startFreeRun(DATA.bank.scenarios, 'مهمة عشوائية');
  body.appendChild(rnd);
  const daily = document.createElement('button'); daily.className = 'btn btn-gold';
  const doneToday = P.daily_last === todayStr();
  daily.textContent = doneToday ? '✅ اختبار اليوم خلص — ارجع بكرة' : '⭐ اختبار اليوم — ٣ مواقف وبونص لو كله صح';
  daily.disabled = doneToday;
  daily.onclick = () => startDaily();
  body.appendChild(daily);
}
function startDaily() {
  const seed = todayStr().split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const pool = DATA.bank.scenarios.slice();
  const chosen = [];
  let x = seed;
  while (chosen.length < 3 && pool.length) { x = (x * 37 + 11) % pool.length; chosen.push(pool.splice(x, 1)[0]); }
  startFreeRun(chosen, 'اختبار اليوم', true);
}
function startFreeRun(pool, title, isDaily) {
  const qs = shuffle(pool).slice(0, isDaily ? 3 : 5);
  FREE = {qs, idx: 0, gained: 0, correctCount: 0, title, isDaily: !!isDaily};
  renderFreeQ();
}
function renderFreeQ() {
  const body = el('freeBody'); body.innerHTML = '';
  const s = FREE.qs[FREE.idx];
  const head = document.createElement('p'); head.className = 'q-count';
  head.textContent = `${FREE.title} — موقف ${AR(FREE.idx + 1)} من ${AR(FREE.qs.length)}`;
  body.appendChild(head);
  const bfig = document.createElement('div'); bfig.className = 'scene-fig';
  bfig.innerHTML = `<img src="assets/scenes/bank-${s.id}.webp" alt="">`;
  body.appendChild(bfig);
  const sc = document.createElement('div'); sc.className = 'scene-txt'; sc.textContent = s.s; body.appendChild(sc);
  const q = document.createElement('div'); q.className = 'dec-prompt'; q.textContent = s.q; body.appendChild(q);
  const wrap = document.createElement('div'); body.appendChild(wrap);
  const fb = document.createElement('div'); fb.className = 'feedback'; body.appendChild(fb);
  if (s.type === 'o') return renderOrdering(s, wrap, fb);
  const options = s.type === 'p' ? DATA.bank.principles.slice() : shuffle(s.options.map((t, i) => ({t, ok: i === 0})));
  const rendered = s.type === 'p' ? options.map(t => ({t, ok: t === s.k})) : options;
  rendered.forEach(o => {
    const b = document.createElement('button');
    b.className = 'opt'; b.textContent = o.t;
    b.onclick = () => {
      [...wrap.children].forEach(x => { x.disabled = true; if (x !== b) x.classList.add('dim'); });
      b.classList.add(o.ok ? 'picked-ok' : 'picked-bad');
      if (o.ok) { FREE.gained += 3; FREE.correctCount++; snd('correct'); }
      else { snd('wrong'); [...wrap.children].forEach(x => { if (x.textContent === rendered.find(r => r.ok).t) x.classList.add('picked-ok'); }); }
      freeFeedback(s, o.ok, fb);
    };
    wrap.appendChild(b);
  });
}
function renderOrdering(s, wrap, fb) {
  const placed = [];
  const chips = document.createElement('div'); wrap.appendChild(chips);
  const pool = document.createElement('div'); pool.style.marginTop = '10px'; wrap.appendChild(pool);
  let errors = 0;
  shuffle(s.options.map((t, i) => ({t, i}))).forEach(o => {
    const b = document.createElement('button');
    b.className = 'opt'; b.textContent = o.t;
    b.onclick = () => {
      if (o.i === placed.length) {
        placed.push(o.t); b.remove();
        const c = document.createElement('span'); c.className = 'order-chip done'; c.textContent = `${AR(placed.length)}. ${o.t}`;
        chips.appendChild(c); snd('click');
        if (placed.length === s.options.length) {
          const ok = errors <= 1;
          if (ok) { FREE.gained += 5; FREE.correctCount++; snd('correct'); } else snd('wrong');
          freeFeedback(s, ok, fb, errors);
        }
      } else { errors++; b.classList.add('picked-bad'); setTimeout(() => b.classList.remove('picked-bad'), 350); snd('wrong'); }
    };
    pool.appendChild(b);
  });
  const note = document.createElement('p'); note.className = 'q-count';
  note.textContent = 'دوس على الخطوات بالترتيب الصح.';
  wrap.appendChild(note);
}
function freeFeedback(s, ok, fb, errors) {
  const line = ok ? pick([lineById('H-020'), lineById('H-021'), lineById('H-022'), lineById('H-023'), lineById('H-024')])
                  : pick([lineById('H-030'), lineById('H-031'), lineById('H-032'), lineById('H-034')]);
  setBubble(fb, line, ok ? 'haneen-proud.webp' : 'haneen-serious.webp');
  const why = document.createElement('div'); why.className = 'scene-txt';
  why.innerHTML = `<b>${ok ? '✅ صح' : '✗ مش بالظبط'}${errors ? ` — غلطات ترتيب: ${AR(errors)}` : ''}</b><br>${s.w}<br><b style="color:var(--red)">${s.g}</b>`;
  fb.appendChild(why);
  const next = document.createElement('button');
  next.className = 'btn btn-red';
  const last = FREE.idx >= FREE.qs.length - 1;
  next.textContent = last ? 'النتيجة' : 'الموقف اللي بعده';
  next.onclick = async () => {
    snd('click');
    if (!last) { FREE.idx++; renderFreeQ(); return; }
    if (FREE.isDaily) {
      if (FREE.correctCount === FREE.qs.length) FREE.gained += 15;
      P.daily_last = todayStr();
    }
    P.free_points = (P.free_points || 0) + FREE.gained;
    touchStreak();
    await syncUp();
    el('freeBody').innerHTML = '';
    const w = document.createElement('div'); el('freeBody').appendChild(w);
    setBubble(w, FREE.correctCount >= FREE.qs.length - 1 ? lineById('H-060') : lineById('H-061'), 'haneen-celebrate.webp');
    const sum = document.createElement('div'); sum.className = 'card';
    sum.innerHTML = `<h3>${FREE.title} — خلصت</h3><div class="summary-nums">
      <div class="stat"><b>${AR(FREE.gained)}</b><span>نقطة جديدة</span></div>
      <div class="stat"><b>${AR(FREE.correctCount)} / ${AR(FREE.qs.length)}</b><span>إجابات صح</span></div>
      <div class="stat"><b>${AR(totalPoints())}</b><span>إجمالي نقاطك</span></div></div>`;
    el('freeBody').appendChild(sum);
    const back = document.createElement('button'); back.className = 'btn btn-red'; back.textContent = 'رجوع للتدريب الحر';
    back.onclick = () => openFree();
    el('freeBody').appendChild(back);
    snd('success');
  };
  fb.appendChild(next);
}

/* =============== leaderboard =============== */
async function loadBoard(tab) {
  const body = el('boardBody');
  body.textContent = 'جارٍ التحميل…';
  let rows = [];
  try {
    const r = await sb.from('game_leaderboard').select('*').order('total_points', {ascending: false}).limit(60);
    if (r.data) rows = r.data;
  } catch (e) {}
  if (tab !== 'all') rows = rows.filter(r => r.player_type === tab);
  rows = rows.slice(0, 10);
  if (!rows.length) { body.innerHTML = '<p style="line-height:1.9">لسه مفيش نتائج في اللوحة دي — كن أول اسم يظهر هنا 🏆</p>'; return; }
  const medals = ['🥇', '🥈', '🥉'];
  body.innerHTML = `<table class="lb">${rows.map((r, i) => `<tr>
    <td style="width:38px">${medals[i] || AR(i + 1)}</td>
    <td>${r.masked_name} <span class="badge ${r.player_type === 'volunteer' ? 'vol' : ''}">${r.player_type === 'volunteer' ? 'متطوع' : 'زائر'}</span></td>
    <td style="text-align:left; direction:ltr; font-weight:800">${AR(r.total_points)}</td></tr>`).join('')}</table>
    <p style="color:var(--muted); font-size:12.5px; line-height:1.9">اللوحة بتعرض الاسم وعدد النقاط بس، من غير أي بيانات خاصة.</p>`;
}

/* =============== library =============== */
function renderLibrary() {
  const body = el('libraryBody'); body.innerHTML = '';
  const cards = [];
  DATA.seasons.forEach(s => s.episodes.forEach(ep => { if (ep.card && epDone(ep.id)) cards.push({ep, s}); }));
  if (!cards.length) {
    body.innerHTML = '<div class="card"><p style="line-height:1.9">لسه ما فتحتش بطاقات. بطاقات المعرفة بتتفتح لما تخلص حلقات معينة في القصة — أول بطاقة مستنياك في الحلقة الأولى من الموسم الأول 📖</p></div>';
    return;
  }
  cards.forEach(({ep, s}) => {
    const kc = document.createElement('div'); kc.className = 'know-card';
    kc.innerHTML = `<h4>📖 ${ep.card.title}</h4><p style="font-size:12px; color:#c9a44e; margin:0 0 6px">من «${ep.title}» — الموسم ${AR(s.num)}</p><ul>${ep.card.lines.map(l => `<li>${l}</li>`).join('')}</ul>`;
    body.appendChild(kc);
  });
}

/* =============== result card =============== */
function loadImg(src) { return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
async function drawCard() {
  const cv = el('cardCanvas'), ctx = cv.getContext('2d');
  const W = 1080, H = 1350;
  try { await document.fonts.ready; } catch (e) {}
  const [logo, han] = await Promise.all([loadImg('assets/logo.png'), loadImg('assets/haneen-full.webp')]);
  // background: black with a deep red glow
  ctx.fillStyle = '#0a0a0c'; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 300, 60, W / 2, 300, 760);
  glow.addColorStop(0, 'rgba(232,17,45,.34)'); glow.addColorStop(1, 'rgba(232,17,45,0)');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
  const glow2 = ctx.createRadialGradient(W / 2, H - 120, 40, W / 2, H - 120, 560);
  glow2.addColorStop(0, 'rgba(232,17,45,.16)'); glow2.addColorStop(1, 'rgba(232,17,45,0)');
  ctx.fillStyle = glow2; ctx.fillRect(0, 0, W, H);
  // double red frame
  ctx.strokeStyle = 'rgba(232,17,45,.95)'; ctx.lineWidth = 6; ctx.strokeRect(34, 34, W - 68, H - 68);
  ctx.strokeStyle = 'rgba(232,17,45,.40)'; ctx.lineWidth = 2; ctx.strokeRect(56, 56, W - 112, H - 112);
  ctx.textAlign = 'center';
  // logo in a white medallion with a red ring
  ctx.beginPath(); ctx.arc(W / 2, 218, 108, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = '#e8112d'; ctx.stroke();
  if (logo) { ctx.save(); ctx.beginPath(); ctx.arc(W / 2, 218, 100, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(logo, W / 2 - 100, 118, 200, 200); ctx.restore(); }
  // slogan
  ctx.fillStyle = '#ff2b3f'; ctx.font = '800 41px Almarai, sans-serif';
  ctx.fillText('كل ثانية بتفرق… وكل قرار صح معناه نبضة بتكمل', W / 2, 402);
  // divider
  ctx.strokeStyle = 'rgba(232,17,45,.7)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W / 2 - 190, 448); ctx.lineTo(W / 2 + 190, 448); ctx.stroke();
  ctx.fillStyle = '#e8112d'; ctx.font = '30px Almarai, sans-serif';
  ctx.fillText('◆', W / 2, 460);
  // Haneen avatar — framed portrait with gold ring, right side; player block on the left
  const ax = 618, ay = 512, aw = 330, ah = 420;
  if (han) {
    ctx.save();
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(ax, ay, aw, ah, 26); else ctx.rect(ax, ay, aw, ah);
    ctx.clip();
    const scale = Math.max(aw / han.width, ah / han.height);
    const dw = han.width * scale, dh = han.height * scale;
    ctx.drawImage(han, ax + (aw - dw) / 2, ay, dw, dh);
    ctx.restore();
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(ax, ay, aw, ah, 26); else ctx.rect(ax, ay, aw, ah);
    ctx.lineWidth = 5; ctx.strokeStyle = '#e8112d'; ctx.stroke();
    // name plate under her photo
    ctx.fillStyle = '#e8112d';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(ax, ay + ah - 58, aw, 58, [0, 0, 26, 26]); else ctx.rect(ax, ay + ah - 58, aw, 58);
    ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = '800 32px Almarai, sans-serif';
    ctx.fillText('القائدة حنين', ax + aw / 2, ay + ah - 18);
  }
  // player block (left of Haneen)
  const cx = 316;
  ctx.fillStyle = 'rgba(255,255,255,.82)'; ctx.font = '700 34px Almarai, sans-serif';
  ctx.fillText(ME.type === 'volunteer' ? 'متطوع الهلال الأحمر' : 'زائر', cx, 566);
  ctx.fillStyle = '#ffffff'; ctx.font = '800 66px Almarai, sans-serif';
  const nm = ME.name || '';
  ctx.fillText(nm.length > 18 ? nm.slice(0, 18) + '…' : nm, cx, 648);
  // rank pill
  const rankTxt = 'الرتبة: ' + rankFor(totalPoints());
  ctx.font = '800 36px Almarai, sans-serif';
  const rw = ctx.measureText(rankTxt).width + 64;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(cx - rw / 2, 692, rw, 66, 33); else ctx.rect(cx - rw / 2, 692, rw, 66);
  ctx.strokeStyle = '#ff2b3f'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.fillStyle = '#ff2b3f'; ctx.fillText(rankTxt, cx, 738);
  // points
  ctx.fillStyle = '#ffffff'; ctx.font = '800 128px Almarai, sans-serif';
  ctx.fillText(AR(totalPoints()), cx, 906);
  ctx.fillStyle = '#ff2b3f'; ctx.font = '700 36px Almarai, sans-serif';
  ctx.fillText('نقطة', cx, 962);
  // stars line — single elegant row
  const st = totalStars(), max = allEpisodes().length * 3;
  ctx.fillStyle = '#ffffff'; ctx.font = '700 38px Almarai, sans-serif';
  ctx.fillText('حاصل على ' + AR(st) + ' نجمة من ' + AR(max), W / 2, 1052);
  ctx.fillStyle = '#d9a441'; ctx.font = '44px Almarai, sans-serif';
  ctx.fillText('★', W / 2, 1112);
  // footer
  ctx.strokeStyle = 'rgba(232,17,45,.5)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W / 2 - 300, 1168); ctx.lineTo(W / 2 + 300, 1168); ctx.stroke();
  ctx.fillStyle = '#ffffff'; ctx.font = '700 37px Almarai, sans-serif';
  ctx.fillText('الهلال الأحمر المصري — فرع جنوب سيناء', W / 2, 1232);
  ctx.fillStyle = 'rgba(255,255,255,.72)'; ctx.font = '400 31px Almarai, sans-serif';
  ctx.fillText(new Date().toLocaleDateString('ar-EG'), W / 2, 1286);
}

/* =============== boot =============== */
async function boot() {
  wireAuth(); wireHome();
  try {
    const [s, l, b] = await Promise.all([
      fetch('data/seasons.json', { cache: 'no-store' }).then(r => r.json()),
      fetch('data/lines.json', { cache: 'no-store' }).then(r => r.json()),
      fetch('data/bank.json', { cache: 'no-store' }).then(r => r.json())
    ]);
    DATA.seasons = s.seasons; DATA.lines = l; DATA.bank = b;
  } catch (e) {
    el('introTxt').textContent = 'محتاج اتصال بالإنترنت أول مرة عشان أحمل اللعبة.';
    return;
  }
  // intro typewriter: H-001..H-007
  const seq = ['H-001', 'H-002', 'H-003', 'H-004', 'H-005', 'H-006', 'H-007'].map(lineById);
  let i = 0;
  const node = el('introTxt');
  const stepIntro = () => {
    if (i >= seq.length) return;
    const line = seq[i]; i++;
    const aud = typewrite(node, line.text, line.id);
    const wait = Math.max(2600, line.text.length * 46);
    if (!aud) { setTimeout(stepIntro, wait); return; }
    let done = false;
    const adv = () => { if (!done) { done = true; stepIntro(); } };
    aud.onended = adv;
    let fb = setTimeout(adv, wait + 9000);
    aud.onloadedmetadata = () => { clearTimeout(fb); fb = setTimeout(adv, (aud.duration || 0) * 1000 + 2500); };
    aud.addEventListener('playfailed', () => { clearTimeout(fb); fb = setTimeout(adv, wait); });
  };
  stepIntro();
  // existing session?
  try {
    const sess = (await sb.auth.getSession()).data.session;
    if (sess && sess.user) { ME = {userId: sess.user.id, type: null, name: '', phone: null}; routeAfterLogin(sess.user); }
  } catch (e) {}
}
document.addEventListener('DOMContentLoaded', boot);
