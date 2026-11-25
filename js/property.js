// Single property page: property.html?id=3

const property = findProperty(new URLSearchParams(location.search).get('id'));
const root = $('#property');

function similarHomes(p) {
  return PROPERTIES.filter(function (other) {
    return other.id !== p.id && other.status === p.status;
  }).sort(function (a, b) {
    // Same type first, then closest price
    const typeScore = (b.type === p.type) - (a.type === p.type);
    return typeScore || Math.abs(a.price - p.price) - Math.abs(b.price - p.price);
  }).slice(0, 3);
}

if (!property) {
  root.innerHTML = '<div class="container"><div class="empty glass" style="margin-top:150px"><h3>We could not find that home</h3><p>It may have been sold or rented. Browse our other homes.</p><a class="btn" href="properties.html">See all properties</a></div></div>';
} else {
  const p = property;
  document.title = p.title + ' – Nestora';
  document.body.classList.add('has-mobile-cta');

  root.innerHTML =
    '<section class="page-hero"><div class="container">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="properties.html?status=' + p.status + '">' + (p.status === 'buy' ? 'For sale' : 'For rent') + '</a> / <span>' + p.title + '</span></nav>' +
      '<div class="detail__head"><div><h1>' + p.title + '</h1><div class="place" style="margin-top:10px;font-size:17px">' + icon('pin') + p.address + ', ' + p.hood + ', ' + p.city + '</div></div>' +
      '<div class="price" style="font-size:40px">' + formatPrice(p) + '</div></div>' +
    '</div></section>' +

    '<div class="container detail">' +
      '<div>' + galleryHTML(p) + metaHTML(p) +
        '<div class="detail__block"><h2>About this home</h2><p>' + p.description + '</p></div>' +
        '<div class="detail__block"><h2>Key facts</h2>' + factsHTML(p) + '</div>' +
        '<div class="detail__block"><h2>What it offers</h2>' + chipsHTML(p) + '</div>' +
        (p.custom ? '' : '<div class="detail__block"><h2>The neighbourhood: ' + p.hood + '</h2>' + scoresHTML(p) + '</div>') +
      '</div>' +
      '<aside class="detail__side" id="book">' + paymentHTML(p) + agentHTML(p) + tourFormHTML(p) +
        '<div class="dialog__cta">' + saveButtonHTML(p) + (p.custom ? '<button class="btn btn--ghost" type="button" id="deleteListing">Delete my listing</button>' : '') + '</div></aside>' +
    '</div>' +

    '<section class="section container"><div class="section__head"><h2>You might also like</h2></div>' +
      '<div class="grid">' + cardsHTML(similarHomes(p)) + '</div></section>' +

    '<div class="mobile-cta"><a class="btn btn--ghost" href="tel:+' + agentFor(p).phone.replace(/\D/g, '') + '">' + icon('phone') + 'Call</a><a class="btn" href="#book">Book a tour</a></div>';

  updateSavedUI();

  const deleteButton = $('#deleteListing');
  if (deleteButton) {
    deleteButton.addEventListener('click', function () {
      if (!confirm('Delete this listing? This cannot be undone.')) return;
      saveCustomListings(getCustomListings().filter(function (item) { return item.id !== p.id; }));
      location.href = 'properties.html';
    });
  }
}
