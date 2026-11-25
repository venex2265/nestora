// Small helpers used on every page.

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

const moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function formatMoney(amount) {
  return moneyFormat.format(amount);
}

// "$565,000" for sale, "$3,900 /mo" for rent
function formatPrice(p) {
  return p.status === 'rent' ? formatMoney(p.price) + ' <small>/mo</small>' : formatMoney(p.price);
}

function icon(name) {
  return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
}

function findProperty(id) {
  return PROPERTIES.find(function (p) { return p.id === Number(id); });
}

function todayISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// Standard mortgage formula
function monthlyPayment(loan, yearlyRatePercent, years) {
  const months = years * 12;
  const rate = yearlyRatePercent / 100 / 12;
  if (rate === 0) return loan / months;
  const growth = Math.pow(1 + rate, months);
  return (loan * rate * growth) / (growth - 1);
}

/* ---------- Saved homes (kept in the browser) ---------- */

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('nestora:favorites')) || [];
  } catch (error) {
    return [];
  }
}

function isSaved(id) {
  return getFavorites().includes(Number(id));
}

function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ---------- Enquiries (demo inbox) ---------- */

function getEnquiries() {
  try {
    return JSON.parse(localStorage.getItem('nestora:enquiries')) || [];
  } catch (error) {
    return [];
  }
}

/* ---------- Homes listed by visitors on list.html ---------- */

function saveCustomListings(list) {
  localStorage.setItem('nestora:custom', JSON.stringify(list));
}

function getCustomListings() {
  try {
    return JSON.parse(localStorage.getItem('nestora:custom')) || [];
  } catch (error) {
    return [];
  }
}

// They join the built-in homes, so every page (search, cards, details) treats them the same
getCustomListings().forEach(function (p) { PROPERTIES.push(p); });
