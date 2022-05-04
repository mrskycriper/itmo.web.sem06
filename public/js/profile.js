const showEditRole = () => {
  let form = document.getElementById('role-form');
  if (form.style.getPropertyValue('display') === 'none') {
    form.style.setProperty('display', 'block');
  } else {
    form.style.setProperty('display', 'none');
  }
};
const showEditBio = () => {
  let form = document.getElementById('bio-form');
  if (form.style.getPropertyValue('display') === 'none') {
    form.style.setProperty('display', 'block');
  } else {
    form.style.setProperty('display', 'none');
  }
};

window.addEventListener('load', () => {
  let editRole = document.querySelector("button[id='edit-role']");
  if (editRole != null) {
    editRole.onclick = (event) => {
      event.preventDefault();
      showEditRole();
    };
  }
});

window.addEventListener('load', () => {
  let editBio = document.querySelector("button[id='edit-bio']");
  if (editBio != null) {
    editBio.onclick = (event) => {
      event.preventDefault();
      showEditBio();
    };
  }
});

function getRoleData() {
  let isModerator = false;
  let moderatorCheck = document.getElementById('isModerator');
  if (moderatorCheck.checked) {
    isModerator = true;
  }
  let isAdmin = false;
  let adminCheck = document.getElementById('isAdmin');
  if (adminCheck.checked) {
    isAdmin = true;
  }

  return {
    isModerator: isModerator,
    isAdmin: isAdmin,
  };
}

function getBioData() {
  return {
    bio: document.querySelector("textarea[id='bio']").value,
  };
}

const editRole = () => {
  const roleData = getRoleData();
  console.log(roleData);
  const name = document.getElementById('name');
  _api
    .updateRole(name.textContent, roleData.isModerator, roleData.isAdmin)
    .then(() => {
      window.location.reload();
    });
};

const editBio = () => {
  const bioData = getBioData();
  const name = document.getElementById('name');
  _api.updateBio(name.textContent, bioData.bio).then(() => {
    window.location.reload();
  });
};

window.addEventListener('load', () => {
  let roleForm = document.querySelector("form[id='role-form']");
  if (roleForm != null) {
    roleForm.onsubmit = (event) => {
      event.preventDefault();
      editRole();
    };
  }
});

window.addEventListener('load', () => {
  let bioForm = document.querySelector("form[id='bio-form']");
  if (bioForm != null) {
    bioForm.onsubmit = (event) => {
      event.preventDefault();
      editBio();
    };
  }
});
