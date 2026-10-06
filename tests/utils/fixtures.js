const base = require('@playwright/test')

const {API_Utils} = require('../utils/API_Utils.js')

const {request} = require('@playwright/test');

const loginPayload = {userEmail: "karthiksiddanilearnautomation@gmail.com", userPassword: "TestPassword1"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}

exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {


            const context = await browser.newContext();
            const page = await context.newPage();
            const userName = await page.locator("#userEmail");
            const userPassword = await page.locator('#userPassword');
            const submitBtn = await page.locator('#login');


            await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
            await userName.fill('karthiksiddanilearnautomation@gmail.com');
            await userPassword.fill('TestPassword1');
            await submitBtn.click();
            await page.waitForLoadState('networkidle');

            await use(page);


        },
        createOrder: async ({ }, use) => {

            const apiContext = await request.newContext();
            const APIUtils = new API_Utils(apiContext, loginPayload);
            let response = await APIUtils.createOrder(orderPayload);
            await use(response);

        }

    }



)
