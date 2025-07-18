document.addEventListener('DOMContentLoaded', () => {
  const adminLink = document.getElementById('admin-panel');
  adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    const password = prompt('رمز پنل ادمین را وارد کنید:');
    if (password === 'Adminam17salame!') {
      window.location.href = '/admin';
    } else {
      alert('رمز اشتباه است! به صفحه اصلی برمی‌گردید.');
      window.location.href = '/';
    }
  });

  fetch('/api/content')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('poster-container');
      data.forEach((item, index) => {
        const row = Math.floor(index / 5);
        if (index % 5 === 0) {
          container.innerHTML += `<div class="row"></div>`;
        }
        const rowDiv = container.lastElementChild;
        rowDiv.innerHTML += `<div class="col"><img src="${item.poster}" class="poster" onclick="window.location.href='/movie/${item._id}'"></div>`;
      });
    });
});