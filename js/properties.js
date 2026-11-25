// Properties page: filters + results. Filters can be pre-filled from the address bar (?status=rent&q=Miami).

const PRICE_OPTIONS = {
  buy: [[0, 'Any price'], [400000, 'Up to $400k'], [700000, 'Up to $700k'], [1200000, 'Up to $1.2M'], [2500000, 'Up to $2.5M']],
  rent: [[0, 'Any price'], [2500, 'Up to $2,500'], [3500, 'Up to $3,500'], [5000, 'Up to $5,000']],
};

const params = new URLSearchParams(location.search);

const state = {
  status: params.get('status') === 'rent' ? 'rent' : 'buy',
  query: params.get('q') || '',
  type: params.get('type') || 'all',
  beds: 0,
  maxPrice: Number(params.get('max')) || 0,
  sort: 'featured',
};

function getVisible() {
  const query = state.query.trim().toLowerCase();

  const list = PROPERTIES.filter(function (p) {
    if (p.status !== state.status) return false;
    if (state.type !== 'all' && p.type !== state.type) return false;
    if (p.beds < state.beds) return false;
    if (state.maxPrice > 0 && p.price > state.maxPrice) return false;
    if (query && (p.title + ' ' + p.city + ' ' + p.hood + ' ' + p.address).toLowerCase().indexOf(query) === -1) return false;
    return true;
  });

  if (state.sort === 'low') list.sort(function (a, b) { return a.price - b.price; });
  if (state.sort === 'high') list.sort(function (a, b) { return b.price - a.price; });
  if (state.sort === 'size') list.sort(function (a, b) { return b.sqft - a.sqft; });
  return list;
}

function showPriceOptions() {
  let options = PRICE_OPTIONS[state.status].slice();
  // A price that came from the calculator link gets its own option
  const known = options.some(function (o) { return o[0] === state.maxPrice; });
  if (!known) options.push([state.maxPrice, 'Up to ' + formatMoney(state.maxPrice)]);

  let html = '';
  options.forEach(function (o) { html += '<option value="' + o[0] + '">' + o[1] + '</option>'; });
  $('#maxPrice').innerHTML = html;
  $('#maxPrice').value = state.maxPrice;
}

function showStatus() {
  $$('[data-status]').forEach(function (b) { b.classList.toggle('is-active', b.dataset.status === state.status); });
}

function showResults() {
  const list = getVisible();
  $('#resultCount').textContent = list.length + (list.length === 1 ? ' home' : ' homes') + (state.status === 'buy' ? ' for sale' : ' for rent');

  $('#grid').innerHTML = list.length
    ? cardsHTML(list)
    : '<div class="empty glass"><h3>No homes match yet</h3><p>Try a higher price, fewer filters or another city. Or tell us what you need and we will find it.</p>' +
      '<button class="btn" type="button" id="resetBtn">Clear all filters</button></div>';
}

function resetFilters() {
  state.query = ''; state.type = 'all'; state.beds = 0; state.maxPrice = 0; state.sort = 'featured';
  $('#q').value = ''; $('#type').value = 'all'; $('#beds').value = '0'; $('#sort').value = 'featured';
  showPriceOptions();
  showResults();
}

document.addEventListener('click', function (event) {
  const statusButton = event.target.closest('[data-status]');
  if (statusButton) {
    state.status = statusButton.dataset.status;
    state.maxPrice = 0; // prices are very different for buying and renting
    showStatus(); showPriceOptions(); showResults();
  }
  if (event.target.closest('#resetBtn') || event.target.closest('#clearBtn')) resetFilters();
});

$('#q').addEventListener('input', function (e) { state.query = e.target.value; showResults(); });
$('#type').addEventListener('change', function (e) { state.type = e.target.value; showResults(); });
$('#beds').addEventListener('change', function (e) { state.beds = Number(e.target.value); showResults(); });
$('#maxPrice').addEventListener('change', function (e) { state.maxPrice = Number(e.target.value); showResults(); });
$('#sort').addEventListener('change', function (e) { state.sort = e.target.value; showResults(); });

$('#q').value = state.query;
$('#type').value = state.type;
showStatus();
showPriceOptions();
showResults();
