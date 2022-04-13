window.onload = selector();

function selector() {
  window.addEventListener('load', function () {
    let currentPage = document.location.pathname.split('/').pop();

    if (currentPage === '') {
      document.getElementById('main-page').className =
        'nav-header__button--current-page';
    } else if (currentPage === 'category') {
      document.getElementById('forum-page').className =
        'nav-header__button--current-page';
    } else if (currentPage === 'chat') {
      document.getElementById('chat-page').className =
        'nav-header__button--current-page';
    }
  });
}
