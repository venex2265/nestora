// Fills in the content blocks marked with data-render="..." in the HTML pages.

const renderers = {
  // Big picture on the home page
  'hero-visual': function () {
    const p = PROPERTIES[0];
    return '<div class="hero__art">' + viewHTML(p, 0) + '</div>' +
      '<div class="float glass"><span class="float__icon">' + icon('shield') + '</span><div><strong>Verified homes</strong><small>Checked by our team</small></div></div>' +
      '<a class="float float--bottom glass" href="property.html?id=' + p.id + '"><div><strong>' + p.title + '</strong><small>' + formatMoney(p.price) + ' · ' + p.hood + '</small></div>' + icon('arrow') + '</a>';
  },

  featured: function () {
    return cardsHTML(PROPERTIES.filter(function (p) { return p.featured; }).slice(0, 3));
  },

  cities: function () {
    let html = '';
    ['Miami', 'Austin', 'Los Angeles', 'New York'].forEach(function (name) {
      const homes = PROPERTIES.filter(function (p) { return p.city.indexOf(name) === 0; });
      html += '<a class="city" href="properties.html?q=' + encodeURIComponent(name) + '&status=' + homes[0].status + '">' + viewHTML(homes[0], 0) +
        '<div class="city__label"><strong>' + name + '</strong><small>' + homes.length + ' homes</small></div></a>';
    });
    return html;
  },

  testimonials: function () {
    let html = '';
    TESTIMONIALS.forEach(function (t) {
      html += '<figure class="quote glass" style="margin:0"><div class="stars">' + icon('star').repeat(5) + '</div><p>“' + t.text + '”</p>' +
        '<footer><span class="avatar" style="background:' + t.color + '">' + t.initials + '</span><div><strong>' + t.name + '</strong><small>' + t.place + '</small></div></footer></figure>';
    });
    return html;
  },

  faq: function () {
    let html = '';
    FAQS.forEach(function (item, index) {
      html += '<details' + (index === 0 ? ' open' : '') + '><summary>' + item.q + '</summary><p>' + item.a + '</p></details>';
    });
    return html;
  },

  team: function () {
    let html = '';
    AGENTS.forEach(function (a) {
      const digits = a.phone.replace(/\D/g, '');
      html += '<article class="member glass"><span class="avatar" style="background:' + a.color + '">' + a.initials + '</span>' +
        '<h3>' + a.name + '</h3><small>' + a.role + '</small><p>' + a.bio + '</p><p><b>' + a.sold + '</b></p>' +
        '<div class="agent__links"><a class="round" href="tel:+' + digits + '" aria-label="Call ' + a.name + '">' + icon('phone') + '</a>' +
        '<a class="round" href="mailto:' + a.name.split(' ')[0].toLowerCase() + '@nestora.example" aria-label="Email ' + a.name + '">' + icon('mail') + '</a></div></article>';
    });
    return html;
  },

  'about-art': function () {
    return propertyArt(PROPERTIES[1], 0);
  },
};

$$('[data-render]').forEach(function (element) {
  const render = renderers[element.dataset.render];
  if (render) element.innerHTML = render();
});
