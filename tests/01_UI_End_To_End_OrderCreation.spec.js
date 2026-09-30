import { test, expect } from '@playwright/test'


const LocatorsUsed = {

    waitForItemNameDisplay: '//div/h2',
    waitForCartLoading: '//button/label',
    waitForPayment: "//div[starts-with(text(),' Payment Method ')]",
    waitForOrder: "//h1[starts-with(text(),' Thankyou')]",
    waitForOrderList: "//h1",
    waitForOrderDisplay: "//li/button[contains(text(),' ORDERS')]"


}

test('End_To_End_Framework', async ({ page }) => {

    /****************************************************************************** Locators space **********************************************************************************/
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

    /****************************************************************************** Locators space **********************************************************************************/


      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill('karthiksiddanilearnautomation@gmail.com');
    await userPassword.fill('TestPassword1');
    await submitBtn.click();

    await OrdersLinkOnLandingPage.waitFor();
    
    await page.waitForLoadState('networkidle');

    await shoppinngItemsList.last().waitFor();


    const countOfItems = await shoppinngItemsList.count();
    const ItemsList = [];

    console.log('items available are : ')
    for (let i = 0; i < countOfItems; i++) {
        if (await shoppinngItemsList.nth(i).isVisible()) {

            const itemName = (await shoppinngItemsList.nth(i).textContent()).trim();
            ItemsList.push(itemName)
            console.log(itemName);
        }
    }


    //Verify the each landing page of the item


    for (let i = 0; i < ItemsList.length; i++) {
        await viewButtonShoppingList.nth(i).click();
        console.log('click on the view for item ' + (i + 1))
        await page.waitForSelector(LocatorsUsed.waitForItemNameDisplay);
        const ItemNameDisplayed = (await itemNameInViewLandingPage.textContent()).trim();
        expect(ItemsList).toContain(ItemNameDisplayed)
        console.log('verified the ' + ItemNameDisplayed)
        await addToCartInLandingPage.click()
        console.log('item added to cart is ' + ItemNameDisplayed)
        await page.goBack();
    }

    //Verifying the cart after adding the items

    await page.waitForSelector(LocatorsUsed.waitForCartLoading, { delay: 1000 });
    const countInCart = Number(await cartCountAfterAdding.textContent());
    console.log('items count present in cart after adding items is ' + countInCart)
    expect(countInCart).toEqual(countOfItems);

    await cartInLandingPage.click();
    console.log('cart is clicked')

    await checkoutButton.click();
    console.log('checkoutButton is clicked')

    await page.waitForSelector(LocatorsUsed.waitForPayment)
    await cvvCode.pressSequentially('123', { delay: 100 })
    console.log('typed in the CVV code');
    await NameOnCard.pressSequentially('karthik', { delay: 100 })
    console.log('typed in the name')
    await EnterCountryDetails.pressSequentially('India', { delay: 100 })
    await selectIndia.click();
    console.log('selected the country')
    await placeOrder.click();
    console.log('clicked on place order')
    await page.waitForSelector(LocatorsUsed.waitForOrder);


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
    await orderHistoryLink.click();
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

})