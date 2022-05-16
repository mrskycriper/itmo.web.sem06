function getMessageData() {
  return {
    message: document.querySelector("textarea[id='message']").value,
    chatId: Number.parseInt(window.location.pathname.split('/')[2]),
  };
}

function handlePostMessage() {
  const formData = getMessageData();
  _api.postMessage(formData.message, formData.chatId);
}

window.addEventListener('load', () => {
  let form = document.querySelector("form[id='post-message']");
  form.onsubmit = (event) => {
    event.preventDefault();
    handlePostMessage();
  };
});
