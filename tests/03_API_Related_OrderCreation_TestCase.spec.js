import { test, expect, request } from '@playwright/test'
const {API_Utils} = require('./utils/API_Utils')

const LocatorsUsed = {

    waitForItemNameDisplay: '//div/h2',
    waitForCartLoading: '//button/label',
    waitForPayment: "//div[starts-with(text(),' Payment Method ')]",
    waitForOrder: "//h1[starts-with(text(),' Thankyou')]",
    waitForOrderList: "//h1",
    waitForOrderDisplay: "//li/button[contains(text(),' ORDERS')]"


}
const loginPayload = {userEmail: "karthiksiddanilearnautomation@gmail.com", userPassword: "TestPassword1"}

//const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}

const orderPayload = {orders:[
    { country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" },
    { country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" },
    { country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }
]};

let response;

test.beforeAll('test before all',async ()=>{

    console.log("coming from before all")

    const apiContext = await request.newContext();

    const APIUtils =new API_Utils (apiContext,loginPayload);
       response =await  APIUtils.createOrder(orderPayload);
  
        
});

test('End_To_End_Framework using the API for Order creation', async ({ page }) => {


    //****************************************************************************** Locators space **********************************************************************************//
    const userName = await page.locator("#userEmail");
    const userPassword = await page.locator('#userPassword');
    const submitBtn = await page.locator('#login');
    const shoppinngItemsList = await page.locator('h5>b');
    const viewButtonShoppingList = await page.locator("//h5/following::button[contains(text(),'View')]");
    const itemNameInViewLandingPage = await page.locator("//div/h2");
    const addToCartInLandingPage = await page.getByRole('button', { name: 'Add to Cart' })
    const cartCountAfterAdding = await page.locator("//button/label");
    const cartInLandingPage = await page.locator("//button[contains(text(),' Cart ')]");

    const checkoutButton = await page.locator("//div/ul/li/button[contains(text(),'Checkout')]");

    const cvvCode = await page.locator("//div[contains(text(),'CVV Code ')]/following::input[@type='text']").first();
    const NameOnCard = await page.locator("//div[contains(text(),'Name')]/following::input[@type='text']").first();
    const EnterCountryDetails = await page.getByPlaceholder('Select Country');
    const selectIndia = await page.locator("//button/span[starts-with(text(),' India')]");
    const placeOrder = await page.locator("//a[contains(text(),'Place Order')]");

    const orderIDsPlaced = await page.locator("//tr[3]/td/label[contains(text,'')]");
    const orderHistoryLink = await page.locator("//td/label[contains(text(),'Orders')]");

    const OrderIdInOrderHistoryPage = await page.locator("//tbody/tr/th");
    const YourOrdersPage = await page.locator("//h1");
    const OrdersLinkOnLandingPage = await page.locator("//li/button[contains(text(),' ORDERS')]");
    const deleteOlderOrderLink = await page.locator("//tbody/tr[1]/td/button[contains(text(),'Delete')]");
    const homeButtonInOrderHistoryPage = await page.locator("//li/button[contains(text(),' HOME')]");

    const signOutButton = await page.getByRole("button",{name :" Sign Out "});

    /****************************************************************************** Locators space **********************************************************************************/



/*
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill('karthiksiddanilearnautomation@gmail.com');
    await userPassword.fill('TestPassword1');
    await submitBtn.click();*/



        
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto('https://rahulshettyacademy.com/client');

    await OrdersLinkOnLandingPage.waitFor();
    await OrdersLinkOnLandingPage.click();
  
  //Get the count of orders available on the orders page
    const countOfOrderPlaced = await orderIDsPlaced.count();
    const orderList = [];

    console.log("order ID's available are : ")
    for (let i = 0; i < countOfOrderPlaced; i++) {
        if (await orderIDsPlaced.nth(i).isVisible()) {

            const orderID = (await orderIDsPlaced.nth(i).textContent()).replace(/\|/g, '').trim();
            orderList.push(orderID)
            console.log(orderID);
        }
    }


    //goto order history page
    //await orderHistoryLink.click();
    console.log('clicked on the order history page');


    await page.waitForLoadState('networkidle');
    await page.waitForSelector(LocatorsUsed.waitForOrderList)

    const OrderIDCount = await OrderIdInOrderHistoryPage.count()

    console.log("order id count " + OrderIDCount)


    console.log("getting the orderID's from your orders page")

    for (let i = 0; i < OrderIDCount; i++) {

        const OrderIdNumberGrabbedFromList = await page.locator("//tbody/tr/th").nth(i);
        const EachOrderIdNumberGrabbedFromList = (await OrderIdNumberGrabbedFromList.textContent()).trim();
        console.log(EachOrderIdNumberGrabbedFromList);        
    }

    await signOutButton.click();
    

})