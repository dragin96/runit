import {BasePage} from "./AbstractPage";
import {expect} from "@playwright/test";

export class LoginPage extends BasePage {
    url = '/signin';
    private loginInput = this.page.getByRole('textbox', { name: 'Email' })
    private passwordInput = this.page.getByRole('textbox', { name: 'Password' })
    private loginButton = this.page.getByTestId('signin-button')

    async expectedLoad(): Promise<void> {
        await expect(this.loginInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectErrorMessage(error: string) {
        await expect(this.page.getByText(error)).toBeVisible();
    }
}
