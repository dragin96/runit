import {BasePage} from "./AbstractPage";
import {expect} from "@playwright/test";

export class LoginPage extends BasePage {
    url = '/signin';
    private loginInput = this.page.locator('#email');
    private passwordInput = this.page.locator('#current-password');
    private loginButton = this.page.locator('#login-button');

    async expectedLoad(): Promise<void> {
        await expect(this.loginInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
