// ============================================================
//  NEXUS GAMING — app.js  v2.0 (No Audio)
// ============================================================
'use strict';

const _s = s => String(s).replace(/[&<>"']/g,
  m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

let dlTimer = null;

// ============================================================
//  PARTICLES
// ============================================================
function initParticles() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden';
  const cols = ['rgba(0,245,255,','rgba(191,0,255,','rgba(255,0,110,','rgba(255,215,0,'];

  function mk() {
    const p   = document.createElement('div');
    p.className = 'pt';
    const sz  = Math.random()*4+1.5;
    const c   = cols[Math.floor(Math.random()*cols.length)];
    const dur = Math.random()*14+9;
    p.style.cssText =
      `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;` +
      `background:${c}${Math.random()*.5+.15});` +
      `box-shadow:0 0 ${sz*4}px ${c}.6);` +
      `animation:ptFloat ${dur}s ${Math.random()*8}s linear forwards`;
    wrap.appendChild(p);
    setTimeout(() => p.remove(), (dur+8)*1000);
  }

  document.body.appendChild(wrap);
  for (let i = 0; i < 15; i++) setTimeout(mk, i*400);
  setInterval(mk, 1500);
}

// ============================================================
//  SVG FALLBACK COVER
// ============================================================
const ICONS = {re:'🧟',gta:'🚗',hit:'🎯',tr:'🏛️',mp:'🔫',forza:'🏎️',mafia:'🤵'};

function svgCover(g) {
  return `<svg viewBox="0 0 200 267" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;height:100%;display:block">
    <defs>
      <linearGradient id="sg${_s(g.bl)}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${g.ca}" stop-opacity=".8"/>
        <stop offset="100%" stop-color="${g.ca2}" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect width="200" height="267" fill="url(#sg${_s(g.bl)})"/>
    <rect width="200" height="267" fill="black" fill-opacity=".4"/>
    <circle cx="100" cy="95" r="50" fill="none" stroke="${g.ca}"
      stroke-opacity=".3" stroke-width="1.5"/>
    <text x="100" y="112" text-anchor="middle" font-size="40">
      ${ICONS[g.s]||'🎮'}
    </text>
    <rect x="10" y="183" width="180" height="1"
      fill="${g.ca}" fill-opacity=".5"/>
    <text x="14" y="203" font-family="monospace" font-size="10"
      fill="${g.ca}" font-weight="bold">${_s(g.bl)}</text>
    <rect width="200" height="267" fill="none"
      stroke="${g.ca}" stroke-opacity=".2" stroke-width="1.5"/>
  </svg>`;
}

// ============================================================
//  DETAIL PAGE — open
// ============================================================
function openDetail(game) {
  const lp   = document.getElementById('listPage');
  const dp   = document.getElementById('detailPage');
  const meta = SERIES_META[game.s];

  // ---- Hero background ----
  const bgEl = document.getElementById('dpBg');
  const src  = COVERS[game.img];
  if (src) { bgEl.style.backgroundImage = `url("${src}")`; bgEl.style.background = ''; }
  else     { bgEl.style.backgroundImage = ''; bgEl.style.background = `linear-gradient(135deg,${game.ca},${game.ca2})`; }

  // ---- Cover image ----
  const cvrEl = document.getElementById('dpCvr');
  if (src) {
    const img = document.createElement('img');
    img.src = src; img.alt = _s(game.t);
    cvrEl.innerHTML = ''; cvrEl.appendChild(img);
  } else {
    cvrEl.innerHTML = svgCover(game);
  }

  // ---- Title / rating / tags ----
  const sl = document.getElementById('dpSeries');
  sl.textContent = meta.label; sl.style.color = meta.color;
  document.getElementById('dpTitle').textContent = game.t;
  document.getElementById('dpRat').innerHTML = `★ ${_s(game.r)}<span> / 10</span>`;

  const tagsEl = document.getElementById('dpTags');
  tagsEl.innerHTML = '';
  game.tags.forEach(t => {
    const el = document.createElement('span');
    el.className = 'dp-tag';
    el.style.background = t.c;
    el.style.color = t.c.includes('rgba(255,255,255') ? 'rgba(255,255,255,.65)' : '#fff';
    el.textContent = t.l;
    tagsEl.appendChild(el);
  });

  // ---- Description ----
  document.getElementById('dpDesc').textContent = game.desc;

  // ---- Info grid ----
  document.getElementById('dpInfo').innerHTML = [
    ['المطوّر',game.dev],['الناشر',game.pub],
    ['سنة الإصدار',game.y],['النوع',game.g],
    ['المنصات',game.platform],['أوضاع اللعب',game.modes],
    ['حجم التحميل',game.sz],['التقييم',game.r+' / 10'],
  ].map(([l,v]) =>
    `<div class="ic">
       <div class="ic-lbl">${_s(l)}</div>
       <div class="ic-val">${_s(String(v))}</div>
     </div>`
  ).join('');

  // ---- System requirements ----
  document.getElementById('dpReq').innerHTML = `
    <div class="req-box req-min">
      <div class="req-ttl">📋 الحد الأدنى</div>
      ${REQ_ROWS.map(([l,k]) =>
        `<div class="rr">
           <span class="rk">${_s(l)}</span>
           <span class="rv">${_s(game.req.min[k])}</span>
         </div>`
      ).join('')}
    </div>
    <div class="req-box req-rec">
      <div class="req-ttl">⚡ الموصى به</div>
      ${REQ_ROWS.map(([l,k]) =>
        `<div class="rr">
           <span class="rk">${_s(l)}</span>
           <span class="rv">${_s(game.req.rec[k])}</span>
         </div>`
      ).join('')}
    </div>`;

  // ---- Download section ----
  document.getElementById('dpDlName').textContent = game.t;
  document.getElementById('dpDlSz').textContent   = 'حجم الملف: ' + game.sz;

  const prog = document.getElementById('dpProg');
  const btn  = document.getElementById('dpDlBtn');
  prog.classList.remove('on');
  document.getElementById('dpBar').style.width = '0%';
  document.getElementById('dpPct').textContent  = '0%';
  btn.style.display = '';
  clearInterval(dlTimer);

  btn.onclick = () => startDL(game);
  document.getElementById('dpCancelBtn').onclick = () => cancelDL();

  // ---- Page transition ----
  lp.classList.add('out');
  dp.classList.remove('hidden');
  requestAnimationFrame(() => dp.classList.add('in'));
  dp.scrollTop = 0;
}

// ============================================================
//  DETAIL PAGE — close
// ============================================================
function goBack() {
  document.getElementById('detailPage').classList.remove('in');
  document.getElementById('listPage').classList.remove('out');
  setTimeout(() => document.getElementById('detailPage').classList.add('hidden'), 460);
  clearInterval(dlTimer);
}

// ============================================================
//  DOWNLOAD — direct magnet / torrent file
// ============================================================
function startDL(game) {
  // Local .torrent file
  if (game.torrentFile) {
    const a = document.createElement('a');
    a.href     = 'torrents/' + game.torrentFile;
    a.download = game.torrentFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('⬇ جاري تحميل ملف التورنت...');
    return;
  }

  // Magnet link
  if (game.mag && game.mag.startsWith('magnet:')) {
    const prog = document.getElementById('dpProg');
    const bar  = document.getElementById('dpBar');
    const pct  = document.getElementById('dpPct');
    const btn  = document.getElementById('dpDlBtn');

    prog.classList.add('on');
    btn.style.display = 'none';
    let p = 0;
    clearInterval(dlTimer);

    dlTimer = setInterval(() => {
      p += Math.random() * 5 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(dlTimer);
        bar.style.width = '100%';
        pct.textContent  = '100%';
        setTimeout(() => {
          prog.classList.remove('on');
          btn.style.display = '';
          showToast('✓ يُفتح عميل التورنت...');
          window.location.href = game.mag;
        }, 500);
        return;
      }
      bar.style.width = p + '%';
      pct.textContent  = Math.floor(p) + '%';
    }, 35);
    return;
  }

  showToast('⚠ رابط التحميل غير متوفر');
}

function cancelDL() {
  clearInterval(dlTimer);
  const prog = document.getElementById('dpProg');
  const btn  = document.getElementById('dpDlBtn');
  prog.classList.remove('on');
  btn.style.display = '';
  document.getElementById('dpBar').style.width = '0%';
  document.getElementById('dpPct').textContent  = '0%';
}

// ============================================================
//  BUILD CARD
// ============================================================
function buildCard(game, delay) {
  const card = document.createElement('div');
  card.className = 'gcard ca';
  card.style.animationDelay = delay + 'ms';
  card.style.setProperty('--ca', game.ca);

  const tag    = game.tags[0];
  const src    = COVERS[game.img];
  const coverH = src
    ? `<img src="${src}" alt="${_s(game.t)}" class="cover-img" loading="lazy">`
    : `<div style="position:absolute;inset:0">${svgCover(game)}</div>`;

  card.innerHTML = `
    <div class="gc-inner">
      <div style="position:absolute;inset:0;overflow:hidden">${coverH}</div>
      <div class="grad-top"></div>
      <div class="grad"></div>
      <div class="yr">${_s(String(game.y))}</div>
      <div class="badge"
        style="background:${tag.c};
               color:${tag.c.includes('rgba(255,255,255') ? 'rgba(255,255,255,.7)' : '#fff'}">
        ${_s(game.bl)}
      </div>
      <div class="cinfo">
        <div class="cgenre">${_s(game.g)}</div>
        <div class="ctitle">${_s(game.t)}</div>
        <div class="crat">★ ${_s(game.r)}</div>
        <div class="hint">اضغط لعرض التفاصيل</div>
      </div>
    </div>`;

  // 3D tilt — throttled with rAF
  let raf = null;
  card.addEventListener('mousemove', e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -12;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  14;
      card.style.transform  = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      card.style.transition = 'transform .06s linear';
      raf = null;
    });
  });
  card.addEventListener('mouseleave', () => {
    raf = null;
    card.style.transform  = 'rotateX(0) rotateY(0) scale(1)';
    card.style.transition = 'transform .45s cubic-bezier(.16,1,.3,1)';
  });
  card.addEventListener('click', () => openDetail(game));
  return card;
}

// ============================================================
//  RENDER
// ============================================================
function render(filter) {
  const main   = document.getElementById('mainGrid');
  const frag   = document.createDocumentFragment();
  const series = filter === 'all' ? Object.keys(SERIES_META) : [filter];

  main.innerHTML = '';

  series.forEach(sid => {
    const games = GAMES.filter(g => g.s === sid);
    if (!games.length) return;

    const meta    = SERIES_META[sid];
    const block   = document.createElement('div');
    block.className = 'series-block';

    const titleEl = document.createElement('div');
    titleEl.className = 'stitle';
    titleEl.style.setProperty('--sc', meta.color);
    titleEl.innerHTML =
      `${_s(meta.label)}<span class="scnt">${games.length} GAMES</span>`;
    block.appendChild(titleEl);

    const grid = document.createElement('div');
    grid.className = 'grid';
    games.forEach((g, i) =>
      grid.appendChild(buildCard(g, Math.min(i * 45, 360)))
    );
    block.appendChild(grid);
    frag.appendChild(block);
  });

  main.appendChild(frag);
}

// ============================================================
//  TOAST
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  initParticles();

  document.getElementById('backBtn').addEventListener('click', goBack);

  document.getElementById('navBar').addEventListener('click', e => {
    const b = e.target.closest('.nb');
    if (!b) return;
    document.querySelectorAll('.nb').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    render(b.dataset.f);
  });

  const cnt = document.getElementById('gameCount');
  if (cnt) cnt.textContent = '| ' + GAMES.length + ' GAMES';

  render('all');
});
