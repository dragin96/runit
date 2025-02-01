
class ApiClient {
    private readonly baseURL: string;
    private readonly token: string;
    constructor(baseURL: string, token = '') {
        this.baseURL = baseURL;
        this.token = token;
    }

    async request(method, endpoint, data = null, auth = true) {
        const context = await this.();
        const headers = auth && this.token ? { Authorization: `Bearer ${this.token}` } : {};
        const options = { method, headers };

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.data = JSON.stringify(data);
        }

        const response = await context.fetch(`${this.baseURL}${endpoint}`, options);
        return response;
    }
}

class SnippetsApi extends ApiClient {
    constructor(baseURL, token = '') {
        super(baseURL, token);
    }

    async getAllSnippets() {
        return this.request('GET', '/api/snippets');
    }

    async createSnippet(data) {
        return this.request('POST', '/api/snippets', data);
    }

    async getSnippetByUsernameSlug(username, slug) {
        return this.request('GET', `/api/snippets/${username}/${slug}`);
    }

    async getSnippetById(id) {
        return this.request('GET', `/api/snippets/${id}`);
    }

    async updateSnippet(id, data) {
        return this.request('PUT', `/api/snippets/${id}`, data);
    }

    async deleteSnippet(id) {
        return this.request('DELETE', `/api/snippets/${id}`);
    }
}

class UsersApi extends ApiClient {
    constructor(baseURL, token = '') {
        super(baseURL, token);
    }

    async getAllUsers() {
        return this.request('GET', '/api/users');
    }

    async createUser(data) {
        return this.request('POST', '/api/users', data);
    }

    async getUserProfile() {
        return this.request('GET', '/api/users/profile');
    }

    async getUserById(id) {
        return this.request('GET', `/api/users/${id}`);
    }

    async updateUser(id, data) {
        return this.request('PUT', `/api/users/${id}`, data);
    }

    async deleteUser(id) {
        return this.request('DELETE', `/api/users/${id}`);
    }
}

class AuthApi extends ApiClient {
    constructor(baseURL, token = '') {
        super(baseURL, token);
    }

    async signIn(data) {
        return this.request('POST', '/api/signin', data, false);
    }

    async signOut() {
        return this.request('POST', '/api/signout');
    }

    async oauthLogin(code) {
        return this.request('GET', `/api/oauth?code=${code}`);
    }
}

export { SnippetsApi, UsersApi, AuthApi };
