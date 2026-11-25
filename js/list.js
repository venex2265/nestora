// "List a home": turns the form and the uploaded photos into a new listing.

const MAX_PHOTOS = 4;
let photos = []; // finished photos as data URLs

// Shrinks a photo in the browser so it fits in storage
function resizePhoto(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = function () {
      const image = new Image();
      image.onerror = reject;
      image.onload = function () {
        const scale = Math.min(1, 1100 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function showPreviews() {
  let html = '';
  photos.forEach(function (src, index) {
    html += '<img src="' + src + '" alt="Photo ' + (index + 1) + ' preview">';
  });
  $('#previews').innerHTML = html;
}

$('#photos').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files).filter(function (f) { return f.type.indexOf('image/') === 0; }).slice(0, MAX_PHOTOS);
  if (event.target.files.length > MAX_PHOTOS) showToast('Only the first ' + MAX_PHOTOS + ' photos were used.');

  try {
    photos = await Promise.all(files.map(resizePhoto));
  } catch (error) {
    photos = [];
    showToast('One of those files could not be read as a photo.');
  }
  showPreviews();
});

$('#listForm').addEventListener('submit', function (event) {
  event.preventDefault();

  if (photos.length === 0) {
    showToast('Please add at least one photo.');
    return;
  }

  const features = $('#features').value.split(',').map(function (f) { return escapeHTML(f.trim()); }).filter(Boolean).slice(0, 8);
  const id = Date.now();

  const listing = {
    id: id,
    slug: 'listing-' + id,
    custom: true,
    title: escapeHTML($('#title').value.trim()),
    city: escapeHTML($('#city').value.trim()),
    hood: escapeHTML($('#hood').value.trim() || $('#city').value.trim()),
    address: escapeHTML($('#address').value.trim()),
    type: $('#type').value,
    status: $('#status').value,
    price: Number($('#price').value),
    beds: Number($('#beds').value),
    baths: Number($('#baths').value),
    sqft: Number($('#sqft').value),
    year: Number($('#year').value) || '—',
    parking: 'Ask the owner',
    outdoor: 'See photos',
    palette: 0,
    agent: 0,
    listed: 'Just now',
    tag: 'New',
    featured: false,
    features: features.length ? features : ['Listed by the owner'],
    scores: { walk: 0, transit: 0, school: 0 },
    description: escapeHTML($('#description').value.trim()),
    photos: photos,
    owner: { name: escapeHTML($('#ownerName').value.trim()), phone: $('#ownerPhone').value.trim() },
  };

  try {
    saveCustomListings(getCustomListings().concat(listing));
  } catch (error) {
    showToast('Your browser storage is full. Try fewer or smaller photos.');
    return;
  }

  location.href = 'property.html?id=' + id;
});
