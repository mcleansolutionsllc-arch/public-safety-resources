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
  $('#shieldGrid').innerHTML = C.shields.map((s, i) => `
    <article class="shield">
      <a class="shield-img" href="${s.href}" target="_blank" rel="noopener" aria-label="Open ${esc(s.title)} on ypdcrime.com">
        <img src="./img/${s.img}.jpg" alt="${esc(s.title)} poster" loading="${i < 4 ? 'eager' : 'lazy'}">
        <span class="ext">ypdcrime <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
      </a>
      <div class="shield-info">
        <h3>${esc(s.title)}</h3>
        <div class="shield-meta">${s.codes.length ? `<span class="code">PL ${s.codes.map(c => c[0]).join(' / ')}</span>` : ''}<span class="lvl ${shieldCls(s.cls)}">${esc(s.cls)}</span></div>
        ${s.note ? `<p class="shield-note">${esc(s.note)}</p>` : ''}
        <div class="read-row">${s.codes.map(c => `<button class="mini" data-sec="${c[2]}">Read ${c[0]} here</button>`).join('') || `<a class="mini" href="${s.href}" target="_blank" rel="noopener" style="text-decoration:none">Open guide</a>`}</div>
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

  /* ---------- Tours ---------- */
  $('#tourList').innerHTML = C.tours.map(([img, t, time, asof]) => `
    <article class="tour">
      <div class="tour-head"><h3>${esc(t)} <span class="tour-time">${esc(time)}</span></h3><span>${esc(asof)}</span></div>
      <button class="doc-btn" data-view="${img}" data-cap="${esc(t)} (${esc(time)}) · ${esc(asof)}"><img src="./img/${img}.jpg" alt="${esc(t)} schedule" loading="lazy"><span class="doc-tag">Tap to zoom</span></button>
    </article>`).join('');

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
    const pho = C.phonetic.filter(w => ql.length > 1 && w.toLowerCase().startsWith(ql));
    if (pho.length) groups.push(['Phonetic alphabet', pho.map(w => `<button class="sp-item" data-jump="phonetic"><span class="k">${w[0]}</span><span class="v">${w}</span></button>`)]);
    const nar = C.narratives.filter(n => m(n[0]) || (ql.length > 3 && n[1].toLowerCase().includes(ql)));
    if (nar.length) groups.push(['Narrative templates', nar.map(n => `<button class="sp-item" data-jump="reports"><span class="v">${esc(n[0])}<small>${esc(n[1].slice(0, 90))}…</small></span></button>`)]);
    const secs = [['crimes', 'Crime Classifications'], ['lookup', 'Penal Law Lookup'], ['jagger', 'Jagger Hall Classifications'], ['radio', 'Radio Codes'], ['phonetic', 'Phonetic Alphabet'], ['reports', 'Report Writing'], ['tours', 'Tour Schedules', 'midnight day evening tour 1 2 3 schedule'], ['uniform', 'Uniform Change Dates', 'winter spring summer fall'], ['summons', 'Summons Complaint/Information', 'crc-3206 ticket'], ['peel', "Sir Robert Peel's Principles"]].filter(s => m(s[1], s[2] || ''));
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

  /* ---------- Chips scroll-spy ---------- */
  const chips = $$('.chip'); const ids = chips.map(c => c.getAttribute('href').slice(1));
  const spy = new IntersectionObserver(ents => {
    ents.forEach(en => { if (en.isIntersecting) { const id = en.target.id; chips.forEach(c => { const on = c.getAttribute('href') === '#' + id; c.classList.toggle('on', on); if (on) c.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }); } });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ids.forEach(id => { const el = document.getElementById(id); el && spy.observe(el); });
  chips.forEach(c => c.addEventListener('click', e => { if (!panel.hidden) { $('#q').value = ''; closeGlobal(); } }));

  /* ---------- Lazy-load index when lookup nears view ---------- */
  new IntersectionObserver((ents, o) => { if (ents.some(x => x.isIntersecting)) { loadPL(); o.disconnect(); } }, { rootMargin: '600px' }).observe($('#lookup'));

  /* ---------- Share & install ---------- */
  $('#shareBtn').addEventListener('click', async () => {
    const data = { title: 'Hostos Public Safety Resources', text: 'Field reference: crime classifications, Penal Law lookup, Jagger Hall codes, radio codes and more.', url: location.href.split('#')[0] };
    if (navigator.share) { try { await navigator.share(data); } catch {} } else copy(data.url, 'Link copied');
  });
  let deferred = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; $('#nativeInstall').hidden = false; });
  $('#installBtn').addEventListener('click', () => openSheet($('#installSheet')));
  $('#nativeInstall').addEventListener('click', async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $('#nativeInstall').hidden = true; closeSheet($('#installSheet')); });
  if (matchMedia('(display-mode: standalone)').matches || navigator.standalone) $('#installBtn').hidden = true;

  if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); }); }
})();
