// Saved homes page.

function showSaved() {
  const favorites = getFavorites();
  const list = PROPERTIES.filter(function (p) { return favorites.includes(p.id); });

  $('#savedText').textContent = list.length
    ? 'You have saved ' + list.length + (list.length === 1 ? ' home.' : ' homes.') + ' Compare them, then book a tour of your favourites.'
    : 'Tap the heart on any home and it will wait for you here.';

  $('#grid').innerHTML = list.length
    ? cardsHTML(list)
    : '<div class="empty glass"><h3>No saved homes yet</h3><p>Browse our homes and save the ones you love.</p><a class="btn" href="properties.html">Browse properties</a></div>';
}

document.addEventListener('favorites-changed', showSaved);
showSaved();
