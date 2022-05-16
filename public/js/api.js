class Api {
  #api = undefined;

  constructor() {
    this.#api = axios.create({
      baseURL: window.location.origin,
      withCredentials: true,
    });
    supertokens.addAxiosInterceptors(this.#api);
  }

  #createForm = (email, password) => ({
    formFields: [
      { id: 'email', value: email },
      { id: 'password', value: password },
    ],
  });

  signUp = (email, password) =>
    this.#api.post('/auth/signup', this.#createForm(email, password));

  signIn = (email, password) =>
    this.#api.post('/auth/signin', this.#createForm(email, password));

  signOut = () => this.#api.post('/auth/signout', {});

  checkUsername = (name) => this.#api.post('/checkName', { name: name });

  createUser = (name, id) => this.#api.post('/users', { name: name, id: id });

  updateRole = (name, isModerator, isAdmin) =>
    this.#api.put('/users/' + name + '/role', {
      isModerator: isModerator,
      isAdmin: isAdmin,
    });

  updateBio = (name, bio) =>
    this.#api.put('/users/' + name + '/bio', { bio: bio });

  deleteUser = (name) => this.#api.delete('/users/' + name);

  createChat = (name, description) =>
    this.#api.post('/chats', { name: name, description: description });

  postMessage = (message, chatId) =>
    this.#api.post('/chats/' + chatId, { content: message });

  createCategory = (name, description) =>
    this.#api.post('/categories', { name: name, description: description });
}

const _api = new Api();

function logOut() {
  _api.signOut().then(() => {
    window.location.href = '/';
  });
}
