class LoginPage {



    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator('#userPassword');
        this.submitBtn = page.locator('#login');
    }


    async performLoginOperation(userName,password){
    await this.userName.fill(userName);
    await this.userPassword.fill(password);
    await this.submitBtn.click();

    }


    async openLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    }
}

module.exports={LoginPage}