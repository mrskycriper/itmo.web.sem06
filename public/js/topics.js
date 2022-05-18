function showCreateTopic() {
  let form = document.getElementById('create-category');
  if (form.style.getPropertyValue('display') === 'none') {
    form.style.setProperty('display', 'block');
  } else {
    form.style.setProperty('display', 'none');
  }
}

function getTopicData() {
  return {
    name: document.querySelector("input[id='name']").value,
    description: document.querySelector("textarea[id='description']").value,
  };
}

function handleCreateTopic() {
  const formData = getCategoryData();

  _api.createCategory(formData.name, formData.description).then((response) => {
    if (response.data.categoryId !== null) {
      window.location.href = '/categories/' + response.data.categoryId;
    } else {
      window.location.href = '/categories?page=1';
    }
  });
}

window.addEventListener('load', () => {
  let form = document.querySelector("form[id='create-topic']");
  form.onsubmit = (event) => {
    event.preventDefault();
    handleCreateTopic();
  };
});
