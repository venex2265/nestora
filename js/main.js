// Behaviour shared by every page: clicks, saved homes, forms, toast, header.

let toastTimer = null;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.hidden = true; }, 3600);
}

function updateSavedUI() {
  const favorites = getFavorites();

  $$('[data-action="toggle-save"]').forEach(function (button) {
    const saved = favorites.includes(Number(button.dataset.id));
    button.classList.toggle('is-saved', saved);
    button.setAttribute('aria-pressed', String(saved));
  });
  $$('.js-saved-count').forEach(function (el) { el.textContent = favorites.length; });
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(function (savedId) { return savedId !== id; });
    showToast('Removed from saved homes');
  } else {
    favorites.push(id);
    showToast('Saved! Find it any time under “Saved”.');
  }
  try {
    localStorage.setItem('nestora:favorites', JSON.stringify(favorites));
  } catch (error) {
    // Storage can be blocked (private mode); the page still works for this visit.
  }
  updateSavedUI();
  document.dispatchEvent(new Event('favorites-changed')); // pages like "Saved" redraw themselves
}

function handleAction(button) {
  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === 'toggle-save') {
    toggleFavorite(id);
  } else if (action === 'quick-view') {
    showDetails(findProperty(id));
  } else if (action === 'close-dialog') {
    $('#dialog').close();
  } else if (action === 'gallery') {
    // Swap the big picture to the thumbnail that was clicked
    const gallery = button.closest('.gallery');
    gallery.querySelector('.gallery__main').innerHTML = viewHTML(findProperty(id), Number(button.dataset.view));
    gallery.querySelectorAll('.thumb').forEach(function (thumb) { thumb.classList.toggle('is-active', thumb === button); });
  } else if (action === 'toggle-menu') {
    const open = $('#nav').classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  }
}

document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-action]');
  if (button) {
    handleAction(button);
    return;
  }
  if (event.target === $('#dialog')) $('#dialog').close(); // click on the dark backdrop
  if (event.target.closest('.nav a')) $('#nav').classList.remove('is-open');
});

// Cards are keyboard friendly: Enter opens the quick view
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && event.target.matches('.card__media')) handleAction(event.target);
});

// Down-payment selector inside the details view
document.addEventListener('change', function (event) {
  if (!event.target.matches('.js-down')) return;
  const box = event.target.closest('.payment');
  const p = { price: Number(box.dataset.price) };
  box.querySelector('.js-payment').textContent = formatMoney(monthlyPayment(p.price * (1 - Number(event.target.value) / 100), 6.5, 30));
});

// Reads every field of a form into one object, using each field's label as its name
function collectForm(form) {
  const enquiry = { id: Date.now(), form: form.dataset.kind || 'Enquiry', sent: new Date().toISOString(), fields: {} };
  Array.prototype.forEach.call(form.elements, function (el) {
    const label = el.getAttribute('aria-label') || el.name;
    if (label && el.value && el.type !== 'submit') enquiry.fields[label] = el.value;
  });
  return enquiry;
}

// Sends the enquiry to FORM_ENDPOINT, or (demo mode) saves it in this browser
async function sendEnquiry(enquiry) {
  if (FORM_ENDPOINT) {
    const body = Object.assign({ form: enquiry.form }, enquiry.fields);
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('The server said no');
    return;
  }
  const list = getEnquiries();
  list.push(enquiry);
  localStorage.setItem('nestora:enquiries', JSON.stringify(list));
}

// Every form with data-toast is a real enquiry form
document.addEventListener('submit', async function (event) {
  const form = event.target.closest('form[data-toast]');
  if (!form) return;
  event.preventDefault();

  const button = form.querySelector('[type="submit"]');
  const label = button.textContent;
  button.disabled = true;
  button.textContent = 'Sending…';

  try {
    await sendEnquiry(collectForm(form));
    form.reset();
    if ($('#dialog').open) $('#dialog').close();
    showToast(form.dataset.toast + (FORM_ENDPOINT ? '' : ' (Demo mode: saved in this browser.)'));
  } catch (error) {
    showToast('Sorry, that did not send. Please try again or call us.');
  }

  button.disabled = false;
  button.textContent = label;
});

// If a photo file is missing, fall back to the built-in illustration
document.addEventListener('error', function (event) {
  const img = event.target;
  if (img.tagName !== 'IMG' || !img.dataset.id) return;
  img.outerHTML = propertyArt(findProperty(img.dataset.id), Number(img.dataset.view));
}, true);

window.addEventListener('scroll', function () {
  $('#header').classList.toggle('is-scrolled', window.scrollY > 20);
});

updateSavedUI();
