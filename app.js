(() => {
  'use strict';
  const C = window.CONTENT;
  const YPD = 'https://ypdcrime.com/penal.law/';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800); };
  const copy = async (text, msg = 'Copied') => {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast(msg); } catch { toast('Copy not available'); } ta.remove(); }
  };

  /* ---------- Level helpers ---------- */
  function lvlInfo(l) {
    if (!l) return { label: '', cls: '' };
    if (/Felony/.test(l)) { const g = l.replace(/\s*Felony/, '').replace(/\s+1$/, ' I').replace(/\s+/, '-'); return { label: `Class ${g} Felony`, cls: 'fel' }; }
    if (/Unclassified/.test(l)) return { label: 'Unclassified Misd.', cls: 'mis' };
    if (/Misdemeanor/.test(l)) return { label: `Class ${l.replace(/\s*Misdemeanor/, '')} Misdemeanor`, cls: 'mis' };
    if (/Violation/.test(l)) return { label: 'Violation', cls: 'vio' };
    return { label: l, cls: '' };
  }
  const shortLvl = s => s.replace('Misdemeanor', 'Misd.');
  const lvlBadge = (l, short) => { const i = lvlInfo(l); return i.label ? `<span class="lvl ${i.cls}">${esc(short ? shortLvl(i.label) : i.label)}</span>` : ''; };
  const sectionUrl = s => `${YPD}article${s[2]}.php#p${s[1]}`;

  /* ---------- Shields ---------- */
  const shieldCls = s => {
    const map = { 'Violation': 'vio', 'Guide': '' };
    if (map[s] !== undefined) return map[s];
    return /Felony/.test(s) && !/Misd/.test(s) ? 'fel' : 'mis';
  };
  const SHIELD_PATH = 'M100 4 C128 20 158 23 192 15 C197 30 197 44 195 60 C194 142 166 202 100 236 C34 202 6 142 5 60 C3 44 3 30 8 15 C42 23 72 20 100 4 Z';
  const shieldSvg = `<svg class="badge-svg" viewBox="0 0 200 240" aria-hidden="true" preserveAspectRatio="none">
      <path d="${SHIELD_PATH}" class="b-outer"/>
      <path d="${SHIELD_PATH}" class="b-inner" transform="translate(100 120) scale(.9 .905) translate(-100 -120)"/>
      <path d="${SHIELD_PATH}" class="b-line" transform="translate(100 120) scale(.84 .85) translate(-100 -120)"/>
    </svg>`;
  $('#shieldGrid').innerHTML = C.shields.map(s => `
    <article class="shield">
      <a class="badge" href="${s.href}" target="_blank" rel="noopener" aria-label="Open ${esc(s.title)} on ypdcrime.com">
        ${shieldSvg}
        <span class="badge-text${s.parts.length > 1 ? ' two' : ''}">
          ${s.parts.map(([n, c]) => `<span class="b-name">${esc(n)}</span><span class="b-code">${/^\d/.test(c) ? '(code ' + esc(c) + ')' : esc(c)}</span>`).join('')}
        </span>
      </a>
      <div class="shield-info">
        <span class="lvl ${shieldCls(s.cls)}">${esc(s.cls)}</span>
        <div class="read-row">${s.codes.map(c => `<button class="mini" data-sec="${c[2]}" aria-label="Read ${c[0]} in the app">Read ${c[0]}</button>`).join('') || `<a class="mini" href="${s.href}" target="_blank" rel="noopener" style="text-decoration:none">Open guide</a>`}</div>
      </div>
    </article>`).join('');

  /* ---------- Jagger Hall ---------- */
  const vipCard = (v, cosign) => `
    <article class="vip${v[1] === 'Vacant' ? ' vacant' : ''}">
      <button class="vip-photo" data-view="vip${v[0]}" data-cap="${esc(v[1])}${cosign ? ' · Jagger Hall ' + cosign : ''}" aria-label="Enlarge photo of ${esc(v[1])}">
        <img src="./img/vip${v[0]}.jpg" alt="${esc(v[1])}" loading="lazy">
      </button>
      ${cosign ? `<div class="vip-code"><small>Jagger Hall</small><b>${cosign}</b></div>` : ''}
      <div class="vip-body">
        <span class="vip-name">${esc(v[1])}</span>
        <span class="vip-title">${esc(v[2])}</span>
      </div>
    </article>`;
  $('#vipGrid').innerHTML = C.vip.map(v => vipCard(v, v[3])).join('');
  $('#staffGrid').innerHTML = C.keyStaff.map(v => vipCard(v, 0)).join('');

  /* ---------- Radio ---------- */
  const dl = rows => rows.map(r => `<dt id="code-${r[0].replace(/\W+/g, '')}">${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('');
  $('#codeUpdates').innerHTML = dl(C.codeUpdates);
  $('#nonCrime').innerHTML = dl(C.nonCrime);
  $('#finals').innerHTML = dl(C.finals);

  /* ---------- Phonetic ---------- */
  $('#alpha').innerHTML = C.phonetic.map(w => `<div class="letter"><b>${w[0]}</b><span>${esc(w)}</span></div>`).join('');
  $('#spell').addEventListener('input', e => {
    const out = [...e.target.value.toUpperCase()].map(ch => /[A-Z]/.test(ch) ? C.phonetic[ch.charCodeAt(0) - 65] : (/[0-9]/.test(ch) ? ch : (ch === ' ' ? '·' : ''))).filter(Boolean);
    $('#spelled').textContent = out.join('  ');
  });

  /* ---------- Narratives ---------- */
  $('#narratives').innerHTML = C.narratives.map(([t, body]) => `
    <details><summary>${esc(t)}</summary><div class="acc-body">${body.split('\n').map(p => `<p>${esc(p)}</p>`).join('')}
      <button class="mini copy" data-copy="${esc(body.split('\n').filter(p => p.startsWith('At T/P/O') || p.startsWith('Or:')).join('\n') || body)}">Copy template</button></div></details>`).join('');

  /* ---------- Tour master schedules ---------- */
  const TM = C.tourMaster;
  const curTour = () => { const h = new Date().getHours(); return h >= 23 || h < 7 ? 'tour1' : h < 15 ? 'tour2' : 'tour3'; };
  const todayCol = id => { const d = new Date(); const dow = d.getDay(); return id === 'tour1' && d.getHours() < 8 ? (dow + 6) % 7 : dow; };
  const cellCls = v => { v = String(v); if (v === 'RDO') return 'rdo'; if (v === 'NONE' || v === '') return 'nn'; if (v === 'X') return 'x'; if (v.startsWith('OT:')) return 'ot'; if (v.startsWith('FW:')) return 'fw'; return 'on'; };
  const cellTxt = v => String(v).replace(/^(OT|FW):/, '').replace('X', '');
  const working = v => !['rdo', 'nn', 'x'].includes(cellCls(v));
  let activeTour = curTour();
  function renderTabs() {
    const live = curTour();
    $('#tourTabs').innerHTML = TM.map(t => `<button class="tab${t.id === activeTour ? ' on' : ''}" role="tab" aria-selected="${t.id === activeTour}" data-tour="${t.id}">
      ${t.id === live ? '<span class="live">● On now</span>' : ''}<b>${t.name} · ${t.label}</b><small>${t.time}</small></button>`).join('');
  }
  function renderTour() {
    const t = TM.find(x => x.id === activeTour); const tc = todayCol(t.id);
    const dayName = t.cols[tc];
    const duty = t.groups.filter(g => g.rows.length).map(g => {
      const on = g.rows.filter(r => working(r[1][tc]));
      return `<div class="duty-g card"><h4>${esc(g.title)}</h4>${on.length ? `<ul>${on.map(r => `<li><span>${esc(r[0])}</span><span>${esc(cellTxt(r[1][tc]))}${cellCls(r[1][tc]) === 'ot' ? ' · OT' : ''}</span></li>`).join('')}</ul>` : '<p class="none">No one scheduled</p>'}</div>`;
    }).join('');
    const head = `<tr><th class="name">${esc(t.name)} · ${esc(t.time)}</th>${t.cols.map((c, i) => `<th class="${i === tc ? 'today' : ''}">${c}</th>`).join('')}<th>HR</th></tr>`;
    const body = t.groups.map(g => `<tr class="grp"><th colspan="9">${esc(g.title)}</th></tr>` +
      g.rows.map(r => `<tr><td class="name">${esc(r[0])}</td>${r[1].map((v, i) => `<td class="${cellCls(v)}${i === tc ? ' today' : ''}">${esc(cellTxt(v))}</td>`).join('')}<td class="hr">${r[2] === '' ? '' : r[2]}</td></tr>`).join('') +
      (g.total ? `<tr class="tot"><td class="name">${esc(g.total[0])}</td>${g.total[1].map((v, i) => `<td class="${i === tc ? 'today' : ''}">${v}</td>`).join('')}<td>${g.total[2]}</td></tr>` : '')).join('');
    $('#tourPanel').innerHTML = `
      <div class="tm-meta"><span><b>${esc(t.name)} · ${esc(t.label)}</b> (${esc(t.time)})</span><span>${esc(t.asof)}</span></div>
      <div class="duty"><h3>On duty ${t.id === 'tour1' ? 'tonight' : 'today'} · ${esc(dayName)}</h3><div class="duty-groups">${duty}</div></div>
      <h3 class="sub" style="margin-top:var(--space-6)">Full week</h3>
      <div class="legend"><span><i style="background:#f9d9d5"></i>Overtime</span><span><i style="background:#fde3c7"></i>Firewatch</span><span><i style="background:var(--surface-2);border:1px solid var(--border)"></i>RDO / none</span><span><i style="background:var(--accent)"></i>Today</span></div>
      <div class="tbl-wrap"><table class="tm"><thead>${head}</thead><tbody>${body}</tbody></table></div>
      <p class="tm-foot">Swipe the table sideways to see every day. ${t.footer ? esc(t.footer) : ''}</p>`;
  }
  function selectTour(id) { activeTour = id; renderTabs(); renderTour(); }
  $('#tourTabs').addEventListener('click', e => { const b = e.target.closest('[data-tour]'); if (b) selectTour(b.dataset.tour); });
  $('#tourTabs').addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const i = TM.findIndex(t => t.id === activeTour); const n = (i + (e.key === 'ArrowRight' ? 1 : TM.length - 1)) % TM.length;
    selectTour(TM[n].id); $(`#tourTabs [data-tour="${TM[n].id}"]`).focus();
  });
  selectTour(activeTour);

  /* ---------- Meal times ---------- */
  const ML = C.meals;
  const mlCur = () => { const h = new Date().getHours(); return h >= 15 && h < 23 ? 'eve' : h >= 7 && h < 15 ? 'day' : null; };
  let mlTour = mlCur() || 'day';
  function renderMeals() {
    const live = mlCur(), fri = new Date().getDay() === 5;
    $('#mlTabs').innerHTML = ML.tours.map(t => `<button class="tab${t.id === mlTour ? ' on' : ''}" role="tab" aria-selected="${t.id === mlTour}" data-ml="${t.id}">${t.id === live ? '<span class="live">● On now</span>' : ''}<b>${t.name}</b><small>Meals begin ${t.start} hrs</small></button>`).join('') +
      `<button class="tab${mlTour === 'fri' ? ' on' : ''}" role="tab" aria-selected="${mlTour === 'fri'}" data-ml="fri">${fri ? '<span class="live">● Today</span>' : ''}<b>Friday PETER</b><small>Begins ${ML.fri.start} hrs</small></button>`;
    if (mlTour === 'fri') { mlFriday(fri); return; }
    const t = ML.tours.find(x => x.id === mlTour), day = t.id === 'day';
    const relief = ML.relief.map(([who, posts]) => {
      const list = posts.filter(p => p[1] !== 'day' || day);
      return `<div class="ml-col"><h3><span>Relief</span>${who}</h3><ol>${list.map((p, i) => `<li class="${p[1] === 'self' ? 'self' : ''}"><i>${i + 1}</i><b>${p[0]}</b>${i === 0 ? `<small>starts ${t.start} hrs</small>` : p[1] === 'self' ? '<small>own meal, last</small>' : p[1] === 'day' ? '<small>Day Tour only</small>' : ''}</li>`).join('')}</ol></div>`;
    }).join('');
    const geo = day ? '' : '<p class="ml-skip">GEORGE is not on the Evening Tour meal order (Day Tour only).</p>';
    const fixed = t.fixed.map(([who, at, why]) => `<div class="ml-fx"><b>${who}</b><span>${at} hrs</span>${why ? `<small>${why}</small>` : ''}</div>`).join('');
    $('#mlPanel').innerHTML = `<div class="tm-meta"><span><b>${t.name}</b> · meals begin <b>${t.start} hrs</b></span><span>${ML.date}</span></div>
      <div class="ml-grid">${relief}</div>${geo}
      <h4 class="ml-h">Set meal times</h4><div class="ml-fixed">${fixed}</div>
      ${day ? `<div class="ml-fri${fri ? ' today' : ''}">${fri ? '<span class="live-tag">Today</span>' : '<span class="ml-tag">Fridays</span>'}<p>${esc(ML.friday)}</p></div>` : ''}
      <h4 class="ml-h">Notes</h4><ul class="ml-notes">${ML.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
      <p class="ml-auth">${esc(ML.authority)}</p>
      <p class="ml-src">${esc(ML.memo)} · ${esc(ML.date)} · ${esc(ML.eff)}.</p>`;
  }
  function mlFriday(fri) {
    const F = ML.fri, d = new Date(), add = (5 - d.getDay() + 7) % 7;
    const nx = new Date(d.getFullYear(), d.getMonth(), d.getDate() + add);
    const when = fri ? 'Today' : `Next Friday · ${String(nx.getMonth() + 1).padStart(2, '0')}/${String(nx.getDate()).padStart(2, '0')}/${nx.getFullYear()}`;
    $('#mlPanel').innerHTML = `<div class="tm-meta"><span><b>Fridays · Day Tour</b> · PETER meals begin <b>${F.start} hrs</b></span><span>${when}</span></div>
      <div class="ml-grid ml-one"><div class="ml-col"><h3><span>Relief</span>${F.relief.join(' or ')}</h3><ol>${F.posts.map((p, i) => `<li><i>${i + 1}</i><b>${p}</b><small>${i === 0 ? `starts ${F.start} hrs` : 'next in order — time not set in memo'}</small></li>`).join('')}</ol></div>
      <div class="ml-fx ml-big"><b>PETER 1 / PETER 2</b><span>${F.start} hrs</span><small>Fridays, Day Tour only. Covered by ${F.relief.join(' or ')}.</small></div></div>
      <h4 class="ml-h">Rest of the Friday Day Tour</h4>
      <p class="ml-skip">The regular Day Tour order still runs from 1030 hrs (FRANK and JOHN reliefs), with IDA at 1300 hrs and MOBILE at 1330 hrs when JOHN returns. <button type="button" class="linkish" data-ml="day">See Day Tour order</button></p>
      <p class="ml-auth">${esc(ML.authority)}</p>
      <p class="ml-src">${esc(ML.memo)} · ${esc(ML.date)}. The memo sets only the 1130 hrs start for PETER 1 / PETER 2; times can change based on tour operations.</p>`;
  }
  renderMeals();
  $('#mlPanel').addEventListener('click', e => { const b = e.target.closest('[data-ml]'); if (b) { mlTour = b.dataset.ml; renderMeals(); $('#meals').scrollIntoView({ block: 'start', behavior: 'smooth' }); } });
  $('#mlTabs').addEventListener('click', e => { const b = e.target.closest('[data-ml]'); if (b) { mlTour = b.dataset.ml; renderMeals(); } });
  let mlLive = mlCur(), mlDow = new Date().getDay();
  setInterval(() => { const c = mlCur(), d = new Date().getDay(); if (c !== mlLive || d !== mlDow) { mlLive = c; mlDow = d; renderMeals(); } }, 60e3);

  /* ---------- Buildings ---------- */
  const BL = C.buildings; const bldId = b => 'bld-' + b.replace(/\W+/g, '');
  const telHref = n => n.replace(/\D/g, '').length >= 10 ? `tel:${n.replace(/\D/g, '')}` : '';
  const extHtml = x => { const h = telHref(x); return h ? `<a class="ext-n ext-full" href="${h}">${esc(x)}</a>` : `<span class="ext-n">${esc(x)}</span>`; };
  function renderBuildings(q = '') {
    q = q.trim().toLowerCase();
    const list = BL.filter(b => !q || [b[0], b[1], b[2], b[3], ...b[4]].join(' ').toLowerCase().includes(q));
    $('#bldList').innerHTML = list.map(b => `<div class="bld" id="${bldId(b[0])}">
      <div class="bld-main"><b class="bld-name">${esc(b[0])}</b><span class="bld-sector">Sector <b>${esc(b[1])}</b></span><span class="bld-addr">${esc(b[2])}<br>${esc(b[3])}</span></div>
      <div class="bld-ext">${b[4].length ? `<span class="ext-k">${b[4].some(telHref) ? 'Phone' : 'Ext.'}</span>${b[4].map(extHtml).join('<span class="ext-sep">/</span>')}` : '<span class="ext-k">Ext.</span><span class="ext-n ext-none">None listed</span>'}</div>
    </div>`).join('') || '<p class="meta">No buildings match.</p>';
  }
  renderBuildings();
  $('#bldQ').addEventListener('input', e => renderBuildings(e.target.value));
  $('#outside').innerHTML = C.outsideContacts.map(c => `<div class="bld"><div class="bld-main"><b class="bld-name">${esc(c[0])}</b><span class="bld-sector">${esc(c[1])}</span></div><div class="bld-ext"><span class="ext-k">Phone</span>${extHtml(c[2])}</div></div>`).join('');

  /* ---------- C-Summons return dates ---------- */
  const HOL = new Set(C.courtHolidays); const DAY = 864e5;
  const isoD = d => d.toISOString().slice(0, 10);
  const addD = (d, n) => new Date(d.getTime() + n * DAY);
  const isCourt = d => { const w = d.getUTCDay(); return w >= 2 && w <= 5 && !HOL.has(isoD(d)); };
  const OFF = [18, 18, 17, 20, 20, 19, 19]; // Sun..Sat issue weekday -> days to return date
  function rdReturn(issue) {
    let t = addD(issue, OFF[issue.getUTCDay()]);
    const tue = addD(t, 2 - t.getUTCDay());
    [0, 1, 2, 3].map(i => addD(tue, i)).filter(d => HOL.has(isoD(d))).forEach(h => {
      if (h.getUTCDay() === 2) { if (isoD(t) === isoD(h)) t = addD(t, 1); }
      else if (t.getUTCDay() >= 3 && t <= h) t = addD(t, -1);
    });
    for (let g = 0; !isCourt(t) && g < 10; g++) t = addD(t, 1);
    return t;
  }
  function rdTrial(ret) { let t = addD(ret, 14); for (let g = 0; !isCourt(t) && g < 10; g++) t = addD(t, -1); return t; }
  const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const rdMD = d => `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
  const longD = d => `${WD[d.getUTCDay()]}, ${MN[d.getUTCMonth()].slice(0, 3)} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  const RD_MIN = Date.UTC(2026, 10, 1), RD_MAX = Date.UTC(2027, 11, 31);
  const todayUTC = () => { const n = new Date(); return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())); };
  const clampD = d => new Date(Math.min(RD_MAX, Math.max(RD_MIN, d.getTime())));
  let rdSel = clampD(todayUTC()), rdMonth = [rdSel.getUTCFullYear(), rdSel.getUTCMonth()];
  function rdRender() {
    $('#rdIssue').value = isoD(rdSel);
    const r = rdReturn(rdSel), t = rdTrial(r);
    $('#rdOut').innerHTML = `<div class="rd-res rd-ret"><span class="rd-k">Return date</span><b class="rd-v">${longD(r)}</b></div><div class="rd-res"><span class="rd-k">Trial date</span><b class="rd-v">${longD(t)}</b></div><p class="rd-sub">Issued ${longD(rdSel)} · ${Math.round((r - rdSel) / DAY)} days to return</p>`;
    const [y, m] = rdMonth; $('#rdMonthTitle').textContent = `${MN[m]} ${y}`;
    const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(); const tIso = isoD(todayUTC()); let rows = '';
    for (let i = 1; i <= days; i++) {
      const d = new Date(Date.UTC(y, m, i)); if (d < RD_MIN || d > RD_MAX) continue; const rr = rdReturn(d), tt = rdTrial(rr); const di = isoD(d);
      rows += `<tr class="${di === isoD(rdSel) ? 'sel' : ''}${di === tIso ? ' today' : ''}" data-rd="${di}"><td>${WD[d.getUTCDay()]}</td><td>${rdMD(d)}</td><td>${WD[rr.getUTCDay()]}</td><td><b>${rdMD(rr)}</b></td><td>${WD[tt.getUTCDay()]}</td><td>${rdMD(tt)}</td></tr>`;
    }
    $('#rdRows').innerHTML = rows;
    $('#rdMPrev').disabled = Date.UTC(y, m, 1) <= RD_MIN; $('#rdMNext').disabled = Date.UTC(y, m + 1, 1) > RD_MAX;
  }
  const rdSet = d => { rdSel = clampD(d); rdMonth = [rdSel.getUTCFullYear(), rdSel.getUTCMonth()]; rdRender(); };
  $('#rdIssue').addEventListener('change', e => { const v = e.target.value; if (v) rdSet(new Date(v + 'T00:00:00Z')); });
  $('#rdToday').addEventListener('click', () => rdSet(todayUTC()));
  $('#rdPrev').addEventListener('click', () => rdSet(addD(rdSel, -1)));
  $('#rdNext').addEventListener('click', () => rdSet(addD(rdSel, 1)));
  $('#rdMPrev').addEventListener('click', () => { let [y, m] = rdMonth; m--; if (m < 0) { m = 11; y--; } rdMonth = [y, m]; rdRender(); });
  $('#rdMNext').addEventListener('click', () => { let [y, m] = rdMonth; m++; if (m > 11) { m = 0; y++; } rdMonth = [y, m]; rdRender(); });
  $('#rdRows').addEventListener('click', e => { const tr = e.target.closest('[data-rd]'); if (tr) { rdSel = new Date(tr.dataset.rd + 'T00:00:00Z'); rdRender(); $('#rdOut').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } });
  rdRender();

  /* ---------- Field notes ---------- */
  const FN = C.fieldNotes;
  const fnStore = {};
  /* Notified times/details persist across reloads: browser cache storage when available,
     with the tab's window.name as a backup (survives reload in the same tab). */
  const NK = 'psNotified1', NC = 'ps-notes', NU = './__notified.json';
  const WN = 'psStore2:';  // window.name holds { n: notified, ids: saved ID entries } for this tab
  const wnGet = () => { try { if (window.name.startsWith(WN)) return JSON.parse(window.name.slice(WN.length)) || {}; if (window.name.startsWith(NK + ':')) return { n: JSON.parse(window.name.slice(NK.length + 1)) }; } catch (e) {} return {}; };
  const wnSet = (k, val) => { try { const o = wnGet(); o[k] = val; window.name = WN + JSON.stringify(o); } catch (e) {} };
  const nKeep = k => k === 'nAg' || k.startsWith('n_');
  const nMerge = saved => { if (!saved || typeof saved !== 'object') return false; let any = false; Object.keys(saved).forEach(id => { fnStore[id] = { ...saved[id], ...(fnStore[id] || {}) }; any = true; }); return any; };
  const nPut = () => {
    const out = {};
    Object.keys(fnStore).forEach(id => { const o = {}; Object.keys(fnStore[id] || {}).forEach(k => { if (nKeep(k)) o[k] = fnStore[id][k]; }); if (Object.keys(o).length) out[id] = o; });
    const j = JSON.stringify(out);
    wnSet('n', out);
    try { if (window.caches) caches.open(NC).then(c => c.put(NU, new Response(j, { headers: { 'Content-Type': 'application/json' } }))).catch(() => {}); } catch (e) {}
  };
  nMerge(wnGet().n);
  try {
    if (window.caches) caches.open(NC).then(c => c.match(NU)).then(r => r ? r.json() : null).then(saved => {
      if (nMerge(saved) && typeof fnCur !== 'undefined' && fnCur && $('#fnPanel') && !$('#fnPanel').hidden) fnOpen(fnCur);
    }).catch(() => {});
  } catch (e) {}
  const fnLoad = id => ({ ...(fnStore[id] || {}) });
  const fnSave = (id, v) => { fnStore[id] = v; nPut(); };
  const fnHas = id => { const v = fnLoad(id); return Object.keys(v).some(k => k !== 'date' && v[k] && (!Array.isArray(v[k]) || v[k].length)); };
  const mil = t => t ? t.replace(':', '') + ' hrs' : '';
  const usDate = d => { if (!d) return ''; const [y, m, dd] = d.split('-'); return `${m}/${dd}/${y}`; };
  const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const fnCommon = [
    { k: 'date', l: 'Date of occurrence', t: 'date', half: 1 },
    { k: 'time', l: 'Time of occurrence', t: 'time', half: 1 },
    { k: 'rtime', l: 'Report time', t: 'time', half: 1 },
    { k: 'loc', l: 'Location', t: 'bsel', full: 1 },
    { k: 'locDet', l: 'Floor / room (optional)', ph: '3rd floor, room B-301', full: 1, show: v => v.loc && v.loc !== 'Off campus' },
    { k: 'locOff', l: 'Off-campus location', ph: 'E. 149th St & Grand Concourse', full: 1, show: v => v.loc === 'Off campus' }
  ];
  const fnLocOpts = () => [...C.buildings.map(b => b[0]), 'Off campus'];
  const fnLoc = (v, addr) => {
    if (!v.loc) return '';
    if (v.loc === 'Off campus') return (v.locOff || '').trim() ? v.locOff.trim() : '';
    const b = C.buildings.find(x => x[0] === v.loc);
    return v.loc + (addr && b ? ` (${b[2]})` : '') + ((v.locDet || '').trim() ? ', ' + v.locDet.trim() : '');
  };
  const fnPerp = [
    { k: 'kUnk', l: 'Perpetrator identity', t: 'seg', o: ['Unknown'] },
    { k: 'kName', l: 'Name', ph: 'Last, First', pc: 1 },
    { k: 'kAff', l: 'College affiliation', t: 'seg', o: ['this campus', 'other CUNY', 'not affiliated'], pc: 1 },
    { k: 'kPhone', l: 'Phone', t: 'tel', ph: '718-555-0123', pc: 1 },
    { k: 'kAddr', l: 'Address', ph: 'Street, City, ZIP', pc: 1 },
    { k: 'sDesc', l: 'Description', t: 'area', ph: 'Sex, race, age range, build, height, clothing — e.g. Male Black or Hispanic; 18 to 22 yrs old; slim build; 5\'11" to 6\'1"; Blk hat, Blk hooded jacket, blue jeans, Bwn boots' }
  ];
  const fnOfficer = [
    { k: 'oNames', l: 'Responding officer(s)', ph: 'P.O. Smith #123 and P.O. Jones #456' },
    { k: 'oCall', l: 'How Public Safety was made aware', t: 'seg', o: ['call for service', 'officer observation', 'walk-in report', 'alarm activation'] },
    { k: 'oActions', l: 'Actions taken', t: 'area', ph: 'Canvassed the area, checked cameras, notified the Sergeant…' },
    { k: 'oDisp', l: 'Final disposition', t: 'checks', o: ['Report taken', 'Individual advised', 'Referred for follow-up', 'Escorted from location', 'Turned over to NYPD', 'Arrested by NYPD'] },
    { k: 'oPrep', l: 'Prepared by (name / shield #)', ph: 'P.O. Smith #123' }
  ];
  const fnAg = [
    { id: 'SUP', name: 'Supervisor', full: 'Supervisor', f: [['name', 'Name / title', 'Sgt. Lopez'], ['shield', 'Shield #', '204']] },
    { id: 'EMS', name: 'EMS', full: 'EMS', f: [['unit', 'Ambulance / unit #', '12A'], ['name', 'EMT / paramedic name(s)', 'EMT Rivera'], ['shield', 'Shield / ID #', '4521'], ['hosp', 'Hospital', 'Lincoln Hospital']] },
    { id: 'NYPD', name: 'NYPD', full: 'NYPD', f: [['name', 'Officer name', 'P.O. Doe'], ['shield', 'Shield / badge #', '12345'], ['cmd', 'Command / precinct', '40 Pct'], ['rmp', 'RMP / car #', '4521'], ['ref', 'Complaint / incident #', 'optional']] },
    { id: 'FDNY', name: 'FDNY', full: 'FDNY', f: [['unit', 'Engine / ladder #', 'Engine 50'], ['name', 'Officer in charge', 'Lt. Brown']] },
    { id: 'OTH', name: 'Other agency', full: '', f: [['agency', 'Agency name', 'Con Edison'], ['name', 'Contact name', 'J. Smith'], ['shield', 'Badge / ID #', 'optional'], ['phone', 'Phone', 'optional']] }
  ];
  const fnTimes = [['tN', 'Notified'], ['t84', '10-84', 'Arrived'], ['t98', '10-98', 'Cleared']];
  const nowHM = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const agName = (a, v) => a.id === 'OTH' ? ((v[`n_OTH_agency`] || '').trim() || 'Other agency') : a.full;
  function fnAgList(v) {
    return fnAg.filter(a => (v.nAg || []).includes(a.id)).map(a => {
      const g = k => (v[`n_${a.id}_${k}`] || '').trim();
      const det = a.f.filter(([k]) => !(a.id === 'OTH' && k === 'agency')).map(([k, l]) => g(k) ? (k === 'shield' ? `#${g(k).replace(/^#/, '')}` : k === 'hosp' ? `hospital: ${g(k)}` : k === 'rmp' ? `RMP ${g(k)}` : k === 'ref' ? `incident # ${g(k)}` : k === 'phone' ? g(k) : k === 'unit' && a.id === 'EMS' ? `unit ${g(k)}` : g(k)) : '').filter(Boolean);
      const times = fnTimes.map(([k, c, w]) => g(k) ? [c, w, mil(g(k))] : null);
      return { a, name: agName(a, v), det, times, hosp: g('hosp') };
    });
  }
  function fnAgSentence(x) {
    const [n, a, c] = x.times;
    const who = x.name + (x.det.length ? ` (${x.det.filter(d => !d.startsWith('hospital:')).join(', ')})` : '');
    const parts = [];
    if (n) parts.push(`was notified at ${n[2]}`); else parts.push('was notified');
    if (a) parts.push(`arrived on scene (10-84) at ${a[2]}`);
    if (c) parts.push(`cleared (10-98) at ${c[2]}`);
    const last = parts.pop();
    return `${who} ${parts.length ? parts.join(', ') + ' and ' : ''}${last}.` + (x.a.id === 'EMS' && x.hosp && !(FN.find(t => t.id === fnCur) || { fields: [] }).fields.some(f => f.k === 'hosp') ? ` EMS transported to ${x.hosp}.` : '');
  }
  const fnDispTxt = { 'Report taken': 'A report was taken.', 'Individual advised': 'The individual was advised.', 'Referred for follow-up': 'The matter was referred for follow-up.', 'Escorted from location': 'The individual was escorted from the location.', 'Turned over to NYPD': 'The individual was turned over to NYPD.', 'Arrested by NYPD': 'The individual was arrested by NYPD.' };
  const fnContact = [
    { k: 'cName', l: 'Name', ph: 'Last, First' },
    { k: 'cPhone', l: 'Phone', t: 'tel', ph: '718-555-0123' },
    { k: 'cAddr', l: 'Address', ph: 'Street, City, ZIP' }
  ];
  let fnCur = null, idHook = null;
  function larcenyClass(v) {
    const val = parseFloat(String(v.value || '').replace(/[^\d.]/g, ''));
    const gl = v.gl || [];
    const reasons = [];
    if (val > 1000) reasons.push('value over $1,000');
    gl.forEach(g => reasons.push(g.toLowerCase()));
    return reasons.length ? { c: C.larcenyCodes.grand, why: reasons.join(', ') } : { c: C.larcenyCodes.petit, why: isNaN(val) ? 'no value entered yet; $1,000 or less is Petit' : 'value $1,000 or less, no grand factor' };
  }
  function fnCompose(t, v) {
    const ph = l => `\u0001${l}\u0002`;
    const lab = k => { const f = [...fnCommon, ...t.fields, ...fnPerp, ...fnOfficer, ...fnContact].find(x => x.k === k); return f ? f.l.toLowerCase().replace(/\s*\(.*\)/, '') : k; };
    const p = k => (k === 'hosp' && !(v.hosp || '').trim() && (v.n_EMS_hosp || '').trim()) ? v.n_EMS_hosp.trim() : k === 'loc' ? (fnLoc(v) || ph(v.loc === 'Off campus' ? 'off-campus location' : 'location')) : k === 'aff' ? (v.aff ? `(${v.aff})` : ph('this campus/other CUNY')) : (v[k] && String(v[k]).trim()) ? String(v[k]).trim() : ph(lab(k));
    const o = `At approximately ${v.time ? mil(v.time) : ph('time')} on ${v.date ? usDate(v.date) : ph('date')}, at ${p('loc')},`;
    let cls = t.code, extra = '';
    if (t.larceny || t.classify) { const L = t.larceny ? larcenyClass(v) : t.classify(v); cls = L.c; extra = L.why; }
    const out = [];
    out.push(`FIELD NOTES — ${t.name.toUpperCase()}${cls ? ` (PL ${cls[0]} ${cls[1]}, ${cls[2]})` : ''}`);
    out.push(`Occurred: ${v.date ? usDate(v.date) : ph('date')} at ${v.time ? mil(v.time) : ph('time')}  ·  Reported: ${v.rtime ? mil(v.rtime) : ph('report time')}`);
    out.push(`Location: ${fnLoc(v, 1) || ph(v.loc === 'Off campus' ? 'off-campus location' : 'location')}`);
    const ct = [v.cName, v.cPhone, v.cAddr].filter(x => x && x.trim());
    if (ct.length) out.push(`Complainant: ${ct.join(' · ')}`);
    const nar = t.text(v, p, o);
    const resp = fnRespText(v, p);
    out.push('', nar);
    if (resp) out.push('', resp);
    if ((v.pDesc || v.value) && t.fields.some(f => f.k === 'pDesc')) out.push('', `Property: ${p('pDesc')}${v.value ? ` — approx. value $${String(v.value).replace(/^\$/, '')}` : ''}`);
    if (t.perp) { const pr = fnPerpLine(v); if (pr) out.push(`Perpetrator: ${pr}`); }
    if (v.notes && v.notes.trim()) out.push('', `Notes: ${v.notes.trim()}`);
    return { raw: out.join('\n'), cls, extra, nar, resp, p };
  }
  function fnPerpLine(v) {
    if (v.kUnk) return 'Unknown' + ((v.sDesc || '').trim() ? ' — ' + v.sDesc.trim() : '');
    const a = [v.kName, v.kAff, v.kPhone, v.kAddr, v.sDesc].map(x => (x || '').trim()).filter(Boolean);
    return a.join(' · ');
  }
  function fnRespText(v, p, force) {
    const any = ['oNames', 'oCall', 'oActions'].some(k => (v[k] || '').trim()) || (v.oDisp || []).length || (v.nAg || []).length;
    const ntf = fnAgList(v).map(fnAgSentence).join(' ');
    if (!any && !force) return '';
    const how = { 'call for service': 'responded to a call for service', 'officer observation': 'observed the incident while on patrol', 'walk-in report': 'received a walk-in report', 'alarm activation': 'responded to an alarm activation' }[v.oCall] || '\u0001responded to / observed\u0002';
    const acts = (v.oActions || '').trim();
    const d = (v.oDisp || []).map(x => fnDispTxt[x]).join(' ');
    return `Public Safety Officer(s) ${p('oNames')} ${how} at ${p('loc')}.` + (acts ? ` Officers ${acts.replace(/^officers?\s+/i, '').replace(/\.$/, '')}.` : '') + (ntf ? ' ' + ntf : '') + (d ? ' ' + d : ' \u0001final disposition\u0002.') + ' No further incidents occurred.';
  }
  const fnPlain = s => s.replace(/\u0001([^\u0002]*)\u0002/g, '($1)');
  const fnHTML = s => esc(s).replace(/\u0001([^\u0002]*)\u0002/g, '<span class="fn-ph">($1)</span>');
  function fnField(f, v) {
    const id = 'fn-' + f.k, val = v[f.k];
    if (f.t === 'seg') return `<fieldset class="fn-f fn-seg-wrap" data-k="${f.k}"><legend>${esc(f.l)}</legend><div class="fn-seg">${f.o.map(o => `<button type="button" class="fn-opt${val === o ? ' on' : ''}" data-k="${f.k}" data-v="${esc(o)}" aria-pressed="${val === o}">${esc(o)}</button>`).join('')}</div></fieldset>`;
    if (f.t === 'checks') return `<fieldset class="fn-f" data-k="${f.k}"><legend>${esc(f.l)}</legend><div class="fn-checks">${f.o.map(o => `<label class="fn-chk"><input type="checkbox" data-k="${f.k}" value="${esc(o)}"${(val || []).includes(o) ? ' checked' : ''}> ${esc(o)}</label>`).join('')}</div></fieldset>`;
    const lab = `<label for="${id}">${esc(f.l)}</label>`;
    if (f.t === 'bsel') return `<div class="fn-f full" data-k="${f.k}">${lab}<select id="${id}" data-k="${f.k}"><option value="">Select a building or off campus…</option>${fnLocOpts().map(o => `<option${val === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`;
    if (f.t === 'area') return `<div class="fn-f" data-k="${f.k}">${lab}<textarea id="${id}" data-k="${f.k}" rows="3" placeholder="${esc(f.ph || '')}">${esc(val || '')}</textarea></div>`;
    const type = f.t === 'num' ? 'text" inputmode="decimal' : (f.t || 'text');
    return `<div class="fn-f${f.half ? ' half' : ''}${f.full ? ' full' : ''}" data-k="${f.k}">${lab}<input id="${id}" type="${type}" data-k="${f.k}" value="${esc(val || '')}" placeholder="${esc(f.ph || '')}" autocomplete="off"></div>`;
  }
  function fnGrid() {
    if (idHook) idHook();
    $('#fnGrid').innerHTML = FN.map(t => {
      const c = t.larceny ? 'PL 155.25 / 155.30' : t.code ? 'PL ' + t.code[0] : 'Narrative';
      return `<button type="button" class="fn-btn${fnCur === t.id ? ' on' : ''}" data-fn="${t.id}" role="tab" aria-selected="${fnCur === t.id}"><b>${esc(t.name)}</b><small>${esc(t.sub || c)}</small>${fnHas(t.id) ? '<i class="fn-dot" title="Draft saved"></i>' : ''}</button>`;
    }).join('');
  }
  function fnOpen(id, scroll) {
    const t = FN.find(x => x.id === id); if (!t) return;
    fnCur = id; fnGrid();
    const v = fnLoad(id); if (!v.date) v.date = todayISO();
    const p = $('#fnPanel'); p.hidden = false;
    p.innerHTML = `<div class="fn-head"><div><h3>${esc(t.name)}</h3>${t.note ? `<p>${esc(t.note)}</p>` : ''}${t.draft ? '<p class="fn-draft">Draft wording — check against your department template.</p>' : ''}</div><button type="button" class="mini" data-fnclose>Close</button></div>
      <div id="fnCls"></div>
      <form class="fn-form" autocomplete="off" onsubmit="return false">
        <div class="fn-grp"><h4>When &amp; where</h4><div class="fn-row">${fnCommon.map(f => fnField(f, v)).join('')}</div></div>
        <div class="fn-grp"><h4>Details</h4>${t.fields.map(f => fnField(f, v)).join('')}</div>
        ${t.perp ? `<div class="fn-grp fn-perp${v.kUnk ? ' unk' : ''}"><h4>${t.id === 'weapon' || t.id === 'trespass' ? 'Subject' : 'Perpetrator'} information</h4>${fnPerp.filter(f => !(f.k === 'kAff' && t.fields.some(x => x.k === 'saff'))).map(f => fnField(t.id === 'weapon' || t.id === 'trespass' ? (f.k === 'kUnk' ? { ...f, l: 'Subject identity' } : f) : f, v)).join('')}<p class="fn-unk-note">${t.id === 'weapon' || t.id === 'trespass' ? 'Subject' : 'Perpetrator'} unknown — contact fields not required. Add a description if available.</p></div>` : ''}
        ${t.fields.some(f => f.k === 'gender') ? `<div class="fn-grp"><h4>${t.id === 'aided' ? 'Aided' : 'Complainant'} contact information</h4>${fnContact.map(f => fnField(f, v)).join('')}</div>` : ''}
        <div class="fn-grp"><h4>Officer response &amp; disposition</h4>${fnOfficer.map(f => fnField(f, v)).join('')}</div>
        ${fnNotifiedHTML(v)}
        <div class="fn-grp"><h4>Additional notes</h4><div class="fn-f"><textarea data-k="notes" rows="3" aria-label="Additional notes" placeholder="Witnesses, cameras checked, officers on scene, follow-up…">${esc(v.notes || '')}</textarea></div></div>
      </form>
      <div class="fn-out"><div class="fn-out-h"><h4>Narrative</h4><small>Not saved — copy before you reload</small></div><pre id="fnText" class="fn-text"></pre>
        <div class="fn-actions"><button type="button" class="btn-p" data-fnact="report">Generate report</button><button type="button" class="mini" data-fnact="copy">Copy</button><button type="button" class="mini" data-fnact="clear">Clear</button></div></div>`;
    fnRender(t, v);
    if (scroll) requestAnimationFrame(() => { const y = p.getBoundingClientRect().top + scrollY - ($('.top').offsetHeight + 12); window.scrollTo({ top: y, behavior: 'smooth' }); });
  }
  function fnNotifiedHTML(v) {
    const on = v.nAg || [];
    return `<div class="fn-grp fn-ntf"><h4>Notified</h4><p class="fn-hint">Tap each party notified. Time buttons stamp the phone's current time; you can edit it after.</p>
      <div class="fn-agtabs">${fnAg.map(a => `<label class="fn-agtab${on.includes(a.id) ? ' on' : ''}"><input type="checkbox" data-k="nAg" value="${a.id}"${on.includes(a.id) ? ' checked' : ''}>${esc(a.name)}</label>`).join('')}</div>
      ${fnAg.map(a => `<div class="fn-agcard" data-ag="${a.id}"${on.includes(a.id) ? '' : ' hidden'}><h5>${esc(a.name)}</h5>
        <div class="fn-stamps">${fnTimes.map(([k, c, w]) => { const key = `n_${a.id}_${k}`, val = v[key] || ''; return `<div class="fn-stamp${val ? ' set' : ''}"><button type="button" data-stamp="${key}"><b>${c}</b>${w ? `<small>${w}</small>` : ''}</button><input type="time" id="fn-${key}" data-k="${key}" value="${esc(val)}" aria-label="${esc(a.name + ' ' + c + ' time')}"></div>`; }).join('')}</div>
        ${a.f.map(([k, l, ph]) => { const key = `n_${a.id}_${k}`; return `<div class="fn-f"><label for="fn-${key}">${esc(l)}</label><input id="fn-${key}" data-k="${key}" type="${k === 'phone' ? 'tel' : 'text'}" value="${esc(v[key] || '')}" placeholder="${esc(ph)}" autocomplete="off"></div>`; }).join('')}
      </div>`).join('')}</div>`;
  }
  function fnRead(t) {
    const v = {}; const p = $('#fnPanel');
    $$('input[data-k]:not([type=checkbox]), textarea[data-k], select[data-k]', p).forEach(i => { v[i.dataset.k] = i.value; });
    $$('.fn-opt.on', p).forEach(b => { v[b.dataset.k] = b.dataset.v; });
    $$('input[type=checkbox][data-k]', p).forEach(i => { (v[i.dataset.k] = v[i.dataset.k] || []); if (i.checked) v[i.dataset.k].push(i.value); });
    return v;
  }
  function fnRender(t, v) {
    const p = $('#fnPanel');
    const ag = v.nAg || [];
    $$('.fn-agcard', p).forEach(c => { c.hidden = !ag.includes(c.dataset.ag); });
    $$('.fn-agtab', p).forEach(l => l.classList.toggle('on', l.querySelector('input').checked));
    $$('.fn-stamp', p).forEach(st => st.classList.toggle('set', !!st.querySelector('input').value));
    const unk = !!v.kUnk, pg = $('.fn-perp', p);
    if (pg) { pg.classList.toggle('unk', unk); fnPerp.filter(f => f.pc).forEach(f => { const el = $(`.fn-f[data-k="${f.k}"]`, pg); if (!el) return; el.classList.toggle('off', unk); $$('input, button', el).forEach(i => { i.disabled = unk; }); }); }
    [...fnCommon, ...t.fields].forEach(f => { if (f.show) { const el = $(`.fn-f[data-k="${f.k}"]`, p); if (el) el.hidden = !f.show(v); } });
    const r = fnCompose(t, v);
    $('#fnText').innerHTML = fnHTML(r.raw);
    $('#fnCls').innerHTML = r.cls ? `<div class="fn-cls"><span class="lvl ${lvlInfo(r.cls[2].replace('A Misdemeanor', 'A Misdemeanor')).cls}">${esc(r.cls[2])}</span><div><b>${esc(r.cls[1])}</b> · PL ${esc(r.cls[0])}${r.extra ? `<small>${esc(r.extra)}</small>` : ''}</div><button type="button" class="mini" data-sec="${r.cls[0]}">Read ${r.cls[0]}</button></div>` : r.extra ? `<div class="fn-cls"><div><b>No Penal Law charge</b><small>${esc(r.extra)}</small></div></div>` : '';
    p._raw = r.raw; p._r = r; p._v = v;
  }
  fnGrid();
  $('#fnGrid').addEventListener('click', e => { const b = e.target.closest('[data-fn]'); if (!b) return; if (fnCur === b.dataset.fn) { fnCur = null; $('#fnPanel').hidden = true; fnGrid(); return; } fnOpen(b.dataset.fn, true); });
  const fnUpd = () => { const t = FN.find(x => x.id === fnCur); if (!t) return; const v = fnRead(t); fnSave(t.id, v); fnRender(t, v); };
  $('#fnPanel').addEventListener('input', fnUpd);
  $('#fnPanel').addEventListener('click', e => {
    const o = e.target.closest('.fn-opt');
    if (o) { const on = o.classList.contains('on'); $$(`.fn-opt[data-k="${o.dataset.k}"]`, $('#fnPanel')).forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); }); if (!on) { o.classList.add('on'); o.setAttribute('aria-pressed', 'true'); } fnUpd(); fnGrid(); return; }
    const st = e.target.closest('[data-stamp]');
    if (st) { const inp = document.getElementById('fn-' + st.dataset.stamp); inp.value = nowHM(); fnUpd(); toast(`${st.querySelector('b').textContent} ${mil(inp.value)} saved`); return; }
    if (e.target.closest('[data-fnclose]')) { fnCur = null; $('#fnPanel').hidden = true; fnGrid(); return; }
    const a = e.target.closest('[data-fnact]'); if (!a) return;
    const txt = fnPlain($('#fnPanel')._raw || '');
    if (a.dataset.fnact === 'report') { fnReportOpen(); return; }
    if (a.dataset.fnact === 'copy') copy(txt, 'Narrative copied');
    else if (a.dataset.fnact === 'share') navigator.share({ title: 'Field notes', text: txt }).catch(() => {});
    else if (a.dataset.fnact === 'clear') { if (confirm('Clear this draft?')) { delete fnStore[fnCur]; nPut(); fnOpen(fnCur); toast('Draft cleared'); } }
  });
  $('#fnPanel').addEventListener('input', () => fnGrid(), { passive: true });
  window.fnOpenType = id => fnOpen(id, true);


  /* ---------- Field notes → ID scan ---------- */
  // Reads the printed text on an ID card (text reader loaded from jsDelivr on first use),
  // fills the fields and saves the text. The photo itself is never stored.
  const IDC = ['Student', 'Faculty', 'Staff', 'Contractor / Vendor', 'Visitor', 'Non-affiliate', 'Other CUNY'];
  const IDT = ['Driver license', 'State ID', 'CUNY ID', 'Other ID'];
  const IDU = './__ids.json';
  let IDS = [], idEdit = null, idRaw = '';
  const idPut = () => {
    wnSet('ids', IDS);
    try { if (window.caches) caches.open(NC).then(c => c.put(IDU, new Response(JSON.stringify(IDS), { headers: { 'Content-Type': 'application/json' } }))).catch(() => {}); } catch (e) {}
  };
  const idMerge = arr => { if (!Array.isArray(arr)) return; arr.forEach(x => { if (x && x.id && !IDS.some(y => y.id === x.id)) IDS.push(x); }); IDS.sort((a, b) => b.ts - a.ts); };
  const ID_TTL = 24 * 3600e3;
  const idPrune = () => { const n = IDS.length, cut = Date.now() - ID_TTL; IDS = IDS.filter(x => x.ts > cut); if (IDS.length !== n) { idPut(); return true; } return false; };
  idMerge(wnGet().ids);
  try { if (window.caches) caches.open(NC).then(c => c.match(IDU)).then(r => r ? r.json() : null).then(a => { const n = IDS.length; idMerge(a); idPrune(); if (IDS.length !== n) idList(); }).catch(() => {}); } catch (e) {}

  const tcase = x => (x || '').toLowerCase().replace(/(^|[\s'\-])([a-z])/g, (m, a, b) => a + b.toUpperCase()).trim();
  function parseText(t, codes) {
    const T = t.replace(/[|]/g, 'I'); const U = T.toUpperCase();
    const o = { type: /CUNY|CITY UNIVERSITY|COLLEGE/.test(U) ? 'CUNY ID' : /DRIVER/.test(U) ? 'Driver license' : /IDENTIFICATION|NON.?DRIVER|ID CARD/.test(U) ? 'State ID' : 'Other ID' };
    const dates = [...U.matchAll(/(\d{2})[\/\-.](\d{2})[\/\-.](\d{4})/g)].map(m => ({ s: `${m[1]}/${m[2]}/${m[3]}`, y: +m[3], i: m.index }));
    const near = (re) => { const m = re.exec(U); if (!m) return ''; const d = dates.find(x => x.i >= m.index && x.i - m.index < 30); return d ? d.s : ''; };
    o.dob = near(/\bDOB\b|BIRTH/); o.exp = near(/\bEXP/);
    const yr = new Date().getFullYear();
    if (!o.dob) { const d = dates.filter(x => x.y < yr - 12).sort((a, b) => a.y - b.y)[0]; if (d) o.dob = d.s; }
    if (!o.exp) { const d = dates.filter(x => x.y >= yr).sort((a, b) => b.y - a.y)[0]; if (d) o.exp = d.s; }
    const em = /EMPL\s*ID[\s:#.]*([0-9]{8})/.exec(U) || /\bID(?:\s*(?:NO|NUMBER|#))?[\s:#.]+([A-Z0-9][A-Z0-9 ]{5,14}[A-Z0-9])\b/.exec(U);
    o.num = em ? em[1].replace(/\s+/g, ' ').trim() : ((codes || []).find(c => /^\d{6,}$/.test(c)) || (/\b(\d{3} \d{3} \d{3}|\d{8,9})\b/.exec(U) || [])[1] || '');
    const sx = /\bSEX[\s:]*([MF])\b/.exec(U); if (sx) o.sex = sx[1] === 'M' ? 'Male' : 'Female';
    const stop = /UNIVERSITY|CUNY|COLLEGE|NEW YORK|STATE|DRIVER|LICENSE|IDENTIFICATION|CLASS|\bDOB\b|\bEXP|ISSUED|\bSEX\b|EYES|\bHT\b|\bUSA\b|STUDENT|STAFF|FACULTY|EMPLOYEE|EMPL|VALID|SIGNATURE|ORGAN|DONOR|\bID\b|CARD|DEPARTMENT|VISITOR/;
    const lines = T.split(/\n/).map(l => l.trim()).filter(Boolean);
    const isNm = l => { const u = l.toUpperCase(), up = l.replace(/[^A-Z]/g, '').length, al = l.replace(/[^A-Za-z]/g, '').length; return /^[A-Z][A-Z'\-., ]{1,30}$/.test(u) && !stop.test(u) && al >= 3 && up / al >= .7; };
    const ni = lines.findIndex(isNm);
    const nm = ni < 0 ? [] : [lines[ni]].concat(isNm(lines[ni + 1] || '') ? [lines[ni + 1]] : []).map(l => l.toUpperCase());
    if (nm.length) {
      const a = nm[0].replace(/^\d+\s*/, '');
      if (a.includes(',')) { const [l, f] = a.split(','); o.last = tcase(l); const fp = (f || '').trim().split(/\s+/); o.first = tcase(fp[0]); o.mid = tcase(fp.slice(1).join(' ')); }
      else if (nm[1]) { o.last = tcase(a); const fp = nm[1].split(/\s+/); o.first = tcase(fp[0]); o.mid = tcase(fp.slice(1).join(' ')); }
      else { const w = a.split(/\s+/); o.first = tcase(w[0]); o.last = tcase(w.slice(1).join(' ')); }
    }
    const zi = lines.findIndex(l => /\b[A-Z]{2}\s+\d{5}(-\d{4})?\b/.test(l.toUpperCase()));
    if (zi > 0 && /^\d+\s+\S/.test(lines[zi - 1])) o.addr = tcase(lines[zi - 1]) + ', ' + lines[zi].replace(/\b([A-Za-z][A-Za-z ]+?)(,?\s+)([A-Z]{2})\s+(\d{5})/, (m, c, sp, st, z) => tcase(c) + ', ' + st + ' ' + z);
    o.cls = /FACULTY/.test(U) ? 'Faculty' : /\bSTAFF\b|EMPLOYEE/.test(U) ? 'Staff' : /STUDENT/.test(U) ? 'Student' : /VISITOR/.test(U) ? 'Visitor' : '';
    if (/NEW YORK/.test(U) && o.type !== 'CUNY ID') o.state = 'NY';
    return o;
  }
  const loadScript = (src, test) => new Promise((res, rej) => { if (test()) return res(); const s = document.createElement('script'); s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('load')); document.head.appendChild(s); });
  const TJ = 'https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/';
  let ocrW = null;
  const ocrWorker = prog => ocrW || (ocrW = loadScript(TJ + 'tesseract.min.js', () => !!window.Tesseract).then(() => Tesseract.createWorker('eng', 1, {
    workerPath: TJ + 'worker.min.js', corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@7.0.0',
    langPath: 'https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng@1.0.0/4.0.0_best_int', cacheMethod: 'none',
    logger: m => prog && prog(m)
  })).catch(e => { ocrW = null; throw e; }));
  let ocrProg = null;
  const toCanvas = async (file, max) => {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); return c;
    } finally { URL.revokeObjectURL(url); }
  };
  const idStatus = (msg, busy) => { const el = $('#idsStatus'); el.hidden = !msg; el.classList.toggle('busy', !!busy); el.textContent = msg || ''; };
  async function idScanFile(file) {
    idOpenEditor(null);
    idStatus('Loading the text reader…', true);
    let raw = '';
    try {
      const c = await toCanvas(file, 2000);
      // grayscale + contrast stretch helps the reader with glossy cards
      const x = c.getContext('2d'), im = x.getImageData(0, 0, c.width, c.height), d = im.data;
      let lo = 255, hi = 0; for (let i = 0; i < d.length; i += 16) { const g = (d[i] * 3 + d[i + 1] * 6 + d[i + 2]) / 10; if (g < lo) lo = g; if (g > hi) hi = g; }
      const k = 255 / Math.max(40, hi - lo); for (let i = 0; i < d.length; i += 4) { const g = Math.max(0, Math.min(255, ((d[i] * 3 + d[i + 1] * 6 + d[i + 2]) / 10 - lo) * k)); d[i] = d[i + 1] = d[i + 2] = g; } x.putImageData(im, 0, 0);
      ocrProg = m => { if (m.status === 'recognizing text') idStatus(`Reading the text… ${Math.round(m.progress * 100)}%`, true); else if (/load|initializ/.test(m.status)) idStatus('Loading the text reader (first use takes a few seconds)…', true); };
      const w = await ocrWorker(m => ocrProg && ocrProg(m));
      const r = await w.recognize(c);
      raw = (r.data.text || '').replace(/\n{3,}/g, '\n\n').trim();
    } catch (e) {
      idStatus('Could not read the card. The text reader needs an internet connection; you can also type the details below.', false);
      return;
    }
    if (!raw) { idStatus('No text found. Retake the photo flat, in good light, filling the frame — or type the details below.', false); return; }
    const data = parseText(raw, []);
    idRaw = raw; idFill(data);
    const got = ['last', 'first', 'dob', 'num'].filter(k => data[k]).length;
    idStatus(got >= 3 ? 'Text read. Check the details, pick a classification, then save.' : 'Text read, but some details were unclear. Check the read text and fill in the rest, then save.', false);
  }
  const idFields = [['last', 'Last name'], ['first', 'First name'], ['mid', 'Middle'], ['dob', 'Date of birth', 'MM/DD/YYYY'], ['num', 'ID number'], ['state', 'Issuing state', 'NY'], ['exp', 'Expires', 'MM/DD/YYYY'], ['addr', 'Address', 'Street, City, State ZIP']];
  function idOpenEditor(entry) {
    idEdit = entry ? entry.id : null; idRaw = entry ? (entry.raw || '') : '';
    const e = entry || {};
    $('#idsEdit').hidden = false;
    $('#idsEdit').innerHTML = `<div id="idsStatus" class="ids-status" role="status" hidden></div>
      <div class="ids-grp"><span class="ids-lab">ID type</span><div class="ids-seg" data-g="type">${IDT.map(t => `<button type="button" class="ids-opt${e.type === t ? ' on' : ''}" data-v="${t}">${t}</button>`).join('')}</div></div>
      <div class="ids-fields">${idFields.map(([k, l, ph]) => `<label class="ids-f ids-${k}"><span>${l}</span><input data-id="${k}" value="${esc(e[k] || '')}" placeholder="${ph || ''}" autocomplete="off"${k === 'dob' || k === 'exp' ? ' inputmode="numeric"' : ''}></label>`).join('')}
        <div class="ids-f ids-sex"><span>Sex</span><div class="ids-seg" data-g="sex">${['Male', 'Female', 'X'].map(t => `<button type="button" class="ids-opt${e.sex === t ? ' on' : ''}" data-v="${t}">${t}</button>`).join('')}</div></div></div>
      <div class="ids-grp"><span class="ids-lab">Classification</span><div class="ids-seg ids-cls" data-g="cls">${IDC.map(t => `<button type="button" class="ids-opt${e.cls === t ? ' on' : ''}" data-v="${t}">${t}</button>`).join('')}</div></div>
      <label class="ids-f"><span>Notes</span><input data-id="note" value="${esc(e.note || '')}" placeholder="optional — e.g. found in C Building lobby"></label>
      <label class="ids-f ids-rawf"${idRaw ? '' : ' hidden'}><span>Text read from the ID (saved with the entry)</span><textarea id="idsRawTxt" rows="6" spellcheck="false"></textarea></label>
      <div class="ids-act"><button type="button" class="btn primary" data-ids="save">${entry ? 'Save changes' : 'Save entry'}</button><button type="button" class="mini" data-ids="cancel">Cancel</button></div>`;
    $('#idsRawTxt').value = idRaw;
    $('#idsEdit').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function idFill(d) {
    const ed = $('#idsEdit');
    Object.entries(d).forEach(([k, val]) => {
      const i = $(`input[data-id="${k}"]`, ed); if (i && val && !i.value) i.value = val;
      const g = $(`.ids-seg[data-g="${k}"]`, ed); if (g && val) $$('.ids-opt', g).forEach(b => b.classList.toggle('on', b.dataset.v === val));
    });
    const r = $('.ids-rawf', ed); r.hidden = !idRaw; $('#idsRawTxt').value = idRaw;
  }
  function idRead() {
    const ed = $('#idsEdit'), o = {};
    $$('input[data-id]', ed).forEach(i => { o[i.dataset.id] = i.value.trim(); });
    $$('.ids-seg', ed).forEach(g => { const b = $('.ids-opt.on', g); o[g.dataset.g] = b ? b.dataset.v : ''; });
    o.raw = $('#idsRawTxt').value.trim().slice(0, 4000);
    return o;
  }
  const idName = e => [e.last, [e.first, e.mid].filter(Boolean).join(' ')].filter(Boolean).join(', ');
  const idWhen = ts => { const d = new Date(ts); return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')} hrs`; };
  const idClsKey = c => (c || '').toLowerCase().replace(/[^a-z]+/g, '-');
  function idList() {
    const el = $('#idsList'); if (!el) return;
    idPrune();
    const t = FN.find(x => x.id === fnCur);
    const canP = t && t.perp, canC = t && t.fields.some(f => f.k === 'gender');
    const who = t ? (t.id === 'weapon' || t.id === 'trespass' ? 'Subject' : 'Perpetrator') : '';
    el.innerHTML = IDS.length ? `<div class="ids-lh"><h4>Saved IDs <span>${IDS.length}</span></h4><button type="button" class="mini" data-ids="clear">Clear all</button></div>` + IDS.map(e => `<div class="ids-card${e.sample ? ' is-sample' : ''}" data-eid="${e.id}">
        <div class="ids-ct"><b>${esc(idName(e) || 'Name not entered')}</b>${e.cls ? `<span class="ids-badge c-${idClsKey(e.cls)}">${esc(e.cls)}</span>` : '<span class="ids-badge none">Not classified</span>'}</div>
        <p>${[e.type, e.num && '#' + esc(e.num), e.state, e.dob && 'DOB ' + esc(e.dob)].filter(Boolean).join(' · ')}</p>
        ${e.addr ? `<p>${esc(e.addr)}</p>` : ''}${e.note ? `<p class="ids-note">${esc(e.note)}</p>` : ''}${e.raw ? `<details class="ids-rt"><summary>Text read from ID</summary><pre>${esc(e.raw)}</pre></details>` : ''}
        <small>Saved ${idWhen(e.ts)} · deletes automatically ${idWhen(e.ts + ID_TTL)}</small>
        <div class="ids-cbtn">${canP ? `<button type="button" class="mini" data-ids="useP">Use as ${who}</button>` : ''}${canC ? `<button type="button" class="mini" data-ids="useC">Use as ${t.id === 'aided' ? 'Aided' : 'Complainant'}</button>` : ''}<button type="button" class="mini" data-ids="copy">Copy</button><button type="button" class="mini" data-ids="edit">Edit</button><button type="button" class="mini danger" data-ids="del">Delete</button></div>
      </div>`).join('') + (t ? '' : '<p class="fn-hint">Open an incident type below to drop a saved ID into its form.</p>') : '';
  }
  const idAffOf = c => ['Student', 'Faculty', 'Staff'].includes(c) ? 'this campus' : c === 'Other CUNY' ? 'other CUNY' : c ? 'not affiliated' : '';
  const idLine = e => [idName(e), e.cls, e.type && `${e.state ? e.state + ' ' : ''}${e.type.toLowerCase()}${e.num ? ' #' + e.num : ''}`, e.dob && 'DOB ' + e.dob, e.sex, e.addr].filter(Boolean).join('; ');
  function idUse(e, as) {
    const t = FN.find(x => x.id === fnCur); if (!t) return;
    const v = fnLoad(t.id), aff = idAffOf(e.cls), has = k => t.fields.some(f => f.k === k);
    if (as === 'P') {
      v.kUnk = ''; v.kName = idName(e); if (e.addr) v.kAddr = e.addr;
      if (has('saff')) { if (aff) v.saff = aff; const r = { Student: 'Student', Faculty: 'Faculty', Staff: 'Staff', Visitor: 'Visitor' }[e.cls]; if (r) v.srole = r; } else if (aff) v.kAff = aff;
    } else {
      v.cName = idName(e); if (e.addr) v.cAddr = e.addr;
      if (has('aff') && (aff === 'this campus' || aff === 'other CUNY')) v.aff = aff;
      if (has('role') && ['Student', 'Faculty', 'Staff', 'Visitor'].includes(e.cls)) v.role = e.cls;
      if (has('gender') && e.sex) v.gender = e.sex === 'Male' ? 'male' : e.sex === 'Female' ? 'female' : 'undisclosed';
    }
    const idn = `ID on file: ${[e.state, e.type].filter(Boolean).join(' ')}${e.num ? ' #' + e.num : ''}${e.dob ? ', DOB ' + e.dob : ''}.`;
    if (e.type || e.num) v.notes = (v.notes || '').includes(idn) ? v.notes : [(v.notes || '').trim(), idn].filter(Boolean).join('\n');
    fnSave(t.id, v); fnOpen(t.id);
    toast(`${idName(e) || 'ID'} added to ${t.name}`);
    const sec = $(as === 'P' ? '#fnPanel .fn-perp' : '#fnPanel .fn-grp:has(input[data-k="cName"])') || $('#fnPanel');
    requestAnimationFrame(() => sec.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }
  $('#idsCam').addEventListener('click', () => { $('#idsFile').value = ''; $('#idsFile').click(); ocrWorker(m => ocrProg && ocrProg(m)).catch(() => {}); });
  $('#idsMan').addEventListener('click', () => idOpenEditor(null));
  // Sample EMS run: a marked test ID plus an Aided draft with EMS notified, for trying the ID → report flow.
  $('#idsDemo').addEventListener('click', () => {
    if (fnHas('aided') && !confirm('Replace the current Aided draft with the sample EMS run?')) return;
    const hm = m => { const d = new Date(Date.now() - m * 60e3); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
    fnSave('aided', {
      date: todayISO(), time: hm(25), rtime: hm(0), loc: fnLocOpts()[0], locDet: '1st floor lobby',
      injury: 'injured their right ankle', circ: 'slipped on the stairs between the 1st and 2nd floor', ems: 'Transported', hosp: 'Lincoln Hospital',
      oCall: 'call for service', notes: 'SAMPLE — test run. Clear this draft when done.',
      nAg: ['EMS'], n_EMS_unit: '12A', n_EMS_name: 'EMT Sample', n_EMS_shield: '0000', n_EMS_hosp: 'Lincoln Hospital',
      n_EMS_tN: hm(22), n_EMS_t84: hm(12), n_EMS_t98: hm(3)
    });
    if (!IDS.some(x => x.sample)) {
      IDS.unshift({ id: 'sample' + Date.now().toString(36), ts: Date.now(), sample: true, type: 'Driver license', last: 'Sample', first: 'Test', mid: '', dob: '01/01/2000', sex: 'Female', num: '000 000 000', state: 'NY', exp: '01/01/2030', addr: '1 Sample St, Bronx, NY 10451', cls: 'Student', note: 'SAMPLE — test entry, safe to delete',
        raw: 'SAMPLE — NOT A REAL ID\nNEW YORK STATE DRIVER LICENSE\nID: 000 000 000\nSAMPLE\nTEST\n1 SAMPLE ST\nBRONX, NY 10451\nDOB: 01/01/2000\nSEX: F' });
      idPut();
    }
    fnOpen('aided');
    toast('Sample loaded. Tap “Use as Aided” on the sample ID.');
    requestAnimationFrame(() => $('#idsList').scrollIntoView({ block: 'start', behavior: 'smooth' }));
  });
  $('#idsFile').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (f) idScanFile(f); });
  $('#idScan').addEventListener('click', e => {
    const o = e.target.closest('.ids-opt');
    if (o) { const on = o.classList.contains('on'); $$('.ids-opt', o.parentElement).forEach(b => b.classList.remove('on')); if (!on) o.classList.add('on'); return; }
    const a = e.target.closest('[data-ids]'); if (!a) return;
    const act = a.dataset.ids, card = a.closest('[data-eid]'), ent = card && IDS.find(x => x.id === card.dataset.eid);
    if (act === 'save') {
      const o2 = idRead();
      if (!o2.last && !o2.first && !o2.num && !o2.raw) { toast('Enter at least a name or ID number'); return; }
      if (idEdit) { const x = IDS.find(y => y.id === idEdit); Object.assign(x, o2); }
      else IDS.unshift({ id: 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ts: Date.now(), ...o2 });
      idPut(); $('#idsEdit').hidden = true; $('#idsEdit').innerHTML = ''; idEdit = null; idList(); toast('ID entry saved');
    } else if (act === 'cancel') { $('#idsEdit').hidden = true; $('#idsEdit').innerHTML = ''; idEdit = null; }
    else if (act === 'edit' && ent) idOpenEditor(ent);
    else if (act === 'del' && ent) { if (confirm(`Delete the saved ID for ${idName(ent) || 'this entry'}?`)) { IDS = IDS.filter(x => x !== ent); idPut(); idList(); toast('Deleted'); } }
    else if (act === 'clear') { if (confirm('Delete all saved IDs from this phone?')) { IDS = []; idPut(); idList(); toast('Saved IDs cleared'); } }
    else if (act === 'copy' && ent) { navigator.clipboard && navigator.clipboard.writeText(idLine(ent)).then(() => toast('Copied'), () => toast('Copy not available')); }
    else if ((act === 'useP' || act === 'useC') && ent) idUse(ent, act === 'useP' ? 'P' : 'C');
  });
  idList(); idHook = idList;
  setInterval(() => { if (idPrune()) { idList(); toast('Expired ID entries were deleted'); } }, 60e3);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && idPrune()) idList(); });

  /* ---------- Field notes → incident report ---------- */
  function fnReportData() {
    const t = FN.find(x => x.id === fnCur), P = $('#fnPanel'), v = P._v || {}, r = P._r; if (!t || !r) return null;
    const ph = l => `\u0001${l}\u0002`, p = r.p, val = (k, l) => (v[k] || '').toString().trim() || ph(l);
    const has = k => t.fields.some(f => f.k === k);
    const secs = [];
    secs.push(['Incident', [['Type', t.name], ...(r.cls ? [['Classification', `PL ${r.cls[0]} ${r.cls[1]} (${r.cls[2]})`]] : r.extra ? [['Classification', 'No Penal Law charge — ' + r.extra]] : [])]]);
    secs.push(['Time / place / occurrence', [['Date of occurrence', v.date ? usDate(v.date) : ph('date')], ['Time of occurrence', v.time ? mil(v.time) : ph('time')], ['Report time', v.rtime ? mil(v.rtime) : ph('report time')], ['Location', fnLoc(v, 1) || ph('location')]]]);
    if (has('gender')) secs.push([t.id === 'aided' ? 'Contact information — Aided' : 'Contact information — Complainant', [['Name', val('cName', 'name')], ['Gender', val('gender', 'gender')], ['College affiliation', val('aff', 'this campus/other CUNY')], ['Status', val('role', 'status')], ['Address', val('cAddr', 'address')], ['Phone', val('cPhone', 'phone')]]]);
    if (t.perp) secs.push([t.id === 'weapon' || t.id === 'trespass' ? 'Contact information — Subject' : 'Contact information — Perpetrator', v.kUnk ? [['Identity', 'Unknown'], ...(has('saff') ? [['Status', val('srole', 'subject status')], ['College affiliation', val('saff', 'subject affiliation')]] : []), ['Description', val('sDesc', 'description')]] :
      [['Name', val('kName', 'name')], ...(has('srole') ? [['Status', val('srole', 'subject status')]] : []), ['College affiliation', has('saff') ? val('saff', 'subject affiliation') : val('kAff', 'affiliation')], ['Address', val('kAddr', 'address')], ['Phone', val('kPhone', 'phone')], ['Description', val('sDesc', 'description')]]]);
    if (has('pDesc')) secs.push(['Property', [['Description', val('pDesc', 'property description')], ['Approx. value', v.value ? '$' + String(v.value).replace(/^\$/, '') : ph('value')]]]);
    const al = fnAgList(v);
    if (al.length) secs.push(['Notifications', al.map(x => [x.name, [x.det.join(' · '), x.times.filter(Boolean).map(t => `${t[0]} ${t[2]}`).join(' · ')].filter(Boolean).join(' — ') || 'Notified'])]);
    const nar = [r.nar, fnRespText(v, p, true)];
    if ((v.notes || '').trim()) nar.push(v.notes.trim());
    const now = new Date();
    return { t, secs, nar, prep: val('oPrep', 'name / shield #'), gen: `${usDate(todayISO())} ${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')} hrs` };
  }
  const rpTitle = 'PUBLIC SAFETY INCIDENT REPORT';
  function rpText(d) {
    const L = [rpTitle, ''];
    d.secs.forEach(([h, rows]) => { L.push(h.toUpperCase()); rows.forEach(([k, x]) => L.push(`${k}: ${x}`)); L.push(''); });
    L.push('NARRATIVE'); d.nar.forEach(n => L.push(n, '')); L.push(`Prepared by: ${d.prep}`, `Generated: ${d.gen}`);
    return fnPlain(L.join('\n'));
  }
  function rpHTML(d, forDoc) {
    const f = forDoc ? x => esc(fnPlain(x)) : fnHTML;
    return `<div class="rp"><h2 class="rp-t">${rpTitle}</h2>` + d.secs.map(([h, rows]) => `<section class="rp-s"><h3>${esc(h)}</h3><table>${rows.map(([k, x]) => `<tr><th>${esc(k)}</th><td>${f(x)}</td></tr>`).join('')}</table></section>`).join('') +
      `<section class="rp-s"><h3>Narrative</h3>${d.nar.map(n => `<p>${f(n)}</p>`).join('')}</section><p class="rp-foot">Prepared by: ${f(d.prep)} &nbsp;·&nbsp; Generated: ${esc(d.gen)}</p></div>`;
  }
  function fnReportOpen() {
    const d = fnReportData(); if (!d) return;
    const blanks = (d.secs.flatMap(x => x[1].map(r => r[1])).join('') + d.nar.join('') + d.prep).split('\u0001').length - 1;
    $('#rpBody').innerHTML = (blanks ? `<p class="rp-warn">${blanks} field${blanks > 1 ? 's' : ''} still blank — shown highlighted. Fill them in on the form or edit after export.</p>` : '') + rpHTML(d);
    $('#rpSub').textContent = d.t.name + (d.secs[0][1][1] ? ' · ' + fnPlain(d.secs[0][1][1][1]).replace(/ — .*/, '') : '');
    $('#rpShare').hidden = !navigator.share;
    openSheet($('#reportSheet'));
  }
  const rpFile = d => `Incident-Report_${d.t.name.replace(/\W+/g, '-')}_${(($('#fnPanel')._v || {}).date || todayISO())}`;
  function rpDownload(name, type, body) { const b = new Blob([body], { type }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
  const rpDocCSS = 'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#000}h2{font-size:15pt;text-align:center;margin:0 0 12pt}h3{font-size:11pt;text-transform:uppercase;border-bottom:1px solid #000;margin:14pt 0 4pt}table{border-collapse:collapse;width:100%}th{text-align:left;width:34%;font-weight:bold;padding:2pt 6pt 2pt 0;vertical-align:top}td{padding:2pt 0;vertical-align:top}p{margin:0 0 8pt;line-height:1.4}.rp-foot{margin-top:16pt;font-size:10pt}';
  $('#reportSheet').addEventListener('click', e => {
    const b = e.target.closest('[data-rp]'); if (!b) return; const d = fnReportData(); if (!d) return;
    const act = b.dataset.rp;
    if (act === 'doc') { rpDownload(rpFile(d) + '.doc', 'application/msword', `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${rpTitle}</title><style>${rpDocCSS}</style></head><body>${rpHTML(d, true)}</body></html>`); toast('Word file downloaded'); }
    else if (act === 'txt') { rpDownload(rpFile(d) + '.txt', 'text/plain', rpText(d)); toast('Text file downloaded'); }
    else if (act === 'print') { const pa = $('#printArea'); pa.innerHTML = rpHTML(d, true); document.body.classList.add('print-report'); const done = () => { document.body.classList.remove('print-report'); pa.innerHTML = ''; window.removeEventListener('afterprint', done); }; window.addEventListener('afterprint', done); setTimeout(() => { window.print(); setTimeout(done, 1000); }, 50); }
    else if (act === 'share') { const txt = rpText(d); let f = null; try { f = new File([txt], rpFile(d) + '.txt', { type: 'text/plain' }); } catch {} const data = f && navigator.canShare && navigator.canShare({ files: [f] }) ? { title: rpTitle, files: [f] } : { title: rpTitle, text: txt }; navigator.share(data).catch(() => {}); }
    else if (act === 'copy') copy(rpText(d), 'Report copied');
  });

  /* ---------- Tour Log (Supervisor Tour Update) ---------- */
  // Fillable evening tour log. The draft is kept on this phone (cache storage + window.name)
  // so posts, officers and standing roll-call items carry over to the next log.
  const TLU = './__tourlog.json';
  const TL0 = C.tourLog;
  const tlBlank = () => JSON.parse(JSON.stringify(TL0.defaults));
  let TL = tlBlank(); TL.date = todayISO();
  const tlPut = () => {
    wnSet('tl', TL);
    try { if (window.caches) caches.open(NC).then(c => c.put(TLU, new Response(JSON.stringify(TL), { headers: { 'Content-Type': 'application/json' } }))).catch(() => {}); } catch (e) {}
  };
  let tlT; const tlSave = () => { clearTimeout(tlT); tlT = setTimeout(tlPut, 250); };
  const tlTake = o => { if (o && typeof o === 'object' && Array.isArray(o.att)) { TL = { ...tlBlank(), ...o, km: { ...tlBlank().km, ...(o.km || {}) } }; return true; } return false; };
  tlTake(wnGet().tl);
  const WDL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const tlDateObj = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? new Date(Date.UTC(+m[1], m[2] - 1, +m[3])) : null; };
  const tlLong = d => d ? `${WDL[d.getUTCDay()]}, ${MN[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}` : '';
  const tlRetAuto = () => { const d = tlDateObj(TL.date); return d ? tlLong(rdReturn(d)) : ''; };
  const tlRet = () => TL.retManual ? TL.ret : tlRetAuto();
  const tlSC = () => TL.att.reduce((a, r) => a + (parseInt(r.sc, 10) || 0), 0);
  const tlSCt = () => TL.scManual ? (parseInt(TL.scT, 10) || 0) : tlSC();
  const tlSCupd = () => { const i = $('#tlSC'); if (!i) return; if (!TL.scManual) i.value = tlSC(); else $('#tlSCn').innerHTML = `typed in · posts add up to ${tlSC()} <button type="button" class="linkish" data-tl="scauto">use sum</button>`; };
  const tlLines = s => (s || '').split('\n').map(x => x.replace(/^\s*[•\-*]\s*/, '').trim()).filter(Boolean);
  const tlOr = (s, d = 'None') => (s || '').trim() || d;
  const KM = [['e', 'East'], ['w', 'West'], ['f', 'Frank']];

  function tlField(k, l, ph, type, extra) {
    return `<label class="tl-f"><span>${l}</span>${type === 'area' ? `<textarea data-t="${k}" rows="${extra || 3}" placeholder="${esc(ph || '')}">${esc(TL[k] || '')}</textarea>` : `<input data-t="${k}" type="${type || 'text'}" value="${esc(TL[k] || '')}" placeholder="${esc(ph || '')}" autocomplete="off">`}</label>`;
  }
  function tlRender() {
    const el = $('#tlForm'); if (!el) return;
    el.innerHTML = `
      <div class="tl-card"><h3>Tour</h3>
        <div class="tl-row">${tlField('tour', 'Tour', '1500X2300')}${tlField('date', 'Date', '', 'date')}</div>
        <p class="tl-long" id="tlLong">${esc(tlLong(tlDateObj(TL.date)))}</p>
        <div class="tl-wx"><label class="tl-f"><span>Weather</span><input data-t="weather" value="${esc(TL.weather || '')}" placeholder="55°F Mostly Clear" autocomplete="off"></label><button type="button" class="mini" data-tl="wx">Get current</button></div>
        ${tlField('color', 'NYPD color of the day', 'N/A')}
          <label class="tl-f"><span>Summons return date${TL.retManual ? ' <button type="button" class="linkish" data-tl="retauto">use schedule</button>' : ' <em>auto</em>'}</span><input data-t="ret" value="${esc(tlRet())}" autocomplete="off"></label>
        ${tlField('cmd', 'Tour commander', 'Sgt. M. Pinzon and Lt. Gumbs')}
      </div>
      <div class="tl-card"><h3>Roll call information</h3>
        ${tlField('rc', 'Summary', 'Uniform line inspection was conducted and no discrepancies were found', 'area', 2)}
        ${tlField('rcList', 'Roll call items (one per line)', 'As per Chief…', 'area', 6)}
      </div>
      <div class="tl-card"><h3>Attendance / service calls</h3>
        <div class="tl-att-h"><span>Post · officer</span><span>Service calls</span></div>
        <div id="tlAtt">${TL.att.map((r, i) => `<div class="tl-att" data-ai="${i}">
            <div class="tl-po"><input class="tl-p" data-a="p" value="${esc(r.p)}" placeholder="Post" aria-label="Post" autocomplete="off"><input data-a="o" value="${esc(r.o)}" placeholder="Rank / name" aria-label="Officer for ${esc(r.p || 'row')}" autocomplete="off"></div>
            <div class="tl-sc"><button type="button" data-sc="-1" aria-label="One fewer service call">−</button><input data-a="sc" inputmode="numeric" value="${esc(String(r.sc ?? ''))}" aria-label="Service calls for ${esc(r.p || 'row')}"><button type="button" data-sc="1" aria-label="One more service call">+</button></div>
            <button type="button" class="tl-x" data-tl="rm" aria-label="Remove row">×</button></div>`).join('')}</div>
        <button type="button" class="mini" data-tl="add">+ Add row</button>
        <div class="tl-tot"><label><span>Service calls</span><input data-t="scT" id="tlSC" inputmode="numeric" value="${esc(String(tlSCt()))}"><small id="tlSCn">${TL.scManual ? `typed in · posts add up to ${tlSC()} <button type="button" class="linkish" data-tl="scauto">use sum</button>` : 'auto: sum of the SC column'}</small></label>
          <label><span>Key assists</span><input data-t="ka" inputmode="numeric" value="${esc(TL.ka || '')}" placeholder="0"></label></div>
        ${tlField('ot', 'Working overtime / reason (one per line)', 'Sgt Pinzon: working for Sgt Coverage', 'area', 3)}
        <div class="tl-row3">${tlField('swaps', 'Swaps', 'None')}${tlField('absent', 'Absent', 'None')}${tlField('late', 'Late', 'None')}</div>
      </div>
      <div class="tl-card"><h3>Incident reports / category / time of occurrence</h3>
        ${tlField('inc', 'One per line', 'None', 'area', 4)}
      </div>
      <div class="tl-card"><h3>Miscellaneous tour information</h3>
        ${tlField('trans', 'Transportation', 'None')}
        ${tlField('cback', 'Central back up (Active Shooter / Major Emergency)', 'CSA Al Mahmud')}
        ${tlField('misc', 'Other items (one per line)', 'Driving details, etc.', 'area', 3)}
      </div>
      <div class="tl-card"><h3>Key exchange</h3>
        <h4 class="tl-sub">Masters key exchange</h4>
        <div class="tl-key-h"><span></span><span>Received in</span><span>Turned over</span></div>
        ${KM.map(([k, n]) => `<div class="tl-key"><b>${n}</b><input data-k="${k}in" value="${esc(TL.km[k + 'in'] || '')}" aria-label="${n} received in" autocomplete="off"><input data-k="${k}out" value="${esc(TL.km[k + 'out'] || '')}" aria-label="${n} turned over" autocomplete="off"></div>`).join('')}
        <h4 class="tl-sub">Sgt. masters key exchange (#1)</h4>
        <div class="tl-key"><b>#1</b><input data-k="sfrom" value="${esc(TL.km.sfrom || '')}" aria-label="Sergeant key received from" placeholder="From" autocomplete="off"><input data-k="sto" value="${esc(TL.km.sto || '')}" aria-label="Sergeant key turned over to" placeholder="To" autocomplete="off"></div>
      </div>
      <div class="tl-card tl-send"><h3>Send</h3>
        ${tlField('to', 'Email to (separate with commas)', 'name@cuny.edu, name2@cuny.edu', 'email')}
        <div class="tl-btns"><button type="button" class="btn primary" data-tl="mail">Email log</button><button type="button" class="btn" data-tl="share">Share…</button></div>
        <div class="tl-btns3"><button type="button" class="mini" data-tl="doc">Word file</button><button type="button" class="mini" data-tl="copy">Copy text</button><button type="button" class="mini" data-tl="preview">Preview</button></div>
        <p class="fn-hint">Email opens your mail app with the log in the message. Share can attach a Word copy on phones that support it.</p>
      </div>`;
    $('#tlShare') && ($('#tlShare').hidden = !navigator.share);
  }
  const tlSubject = () => `Supervisor Tour Update — ${TL.tour || 'Tour'} — ${tlLong(tlDateObj(TL.date)) || TL.date}`;
  function tlText() {
    const L = ['SUPERVISOR TOUR UPDATE', '', `TOUR: ${TL.tour || ''}`, `DATE: ${tlLong(tlDateObj(TL.date))}`, `WEATHER: ${TL.weather || ''}`, `NYPD COLOR OF THE DAY: ${tlOr(TL.color, 'N/A')}`, `SUMMONS RETURN DATE: ${tlRet()}`, `TOUR COMMANDER: ${TL.cmd || ''}`, ''];
    L.push(`ROLL CALL INFORMATION: ${TL.rc || ''}`); tlLines(TL.rcList).forEach(x => L.push(`  • ${x}`)); L.push('');
    L.push('ATTENDANCE / SERVICE CALLS:');
    TL.att.filter(r => r.p || r.o).forEach(r => L.push(`  ${r.p ? r.p + ': ' : ''}${r.o || '—'}  SC: ${parseInt(r.sc, 10) || 0}`));
    L.push('', `SERVICE CALLS: ${tlSCt()}    KEY ASSISTS: ${tlOr(TL.ka, '0')}`, '', 'WORKING OVERTIME / REASON:');
    (tlLines(TL.ot).length ? tlLines(TL.ot) : ['None']).forEach(x => L.push(`  ${x}`));
    L.push('', `SWAPS: ${tlOr(TL.swaps)}`, `ABSENT: ${tlOr(TL.absent)}`, `LATE: ${tlOr(TL.late)}`, '', 'INCIDENT REPORTS / CATEGORY / TIME OF OCCURRENCE:');
    (tlLines(TL.inc).length ? tlLines(TL.inc) : ['None']).forEach(x => L.push(`  ${x}`));
    L.push('', 'MISCELLANEOUS TOUR INFORMATION (Driving details etc.):', `  • Transportation: ${tlOr(TL.trans)}`, `  • Central back up in the event of an Active Shooter/Major Emergency incident: ${tlOr(TL.cback, '')}`);
    tlLines(TL.misc).forEach(x => L.push(`  • ${x}`));
    L.push('', 'KEY EXCHANGE:', 'Masters Key Exchange (Received in / Turned over):');
    KM.forEach(([k, n]) => L.push(`  ${n}: ${TL.km[k + 'in'] || '—'} / ${TL.km[k + 'out'] || '—'}`));
    L.push('Sgt. Masters Key Exchange:', `  #1: From: ${TL.km.sfrom || '—'}  To: ${TL.km.sto || '—'}`);
    return L.join('\n');
  }
  function tlHTML() {
    const e = esc, li = a => a.map(x => `<li>${e(x)}</li>`).join('');
    const box = (h, body) => `<table class="bx" width="100%" cellpadding="6"><tr><td><p class="h"><u>${h}</u></p>${body}</td></tr></table><p class="sp">&nbsp;</p>`;
    const rows = TL.att.filter(r => r.p || r.o); const per = Math.ceil(rows.length / 3) || 1;
    const cols = [0, 1, 2].map(c => rows.slice(c * per, c * per + per));
    const att = `<table width="100%" class="att">${Array.from({ length: per }, (_, i) => `<tr>${cols.map(col => { const r = col[i]; return r ? `<td><b>${e(r.p ? r.p + ':' : '')}</b></td><td>${e(r.o)}</td><td class="sc">SC: ${parseInt(r.sc, 10) || 0}</td>` : '<td></td><td></td><td></td>'; }).join('')}</tr>`).join('')}</table>`;
    return `<p class="t">Dept. of Public Safety</p><p class="t2"><u>SUPERVISOR TOUR UPDATE</u></p>
      <p>TOUR: <u>${e(TL.tour || '')}</u><br>DATE: ${e(tlLong(tlDateObj(TL.date)))}<br>WEATHER: <u>${e(TL.weather || '')}</u><br>NYPD color of the day: <u>${e(tlOr(TL.color, 'N/A'))}</u><br>Summons Return Date: ${e(tlRet())}<br>Tour Commander: <u>${e(TL.cmd || '')}</u></p>
      ${box('ROLL CALL INFORMATION:', `<p class="rc">${e(TL.rc || '')}</p><ul>${li(tlLines(TL.rcList))}</ul>`)}
      ${box('ATTENDANCE/SERVICE CALLS:', `${att}<p><b>SERVICE CALLS:</b> ${tlSCt()} &nbsp;&nbsp; <b>KEY ASSISTS:</b> ${e(tlOr(TL.ka, '0'))}</p><p><b><u>WORKING OVERTIME / REASON</u></b>:</p><p>${(tlLines(TL.ot).length ? tlLines(TL.ot) : ['None']).map(e).join('<br>')}</p><p><b><u>Swaps:</u></b> ${e(tlOr(TL.swaps))} &nbsp; <b><u>Absent:</u></b> ${e(tlOr(TL.absent))} &nbsp; <b><u>Late:</u></b> ${e(tlOr(TL.late))}</p>`)}
      ${box('INCIDENT REPORTS / CATEGORY / TIME OF OCCURRENCE:', `<p>${(tlLines(TL.inc).length ? tlLines(TL.inc) : ['None']).map(e).join('<br>')}</p>`)}
      ${box('MISCELLANEOUS TOUR INFORMATION (Driving details etc.):', `<ul><li><b>Transportation:</b> ${e(tlOr(TL.trans))}</li><li><b>Central back up in the event of an Active Shooter/Major Emergency incident:</b> ${e(TL.cback || '')}</li>${li(tlLines(TL.misc))}</ul>`)}
      ${box('KEY EXCHANGE:', `<p><b><u>Masters Key Exchange:</u></b></p><table width="100%"><tr><td width="50%"><b><u>Received in</u></b></td><td><b><u>Turned Over</u></b></td></tr>${KM.map(([k, n]) => `<tr><td><b>${n}:</b> ${e(TL.km[k + 'in'] || '')}</td><td><b>${n}:</b> ${e(TL.km[k + 'out'] || '')}</td></tr>`).join('')}</table><p><b><u>Sgt. Masters Key Exchange:</u></b></p><table width="100%"><tr><td width="50%"><b>#1:</b> From: <b>${e(TL.km.sfrom || '')}</b></td><td>To: <b>${e(TL.km.sto || '')}</b></td></tr></table>`)}`;
  }
  const tlCSS = 'body{font-family:"Times New Roman",serif;font-size:11pt;color:#000}.t{font-size:16pt;text-align:center;margin:0}.t2{font-size:15pt;text-align:center;color:#c00000;margin:0 0 10pt}.bx{border:1px solid #000;border-collapse:collapse}.h{font-weight:bold;font-size:12pt;margin:0 0 6pt}.rc{color:#c00000;font-size:12pt}.att td{font-size:10pt;padding:1pt 4pt 1pt 0}.sc{color:#c00000}.sp{margin:0;font-size:6pt}ul{margin:4pt 0 4pt 18pt;padding:0}li{margin:2pt 0}';
  const TLIN = { t: 'font-size:16pt;text-align:center;margin:0', t2: 'font-size:15pt;text-align:center;color:#c00000;margin:0 0 10pt', bx: 'border:1px solid #000;border-collapse:collapse', h: 'font-weight:bold;font-size:12pt;margin:0 0 6pt', rc: 'color:#c00000;font-size:12pt', att: 'font-size:10pt', sc: 'color:#c00000', sp: 'margin:0;font-size:6pt' };
  const tlInline = h => h.replace(/class="(\w+)"/g, (m, c) => TLIN[c] ? `class="${c}" style="${TLIN[c]}"` : m).replace(/<table class="bx"([^>]*)>/g, '<table class="bx"$1 border="1">');
  const tlDoc = () => `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(tlSubject())}</title><style>${tlCSS}</style></head><body>${tlInline(tlHTML())}</body></html>`;
  const tlFile = () => `Tour-Log_${(TL.tour || 'tour').replace(/\W+/g, '')}_${TL.date || todayISO()}`;
  const WXC = { 0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Cloudy', 45: 'Fog', 48: 'Fog', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle', 56: 'Freezing Drizzle', 57: 'Freezing Drizzle', 61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 66: 'Freezing Rain', 67: 'Freezing Rain', 71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow', 77: 'Snow Grains', 80: 'Rain Showers', 81: 'Rain Showers', 82: 'Heavy Showers', 85: 'Snow Showers', 86: 'Heavy Snow Showers', 95: 'Thunderstorm', 96: 'Thunderstorm with Hail', 99: 'Thunderstorm with Hail' };
  async function tlWeather() {
    toast('Getting Bronx weather…');
    try {
      const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.8176&longitude=-73.9273&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=America%2FNew_York');
      const j = await r.json(); const c = j.current;
      const w = WXC[c.weather_code] || '';
      TL.weather = `${Math.round(c.temperature_2m)}°F ${w}`.trim(); tlSave();
      const i = $('#tlForm input[data-t="weather"]'); if (i) i.value = TL.weather; toast('Weather filled in');
    } catch (e) { toast('Weather not available — type it in'); }
  }
  function tlPreview() {
    $('#tlPrevBody').innerHTML = `<div class="tl-prev">${tlHTML()}</div>`;
    openSheet($('#tlSheet'));
  }
  const tlForm = $('#tlForm');
  tlForm.addEventListener('input', e => {
    const t = e.target, row = t.closest('[data-ai]');
    if (t.dataset.t) {
      const k = t.dataset.t; TL[k] = t.value;
      if (k === 'ret') TL.retManual = true;
      if (k === 'scT') { t.value = t.value.replace(/\D/g, ''); TL.scT = t.value; TL.scManual = t.value !== '' && +t.value !== tlSC(); if (!TL.scManual) TL.scT = ''; $('#tlSCn').innerHTML = TL.scManual ? `typed in · posts add up to ${tlSC()} <button type="button" class="linkish" data-tl="scauto">use sum</button>` : 'auto: sum of the SC column'; }
      if (k === 'date') { $('#tlLong').textContent = tlLong(tlDateObj(TL.date)); if (!TL.retManual) { const r = $('#tlForm input[data-t="ret"]'); if (r) r.value = tlRetAuto(); } }
    } else if (t.dataset.k) TL.km[t.dataset.k] = t.value;
    else if (row && t.dataset.a) { const r = TL.att[+row.dataset.ai]; r[t.dataset.a] = t.dataset.a === 'sc' ? t.value.replace(/\D/g, '') : t.value; if (t.dataset.a === 'sc') { t.value = r.sc; tlSCupd(); } }
    tlSave();
  });
  tlForm.addEventListener('click', e => {
    const sc = e.target.closest('[data-sc]');
    if (sc) { const row = sc.closest('[data-ai]'), r = TL.att[+row.dataset.ai]; r.sc = Math.max(0, (parseInt(r.sc, 10) || 0) + +sc.dataset.sc); $('input[data-a="sc"]', row).value = r.sc; tlSCupd(); tlSave(); return; }
    const b = e.target.closest('[data-tl]'); if (!b) return; const a = b.dataset.tl;
    if (a === 'add') { TL.att.push({ p: '', o: '', sc: 0 }); tlSave(); tlRender(); const rows = $$('#tlAtt .tl-att'); rows[rows.length - 1].querySelector('input').focus(); }
    else if (a === 'rm') { const i = +b.closest('[data-ai]').dataset.ai, r = TL.att[i]; if ((r.p || r.o) && !confirm(`Remove ${r.p || r.o}?`)) return; TL.att.splice(i, 1); tlSave(); tlRender(); }
    else if (a === 'scauto') { TL.scManual = false; TL.scT = ''; tlSave(); tlRender(); }
    else if (a === 'retauto') { TL.retManual = false; TL.ret = ''; tlSave(); tlRender(); }
    else if (a === 'wx') tlWeather();
    else if (a === 'mail') {
      const to = (TL.to || '').split(/[,;\s]+/).filter(Boolean).join(',');
      const ml = document.createElement('a'); ml.href = `mailto:${encodeURIComponent(to).replace(/%2C/g, ',').replace(/%40/g, '@')}?subject=${encodeURIComponent(tlSubject())}&body=${encodeURIComponent(tlText())}`; document.body.appendChild(ml); ml.click(); ml.remove();
    }
    else if (a === 'share') {
      let f = null; try { f = new File([tlDoc()], tlFile() + '.doc', { type: 'application/msword' }); } catch (x) {}
      const data = f && navigator.canShare && navigator.canShare({ files: [f] }) ? { title: tlSubject(), text: tlText(), files: [f] } : { title: tlSubject(), text: tlText() };
      if (navigator.share) navigator.share(data).catch(() => {}); else { copy(tlText(), 'Sharing not available here — log text copied'); }
    }
    else if (a === 'doc') { rpDownload(tlFile() + '.doc', 'application/msword', tlDoc()); toast('Word file downloaded'); }
    else if (a === 'copy') copy(tlText(), 'Tour log copied');
    else if (a === 'preview') tlPreview();
  });
  $('#tlNew').addEventListener('click', () => {
    if (!confirm('Start a new log for today? Officers, posts, roll call items, key exchange and recipients are kept. Service calls, overtime, swaps, incidents and weather are cleared.')) return;
    const keep = TL;
    TL = { ...keep, date: todayISO(), weather: '', color: '', ret: '', retManual: false, scT: '', scManual: false, ka: '', ot: '', swaps: '', absent: '', late: '', inc: '', misc: '', att: keep.att.map(r => ({ ...r, sc: 0 })) };
    tlPut(); tlRender(); toast('New log started');
  });
  $('#tlReset').addEventListener('click', () => {
    if (!confirm('Reset the whole log to the original template? This clears everything you entered.')) return;
    TL = tlBlank(); TL.date = todayISO(); tlPut(); tlRender(); toast('Log reset');
  });
  $('#tlSheet').addEventListener('click', e => { const b = e.target.closest('[data-tlp]'); if (!b) return; closeSheet($('#tlSheet')); const x = tlForm.querySelector(`[data-tl="${b.dataset.tlp}"]`); if (x) x.click(); });
  tlRender();
  try { if (window.caches) caches.open(NC).then(c => c.match(TLU)).then(r => r ? r.json() : null).then(o => { if (o && !wnGet().tl && tlTake(o)) tlRender(); }).catch(() => {}); } catch (e) {}

  /* ---------- Henderson Rules ---------- */
  const HR = C.henderson;
  function hrRender(q = '') {
    const ql = q.trim().toLowerCase();
    const rows = HR.rules.map((r, i) => [i + 1, ...r]).filter(r => !ql || String(r[0]) === ql || r[1].toLowerCase().includes(ql) || r[2].toLowerCase().includes(ql));
    $('#hrRules').innerHTML = rows.length ? rows.map(r => `<details class="hr-rule card" id="hr-${r[0]}"${ql ? ' open' : ''}><summary><span class="hr-n">${r[0]}</span><b>${esc(r[1])}</b></summary><p>${ql && ql.length > 1 ? esc(r[2]).replace(new RegExp(ql.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark>${m}</mark>`) : esc(r[2])}</p></details>`).join('') : '<p class="rd-note">No rule matches that filter.</p>';
  }
  hrRender();
  $('#hrQ').addEventListener('input', e => hrRender(e.target.value));
  $('#hrPen').innerHTML = HR.penalties.map(p => `<div class="card hr-p"><b>${esc(p[0])}</b><p>${esc(p[1])}</p></div>`).join('') + '<p class="rd-note">Any penalties above are in addition to any other penalty provided by law or The City University Trustees.</p>';
  $('#hrSan').innerHTML = `<dl class="card">${HR.sanctions.map(s => `<div><dt><span class="hr-n sm">${s[0]}</span>${esc(s[1])}</dt>${s[2] ? `<dd>${esc(s[2])}</dd>` : ''}</div>`).join('')}</dl>`;
  $('#hrSrc').innerHTML = `${esc(HR.adopted)} <a href="${HR.source}" target="_blank" rel="noopener">CUNY Henderson Rules</a>`;
  document.addEventListener('click', e => {
    const j = e.target.closest('[data-jump^="hr-"]'); if (j) { if ($('#hrQ').value) { $('#hrQ').value = ''; hrRender(); } const d = document.getElementById(j.dataset.jump); if (d) d.open = true; }
    const f = e.target.closest('.sp-item[data-fnjump]'); if (f) { e.preventDefault(); $('#q').value = ''; $('#q').blur(); closeGlobal(); fnOpen(f.dataset.fnjump, true); }
  }, true);

  /* ---------- Operations Guide ---------- */
  const OGT = [...C.opsToc].sort((a, b) => a[0] - b[0]);
  let OG = null, ogLoading = null, ogCur = null;
  const ogSh = $('#ogSheet');
  const loadOG = () => ogLoading || (ogLoading = fetch('./data/opsguide.json').then(r => r.json()).then(d => {
    OG = d; const sp = $('#searchPanel'); if (sp && !sp.hidden && $('#q').value.trim()) runGlobal(); return d;
  }).catch(() => { ogLoading = null; }));
  const ogWords = q => (q || '').toLowerCase().split(/\s+/).map(w => w.replace(/^[^\w#]+|[^\w]+$/g, '')).filter(w => w.length > 1);
  const ogRe = q => { const w = ogWords(q); return w.length ? new RegExp('(' + w.map(x => esc(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi') : null; };
  const ogHi = (x, re) => re ? esc(x).replace(re, '<mark>$1</mark>') : esc(x);
  const ogTitleCase = x => x.toLowerCase().replace(/(^|[\s\-/(\[])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(Of|And|For|To|The|In|On|Or|A|An|By)\b/g, w => w.toLowerCase()).replace(/^./, c => c.toUpperCase()).replace(/:$/, '');
  const ogSnip = (x, w) => {
    const lx = x.toLowerCase(); let i = Math.min(...w.map(v => { const k = lx.indexOf(v); return k < 0 ? 1e9 : k; })); if (i === 1e9) i = 0;
    const a = Math.max(0, i - 70), b = Math.min(x.length, i + 150);
    let t = x.slice(a, b); if (a > 0) t = '…' + t.replace(/^\S*\s/, ''); if (b < x.length) t = t.replace(/\s\S*$/, '') + '…'; return t;
  };
  const OGC = ['Administration', 'Patrol Procedures', 'Use of Force']; let ogCat = '';
  $('#ogCats').innerHTML = [['', 'All', OGT.length], ...OGC.map(c => [c, c, OGT.filter(t => t[2] === c).length])].map(([v, l, n]) => `<button type="button" class="og-cat${v ? '' : ' on'}" data-ogcat="${v}" aria-pressed="${v ? 'false' : 'true'}">${l}<span>${n}</span></button>`).join('');
  $('#ogCats').addEventListener('click', e => {
    const b = e.target.closest('[data-ogcat]'); if (!b) return;
    ogCat = b.dataset.ogcat;
    $$('.og-cat', $('#ogCats')).forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    $$('[data-ogsec]', $('#ogToc')).forEach(d => { d.hidden = !!ogCat && d.dataset.ogsec !== ogCat; });
    if (ogWords($('#ogQ').value).length) ogSearch();
  });
  $('#ogToc').innerHTML = OGC.map(c => `<div data-ogsec="${c}"><h3 class="sub">${c}</h3><div class="og-grid">${OGT.filter(t => t[2] === c).map(t => `<button class="og-btn" data-og="${t[0]}"><span class="og-n">${t[0]}</span><span class="og-t"><b>${esc(t[1])}</b><small>${t[5]} page${t[5] > 1 ? 's' : ''}${t[4] ? ' · Revision ' + esc(t[4]) : ''}</small></span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg></button>`).join('')}</div></div>`).join('') + '<p class="rd-note">Text from the CUNY Public Safety Department Operations Guide (Rev. 09/18/2020). Forms are shown as text; always confirm against the current official guide.</p>';

  async function ogOpen(no, bi, q) {
    const T = OGT.find(t => t[0] === no); if (!T) return;
    ogCur = no;
    $('#ogArt').textContent = `Operations Instruction ${no}.0 · ${T[2]}`;
    $('#ogTitle').textContent = T[1]; $('#ogMeta').textContent = '';
    $('#ogParts').innerHTML = ''; $('#ogText').innerHTML = '<p class="rd-note">Loading…</p>';
    const k = OGT.indexOf(T); $('#ogPrev').disabled = k === 0; $('#ogNext').disabled = k === OGT.length - 1;
    if (ogSh.hidden) openSheet(ogSh);
    await loadOG();
    if (ogCur !== no) return;
    if (!OG) { $('#ogText').innerHTML = '<p class="rd-note">Could not load the guide. Check your connection and try again.</p>'; return; }
    const I = OG.inst.find(x => x.no === no); const re = q ? ogRe(q) : null; const parts = [];
    $('#ogMeta').textContent = [I.issued && 'Issued ' + I.issued, I.eff && 'Effective ' + I.eff, I.rev && 'Revision ' + I.rev, `Guide pp. ${I.pages[0]}–${I.pages[1]}`].filter(Boolean).join(' · ');
    $('#ogText').innerHTML = I.b.map((b, i) => {
      const [t, pg, x, l, m] = b;
      if (t === 'h') { parts.push([i, ogTitleCase(x)]); return `<h4 class="og-h" id="ogb-${i}">${m ? `<span>${esc(m)}</span>` : ''}${ogHi(x, re)}</h4>`; }
      if (t === 's') return `<p class="og-s" id="ogb-${i}">${ogHi(x, re)}</p>`;
      if (t === 'form') return `<div class="og-form" id="ogb-${i}"><span class="og-tag">Form · guide page ${pg}</span>${ogHi(x, re)}</div>`;
      return `<p class="og-p og-l${Math.min(l || 0, 4)}" id="ogb-${i}">${m ? `<b class="og-m">${esc(m)}</b> ` : ''}${ogHi(x, re)}</p>`;
    }).join('');
    $('#ogParts').innerHTML = parts.length > 1 ? parts.map(([i, n]) => `<button type="button" data-ogpart="${i}">${esc(n.length > 34 ? n.slice(0, 32) + '…' : n)}</button>`).join('') : '';
    $('#ogParts').hidden = parts.length < 2; $('#ogParts').scrollLeft = 0;
    const box = $('#ogText');
    if (bi != null) ogScroll(bi, true); else box.scrollTop = 0;
  }
  function ogScroll(bi, flash) {
    const box = $('#ogText'), el = document.getElementById('ogb-' + bi); if (!el) return;
    box.scrollTop = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 8;
    if (flash) { el.classList.remove('og-flash'); void el.offsetWidth; el.classList.add('og-flash'); }
  }
  $('#ogParts').addEventListener('click', e => { const b = e.target.closest('[data-ogpart]'); if (b) ogScroll(+b.dataset.ogpart, false); });
  $('#ogPrev').addEventListener('click', () => { const k = OGT.findIndex(t => t[0] === ogCur); if (k > 0) ogOpen(OGT[k - 1][0]); });
  $('#ogNext').addEventListener('click', () => { const k = OGT.findIndex(t => t[0] === ogCur); if (k < OGT.length - 1) ogOpen(OGT[k + 1][0]); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-og]'); if (!b) return;
    let q = '';
    if (b.closest('#searchPanel')) { q = $('#q').value; $('#q').value = ''; closeGlobal(); }
    else if (b.closest('#ogRes')) q = $('#ogQ').value;
    ogOpen(+b.dataset.og, b.dataset.ob != null ? +b.dataset.ob : null, q);
  });

  function ogFind(q) {  // -> [[inst, titleHit, [blockIdx…]]…], total
    const w = ogWords(q); const out = []; let total = 0; if (!w.length || !OG) return [out, 0];
    const num = /^(?:oi|o\.i\.?|#|instruction)?\s*(\d{1,2})(?:\.0)?$/i.exec(q.trim());
    OG.inst.forEach(I => {
      const th = (num && +num[1] === I.no) || w.every(x => I.title.toLowerCase().includes(x));
      const hits = []; I.b.forEach((b, i) => { const lx = b[2].toLowerCase(); if (w.every(x => lx.includes(x))) hits.push(i); });
      if (th || hits.length) { out.push([I, th, hits]); total += hits.length; }
    });
    out.sort((a, b) => (b[1] - a[1]) || (b[2].length - a[2].length));
    return [out, total];
  }
  let ogT;
  function ogSearch() {
    const q = $('#ogQ').value, res = $('#ogRes'), w = ogWords(q);
    if (!w.length) { res.hidden = true; res.innerHTML = ''; $('#ogToc').hidden = false; return; }
    res.hidden = false; $('#ogToc').hidden = true;
    if (!OG) { res.innerHTML = '<p class="rd-note">Loading the guide…</p>'; loadOG().then(() => OG && ogSearch()); return; }
    let [g] = ogFind(q); const re = ogRe(q); const all = g.length;
    if (ogCat) g = g.filter(x => x[0].cat === ogCat);
    const total = g.reduce((n, x) => n + x[2].length, 0), where = ogCat ? ` in ${ogCat}` : '';
    if (!g.length) { res.innerHTML = `<p class="rd-note">No matches for “${esc(q.trim())}”${where || ' in the Operations Guide'}.${ogCat && all ? ` ${all} instruction${all === 1 ? '' : 's'} match in other categories. <button type="button" class="og-link" data-ogall>Search all categories</button>` : ''}</p>`; return; }
    res.innerHTML = `<p class="og-count">${total} match${total === 1 ? '' : 'es'} in ${g.length} instruction${g.length === 1 ? '' : 's'}${where}</p>` + g.slice(0, 30).map(([I, th, hits]) => `<div class="card og-hit">
      <button class="og-hit-h" data-og="${I.no}"${hits.length && !th ? ` data-ob="${hits[0]}"` : ''}><span class="og-n">${I.no}</span><b>${ogHi(I.title, re)}</b><small>${hits.length ? hits.length + ' match' + (hits.length === 1 ? '' : 'es') : 'Title match'}</small></button>
      ${hits.slice(0, 3).map(i => `<button class="og-snip" data-og="${I.no}" data-ob="${i}"><small>Page ${I.b[i][1]}</small>${ogHi(ogSnip(I.b[i][2], w), re)}</button>`).join('')}
      ${hits.length > 3 ? `<button class="og-more" data-og="${I.no}" data-ob="${hits[3]}">${hits.length - 3} more in this instruction ›</button>` : ''}
    </div>`).join('');
  }
  $('#ogRes').addEventListener('click', e => { if (e.target.closest('[data-ogall]')) $('#ogCats [data-ogcat=""]').click(); });
  $('#ogQ').addEventListener('focus', loadOG);
  $('#ogQ').addEventListener('input', () => { clearTimeout(ogT); ogT = setTimeout(ogSearch, 160); });
  $('#ogQ').addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });

  /* ---------- Important numbers ---------- */
  const NM = C.numbers;
  const nmId = (g, n) => 'nm-' + (g + '-' + n).replace(/\W+/g, '').toLowerCase();
  const nmNum = x => { const d = x.replace(/\D/g, ''); return d.length >= 10 ? `<a class="nm-n tel" href="tel:${d}">${esc(x)}</a>` : `<span class="nm-n ext"><i>ext</i>${esc(x)}</span>`; };
  function renderNumbers(q = '') {
    q = q.trim().toLowerCase(); const qd = q.replace(/\D/g, '');
    const hit = (g, r) => !q || (g + ' ' + r[0]).toLowerCase().includes(q) || (qd.length >= 2 && r[1].some(x => x.replace(/\D/g, '').includes(qd)));
    const out = NM.map(([g, , rows]) => { const rs = rows.filter(r => hit(g, r)); return rs.length ? `<div class="nm-grp"><h3>${esc(g)}</h3>${rs.map(r => `<div class="nm-row${r[2] ? ' key' : ''}" id="${nmId(g, r[0])}"><span class="nm-name">${esc(r[0])}</span><span class="nm-nums">${r[1].map(nmNum).join('')}</span></div>`).join('')}</div>` : ''; }).join('');
    $('#nmList').innerHTML = out || `<p class="sp-empty">No numbers match “${esc(q)}”.</p>`;
  }
  renderNumbers();
  $('#nmQ').addEventListener('input', e => renderNumbers(e.target.value));

  /* ---------- Club rooms ---------- */
  const CR = C.clubRooms; const roomId = c => 'room-' + c.replace(/\W+/g, '');
  function renderRooms(q = '') {
    q = q.toLowerCase().trim();
    const html = CR.floors.map(([f, rooms]) => {
      const list = rooms.filter(r => !q || (r[0] + ' ' + r[1]).toLowerCase().includes(q) || r[0].replace(/\W/g, '').toLowerCase().includes(q.replace(/\W/g, '')));
      return list.length ? `<div class="floor"><h3>${CR.building} · ${f}</h3><div class="room-list">${list.map(r => `<div class="room" id="${roomId(r[0])}"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join('')}</div></div>` : '';
    }).join('');
    $('#rooms').innerHTML = html || '<p class="meta">No rooms match.</p>';
  }
  renderRooms();
  $('#roomQ').addEventListener('input', e => renderRooms(e.target.value));

  /* ---------- Uniform ---------- */
  const now = new Date(); const md = (now.getMonth() + 1) * 100 + now.getDate();
  const inRange = (s, e) => { const a = s[0] * 100 + s[1], b = e[0] * 100 + e[1]; return a <= b ? md >= a && md <= b : md >= a || md <= b; };
  $('#seasons').innerHTML = C.uniform.map(([n, d, desc, s, e]) => {
    const cur = inRange(s, e);
    return `<div class="season${cur ? ' now' : ''}">${cur ? '<span class="now-tag">In effect today</span>' : ''}<h3>${n} Uniform</h3><span class="dates">${d}</span><p>${esc(desc)}</p></div>`;
  }).join('');

  /* ---------- Peel ---------- */
  $('#peelList').innerHTML = C.peel.map(p => `<li><span>${esc(p)}</span></li>`).join('');

  /* ---------- Penal Law index ---------- */
  let PL = null, plLoading = null;
  const loadPL = () => plLoading || (plLoading = fetch('./data/penal.json').then(r => r.json()).then(d => {
    PL = d; PL.secs.forEach(s => { s.lt = s[3].toLowerCase(); s.lx = s[5].toLowerCase(); s.n = s[0].toLowerCase(); });

    $('#plMeta').textContent = `${PL.secs.length} sections indexed from ${Object.keys(PL.arts).length} articles. Type to search.`;
    if ($('#pl').value) runPL(); if ($('#q').value) runGlobal();
    return d;
  }).catch(() => { $('#plMeta').textContent = 'Could not load the Penal Law index. Check your connection and reload.'; plLoading = null; }));

  const SYN = { '1st': 'first', '2nd': 'second', '3rd': 'third', '4th': 'fourth', '5th': 'fifth', '6th': 'sixth', 'marijuana': 'marihuana', 'weed': 'marihuana', 'cannabis': 'cannabis', 'shoplifting': 'larceny', 'theft': 'larceny', 'stealing': 'larceny', 'steal': 'larceny', 'gun': 'firearm', 'knife': 'weapon', 'dc': 'disorderly', 'trespassing': 'trespass', 'harass': 'harassment', 'vandalism': 'criminal mischief', 'drugs': 'controlled substance', 'drug': 'controlled substance', 'dui': 'intoxicated', 'fake id': 'forged instrument', 'id': 'identification' };
  function parseQuery(q) {
    let s = q.toLowerCase().trim().replace(/§/g, ' ').replace(/^(nys\s+)?(penal\s+law|pl|section|sec\.?)\s*/, '').trim();
    const num = s.replace(/^(\d{1,3})-(\d)/, '$1.$2');
    if (/^\d{1,3}(\.\d{0,2}(-?[a-z]{0,2})?)?$/.test(num)) return { num };
    let toks = s.split(/\s+/).filter(Boolean).flatMap(t => (SYN[t] || t).split(' '));
    toks = toks.filter(t => !['in', 'the', 'of', 'a', 'degree', 'and'].includes(t) || toks.length === 1);
    return { toks, phrase: s };
  }
  function searchPL(q, level, limit = 1e9) {
    if (!PL || !q.trim()) return [];
    const p = parseQuery(q); let res = [];
    if (p.num) {
      const n = p.num.includes('.') ? p.num : p.num + '.';
      res = PL.secs.filter(s => s.n.startsWith(n) || s.n.replace('-', '') === n.replace('-', '')).map(s => ({ s, sc: s.n === p.num ? 100 : 1 }));
      res.sort((a, b) => b.sc - a.sc);
    } else {
      for (const s of PL.secs) {
        let sc = 0, ok = true;
        for (const t of p.toks) {
          const inT = s.lt.includes(t), inX = s.lx.includes(t);
          if (!inT && !inX) { ok = false; break; }
          sc += inT ? 10 : 1;
        }
        if (!ok) continue;
        if (s.lt.includes(p.phrase)) sc += 25;
        if (p.toks.every(t => s.lt.includes(t))) sc += 15;
        if (s.lt.startsWith(p.toks[0])) sc += 8;
        if (s[4]) sc += 4;
        sc -= s.lt.length / 25;
        res.push({ s, sc });
      }
      res.sort((a, b) => b.sc - a.sc || parseFloat(a.s[0]) - parseFloat(b.s[0]));
    }
    if (level) res = res.filter(r => r.s[4].includes(level));
    return res.slice(0, limit).map(r => r.s);
  }
  const hl = (text, q) => {
    const p = parseQuery(q); let h = esc(text);
    if (p.toks) p.toks.filter(t => t.length > 1).forEach(t => { h = h.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>'); });
    return h;
  };
  const snippet = (s, q) => {
    const p = parseQuery(q); const x = s[5].replace(/\n/g, ' ');
    if (p.toks) { const i = x.toLowerCase().indexOf(p.toks[p.toks.length - 1]); if (i > 80) return '…' + x.slice(i - 60, i + 160); }
    return x.slice(0, 200);
  };
  const resItem = (s, q) => `<li><button class="res" data-sec="${esc(s[0])}">
      <span class="num">${esc(s[0])}</span><span class="ttl">${hl(s[3], q)}</span>
      <span class="tags">${lvlBadge(s[4], true)}<span class="art">Art. ${s[2]} · ${esc(PL.arts[s[2]] || '')}</span></span>
      <span class="snip">${hl(snippet(s, q), q)}</span></button></li>`;

  let level = '', shown = 30;
  function runPL(reset = true) {
    if (reset) shown = 30;
    const q = $('#pl').value;
    if (!PL) { loadPL(); return; }
    if (!q.trim()) { $('#plResults').innerHTML = ''; $('#plMeta').textContent = `${PL.secs.length} sections indexed. Type a number or crime name.`; return; }
    const all = searchPL(q, level);
    $('#plMeta').textContent = all.length ? `${all.length} result${all.length > 1 ? 's' : ''}${level ? ' · ' + level.toLowerCase() + ' only' : ''}` : 'No matching sections. Try fewer or different words.';
    $('#plResults').innerHTML = all.slice(0, shown).map(s => resItem(s, q)).join('') + (all.length > shown ? `<li><button class="btn more" id="plMore">Show ${Math.min(30, all.length - shown)} more</button></li>` : '');
  }
  let plT; $('#pl').addEventListener('input', () => { clearTimeout(plT); plT = setTimeout(runPL, 120); });
  $('#pl').addEventListener('focus', loadPL);
  $('#plResults').addEventListener('click', e => { if (e.target.id === 'plMore') { shown += 30; runPL(false); } });
  $$('.f').forEach(b => b.addEventListener('click', () => { $$('.f').forEach(x => x.classList.toggle('on', x === b)); level = b.dataset.f; runPL(); }));
  $$('.ex').forEach(b => b.addEventListener('click', () => { $('#pl').value = b.dataset.ex; runPL(); }));

  /* ---------- Section sheet ---------- */
  let lastFocus = null;
  function openSheet(el) { lastFocus = document.activeElement; el.hidden = false; document.body.style.overflow = 'hidden'; const c = el.querySelector('[data-close].icon-btn'); c && c.focus({ preventScroll: true }); }
  function closeSheet(el) { el.hidden = true; if ($$('.sheet:not([hidden]), .viewer:not([hidden])').length === 0) document.body.style.overflow = ''; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); }
  $$('.sheet').forEach(sh => sh.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(sh); }));

  async function showSection(num) {
    await loadPL(); if (!PL) return;
    const s = PL.secs.find(x => x[0] === num); if (!s) { toast('Section not found'); return; }
    $('#sheetArt').textContent = `Penal Law Article ${s[2]} · ${PL.arts[s[2]] || ''}`;
    $('#sheetTitle').textContent = `§ ${s[0]} ${s[3]}`;
    const li = lvlInfo(s[4]); const L = $('#sheetLvl'); L.className = 'lvl ' + li.cls; L.textContent = li.label;
    $('#sheetText').innerHTML = s[5].split('\n').map(p => {
      const cls = /^\([a-z0-9]+\)/i.test(p) ? 'sub-p' : (/is a class|is a violation|is an unclassified/i.test(p) && p.length < 160 ? 'deg' : '');
      return `<p class="${cls}">${esc(p)}</p>`;
    }).join('');
    $('#sheetText').scrollTop = 0;
    $('#sheetLink').href = sectionUrl(s);
    $('#sheetCopy').onclick = () => copy(`NYS Penal Law § ${s[0]} ${s[3]}${li.label ? ' (' + li.label + ')' : ''}`, 'Citation copied');
    openSheet($('#sheet'));
  }

  /* ---------- Image viewer ---------- */
  const viewer = $('#viewer'), stage = $('#viewerStage');
  function openViewer(name, cap) {
    lastFocus = document.activeElement;
    $('#viewerImg').src = `./img/${name}.jpg`; $('#viewerImg').alt = cap || ''; $('#viewerCap').textContent = cap || '';
    stage.classList.remove('zoom'); viewer.hidden = false; document.body.style.overflow = 'hidden'; $('#viewerClose').focus({ preventScroll: true });
  }
  const closeViewer = () => { viewer.hidden = true; $('#viewerImg').removeAttribute('src'); if ($$('.sheet:not([hidden])').length === 0) document.body.style.overflow = ''; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); };
  $('#viewerClose').addEventListener('click', closeViewer);
  const toggleZoom = (ev) => {
    const z = !stage.classList.contains('zoom'); stage.classList.toggle('zoom', z);
    if (z && ev && ev.clientX != null) requestAnimationFrame(() => { const r = stage.getBoundingClientRect(); stage.scrollLeft = (stage.scrollWidth - r.width) * ((ev.clientX - r.left) / r.width); stage.scrollTop = (stage.scrollHeight - r.height) * ((ev.clientY - r.top) / r.height); });
  };
  $('#zoomBtn').addEventListener('click', () => toggleZoom());
  let lastTap = 0; $('#viewerImg').addEventListener('click', e => { const t = Date.now(); if (t - lastTap < 350 || e.detail === 2 || matchMedia('(pointer:fine)').matches) toggleZoom(e); lastTap = t; });

  /* ---------- Global delegation ---------- */
  document.addEventListener('click', e => {
    const sec = e.target.closest('[data-sec]'); if (sec) { e.preventDefault(); showSection(sec.dataset.sec); return; }
    const v = e.target.closest('[data-view]'); if (v) { e.preventDefault(); openViewer(v.dataset.view, v.dataset.cap); return; }
    const c = e.target.closest('[data-copy]'); if (c) { e.preventDefault(); copy(c.dataset.copy, 'Template copied'); return; }
    const tj = e.target.closest('[data-tourjump]'); if (tj) { e.preventDefault(); $('#q').value = ''; closeGlobal(); selectTour(tj.dataset.tourjump); $('#tours').scrollIntoView(); return; }
    const j = e.target.closest('[data-jump]'); if (j) { e.preventDefault(); closeGlobal(); const t = document.getElementById(j.dataset.jump); if (t) { t.scrollIntoView({ block: 'center' }); t.classList.add('hit'); t.nextElementSibling && t.nextElementSibling.classList.add('hit'); setTimeout(() => { t.classList.remove('hit'); t.nextElementSibling && t.nextElementSibling.classList.remove('hit'); }, 1800); } }
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!viewer.hidden) return closeViewer();
    const open = $$('.sheet:not([hidden])').pop(); if (open) return closeSheet(open);
    if (!$('#searchPanel').hidden) { $('#q').value = ''; closeGlobal(); }
  });

  /* ---------- Global search ---------- */
  const panel = $('#searchPanel');
  const placePanel = () => { panel.style.top = $('.top').getBoundingClientRect().bottom + 'px'; };
  function closeGlobal() { panel.hidden = true; document.body.style.overflow = ''; }
  function runGlobal() {
    const q = $('#q').value.trim(); if (!q) { closeGlobal(); return; }
    loadPL(); placePanel(); panel.hidden = false; document.body.style.overflow = 'hidden';
    const ql = q.toLowerCase(); const qn = ql.replace(/\s+/g, '');
    const m = (...f) => f.some(x => String(x).toLowerCase().includes(ql) || String(x).toLowerCase().replace(/\s+/g, '').includes(qn));
    const groups = [];
    const codes = [...C.codeUpdates, ...C.nonCrime, ...C.finals].filter(r => m(r[0], r[1]));
    if (codes.length) groups.push(['Radio codes', codes.slice(0, 12).map(r => `<button class="sp-item" data-jump="code-${r[0].replace(/\W+/g, '')}"><span class="k">${esc(r[0])}</span><span class="v">${esc(r[1])}</span></button>`)]);
    const jh = /^(jagger|jh)\s*(hall)?\s*(\d+)$/i.exec(q);
    const people = [...C.vip.map(v => [...v]), ...C.keyStaff.map(v => [...v, 0])].filter(v => (jh && v[3] === +jh[3]) || (!jh && m(v[1], v[2], v[3] ? 'jagger hall ' + v[3] : '')));
    if (people.length) groups.push(['Jagger Hall & key personnel', people.slice(0, 10).map(v => `<button class="sp-item" data-view="vip${v[0]}" data-cap="${esc(v[1])}${v[3] ? ' · Jagger Hall ' + v[3] : ''}"><img src="./img/vip${v[0]}.jpg" alt=""><span class="v">${esc(v[1])}<small>${esc(v[2])}</small></span>${v[3] ? `<span class="k">JH ${v[3]}</span>` : ''}</button>`)]);
    const rooms = CR.floors.flatMap(f => f[1]).filter(r => m(r[0], r[1]) || r[0].replace(/\W/g, '').toLowerCase() === qn.replace(/\W/g, ''));
    const blds = BL.filter(b => m(b[0], b[1], b[2], ...b[4]));
    if (blds.length) groups.push(['Buildings', blds.slice(0, 8).map(b => `<button class="sp-item" data-jump="${bldId(b[0])}"><span class="k">${esc(b[4].join('/') || '—')}</span><span class="v"><b>${esc(b[0])}</b><small>Sector ${esc(b[1])} · ${esc(b[2])}</small></span></button>`)]);
    const nms = []; if (ql.length > 1) NM.forEach(([g, , rows]) => rows.forEach(r => { if ((g + ' ' + r[0]).toLowerCase().includes(ql) || (qn.replace(/\D/g, '').length >= 3 && r[1].some(x => x.replace(/\D/g, '').includes(qn.replace(/\D/g, ''))))) nms.push([g, r]); }));
    if (nms.length) groups.push(['Important numbers', nms.slice(0, 8).map(([g, r]) => `<button class="sp-item" data-jump="${nmId(g, r[0])}"><span class="k">${esc(r[1][0])}</span><span class="v">${esc(r[0])}<small>${esc(g)}${r[1].length > 1 ? ' · also ' + esc(r[1].slice(1).join(', ')) : ''}</small></span></button>`)]);
    if (rooms.length) groups.push(['C-Building club rooms', rooms.slice(0, 8).map(r => `<button class="sp-item" data-jump="${roomId(r[0])}"><span class="k">${esc(r[0])}</span><span class="v">${esc(r[1])}</span></button>`)]);
    if (ql.length > 2) {
      const staff = []; TM.forEach(t => t.groups.forEach(g => g.rows.forEach(r => { if (r[0].toLowerCase().includes(ql) && !/overtime|^sector|dreamland officer|firewatch|meal relief/i.test(r[0])) staff.push([t, r]); })));
      if (staff.length) groups.push(['Tour schedules', staff.slice(0, 8).map(([t, r]) => `<button class="sp-item" data-tourjump="${t.id}"><span class="k">${t.name.replace('Tour ', 'T')}</span><span class="v">${esc(r[0])}<small>${esc(t.label)} · ${esc(t.time)} · RDO: ${r[1].map((v, i) => v === 'RDO' ? t.cols[i] : '').filter(Boolean).join(', ') || 'none'}</small></span></button>`)]);
    }
    const pho = C.phonetic.filter(w => ql.length > 1 && w.toLowerCase().startsWith(ql));
    if (pho.length) groups.push(['Phonetic alphabet', pho.map(w => `<button class="sp-item" data-jump="phonetic"><span class="k">${w[0]}</span><span class="v">${w}</span></button>`)]);
    const nar = C.narratives.filter(n => m(n[0]) || (ql.length > 3 && n[1].toLowerCase().includes(ql)));
    if (nar.length) groups.push(['Narrative templates', nar.map(n => `<button class="sp-item" data-jump="reports"><span class="v">${esc(n[0])}<small>${esc(n[1].slice(0, 90))}…</small></span></button>`)]);
    const fnm = C.fieldNotes.filter(t => m(t.name, (t.sub || '') + ' field notes ' + (t.larceny ? 'petit grand 155.25 155.30' : (t.code || []).join(' ')) + ' ' + (t.kw || '')));
    if (fnm.length && ql.length > 2) groups.push(['Field notes', fnm.map(t => `<button class="sp-item" data-fnjump="${t.id}"><span class="v">${esc(t.name)}<small>Open field notes form</small></span></button>`)]);
    const hrm = ql.length > 2 ? C.henderson.rules.map((r, i) => [i + 1, ...r]).filter(r => m(r[1], r[2] + ' henderson rule ' + r[0])) : [];
    if (ql.length > 2) {
      const [og] = OG ? ogFind(q) : [[]]; if (!OG) loadOG();
      const ogw = ogWords(q);
      const tH = OG ? og.filter(x => x[1]).map(x => x[0].no) : OGT.filter(t => ogw.every(x => t[1].toLowerCase().includes(x))).map(t => t[0]);
      const items = tH.slice(0, 4).map(n => { const t = OGT.find(x => x[0] === n); return `<button class="sp-item" data-og="${n}"><span class="k">OI ${n}</span><span class="v">${esc(t[1])}<small>Operations Guide · ${esc(t[2])}</small></span></button>`; });
      og.filter(x => x[2].length).slice(0, 6).forEach(([I, , h]) => items.push(`<button class="sp-item" data-og="${I.no}" data-ob="${h[0]}"><span class="k">OI ${I.no}</span><span class="v">${esc(I.title)}<small>${esc(ogSnip(I.b[h[0]][2], ogw).slice(0, 120))}</small></span></button>`));
      if (items.length) groups.push(['Operations Guide', items.slice(0, 8)]);
    }
    if (hrm.length) groups.push(['Henderson Rules', hrm.slice(0, 6).map(r => `<button class="sp-item" data-jump="hr-${r[0]}"><span class="k">${r[0]}</span><span class="v">${esc(r[1])}<small>Henderson Rule ${r[0]}</small></span></button>`)]);
    const secs = [['crimes', 'Crime Classifications'], ['lookup', 'Penal Law Lookup'], ['jagger', 'Jagger Hall Classifications'], ['radio', 'Radio Codes'], ['phonetic', 'Phonetic Alphabet'], ['reports', 'Report Writing'], ['fieldnotes', 'Field Notes', 'field notes narrative generator incident larceny petit grand aided alarm burglary robbery trespass lost property'], ['tours', 'Tour Master Schedules', 'midnight day evening tour 1 2 3 schedule shift'], ['tourlog', 'Evening Tour Log', 'tour log supervisor tour update evening 1500x2300 roll call attendance service calls key exchange email'], ['meals', 'Meal Times', 'meal meals lunch dinner relief frank john ida mobile peter memo 39 break'], ['numbers', 'Important Numbers', 'phone numbers extensions ext directory contacts emergency 911 b&g custodial nurse hr it'], ['buildings', 'Campus Buildings', 'building sector address extension ext phone'], ['clubs', 'C-Building Club Rooms', 'club room 450 grand concourse student activities'], ['uniform', 'Uniform Change Dates', 'winter spring summer fall'], ['summons', 'Summons Complaint/Information', 'crc-3206 ticket'], ['returndates', 'C-Summons Return Date Schedule', 'return date trial date court appearance c-summons csummons bronx criminal court 161st'], ['henderson', 'CUNY Henderson Rules', 'henderson rules public order article 129-a education law penalties sanctions'], ['opsguide', 'Operations Guide', 'operations guide instructions oi policy procedure manual'], ['peel', "Sir Robert Peel's Principles"]].filter(s => m(s[1], s[2] || ''));
    if (secs.length) groups.push(['Sections', secs.map(s => `<button class="sp-item" data-jump="${s[0]}"><span class="v">${esc(s[1])}</span></button>`)]);
    if (PL) {
      const pl = searchPL(q, '', 8);
      if (pl.length) groups.push(['Penal Law', pl.map(s => `<button class="sp-item" data-sec="${esc(s[0])}"><span class="k">${esc(s[0])}</span><span class="v">${hl(s[3], q)}<small>${esc(lvlInfo(s[4]).label || ('Art. ' + s[2]))}</small></span></button>`)]);
    }
    panel.innerHTML = `<div class="sp-inner">${groups.length ? groups.map(([h, items]) => `<div class="sp-group"><h3>${h}</h3>${items.join('')}</div>`).join('') : `<p class="sp-empty">${PL ? 'Nothing found for “' + esc(q) + '”.' : 'Loading…'}</p>`}</div>`;
  }
  let gT; $('#q').addEventListener('input', () => { clearTimeout(gT); gT = setTimeout(runGlobal, 100); });
  $('#q').addEventListener('focus', () => { loadPL(); loadOG(); if ($('#q').value) runGlobal(); });
  $('#q').addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });
  panel.addEventListener('click', e => { if (e.target.closest('[data-jump]')) { $('#q').value = ''; } });
  window.addEventListener('resize', () => { if (!panel.hidden) placePanel(); });

  /* ---------- Chips: tap-to-scroll + scroll-spy ---------- */
  const chips = $$('.chip'); const ids = chips.map(c => c.getAttribute('href').slice(1));
  const chipBar = $('#chips'); let spyLock = 0, lockT;
  const setChip = id => chips.forEach(c => {
    const on = c.getAttribute('href') === '#' + id; if (on === c.classList.contains('on')) return;
    c.classList.toggle('on', on);
    if (on) { const l = c.offsetLeft - (chipBar.clientWidth - c.offsetWidth) / 2; chipBar.scrollTo({ left: Math.max(0, l), behavior: 'smooth' }); }
  });
  const headerH = () => $('.top').getBoundingClientRect().height;
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  function goTo(id) {
    const el = document.getElementById(id); if (!el) return;
    const y = () => Math.max(0, el.getBoundingClientRect().top + scrollY - headerH() - 8);
    spyLock = 1; setChip(id); clearTimeout(lockT);
    window.scrollTo({ top: y(), behavior: smooth ? 'smooth' : 'auto' });
    let last = -1, still = 0;
    const settle = () => {  // wait until scrolling stops, then correct for any layout shift
      if (Math.abs(scrollY - last) < 1) still++; else still = 0; last = scrollY;
      if (still < 4) { lockT = setTimeout(settle, 60); return; }
      if (Math.abs(scrollY - y()) > 2) window.scrollTo({ top: y(), behavior: 'auto' });
      spyLock = 0; setChip(id);
    };
    lockT = setTimeout(settle, 120);
    history.replaceState(null, '', '#' + id);
  }
  const spy = new IntersectionObserver(ents => {
    if (spyLock) return;
    ents.forEach(en => { if (en.isIntersecting) setChip(en.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ids.forEach(id => { const el = document.getElementById(id); el && spy.observe(el); });
  chips.forEach(c => c.addEventListener('click', e => {
    e.preventDefault(); if (!panel.hidden) { $('#q').value = ''; closeGlobal(); }
    goTo(c.getAttribute('href').slice(1));
  }));
  ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, () => { if (spyLock) { spyLock = 0; clearTimeout(lockT); } }, { passive: true }));
  if (location.hash && ids.includes(location.hash.slice(1))) setTimeout(() => goTo(location.hash.slice(1)), 300);

  /* ---------- Lazy-load index when lookup nears view ---------- */
  new IntersectionObserver((ents, o) => { if (ents.some(x => x.isIntersecting)) { loadPL(); o.disconnect(); } }, { rootMargin: '600px' }).observe($('#lookup'));

  /* ---------- Share & install ---------- */
  $('#shareBtn').addEventListener('click', async () => {
    const data = { title: 'Public Safety Resources', text: 'Field reference: crime classifications, Penal Law lookup, Jagger Hall codes, radio codes and more.', url: location.href.split('#')[0] };
    if (navigator.share) { try { await navigator.share(data); } catch {} } else copy(data.url, 'Link copied');
  });
  let deferred = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; $('#nativeInstall').hidden = false; });
  $('#installBtn').addEventListener('click', () => openSheet($('#installSheet')));
  $('#nativeInstall').addEventListener('click', async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $('#nativeInstall').hidden = true; closeSheet($('#installSheet')); });
  if (matchMedia('(display-mode: standalone)').matches || navigator.standalone) $('#installBtn').hidden = true;

  if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); }); }
})();
