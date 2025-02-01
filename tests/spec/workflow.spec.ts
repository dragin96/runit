import {expect, test} from '../fixture';
import {TypeSnippets} from "../page/MySnippetsPage";

/* TODO: Тесты каждый раз создают пользователя в приложении,все должно происходит в тестовом окружении */

const listTestCase = [
    {
        title: 'Add and check JavaScript snippet',
        button: TypeSnippets.js,
        code: "console.log('Hello');",
        expectedOutput: 'Hello',
    },
    {
        title: 'Add and check PHP snippet',
        button: TypeSnippets.php,
        code: "echo 'Hello';",
        expectedOutput: 'Hello',
    },
    {
        title: 'Add and check Python snippet',
        button: TypeSnippets.python,
        code: "print('Hello')",
        expectedOutput: 'Hello',
    },
    {
        title: 'Add and check Ruby snippet',
        button: TypeSnippets.ruby,
        code: "puts 'Hello'",
        expectedOutput: 'Hello',
    },
    {
        title: 'Add and check Java snippet',
        button: TypeSnippets.java,
        code: 'class Main { \npublic static void main(String[] args) { \n\tSystem.out.println("Hello world");\n}',
        expectedOutput: 'Hello world',
    }
]

test.describe('Check snippets', () => {
    for (const testCase of listTestCase) {
        const {title, code, expectedOutput, button} = testCase;
        test(title, async ({app: {mySnippetsPage, codeEditorPage}}) => {
            await mySnippetsPage.create(button);

            await codeEditorPage.fillCode(code);
            await codeEditorPage.run();

            await codeEditorPage.terminal.expectedOutput(expectedOutput);
        });

    }

    test('Add and check HTML snippet', async ({page, app: {mySnippetsPage, codeEditorPage}}) => {
        const data = {
            code: '<div style="background-color: red">Hello, World!</div>',
        }
        await mySnippetsPage.create(TypeSnippets.html);
        await codeEditorPage.fillCode(data.code);

        // TODO: при проверки рендера, лучше сделать скриншоты
        const locator = page.frameLocator('iframe[title="render"]').getByText('Hello, World!', {exact: true});
        await expect(locator).toHaveCSS('background-color', 'rgb(255, 0, 0)');
    });
});
