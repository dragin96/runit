import {BasePage} from "./AbstractPage";
import {Locator, expect} from "@playwright/test";

export enum TypeSnippets {
    js = 'js',
    html = 'html',
    ruby = 'ruby',
    python = 'python',
    php = 'php',
    java = 'java',
}

export class MySnippetsPage extends BasePage {
    url = '/profile'
    private groupSnippets = this.page.locator('.new-snippet')

    private newSnippets: Record<TypeSnippets, Locator> = {
        [TypeSnippets.js]: this.page.getByRole('button', { name: 'JavaScript Create snippet on' }),
        [TypeSnippets.html]: this.page.getByRole('button', { name: 'HTML Create snippet on HTML' }),
        [TypeSnippets.php]: this.page.getByRole('button', { name: 'PHP Create snippet on PHP' }),
        [TypeSnippets.ruby]: this.page.getByRole('button', { name: 'Ruby Create snippet on Ruby' }),
        [TypeSnippets.java]: this.page.getByRole('button', { name: 'Java Create snippet on Java' }),
        [TypeSnippets.python]: this.page.getByRole('button', { name: 'Python Create snippet on Python' }),
    }

    async create(type: TypeSnippets) {
        await this.newSnippets[type].click();
    }

    async expectedLoad(): Promise<void> {
        await expect(this.groupSnippets).toBeVisible()
    }

    async expectedUserName(userName: string) {
        const userNameLocator =  this.page.getByRole('heading', { name: userName })
        await expect(userNameLocator).toBeVisible();
    }
}
