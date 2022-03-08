window.onload = loadtime();

function loadtime() {
  let initial_timestamp = new Date().getTime();
  window.addEventListener('load', function () {
    let end_timestamp = new Date().getTime();
    let footer = document.getElementById('footer-with-time');
    let tag = document.createElement('p');
    let text = document.createTextNode(
      'Страница загружена за ' + (end_timestamp - initial_timestamp) + ' мс',
    );
    tag.appendChild(text);
    footer.appendChild(tag);
  });
}
