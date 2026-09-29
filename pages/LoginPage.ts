// | HTML Element              | Playwright Role |
// | ------------------------- | --------------- |
// | `<input type="text">`     | `textbox` ✅     |
// | `<input type="password">` | `textbox` ✅     |
// | `<textarea>`              | `textbox` ✅     |
// | `<button>`                | `button`        |
// | `<a>`                     | `link`          |
// | `<input type="checkbox">` | `checkbox`      |
// | `<input type="radio">`    | `radio`         |
// | `<select>`                | `combobox`      |

import {Locator, Page} from "@playwright/test"

export class LoginPage {
    readonly page:Page;

    readonly Loginpage:Locator;
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    readonly logoutButton:Locator;
    readonly ErrorMessage:Locator;

    constructor(page:Page){
        this.page = page;   
        this.Loginpage=page.getByRole('link', { name: 'Log in' });
        this.emailInput=page.locator('#Email');
        this.passwordInput=page.locator('#Password');
        this.loginButton=page.locator("input.button-1.login-button");
        this.logoutButton=page.getByText('Log out');
        this.ErrorMessage=page.getByText('Login was unsuccessful. Please correct the errors and try again.');

    }
    async login (email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}
}