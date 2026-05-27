// ============================================================
//  NEXUS GAMING - app.js v4.0
//  Safer data handling, better UX, accessibility, link states
// ============================================================
'use strict';

const _s = value => String(value ?? '').replace(/[&<>"']/g,
  ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

const _norm = value => String(value ?? '').toLowerCase().normalize('NFKD');
const BTIH_RE = /^magnet:\?xt=urn:btih:([a-zA-Z0-9]{32,40})(?:&|$)/;
const CSS_COLOR_RE = /^(#[0-9a-f]{3,8}|rgba?\([^)]+\)|var\(--[a-z0-9-]+\))$/i;

let dlTimer = null;
let currentGame = null;
let currentFilter = 'all';
let searchTerm = '';
let starsBound = false;
let userRatings = readStoreJson('nx_ratings', {});
let smartState = {
  collection: 'all',
  sort: 'default',
  size: 'all',
  year: 'all',
  pc: localStorage.getItem('nx_pc_preset') || 'mid',
  activeOnly: false,
  pcFitOnly: false,
};

const PC_POWER = { low: 1.5, mid: 3, high: 4.2, ultra: 6 };
const COLLECTION_LABELS = {
  all: 'All Games',
  active: 'Verified Links',
  lowpc: 'Low PC Picks',
  small: 'Under 10GB',
  story: 'Story Rich',
  openworld: 'Open World',
  horror: 'Horror',
  racing: 'Racing',
  top: 'Top Rated',
};

function readStoreJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    localStorage.removeItem(key);
    return fallback;
  }
}

function writeStoreJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {
    showToast('Storage is blocked or full');
  }
}

function safeCss(value, fallback) {
  const color = String(value || '').trim();
  return CSS_COLOR_RE.test(color) ? color : fallback;
}

function cssIdent(value) {
  if (window.CSS && CSS.escape) return CSS.escape(value);
  return String(value).replace(/["\\]/g, '\\$&');
}

function getMeta(seriesId) {
  return SERIES_META[seriesId] || { label: seriesId || 'Unknown', color: '#00f5ff' };
}

function getDownloadState(game) {
  if (game.torrentFile) return { ok: true, kind: 'file', label: 'TORRENT FILE', cls: 'verified' };

  const magnet = String(game.mag || '');
  if (!magnet) return { ok: false, kind: 'none', label: 'NO LINK', cls: 'missing' };
  if (magnet.includes('HASH')) return { ok: false, kind: 'pending', label: 'PENDING LINK', cls: 'pending' };
  if (BTIH_RE.test(magnet)) return { ok: true, kind: 'magnet', label: 'VERIFIED MAGNET', cls: 'verified' };

  return { ok: false, kind: 'invalid', label: 'CHECK LINK', cls: 'pending' };
}

function parseSizeGB(size) {
  const text = String(size || '').toUpperCase();
  const value = parseFloat(text.replace(',', '.')) || 0;
  if (text.includes('MB')) return value / 1024;
  return value;
}

function getReqText(game) {
  const min = game.req && game.req.min ? Object.values(game.req.min).join(' ') : '';
  const rec = game.req && game.req.rec ? Object.values(game.req.rec).join(' ') : '';
  return `${min} ${rec}`.toUpperCase();
}

function getGameDemand(game) {
  const req = getReqText(game);
  const size = parseSizeGB(game.sz);
  let score = 1;

  if (game.y >= 2015) score += .7;
  if (game.y >= 2020) score += .9;
  if (size >= 40) score += .5;
  if (size >= 70) score += .6;
  if (/RTX|RX 6|RX 7|GTX 10|GTX 16|GTX 20|GTX 30|GTX 40/.test(req)) score += 1.1;
  if (/I7|RYZEN 5|RYZEN 7|16 GB/.test(req)) score += .7;
  if (/DIRECTX 12/.test(req)) score += .4;

  return Math.min(5.6, score);
}

function getPcFit(game) {
  const power = PC_POWER[smartState.pc] || PC_POWER.mid;
  const demand = getGameDemand(game);
  if (power >= demand + .7) return { level: 'great', label: 'GREAT FIT' };
  if (power >= demand - .25) return { level: 'ok', label: 'PLAYABLE' };
  return { level: 'hard', label: 'HEAVY' };
}

function isCollectionMatch(game, collection) {
  const text = _norm(`${game.t} ${game.g} ${game.desc} ${game.modes} ${(game.tags || []).map(t => t.l).join(' ')}`);
  const size = parseSizeGB(game.sz);
  const rating = parseFloat(game.r) || 0;
  const download = getDownloadState(game);
  const demand = getGameDemand(game);

  switch (collection) {
    case 'active': return download.ok;
    case 'lowpc': return demand <= 2.4 || game.y <= 2010 || size <= 10;
    case 'small': return size > 0 && size <= 10;
    case 'story': return /story|single|campaign|rpg|adventure|horror|western/.test(text);
    case 'openworld': return /open world|sandbox|gta|red dead|far cry|witcher|assassin/.test(text);
    case 'horror': return /horror|survival|resident evil|zombie/.test(text);
    case 'racing': return /racing|forza|cars|horizon/.test(text);
    case 'top': return rating >= 9.2;
    default: return true;
  }
}

function isSizeMatch(game) {
  const size = parseSizeGB(game.sz);
  if (smartState.size === 'small') return size <= 10;
  if (smartState.size === 'medium') return size > 10 && size < 50;
  if (smartState.size === 'large') return size >= 50;
  return true;
}

function isYearMatch(game) {
  if (smartState.year === 'classic') return game.y <= 2010;
  if (smartState.year === 'modern') return game.y > 2010 && game.y < 2020;
  if (smartState.year === 'new') return game.y >= 2020;
  return true;
}

function applySmartFilters(games) {
  return games.filter(game => {
    if (!isCollectionMatch(game, smartState.collection)) return false;
    if (smartState.activeOnly && !getDownloadState(game).ok) return false;
    if (smartState.pcFitOnly && getPcFit(game).level === 'hard') return false;
    return isSizeMatch(game) && isYearMatch(game);
  });
}

function sortGames(games) {
  const sorted = [...games];
  if (smartState.sort === 'rating') sorted.sort((a,b) => (parseFloat(b.r)||0) - (parseFloat(a.r)||0));
  if (smartState.sort === 'year') sorted.sort((a,b) => b.y - a.y);
  if (smartState.sort === 'size') sorted.sort((a,b) => parseSizeGB(a.sz) - parseSizeGB(b.sz));
  if (smartState.sort === 'title') sorted.sort((a,b) => a.t.localeCompare(b.t));
  return sorted;
}

function hasSmartFilters() {
  return smartState.collection !== 'all' || smartState.sort !== 'default' ||
    smartState.size !== 'all' || smartState.year !== 'all' ||
    smartState.activeOnly || smartState.pcFitOnly;
}

function canAnimate() {
  return !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initParticles() {
  if (!canAnimate()) return;

  const wrap = document.createElement('div');
  wrap.className = 'particle-layer';
  const colors = ['rgba(0,245,255,', 'rgba(191,0,255,', 'rgba(255,0,110,', 'rgba(255,215,0,'];

  function makeParticle() {
    const p = document.createElement('div');
    p.className = 'pt';
    const size = Math.random() * 3.5 + 1.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 14 + 9;
    p.style.cssText =
      `width:${size}px;height:${size}px;left:${Math.random() * 100}%;` +
      `background:${color}${Math.random() * .45 + .12});` +
      `box-shadow:0 0 ${size * 4}px ${color}.6);` +
      `animation:ptFloat ${duration}s ${Math.random() * 8}s linear forwards`;
    wrap.appendChild(p);
    setTimeout(() => p.remove(), (duration + 8) * 1000);
  }

  document.body.appendChild(wrap);
  for (let i = 0; i < 12; i++) setTimeout(makeParticle, i * 360);
  setInterval(makeParticle, 1800);
}

function initTheme() {
  const saved = localStorage.getItem('nx_theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');
  updateThemeBtn();

  document.getElementById('themeBtn').addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('nx_theme', isLight ? 'light' : 'dark');
    updateThemeBtn();
    showToast(isLight ? 'Light mode enabled' : 'Dark mode enabled');
  });
}

function updateThemeBtn() {
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = document.body.classList.contains('light') ? 'D' : 'L';
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');

  input.addEventListener('input', () => {
    searchTerm = input.value.trim();
    clear.classList.toggle('visible', searchTerm.length > 0);
    render(currentFilter);
  });

  clear.addEventListener('click', () => {
    input.value = '';
    searchTerm = '';
    clear.classList.remove('visible');
    render(currentFilter);
    input.focus();
  });

  document.addEventListener('keydown', event => {
    const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    const listVisible = !document.getElementById('listPage').classList.contains('out');

    if (event.key === '/' && listVisible && !typing) {
      event.preventDefault();
      input.focus();
    }

    if (event.key === 'Escape' && searchTerm) {
      input.value = '';
      searchTerm = '';
      clear.classList.remove('visible');
      render(currentFilter);
    }
  });
}

function initSmartControls() {
  const collectionBar = document.getElementById('collectionBar');
  const sortSelect = document.getElementById('sortSelect');
  const sizeSelect = document.getElementById('sizeSelect');
  const yearSelect = document.getElementById('yearSelect');
  const pcPreset = document.getElementById('pcPreset');
  const activeOnly = document.getElementById('activeOnly');
  const pcFitOnly = document.getElementById('pcFitOnly');
  const reset = document.getElementById('resetFilters');

  if (pcPreset) pcPreset.value = smartState.pc;

  collectionBar.addEventListener('click', event => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    smartState.collection = chip.dataset.c || 'all';
    collectionBar.querySelectorAll('.chip').forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
    render(currentFilter);
  });

  sortSelect.addEventListener('change', () => {
    smartState.sort = sortSelect.value;
    render(currentFilter);
  });
  sizeSelect.addEventListener('change', () => {
    smartState.size = sizeSelect.value;
    render(currentFilter);
  });
  yearSelect.addEventListener('change', () => {
    smartState.year = yearSelect.value;
    render(currentFilter);
  });
  pcPreset.addEventListener('change', () => {
    smartState.pc = pcPreset.value;
    localStorage.setItem('nx_pc_preset', smartState.pc);
    render(currentFilter);
  });
  activeOnly.addEventListener('change', () => {
    smartState.activeOnly = activeOnly.checked;
    render(currentFilter);
  });
  pcFitOnly.addEventListener('change', () => {
    smartState.pcFitOnly = pcFitOnly.checked;
    render(currentFilter);
  });
  reset.addEventListener('click', () => {
    smartState = {
      collection: 'all',
      sort: 'default',
      size: 'all',
      year: 'all',
      pc: smartState.pc,
      activeOnly: false,
      pcFitOnly: false,
    };
    sortSelect.value = 'default';
    sizeSelect.value = 'all';
    yearSelect.value = 'all';
    activeOnly.checked = false;
    pcFitOnly.checked = false;
    collectionBar.querySelectorAll('.chip').forEach(item => item.classList.toggle('active', item.dataset.c === 'all'));
    render(currentFilter);
  });
}

function filterGames(games) {
  if (!searchTerm) return games;
  const q = _norm(searchTerm);

  return games.filter(game => {
    const meta = getMeta(game.s);
    return [
      game.t, game.g, game.desc, game.dev, game.pub,
      game.platform, game.modes, meta.label, game.y
    ].some(value => _norm(value).includes(q)) ||
      (game.tags || []).some(tag => _norm(tag.l).includes(q));
  });
}

function initStars(gameId) {
  const stars = [...document.querySelectorAll('.star')];
  const saved = document.getElementById('urSaved');
  const wrap = document.getElementById('starsEl');
  const current = userRatings[gameId] || 0;

  if (saved) {
    saved.textContent = '';
    saved.classList.remove('show');
  }
  stars.forEach((star, index) => star.classList.toggle('active', index < current));

  if (starsBound || !wrap) return;
  starsBound = true;

  wrap.addEventListener('mouseover', event => {
    const star = event.target.closest('.star');
    if (!star) return;
    const value = parseInt(star.dataset.v, 10);
    stars.forEach((item, index) => item.classList.toggle('hovered', index < value));
  });

  wrap.addEventListener('mouseleave', () => {
    stars.forEach(star => star.classList.remove('hovered'));
  });

  wrap.addEventListener('click', event => {
    const star = event.target.closest('.star');
    if (!star || !currentGame) return;

    const value = parseInt(star.dataset.v, 10);
    const gameId = currentGame.bl;
    userRatings[gameId] = value;
    writeStoreJson('nx_ratings', userRatings);

    stars.forEach((item, index) => item.classList.toggle('active', index < value));
    if (saved) {
      saved.textContent = 'Saved';
      saved.classList.add('show');
      setTimeout(() => saved.classList.remove('show'), 2000);
    }

    const card = document.querySelector(`.gcard[data-id="${cssIdent(gameId)}"]`);
    if (card) {
      card.classList.add('rated');
      const starEl = card.querySelector('.card-user-star');
      if (starEl) starEl.textContent = '*'.repeat(value);
    }

    showToast(`Rated ${value}/5`);
  });
}

const ICONS = {
  re: 'RE', gta: 'GTA', hit: '47', tr: 'TR', mp: 'MP', forza: 'FH',
  mafia: 'MF', witcher: 'TW', ac: 'AC', fc: 'FC', rdr: 'RDR', souls: 'DS'
};

function svgCover(game) {
  const uid = _s(game.bl).replace(/[^a-zA-Z0-9]/g, '');
  const c1 = safeCss(game.ca, '#00f5ff');
  const c2 = safeCss(game.ca2, '#bf00ff');
  return `<svg viewBox="0 0 200 267" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
    <defs><linearGradient id="sg${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}" stop-opacity=".8"/>
      <stop offset="100%" stop-color="${c2}" stop-opacity="1"/>
    </linearGradient></defs>
    <rect width="200" height="267" fill="url(#sg${uid})"/>
    <rect width="200" height="267" fill="black" fill-opacity=".42"/>
    <circle cx="100" cy="92" r="50" fill="none" stroke="${c1}" stroke-opacity=".28" stroke-width="1.5"/>
    <text x="100" y="107" text-anchor="middle" font-family="monospace" font-size="32" fill="#fff">${_s(ICONS[game.s] || 'NG')}</text>
    <rect x="10" y="185" width="180" height="1" fill="${c1}" fill-opacity=".55"/>
    <text x="14" y="205" font-family="monospace" font-size="9" fill="${c1}" font-weight="bold">${_s(game.bl)}</text>
    <rect width="200" height="267" fill="none" stroke="${c1}" stroke-opacity=".18" stroke-width="1.5"/>
  </svg>`;
}

function setCover(element, game, className) {
  const src = COVERS[game.img];
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = game.t;
    if (className) img.className = className;
    element.innerHTML = '';
    element.appendChild(img);
  } else {
    element.innerHTML = svgCover(game);
  }
}

function openDetail(game) {
  currentGame = game;

  const lp = document.getElementById('listPage');
  const dp = document.getElementById('detailPage');
  const meta = getMeta(game.s);
  const download = getDownloadState(game);
  const fit = getPcFit(game);
  const src = COVERS[game.img];

  const bgEl = document.getElementById('dpBg');
  if (src) {
    bgEl.style.backgroundImage = `url("${src}")`;
    bgEl.style.background = '';
  } else {
    bgEl.style.backgroundImage = '';
    bgEl.style.background = `linear-gradient(135deg,${safeCss(game.ca,'#00f5ff')},${safeCss(game.ca2,'#bf00ff')})`;
  }

  setCover(document.getElementById('dpCvr'), game);

  const seriesLabel = document.getElementById('dpSeries');
  seriesLabel.textContent = meta.label;
  seriesLabel.style.color = safeCss(meta.color, '#00f5ff');
  document.getElementById('dpTitle').textContent = game.t;
  document.getElementById('dpRat').innerHTML = `* ${_s(game.r)}<span> / 10</span>`;

  const tagsEl = document.getElementById('dpTags');
  tagsEl.innerHTML = '';
  [
    { l: download.label, c: download.ok ? 'rgba(0,255,136,.25)' : 'rgba(255,180,0,.22)' },
    { l: fit.label, c: fit.level === 'hard' ? 'rgba(255,0,110,.22)' : 'rgba(0,245,255,.20)' },
    ...(game.tags || [])
  ]
    .forEach(tag => {
      const el = document.createElement('span');
      el.className = 'dp-tag';
      const bg = safeCss(tag.c, 'rgba(255,255,255,.1)');
      el.style.background = bg;
      el.style.color = bg.includes('rgba(255,255,255') ? 'rgba(255,255,255,.72)' : '#fff';
      el.textContent = tag.l;
      tagsEl.appendChild(el);
    });

  document.getElementById('dpDesc').textContent = game.desc;
  document.getElementById('dpInfo').innerHTML = [
    ['Developer', game.dev], ['Publisher', game.pub],
    ['Release', game.y], ['Genre', game.g],
    ['Platforms', game.platform], ['Modes', game.modes],
    ['Download size', game.sz], ['Rating', `${game.r} / 10`],
    ['Series', meta.label], ['Link status', download.label],
    ['PC match', fit.label], ['Demand', `${getGameDemand(game).toFixed(1)} / 5.6`],
  ].map(([label, value]) =>
    `<div class="ic"><div class="ic-lbl">${_s(label)}</div><div class="ic-val">${_s(value)}</div></div>`
  ).join('');

  document.getElementById('dpReq').innerHTML = `
    <div class="req-box req-min"><div class="req-ttl">Minimum</div>
      ${REQ_ROWS.map(([label,key]) => `<div class="rr"><span class="rk">${_s(label)}</span><span class="rv">${_s(game.req.min[key])}</span></div>`).join('')}
    </div>
    <div class="req-box req-rec"><div class="req-ttl">Recommended</div>
      ${REQ_ROWS.map(([label,key]) => `<div class="rr"><span class="rk">${_s(label)}</span><span class="rv">${_s(game.req.rec[key])}</span></div>`).join('')}
    </div>`;

  document.getElementById('dpDlName').textContent = game.t;
  document.getElementById('dpDlSz').textContent = `File size: ${game.sz}`;

  const progress = document.getElementById('dpProg');
  const button = document.getElementById('dpDlBtn');
  const warning = document.querySelector('.dl-warn');
  clearInterval(dlTimer);
  progress.classList.remove('on');
  document.getElementById('dpBar').style.width = '0%';
  document.getElementById('dpPct').textContent = '0%';
  button.style.display = '';
  button.disabled = !download.ok;
  button.classList.toggle('disabled', !download.ok);
  button.textContent = download.ok ? 'Download via Torrent' : 'Link pending review';
  if (warning) {
    warning.textContent = download.ok
      ? 'Install qBittorrent or uTorrent before opening the torrent link.'
      : 'This recently-added series still has a placeholder link. Add a real BTIH hash to enable it.';
  }
  button.onclick = () => startDL(game);
  document.getElementById('dpCancelBtn').onclick = cancelDL;

  initStars(game.bl);

  lp.classList.add('out');
  dp.classList.remove('hidden');
  requestAnimationFrame(() => dp.classList.add('in'));
  dp.scrollTop = 0;
}

function goBack() {
  document.getElementById('detailPage').classList.remove('in');
  document.getElementById('listPage').classList.remove('out');
  setTimeout(() => document.getElementById('detailPage').classList.add('hidden'), 460);
  clearInterval(dlTimer);
}

function startDL(game) {
  const download = getDownloadState(game);
  if (!download.ok) {
    showToast('Download link is pending review');
    return;
  }

  if (game.torrentFile) {
    const link = document.createElement('a');
    link.href = `torrents/${game.torrentFile}`;
    link.download = game.torrentFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Torrent file download started');
    return;
  }

  const progress = document.getElementById('dpProg');
  const bar = document.getElementById('dpBar');
  const pct = document.getElementById('dpPct');
  const button = document.getElementById('dpDlBtn');
  progress.classList.add('on');
  button.style.display = 'none';

  let value = 0;
  clearInterval(dlTimer);
  dlTimer = setInterval(() => {
    value += Math.random() * 5 + 2;
    if (value >= 100) {
      value = 100;
      clearInterval(dlTimer);
      bar.style.width = '100%';
      pct.textContent = '100%';
      setTimeout(() => {
        progress.classList.remove('on');
        button.style.display = '';
        showToast('Opening torrent client...');
        window.location.href = game.mag;
      }, 500);
      return;
    }
    bar.style.width = `${value}%`;
    pct.textContent = `${Math.floor(value)}%`;
  }, 35);
}

function cancelDL() {
  clearInterval(dlTimer);
  document.getElementById('dpProg').classList.remove('on');
  document.getElementById('dpDlBtn').style.display = '';
  document.getElementById('dpBar').style.width = '0%';
  document.getElementById('dpPct').textContent = '0%';
}

function buildCard(game, delay) {
  const card = document.createElement('div');
  const tag = (game.tags && game.tags[0]) || { l: game.bl, c: game.ca };
  const src = COVERS[game.img];
  const rating = userRatings[game.bl] || 0;
  const download = getDownloadState(game);
  const fit = getPcFit(game);
  const tagColor = safeCss(tag.c, 'rgba(255,255,255,.1)');

  card.className = `gcard ca ${download.ok ? '' : 'needs-link'}`;
  card.style.animationDelay = `${delay}ms`;
  card.style.setProperty('--ca', safeCss(game.ca, '#00f5ff'));
  card.dataset.id = game.bl;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open ${game.t}`);
  if (rating) card.classList.add('rated');

  const coverHtml = src
    ? `<img src="${src}" alt="${_s(game.t)}" class="cover-img" loading="lazy">`
    : `<div style="position:absolute;inset:0">${svgCover(game)}</div>`;

  card.innerHTML = `
    <div class="gc-inner">
      <div style="position:absolute;inset:0;overflow:hidden">${coverHtml}</div>
      <div class="grad-top"></div><div class="grad"></div>
      <div class="yr">${_s(game.y)}</div>
      <div class="badge" style="background:${tagColor};color:${tagColor.includes('rgba(255,255,255')?'rgba(255,255,255,.7)':'#fff'}">${_s(game.bl)}</div>
      <div class="dl-state ${download.cls}">${_s(download.label)}</div>
      <div class="pc-fit ${fit.level}">${_s(fit.label)}</div>
      <div class="card-user-star">${rating ? '*'.repeat(rating) : ''}</div>
      <div class="cinfo">
        <div class="cgenre">${_s(game.g)}</div>
        <div class="ctitle">${_s(game.t)}</div>
        <div class="crat">* ${_s(game.r)}</div>
        <div class="hint">Open details</div>
      </div>
    </div>`;

  if (canAnimate()) {
    let raf = null;
    card.addEventListener('mousemove', event => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const rx = ((event.clientY - rect.top) / rect.height - .5) * -12;
        const ry = ((event.clientX - rect.left) / rect.width - .5) * 14;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
        card.style.transition = 'transform .06s linear';
        raf = null;
      });
    });
    card.addEventListener('mouseleave', () => {
      raf = null;
      card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform .45s cubic-bezier(.16,1,.3,1)';
    });
  }

  card.addEventListener('click', () => openDetail(game));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetail(game);
    }
  });

  return card;
}

function render(filter) {
  currentFilter = filter;
  const main = document.getElementById('mainGrid');
  const frag = document.createDocumentFragment();

  main.innerHTML = '';

  const meta = filter === 'all'
    ? { label: 'All Games', color: '#00f5ff' }
    : getMeta(filter);
  const source = filter === 'all'
    ? GAMES
    : GAMES.filter(game => game.s === filter);
  const games = sortGames(applySmartFilters(filterGames(source)));
  const totalShown = games.length;
  const active = games.filter(game => getDownloadState(game).ok).length;
  const label = smartState.collection === 'all'
    ? meta.label
    : `${meta.label} / ${COLLECTION_LABELS[smartState.collection] || 'Collection'}`;

  if (games.length) {
    const block = document.createElement('div');
    block.className = `series-block ${filter === 'all' ? 'unified-library' : 'filtered-library'}`;

    const title = document.createElement('div');
    title.className = 'stitle';
    title.style.setProperty('--sc', safeCss(meta.color, '#00f5ff'));
    title.innerHTML = `${_s(label)}<span class="scnt">${games.length} GAMES / ${active} ACTIVE</span>`;
    block.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'grid';
    games.forEach((game, index) => grid.appendChild(buildCard(game, Math.min(index * 28, 260))));
    block.appendChild(grid);
    frag.appendChild(block);
  }

  if (totalShown === 0) {
    const no = document.createElement('div');
    no.className = 'no-results';
    no.innerHTML = `<span>SEARCH</span>${searchTerm ? `No results for "${_s(searchTerm)}"` : 'No games match these filters'}`;
    frag.appendChild(no);
  }

  main.appendChild(frag);

  const count = document.getElementById('searchCount');
  if (count) count.textContent = (searchTerm || hasSmartFilters()) ? (totalShown ? `${totalShown} results` : 'No results') : '';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function updateStats() {
  const count = document.getElementById('gameCount');
  if (!count) return;

  const active = GAMES.filter(game => getDownloadState(game).ok).length;
  count.textContent = `| ${GAMES.length} GAMES | ${active} ACTIVE`;
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTheme();
  initSearch();
  initSmartControls();
  updateStats();

  document.getElementById('backBtn').addEventListener('click', goBack);
  document.getElementById('navBar').addEventListener('click', event => {
    const button = event.target.closest('.nb');
    if (!button) return;

    document.querySelectorAll('.nb').forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const input = document.getElementById('searchInput');
    if (input.value) {
      input.value = '';
      searchTerm = '';
      document.getElementById('searchClear').classList.remove('visible');
    }
    render(button.dataset.f);
  });

  render('all');
});
