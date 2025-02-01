import {APIRequestContext, Page} from '@playwright/test';
import {ApiFacade} from "../api";
import {AuthResponse} from "../api/AuthAPI";
import {expect} from "@playwright/test"
import {CreateUserDto, User} from "../api/UsersAPI";

export class AuthSteps {
    private api: ApiFacade;
    private readonly request: APIRequestContext;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.request = page.request;
        this.api = new ApiFacade(this.request);
    }

    async signIn(email: string, password: string): Promise<AuthResponse> {
        console.log(`🟢 Вход в систему: ${email}`);
        const res = await this.api.authApi.signIn({email, password});
        expect(res.status).toBe(200)
        return res.data;
    }

    async signUp(data: CreateUserDto): Promise<User> {
        const res = await this.api.usersApi.createUser(data)
        expect(res.status).toBe(201)
        return res.data;
    }

    async signOut(): Promise<void> {
        console.log(`🔴 Выход из системы`);
        await this.page.context().clearCookies();
    }
}
