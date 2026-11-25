// HTML builders for property cards and for the details (used in the pop-up and on the full page).

// The person to contact: a built-in agent, or the owner who listed the home
function agentFor(p) {
  if (p.owner) {
    const initials = p.owner.name.split(' ').map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
    return { name: p.owner.name, phone: p.owner.phone, initials: initials, color: '#14b8a6' };
  }
  return AGENTS[p.agent];
}

function heartButton(p) {
  const saved = isSaved(p.id);
  return '<button class="heart' + (saved ? ' is-saved' : '') + '" type="button" data-action="toggle-save" data-id="' + p.id + '" aria-label="Save ' + p.title + '" aria-pressed="' + saved + '">' + icon('heart') + '</button>';
}

function statusLabel(p) {
  return p.status === 'buy' ? 'For sale' : 'For rent';
}

function metaHTML(p) {
  return '<div class="meta"><span>' + icon('bed') + '<b>' + p.beds + '</b> beds</span><span>' + icon('bath') + '<b>' + p.baths + '</b> baths</span><span>' + icon('area') + '<b>' + p.sqft.toLocaleString() + '</b> sqft</span></div>';
}

function agentDot(p) {
  const a = agentFor(p);
  return '<span class="avatar" style="background:' + a.color + '" title="' + a.name + '">' + a.initials + '</span>';
}

function propertyCard(p) {
  return '<article class="card">' +
    '<div class="card__media" data-action="quick-view" data-id="' + p.id + '" role="button" tabindex="0" aria-label="Quick view of ' + p.title + '">' +
      viewHTML(p, 0) +
      '<span class="badge">' + statusLabel(p) + '</span>' +
      (p.tag ? '<span class="badge badge--tag">' + p.tag + '</span>' : '') +
      heartButton(p) +
      '<span class="card__quick">Quick view</span>' +
    '</div>' +
    '<div class="card__body">' +
      '<div class="price">' + formatPrice(p) + '</div>' +
      '<h3 class="card__title"><a href="property.html?id=' + p.id + '">' + p.title + '</a></h3>' +
      '<div class="place">' + icon('pin') + p.hood + ', ' + p.city + '</div>' +
      metaHTML(p) +
      '<div class="card__foot"><span>Listed ' + p.listed.toLowerCase() + '</span>' + agentDot(p) + '</div>' +
    '</div>' +
  '</article>';
}

function cardsHTML(list) {
  let html = '';
  list.forEach(function (p) { html += propertyCard(p); });
  return html;
}

/* ---------- Pieces of the details view ---------- */

function galleryHTML(p) {
  let thumbs = '';
  for (let i = 0; i < viewCount(p); i++) {
    thumbs += '<button class="thumb' + (i === 0 ? ' is-active' : '') + '" type="button" data-action="gallery" data-id="' + p.id + '" data-view="' + i + '" aria-label="Show photo ' + (i + 1) + '">' + viewHTML(p, i) + '</button>';
  }
  return '<div class="gallery"><div class="gallery__stage"><div class="gallery__main">' + viewHTML(p, 0) + '</div>' +
    '<span class="badge">' + statusLabel(p) + '</span>' + heartButton(p) + '</div>' +
    '<div class="gallery__thumbs">' + thumbs + '</div></div>';
}

function factsHTML(p) {
  const facts = [['Year built', p.year], ['Parking', p.parking], ['Outdoor', p.outdoor], ['Listed', p.listed]];
  if (p.status === 'buy') facts[3] = ['Price per sqft', formatMoney(Math.round(p.price / p.sqft))];
  let html = '';
  facts.forEach(function (f) {
    html += '<div class="fact glass-inner"><small>' + f[0] + '</small><b>' + f[1] + '</b></div>';
  });
  return '<div class="facts">' + html + '</div>';
}

function chipsHTML(p) {
  let html = '';
  p.features.forEach(function (f) { html += '<span>' + icon('check') + f + '</span>'; });
  return '<div class="chips">' + html + '</div>';
}

function paymentText(p, downPercent) {
  return formatMoney(monthlyPayment(p.price * (1 - downPercent / 100), 6.5, 30));
}

function paymentHTML(p) {
  if (p.status === 'rent') {
    return '<div class="payment glass-inner"><div class="payment__top">Move-in cost</div>' +
      '<strong>' + formatMoney(p.price * 2) + '</strong><small>First month plus a one-month deposit.</small></div>';
  }
  return '<div class="payment glass-inner" data-price="' + p.price + '">' +
    '<div class="payment__top">Estimated payment' +
      '<select class="js-down" aria-label="Down payment"><option value="10">10% down</option><option value="20" selected>20% down</option><option value="30">30% down</option></select></div>' +
    '<strong><span class="js-payment">' + paymentText(p, 20) + '</span><small> /month</small></strong>' +
    '<small>6.5% rate, 30 years. </small><a class="link-arrow" href="calculator.html?price=' + p.price + '">Customize ' + icon('arrow') + '</a></div>';
}

function agentHTML(p) {
  const a = agentFor(p);
  const digits = a.phone.replace(/\D/g, '');
  const message = encodeURIComponent('Hi ' + a.name.split(' ')[0] + ', I am interested in ' + p.title + ' (' + p.address + ').');
  return '<div class="agent glass-inner"><span class="avatar" style="background:' + a.color + '">' + a.initials + '</span>' +
    '<div class="agent__info"><strong>' + a.name + '</strong><small>Your agent · replies in about 2 hours</small></div>' +
    '<div class="agent__links">' +
      '<a class="round" href="tel:+' + digits + '" aria-label="Call ' + a.name + '">' + icon('phone') + '</a>' +
      '<a class="round" href="https://wa.me/' + digits + '?text=' + message + '" target="_blank" rel="noopener" aria-label="Message ' + a.name + ' on WhatsApp">' + icon('chat') + '</a>' +
    '</div></div>';
}

function tourFormHTML(p) {
  const a = agentFor(p);
  return '<form class="tour glass-inner form" data-kind="Tour request: ' + p.title + '" data-toast="Tour requested for ' + p.title + '. ' + a.name.split(' ')[0] + ' will confirm within 2 hours.">' +
    '<div><h3>Book a free tour</h3><small>No obligation. Cancel any time.</small></div>' +
    '<div class="grid-2"><input class="field" type="text" placeholder="Your name" aria-label="Your name" required><input class="field" type="email" placeholder="Email" aria-label="Email" required></div>' +
    '<div class="grid-2"><input class="field" type="date" min="' + todayISO() + '" aria-label="Preferred date" required>' +
    '<select class="field" aria-label="Preferred time"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>' +
    '<select class="field" aria-label="Tour type"><option>In-person visit</option><option>Video tour</option></select>' +
    '<button class="btn btn--block" type="submit">Request a tour</button></form>';
}

function scoresHTML(p) {
  const rows = [['Walkability', p.scores.walk], ['Transit', p.scores.transit], ['Schools', p.scores.school]];
  let html = '';
  rows.forEach(function (r) {
    html += '<div class="score"><span>' + r[0] + '</span><div class="bar"><span style="width:' + r[1] + '%"></span></div><b>' + r[1] + '</b></div>';
  });
  return '<div class="scores">' + html + '</div>';
}

function saveButtonHTML(p) {
  const saved = isSaved(p.id);
  return '<button class="btn btn--ghost' + (saved ? ' is-saved' : '') + '" type="button" data-action="toggle-save" data-id="' + p.id + '" aria-pressed="' + saved + '">' +
    icon('heart') + '<span class="when-off">Save home</span><span class="when-on">Saved</span></button>';
}

/* ---------- Quick view pop-up ---------- */

function showDetails(p) {
  const dialog = $('#dialog');
  dialog.innerHTML =
    '<button class="dialog__close" type="button" data-action="close-dialog" aria-label="Close">' + icon('x') + '</button>' +
    '<div class="dialog__body">' +
      '<div>' + galleryHTML(p) +
        '<p class="dialog__desc">' + p.description + '</p>' + chipsHTML(p) +
        '<div class="dialog__cta"><a class="btn btn--ghost" href="property.html?id=' + p.id + '">See full details ' + icon('arrow') + '</a>' + saveButtonHTML(p) + '</div>' +
      '</div>' +
      '<div>' +
        '<div class="dialog__top"><span class="pill">' + p.type + '</span>' + (p.tag ? '<span class="tag">' + p.tag + '</span>' : '') + '</div>' +
        '<h2>' + p.title + '</h2>' +
        '<div class="place">' + icon('pin') + p.address + ', ' + p.city + '</div>' +
        '<div class="price" style="margin-top:14px">' + formatPrice(p) + '</div>' +
        metaHTML(p) + factsHTML(p) + paymentHTML(p) + agentHTML(p) + tourFormHTML(p) +
      '</div>' +
    '</div>';

  if (!dialog.open) dialog.showModal();
}
