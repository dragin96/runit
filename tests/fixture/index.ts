import {mergeTests, Page, test as base} from '@playwright/test';
import {Application} from "../page/Application";
import {RegisterData, SignupPage} from "../page/SignupPage";
import {faker} from "@faker-js/faker";

export const registerUser = base.extend<{
    page: Page,
    userData?: RegisterData
}>({
    page: async ({ page }, use) => {
        const users = {
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: '12344321',
        }
        const signupPage = new SignupPage(page);
        // todo: перейти на апи
        await signupPage.open();
        await signupPage.register(users);
        await use(page);
    },
});

export const injectPO = base.extend<{app: Application}>({
    app: async ({page}, use) => {
        const app = new Application(page);
        await use(app);
    }
})

export const test = mergeTests(registerUser, injectPO);


export { expect } from '@playwright/test';
