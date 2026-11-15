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
  const fnLoad = id => ({ ...(fnStore[id] || {}) });
  const fnSave = (id, v) => { fnStore[id] = v; };
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
  const fnDispTxt = { 'Report taken': 'A report was taken.', 'Individual advised': 'The individual was advised.', 'Referred for follow-up': 'The matter was referred for follow-up.', 'Escorted from location': 'The individual was escorted from the location.', 'Turned over to NYPD': 'The individual was turned over to NYPD.', 'Arrested by NYPD': 'The individual was arrested by NYPD.' };
  const fnContact = [
    { k: 'cName', l: 'Name', ph: 'Last, First' },
    { k: 'cPhone', l: 'Phone', t: 'tel', ph: '718-555-0123' },
    { k: 'cAddr', l: 'Address', ph: 'Street, City, ZIP' }
  ];
  let fnCur = null;
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
    const p = k => k === 'loc' ? (fnLoc(v) || ph(v.loc === 'Off campus' ? 'off-campus location' : 'location')) : k === 'aff' ? (v.aff ? `(${v.aff})` : ph('this campus/other CUNY')) : (v[k] && String(v[k]).trim()) ? String(v[k]).trim() : ph(lab(k));
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
    const any = ['oNames', 'oCall', 'oActions'].some(k => (v[k] || '').trim()) || (v.oDisp || []).length;
    if (!any && !force) return '';
    const how = { 'call for service': 'responded to a call for service', 'officer observation': 'observed the incident while on patrol', 'walk-in report': 'received a walk-in report', 'alarm activation': 'responded to an alarm activation' }[v.oCall] || '\u0001responded to / observed\u0002';
    const acts = (v.oActions || '').trim();
    const d = (v.oDisp || []).map(x => fnDispTxt[x]).join(' ');
    return `Public Safety Officer(s) ${p('oNames')} ${how} at ${p('loc')}.` + (acts ? ` Officers ${acts.replace(/^officers?\s+/i, '').replace(/\.$/, '')}.` : '') + (d ? ' ' + d : ' \u0001final disposition\u0002.') + ' No further incidents occurred.';
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
        <div class="fn-grp"><h4>Additional notes</h4><div class="fn-f"><textarea data-k="notes" rows="3" aria-label="Additional notes" placeholder="Witnesses, cameras checked, officers on scene, follow-up…">${esc(v.notes || '')}</textarea></div></div>
      </form>
      <div class="fn-out"><div class="fn-out-h"><h4>Narrative</h4><small>Not saved — copy before you reload</small></div><pre id="fnText" class="fn-text"></pre>
        <div class="fn-actions"><button type="button" class="btn-p" data-fnact="report">Generate report</button><button type="button" class="mini" data-fnact="copy">Copy</button><button type="button" class="mini" data-fnact="clear">Clear</button></div></div>`;
    fnRender(t, v);
    if (scroll) requestAnimationFrame(() => { const y = p.getBoundingClientRect().top + scrollY - ($('.top').offsetHeight + 12); window.scrollTo({ top: y, behavior: 'smooth' }); });
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
    if (e.target.closest('[data-fnclose]')) { fnCur = null; $('#fnPanel').hidden = true; fnGrid(); return; }
    const a = e.target.closest('[data-fnact]'); if (!a) return;
    const txt = fnPlain($('#fnPanel')._raw || '');
    if (a.dataset.fnact === 'report') { fnReportOpen(); return; }
    if (a.dataset.fnact === 'copy') copy(txt, 'Narrative copied');
    else if (a.dataset.fnact === 'share') navigator.share({ title: 'Field notes', text: txt }).catch(() => {});
    else if (a.dataset.fnact === 'clear') { if (confirm('Clear this draft?')) { delete fnStore[fnCur]; fnOpen(fnCur); toast('Draft cleared'); } }
  });
  $('#fnPanel').addEventListener('input', () => fnGrid(), { passive: true });
  window.fnOpenType = id => fnOpen(id, true);


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
    if (hrm.length) groups.push(['Henderson Rules', hrm.slice(0, 6).map(r => `<button class="sp-item" data-jump="hr-${r[0]}"><span class="k">${r[0]}</span><span class="v">${esc(r[1])}<small>Henderson Rule ${r[0]}</small></span></button>`)]);
    const secs = [['crimes', 'Crime Classifications'], ['lookup', 'Penal Law Lookup'], ['jagger', 'Jagger Hall Classifications'], ['radio', 'Radio Codes'], ['phonetic', 'Phonetic Alphabet'], ['reports', 'Report Writing'], ['fieldnotes', 'Field Notes', 'field notes narrative generator incident larceny petit grand aided alarm burglary robbery trespass lost property'], ['tours', 'Tour Master Schedules', 'midnight day evening tour 1 2 3 schedule shift'], ['buildings', 'Campus Buildings', 'building sector address extension ext phone'], ['clubs', 'C-Building Club Rooms', 'club room 450 grand concourse student activities'], ['uniform', 'Uniform Change Dates', 'winter spring summer fall'], ['summons', 'Summons Complaint/Information', 'crc-3206 ticket'], ['returndates', 'C-Summons Return Date Schedule', 'return date trial date court appearance c-summons csummons bronx criminal court 161st'], ['henderson', 'CUNY Henderson Rules', 'henderson rules public order article 129-a education law penalties sanctions'], ['peel', "Sir Robert Peel's Principles"]].filter(s => m(s[1], s[2] || ''));
    if (secs.length) groups.push(['Sections', secs.map(s => `<button class="sp-item" data-jump="${s[0]}"><span class="v">${esc(s[1])}</span></button>`)]);
    if (PL) {
      const pl = searchPL(q, '', 8);
      if (pl.length) groups.push(['Penal Law', pl.map(s => `<button class="sp-item" data-sec="${esc(s[0])}"><span class="k">${esc(s[0])}</span><span class="v">${hl(s[3], q)}<small>${esc(lvlInfo(s[4]).label || ('Art. ' + s[2]))}</small></span></button>`)]);
    }
    panel.innerHTML = `<div class="sp-inner">${groups.length ? groups.map(([h, items]) => `<div class="sp-group"><h3>${h}</h3>${items.join('')}</div>`).join('') : `<p class="sp-empty">${PL ? 'Nothing found for “' + esc(q) + '”.' : 'Loading…'}</p>`}</div>`;
  }
  let gT; $('#q').addEventListener('input', () => { clearTimeout(gT); gT = setTimeout(runGlobal, 100); });
  $('#q').addEventListener('focus', () => { loadPL(); if ($('#q').value) runGlobal(); });
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
