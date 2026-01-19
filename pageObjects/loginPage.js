class LoginPage {

    constructor(page) {

        this.page = page;
        this.email = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");
        this.signInButton = page.getByRole("button", { name: 'Login' });

    }

    async goToURL(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
module.exports = {LoginPage};

