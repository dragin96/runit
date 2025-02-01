import {injectPO as test} from "../fixture";
import {faker} from "@faker-js/faker";
import {DEFAULT_PASSWORD, generateSignupData} from "../data/users/auth";

test.describe('Registration and login', () => {
    test('Workflow registration ', async ({app: {login, signup, mySnippetsPage}}) => {
        const signupData = {
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: '12344321',
        }
        await signup.open();

        await signup.register(signupData)

        await login.open();
        await login.login(signupData.email, signupData.password);
        await mySnippetsPage.expectedUserName(signupData.username);
    });
});


test.describe('User Registration & Authentication', () => {
    const invalidDataCases = [
        { title: 'Invalid email format', email: 'test222@.t', username: 'testLogin', password: DEFAULT_PASSWORD, error: 'Incorrect email' },
        { title: 'Password too short', email: faker.internet.email(), username: faker.person.firstName(), password: '1234567', error: 'From 8 to 30 characters' },
        { title: 'Unsupported password characters', email: faker.internet.email(), username: faker.person.firstName(), password: 'Проверка', error: 'Only Latin letters, numbers and punctuation are allowed' },
        { title: 'Username too short', email: faker.internet.email(), username: 'te', password: DEFAULT_PASSWORD, error: 'From 3 to 16 characters' },
        { title: 'Username too long', email: faker.internet.email(), username: 'testLogintestLogintestLogin', password: DEFAULT_PASSWORD, error: 'From 3 to 16 characters\n' },
    ];

    for (const { title, email, username, password, error } of invalidDataCases) {
        test(`Unable to register - ${title}`, async ({ app: { signup } }) => {
            await signup.open();

            await signup.register({ email, username, password });

            await signup.expectErrorMessage(error);
        });
    }

    test('Unable to register with an already registered email', async ({ app: { signup, login } }) => {
        const signupData = generateSignupData();
        await signup.open();
        await signup.register(signupData);
        await login.open();
        await login.register(signupData);
        await signup.expectErrorMessage('Этот адрес уже зарегистрирован');
    });
    //
    // test('Successful registration and login', async ({ app: { signup, login, mySnippetsPage } }) => {
    //     const signupData = generateSignupData();
    //     await signup.open();
    //     await signup.register(signupData);
    //     await login.open();
    //     await login.login(signupData.email, signupData.password);
    //     await mySnippetsPage.expectedUserName(signupData.username);
    // });
    //
    // const invalidAuthCases = [
    //     { email: 'invalid_email@test', password: '12344321', error: 'Некорректная электронная почта' },
    //     { email: faker.internet.email(), password: 'wrongpassword', error: 'Неверная электронная почта или пароль' },
    // ];
    //
    // for (const { email, password, error } of invalidAuthCases) {
    //     test(`Unable to authorize with invalid credentials: ${error}`, async ({ app: { signup, login } }) => {
    //         const signupData = generateSignupData();
    //         await signup.open();
    //         await signup.register(signupData);
    //         await login.open();
    //         await login.login(email, password);
    //         await login.expectErrorMessage(error);
    //     });
    // }
});
