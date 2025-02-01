import {BasePage} from "./AbstractPage";
import {expect} from "@playwright/test";

export interface RegisterData {
    username: string,
    email: string,
    password: string
}

export class SignupPage extends BasePage {
    url = '/signup';
    private usernameInput = this.page.locator('#username');
    private emailInput = this.page.locator('#email');
    private passwordInput = this.page.locator('#password');
    private registerButton = this.page.locator('.page-wrapper').getByRole('button', { name: 'Sign up'})

    async expectedLoad(): Promise<void> {
        await expect(this.usernameInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.emailInput).toBeVisible()
    }

    async register(data: RegisterData): Promise<void> {
        const  { username, email, password } = data;
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click();
    }

    async expectErrorMessage(error: string) {
        await expect(this.page.locator('.invalid-feedback').getByText(error)).toBeVisible();
    }
}

