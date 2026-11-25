// Builds the parts every page shares (header, footer, floating button, pop-up, toast),
// so each HTML file only has to hold its own content.

const SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
  '<symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></symbol>' +
  '<symbol id="i-bed" viewBox="0 0 24 24"><path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="1.6"/></symbol>' +
  '<symbol id="i-bath" viewBox="0 0 24 24"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6.5A2.5 2.5 0 0 1 10.3 4.8M7 19l-1 2M17 19l1 2"/></symbol>' +
  '<symbol id="i-area" viewBox="0 0 24 24"><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/></symbol>' +
  '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></symbol>' +
  '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"/></symbol>' +
  '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></symbol>' +
  '<symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>' +
  '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
  '<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></symbol>' +
  '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/></symbol>' +
  '<symbol id="i-video" viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></symbol>' +
  '<symbol id="i-calc" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></symbol>' +
  '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></symbol>' +
  '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>' +
  '<symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></symbol>' +
  '<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></symbol>' +
  '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
  '<symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/></symbol>' +
  '</svg>';

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'properties.html', label: 'Properties' },
  { href: 'calculator.html', label: 'Calculator' },
  { href: 'about.html', label: 'About' },
  { href: 'list.html', label: 'List a home' },
  { href: 'contact.html', label: 'Contact' },
];

function buildLayout() {
  let page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'property.html' || page === 'saved.html') page = 'properties.html';

  let links = '';
  NAV_LINKS.forEach(function (link) {
    links += '<a href="' + link.href + '"' + (link.href === page ? ' class="is-active" aria-current="page"' : '') + '>' + link.label + '</a>';
  });

  const header = '<header class="header" id="header"><div class="container header__inner">' +
    '<a class="logo" href="index.html"><span class="logo__mark">' + icon('home') + '</span>Nestora</a>' +
    '<nav class="nav" id="nav" aria-label="Main navigation">' + links + '</nav>' +
    '<div class="header__actions">' +
      '<a class="glass-btn" href="saved.html">' + icon('heart') + '<span class="label-text">Saved</span> <span class="count js-saved-count">0</span></a>' +
      '<a class="btn btn--sm" href="contact.html">Book a tour</a>' +
      '<button class="menu-btn" type="button" data-action="toggle-menu" aria-label="Open menu" aria-expanded="false">' + icon('menu') + '</button>' +
    '</div></div></header>';

  const footer = '<footer class="footer"><div class="container"><div class="footer__grid">' +
    '<div><a class="logo" href="index.html"><span class="logo__mark">' + icon('home') + '</span>Nestora</a>' +
      '<p class="footer__about">Honest advice, verified homes and local experts who pick up the phone.</p></div>' +
    '<div><h4>Explore</h4><ul><li><a href="properties.html?status=buy">Homes for sale</a></li><li><a href="properties.html?status=rent">Homes for rent</a></li><li><a href="saved.html">Saved homes</a></li><li><a href="calculator.html">Mortgage calculator</a></li><li><a href="list.html">List your home</a></li></ul></div>' +
    '<div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="about.html#team">Our agents</a></li><li><a href="contact.html">Contact</a></li><li><a href="contact.html#faq">FAQ</a></li><li><a href="enquiries.html">Demo inbox</a></li></ul></div>' +
    '<div><h4>Get in touch</h4><ul><li>' + icon('phone') + ' +1 (555) 010-2100</li><li>' + icon('mail') + ' hello@nestora.example</li><li>' + icon('pin') + ' 200 Market Street, Austin, TX</li></ul></div>' +
    '</div><div class="footer__bottom"><span>© ' + new Date().getFullYear() + ' Nestora. A demo project: all listings, agents and reviews are fictional.</span><a href="#top">Back to top</a></div></div></footer>';

  document.body.insertAdjacentHTML('afterbegin', SPRITE + '<div class="glow" aria-hidden="true" id="top"></div>');
  $('#site-header').outerHTML = header;
  $('#site-footer').outerHTML = footer;
  document.body.insertAdjacentHTML('beforeend',
    '<a class="fab" href="contact.html">' + icon('chat') + '<span>Talk to an agent</span></a>' +
    '<dialog class="dialog" id="dialog" aria-label="Property details"></dialog>' +
    '<div class="toast glass" id="toast" role="status" aria-live="polite" hidden></div>');
}

buildLayout();
