class Api {
  #api = undefined;

  constructor() {
    this.#api = axios.create({
      baseURL: 'http://localhost:4000',
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

  checkUsername = (name) => this.#api.post('/checkname', { name: name });

  createUser = (name, id) => this.#api.post('/user', { name: name, id: id });

  updateRole = (name, isModerator, isAdmin) =>
    this.#api.put('/user/' + name + '/role', {
      isModerator: isModerator,
      isAdmin: isAdmin,
    });

  updateBio = (name, bio) =>
    this.#api.put('/user/' + name + '/profile', { bio: bio });
}

const _api = new Api();
