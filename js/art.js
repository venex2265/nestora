// Built-in illustrations, so the site looks complete before you add photos.
// Each home has 3 views: 0 = outside, 1 = living room, 2 = bedroom.

const PALETTES = [
  { sky1: '#27408b', sky2: '#fbc7d4', wall: '#eef0f8', roof: '#3b4a7a', ground: '#2a3a63', sun: '#ffe2ad' },
  { sky1: '#1e5b6a', sky2: '#a8e0d4', wall: '#f6f1e7', roof: '#9a5632', ground: '#24505a', sun: '#fff0bd' },
  { sky1: '#5b3a9b', sky2: '#ffb88a', wall: '#fff5ec', roof: '#c0503f', ground: '#40306b', sun: '#ffe7c2' },
  { sky1: '#1b6ca8', sky2: '#ffc27a', wall: '#eaf3f5', roof: '#2a5a6b', ground: '#1d4a6e', sun: '#ffdc8f' },
  { sky1: '#2a7a8a', sky2: '#b5e3a8', wall: '#f4f8ef', roof: '#41704f', ground: '#26565f', sun: '#fff4c0' },
];

let artCounter = 0;

function windowGrid(x, y, cols, rows, size, gap, seed) {
  let html = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = (r + c + seed) % 3 !== 0;
      html += '<rect x="' + (x + c * (size + gap)) + '" y="' + (y + r * (size + gap)) + '" width="' + size + '" height="' + size + '" rx="2" fill="' + (lit ? '#ffe9a8' : 'rgba(20,30,60,0.5)') + '"/>';
    }
  }
  return html;
}

function tree(x, y, s) {
  return '<rect x="' + (x - 2 * s) + '" y="' + y + '" width="' + 4 * s + '" height="' + 20 * s + '" fill="#4a3426"/>' +
    '<circle cx="' + x + '" cy="' + (y - 4 * s) + '" r="' + 17 * s + '" fill="#2f7d4f"/>' +
    '<circle cx="' + (x - 6 * s) + '" cy="' + (y - 10 * s) + '" r="' + 11 * s + '" fill="#3f9a62" opacity="0.85"/>';
}

function building(p, c) {
  if (p.type === 'House') {
    return '<rect x="128" y="130" width="144" height="92" fill="' + c.wall + '"/>' +
      '<polygon points="110,134 200,74 290,134" fill="' + c.roof + '"/>' +
      '<rect x="248" y="96" width="14" height="30" fill="' + c.roof + '"/>' +
      '<rect x="188" y="170" width="26" height="52" rx="3" fill="' + c.roof + '"/>' +
      '<rect x="144" y="150" width="30" height="28" rx="2" fill="#ffe9a8"/><rect x="226" y="150" width="30" height="28" rx="2" fill="#ffe9a8"/>' +
      '<rect x="144" y="163" width="30" height="2" fill="' + c.roof + '"/><rect x="226" y="163" width="30" height="2" fill="' + c.roof + '"/>';
  }
  if (p.type === 'Apartment') {
    return '<rect x="140" y="44" width="120" height="178" fill="' + c.wall + '"/>' +
      '<rect x="132" y="38" width="136" height="10" fill="' + c.roof + '"/>' +
      windowGrid(154, 62, 3, 5, 20, 14, p.id) +
      '<rect x="189" y="196" width="22" height="26" fill="' + c.roof + '"/>';
  }
  if (p.type === 'Villa') {
    return '<rect x="62" y="146" width="276" height="76" fill="' + c.wall + '"/>' +
      '<rect x="52" y="134" width="296" height="14" fill="' + c.roof + '"/>' +
      '<rect x="150" y="102" width="100" height="34" fill="' + c.wall + '"/>' +
      '<rect x="140" y="94" width="120" height="10" fill="' + c.roof + '"/>' +
      windowGrid(80, 164, 5, 1, 32, 18, p.id) +
      '<rect x="252" y="160" width="68" height="62" fill="#7fd8ff" opacity="0.7"/>';
  }
  return '<rect x="94" y="74" width="98" height="148" fill="' + c.wall + '"/>' +
    '<rect x="204" y="108" width="102" height="114" fill="' + c.wall + '" opacity="0.94"/>' +
    '<rect x="88" y="68" width="110" height="8" fill="' + c.roof + '"/><rect x="198" y="102" width="114" height="8" fill="' + c.roof + '"/>' +
    windowGrid(106, 90, 3, 4, 18, 12, p.id) + windowGrid(216, 124, 3, 3, 18, 14, p.id + 1);
}

function exteriorArt(p, c, id) {
  return '<defs><linearGradient id="s' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c.sky1 + '"/><stop offset="1" stop-color="' + c.sky2 + '"/></linearGradient></defs>' +
    '<rect width="400" height="300" fill="url(#s' + id + ')"/>' +
    '<circle cx="320" cy="70" r="52" fill="' + c.sun + '" opacity="0.2"/><circle cx="320" cy="70" r="28" fill="' + c.sun + '"/>' +
    '<ellipse cx="90" cy="60" rx="46" ry="11" fill="#fff" opacity="0.5"/><ellipse cx="120" cy="52" rx="30" ry="9" fill="#fff" opacity="0.45"/>' +
    '<path d="M0 205 Q70 150 150 190 T300 175 T400 195 V240 H0z" fill="' + c.ground + '" opacity="0.5"/>' +
    '<rect y="222" width="400" height="78" fill="' + c.ground + '"/>' +
    tree(56, 188, 1.1) + tree(352, 192, 0.95) +
    building(p, c) +
    '<polygon points="190,222 210,222 250,300 150,300" fill="#fff" opacity="0.16"/>';
}

function livingArt(p, c, id) {
  return '<defs><linearGradient id="s' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c.sky1 + '"/><stop offset="1" stop-color="' + c.sky2 + '"/></linearGradient></defs>' +
    '<rect width="400" height="300" fill="' + c.wall + '"/><rect y="215" width="400" height="85" fill="' + c.ground + '"/><rect y="212" width="400" height="5" fill="#fff" opacity="0.5"/>' +
    '<rect x="56" y="36" width="190" height="136" rx="6" fill="url(#s' + id + ')" stroke="#fff" stroke-width="6"/>' +
    '<rect x="70" y="120" width="14" height="52" fill="' + c.roof + '" opacity="0.5"/><rect x="92" y="100" width="18" height="72" fill="' + c.roof + '" opacity="0.5"/><rect x="118" y="128" width="12" height="44" fill="' + c.roof + '" opacity="0.5"/><rect x="170" y="108" width="20" height="64" fill="' + c.roof + '" opacity="0.5"/>' +
    '<line x1="151" y1="36" x2="151" y2="172" stroke="#fff" stroke-width="4"/>' +
    '<rect x="280" y="44" width="92" height="64" rx="4" fill="#fff" stroke="' + c.roof + '" stroke-width="4"/><circle cx="326" cy="76" r="16" fill="' + c.sky2 + '"/><rect x="294" y="92" width="64" height="10" fill="' + c.sky1 + '" opacity="0.6"/>' +
    '<ellipse cx="200" cy="248" rx="140" ry="20" fill="#fff" opacity="0.22"/>' +
    '<rect x="238" y="128" width="140" height="80" rx="18" fill="' + c.roof + '"/><rect x="226" y="156" width="24" height="52" rx="10" fill="' + c.roof + '"/><rect x="366" y="156" width="24" height="52" rx="10" fill="' + c.roof + '"/>' +
    '<rect x="252" y="146" width="48" height="34" rx="10" fill="#fff" opacity="0.22"/><rect x="310" y="146" width="48" height="34" rx="10" fill="#fff" opacity="0.22"/>' +
    '<rect x="126" y="196" width="80" height="14" rx="3" fill="' + c.roof + '" opacity="0.8"/>' +
    '<line x1="28" y1="130" x2="28" y2="215" stroke="#555" stroke-width="3"/><polygon points="14,130 42,130 36,104 20,104" fill="#ffe9a8"/><circle cx="28" cy="122" r="26" fill="#ffe9a8" opacity="0.28"/>' +
    '<rect x="14" y="196" width="26" height="22" rx="3" fill="#fff" opacity="0.0"/>';
}

function bedroomArt(p, c, id) {
  return '<defs><linearGradient id="s' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c.sky1 + '"/><stop offset="1" stop-color="' + c.sky2 + '"/></linearGradient></defs>' +
    '<rect width="400" height="300" fill="' + c.wall + '"/><rect y="220" width="400" height="80" fill="' + c.ground + '"/><rect y="217" width="400" height="5" fill="#fff" opacity="0.5"/>' +
    '<rect x="276" y="44" width="96" height="104" rx="6" fill="url(#s' + id + ')" stroke="#fff" stroke-width="6"/><line x1="324" y1="44" x2="324" y2="148" stroke="#fff" stroke-width="4"/>' +
    '<rect x="64" y="64" width="190" height="84" rx="10" fill="' + c.roof + '"/>' +
    '<rect x="52" y="134" width="214" height="70" rx="12" fill="#fff"/>' +
    '<rect x="52" y="160" width="214" height="44" rx="12" fill="' + c.sky2 + '"/><rect x="52" y="160" width="214" height="10" fill="#fff" opacity="0.35"/>' +
    '<rect x="72" y="116" width="70" height="30" rx="12" fill="#fff" stroke="' + c.roof + '" stroke-opacity="0.2"/><rect x="170" y="116" width="70" height="30" rx="12" fill="#fff" stroke="' + c.roof + '" stroke-opacity="0.2"/>' +
    '<rect x="52" y="204" width="12" height="16" fill="' + c.roof + '"/><rect x="254" y="204" width="12" height="16" fill="' + c.roof + '"/>' +
    '<rect x="284" y="160" width="62" height="60" rx="6" fill="' + c.roof + '"/><rect x="292" y="170" width="46" height="4" fill="#fff" opacity="0.35"/>' +
    '<polygon points="298,160 332,160 326,132 304,132" fill="#ffe9a8"/><circle cx="315" cy="150" r="28" fill="#ffe9a8" opacity="0.3"/>' +
    '<ellipse cx="170" cy="262" rx="140" ry="18" fill="#fff" opacity="0.2"/>' +
    '<rect x="20" y="52" width="90" height="46" rx="4" fill="#fff" opacity="0.0"/>';
}

// view: 0, 1 or 2
function propertyArt(p, view) {
  const c = PALETTES[p.palette];
  const id = ++artCounter;
  const scenes = [exteriorArt, livingArt, bedroomArt];
  const labels = ['exterior', 'living room', 'bedroom'];

  return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + p.title + ', ' + labels[view] + '">' + scenes[view](p, c, id) + '</svg>';
}

// Homes listed by visitors carry their own photos; built-in homes have 3 views
function viewCount(p) {
  return p.photos && p.photos.length ? p.photos.length : 3;
}

// What to show for one view of a home: the visitor's photo, a file photo if USE_PHOTOS is on, or the illustration
function viewHTML(p, view) {
  if (p.photos && p.photos.length) {
    return '<img src="' + p.photos[view] + '" alt="' + p.title + ', photo ' + (view + 1) + '">';
  }
  if (USE_PHOTOS) {
    return '<img src="assets/images/' + p.slug + '-' + (view + 1) + '.jpg" alt="' + p.title + '" loading="lazy" data-id="' + p.id + '" data-view="' + view + '">';
  }
  return propertyArt(p, view);
}
