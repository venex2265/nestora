// Demo inbox: shows the enquiries saved in this browser.

function saveInbox(list) {
  localStorage.setItem('nestora:enquiries', JSON.stringify(list));
}

function showInbox() {
  const list = getEnquiries().slice().reverse(); // newest first
  $('#inboxCount').textContent = list.length + (list.length === 1 ? ' message' : ' messages');
  $('#clearInbox').hidden = list.length === 0;

  if (list.length === 0) {
    $('#inbox').innerHTML = '<div class="empty glass"><h3>Nothing here yet</h3><p>Send a message from the Contact page or book a tour and it will show up here.</p><a class="btn" href="contact.html">Go to Contact</a></div>';
    return;
  }

  let html = '';
  list.forEach(function (item) {
    let rows = '';
    Object.keys(item.fields).forEach(function (key) {
      rows += '<div><dt>' + escapeHTML(key) + '</dt><dd>' + escapeHTML(item.fields[key]) + '</dd></div>';
    });
    html += '<article class="message glass"><div class="message__top"><strong>' + escapeHTML(item.form) + '</strong>' +
      '<span class="muted">' + new Date(item.sent).toLocaleString() + '</span></div><dl>' + rows + '</dl>' +
      '<button class="clear" type="button" data-delete="' + item.id + '" style="margin-top:14px">Delete</button></article>';
  });
  $('#inbox').innerHTML = html;
}

document.addEventListener('click', function (event) {
  const del = event.target.closest('[data-delete]');
  if (del) {
    saveInbox(getEnquiries().filter(function (item) { return item.id !== Number(del.dataset.delete); }));
    showInbox();
  }
  if (event.target.closest('#clearInbox') && confirm('Delete all messages?')) {
    saveInbox([]);
    showInbox();
  }
});

showInbox();
