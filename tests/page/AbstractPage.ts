import {Locator, Page} from "@playwright/test";

export abstract class AbstractPage {
    protected page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }
}

export class BasePage extends AbstractPage {
    url?: string

    constructor(page: Page) {
        super(page);
    }

    async open(url?: string) {
        await this.page.goto(this.url ?? url);
        await this.expectedLoad()
    }

    // @ts-ignore
    expectedLoad(): Promise<void>
}
