window.onload = selector();

function selector() {
  window.addEventListener('load', function () {
    let current_page = document.location.pathname.split('/').pop();

    if (current_page === '' || current_page === '') {
      document.getElementById('main-page').className = 'current-page';
    } else if (current_page === 'topics') {
      document.getElementById('forum-page').className = 'current-page';
    } else if (current_page === 'chats') {
      document.getElementById('chat-page').className = 'current-page';
    }
  });
}
