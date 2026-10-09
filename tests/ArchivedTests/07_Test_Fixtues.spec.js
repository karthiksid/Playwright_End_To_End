const {test,expect, request} = require ('@playwright/test');

const {customTest} = require('../utils/fixtures.js')

const LocatorsUsed = {

    waitForItemNameDisplay: '//div/h2',
    waitForCartLoading: '//button/label',
    waitForPayment: "//div[starts-with(text(),' Payment Method ')]",
    waitForOrder: "//h1[starts-with(text(),' Thankyou')]",
    waitForOrderList: "//h1",
    waitForOrderDisplay: "//li/button[contains(text(),' ORDERS')]"


}

customTest("Fixtures_Demo", async ({authenticatedPage,createOrder})=>{

  /****************************************************************************** Locators space **********************************************************************************/
    const userName = await authenticatedPage.locator("#userEmail");
    const userPassword = await authenticatedPage.locator('#userPassword');
    const submitBtn = await authenticatedPage.locator('#login');
    const shoppinngItemsList = await authenticatedPage.locator('h5>b');
    const viewButtonShoppingList = await authenticatedPage.locator("//h5/following::button[contains(text(),'View')]");
    const itemNameInViewLandingPage = await authenticatedPage.locator("//div/h2");
    const addToCartInLandingPage = await authenticatedPage.getByRole('button', { name: 'Add to Cart' })
    const cartCountAfterAdding = await authenticatedPage.locator("//button/label");
    const cartInLandingPage = await authenticatedPage.locator("//button[contains(text(),' Cart ')]");

    const checkoutButton = await authenticatedPage.locator("//div/ul/li/button[contains(text(),'Checkout')]");
    const cvvCode = await authenticatedPage.locator("//div[contains(text(),'CVV Code ')]/following::input[@type='text']").first();
    const NameOnCard = await authenticatedPage.locator("//div[contains(text(),'Name')]/following::input[@type='text']").first();
    const EnterCountryDetails = await authenticatedPage.getByPlaceholder('Select Country');
    const selectIndia = await authenticatedPage.locator("//button/span[starts-with(text(),' India')]");
    const placeOrder = await authenticatedPage.locator("//a[contains(text(),'Place Order')]");

    const orderIDsPlaced = await authenticatedPage.locator("//tr[3]/td/label[contains(text,'')]");
    const orderHistoryLink = await authenticatedPage.locator("//td/label[contains(text(),'Orders')]");

    const OrderIdInOrderHistoryPage = await authenticatedPage.locator("//tbody/tr/th");
    const YourOrdersPage = await authenticatedPage.locator("//h1");
    const OrdersLinkOnLandingPage = await authenticatedPage.locator("//li/button[contains(text(),' ORDERS')]");
    
    //const deleteOlderOrderLink = await page.locator("//tbody/tr[1]/td/button[contains(text(),'Delete')]");
    const deleteOlderOrderLink = await authenticatedPage.locator("//tbody/tr[1]/td/button").filter({hasText  :'Delete'})

    
    //const veiwOlderOrderLink = await page.locator("//tbody/tr/td/button[contains(text(),'View')]");
    const veiwOlderOrderLink = await authenticatedPage.locator("//tbody/tr/td/button").filter({ hasText: 'View' })

    const homeButtonInOrderHistoryPage = await authenticatedPage.locator("//li/button[contains(text(),' HOME')]");

    const orderIDFromViewOrderPage = await authenticatedPage.locator("//div/small[contains(text(),'Order Id')]/following::div[1]");

    const signOutButton = await authenticatedPage.getByRole("button",{name :" Sign Out "});

    /****************************************************************************** Locators space **********************************************************************************/



    await authenticatedPage.goto('https://rahulshettyacademy.com/client');

    await OrdersLinkOnLandingPage.waitFor();
    
        await OrdersLinkOnLandingPage.click();
    
        await authenticatedPage.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/myorders');
        
       
        
    const checkForOrders = await YourOrdersPage
        .waitFor({ state: 'visible', timeout: 3000 })
        .then(() => true)
        .catch(() => false);
     
    
    //const checkForOrders = expect(YourOrdersPage).toBeVisible();
    
    
        if(checkForOrders){
            console.log("checking the previous order if present or not")
        const countOfPreviousOrdersIntially = await authenticatedPage.locator("//tbody/tr/th").count();
        console.log("count of orders are : " + countOfPreviousOrdersIntially)
    
    
        if (countOfPreviousOrdersIntially > 0) {
            for (let i = 0; i < countOfPreviousOrdersIntially; i++) {
    
    
                const deleteButton = deleteOlderOrderLink.first();
    
                await deleteButton.waitFor({ state: 'visible' });
                await deleteButton.click();
    
                // Wait for the success message to appear
                const successMessage = authenticatedPage.getByText('Orders Deleted Successfully', { exact: true });
    
                await expect(successMessage).toBeVisible();
    
                await expect(successMessage).toBeHidden();
    
    
    
            }
        } 
        
    
        }else {
            console.log("No previous orders are present, hence moving forward with order creation")
        }
    
    
        await homeButtonInOrderHistoryPage.click();
        
        //Get the count of items available on the shopping page
    
        await authenticatedPage.waitForLoadState('networkidle');
    
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
            await authenticatedPage.waitForSelector(LocatorsUsed.waitForItemNameDisplay);
            const ItemNameDisplayed = (await itemNameInViewLandingPage.textContent()).trim();
            expect(ItemsList).toContain(ItemNameDisplayed)
            console.log('verified the ' + ItemNameDisplayed)
            await addToCartInLandingPage.click()
            console.log('item added to cart is ' + ItemNameDisplayed)
            await authenticatedPage.goBack();
        }
    
        //Verifying the cart after adding the items
    
        await authenticatedPage.waitForSelector(LocatorsUsed.waitForCartLoading, { delay: 1000 });
        const countInCart = Number(await cartCountAfterAdding.textContent());
        console.log('items count present in cart after adding items is ' + countInCart)
        expect(countInCart).toEqual(countOfItems);
    
        await cartInLandingPage.click();
        console.log('cart is clicked')
    
        await checkoutButton.click();
        console.log('checkoutButton is clicked')
    
        await authenticatedPage.waitForSelector(LocatorsUsed.waitForPayment)
        await cvvCode.pressSequentially('123', { delay: 100 })
        console.log('typed in the CVV code');
        await NameOnCard.pressSequentially('karthik', { delay: 100 })
        console.log('typed in the name')
        await EnterCountryDetails.pressSequentially('India', { delay: 100 })
        await selectIndia.click();
        console.log('selected the country')
        await placeOrder.click();
        console.log('clicked on place order')
        await authenticatedPage.waitForSelector(LocatorsUsed.waitForOrder);
    
    
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
    
    
        await authenticatedPage.waitForLoadState('networkidle');
        await authenticatedPage.waitForSelector(LocatorsUsed.waitForOrderList)
    
        const OrderIDCount = await OrderIdInOrderHistoryPage.count()
    
        console.log("order id count " + OrderIDCount)
    
    
        console.log("getting the orderID's from your orders page")
    
        for (let i = 0; i < OrderIDCount; i++) {
    
            const OrderIdNumberGrabbedFromList = await authenticatedPage.locator("//tbody/tr/th").nth(i);
            const EachOrderIdNumberGrabbedFromList = (await OrderIdNumberGrabbedFromList.textContent()).trim();
            console.log(EachOrderIdNumberGrabbedFromList);
            expect(orderList).toContain(EachOrderIdNumberGrabbedFromList);
        }
    
    
    
    
        await OrdersLinkOnLandingPage.waitFor();
    
        await OrdersLinkOnLandingPage.click();
    
        await YourOrdersPage.waitFor();
    
    
        //Veiw the order and compare the orderId's
    
        //deleting the previous orders if any    
        console.log("checking the order if present or not")
        const countOfPreviousOrders = await authenticatedPage.locator("//tbody/tr/th").count();
        console.log("count of orders which are to be viewed are : " + countOfPreviousOrders)
    
        if (countOfPreviousOrders > 0) {
            for (let i = 0; i < countOfPreviousOrders; i++) {
    
    
                const viewButton = veiwOlderOrderLink.nth(i);
    
                await viewButton.waitFor();
                await viewButton.click();
                
                // Wait for the success message to appear
    
                const orderGrabbedFromIndOrderViewPage =await orderIDFromViewOrderPage.textContent();
                expect(orderList).toContain(orderGrabbedFromIndOrderViewPage);
                console.log("verified the order "+orderGrabbedFromIndOrderViewPage);
                await OrdersLinkOnLandingPage.click();
                      
                       
    
            }
        } else {
            console.log("No previous orders are present, hence moving forward with order creation")
        }
    
    
        //deleting the previous orders if any    
        console.log("checking the order if present or not")    
        console.log("count of orders which needs to be deleted are : " + countOfPreviousOrders)
    
        if (countOfPreviousOrders > 0) {
            for (let i = 0; i < countOfPreviousOrders; i++) {
    
    
                const deleteButton = deleteOlderOrderLink.first();
    
                await deleteButton.waitFor({ state: 'visible' });
                await deleteButton.click();
    
                // Wait for the success message to appear
                const successMessage = authenticatedPage.getByText('Orders Deleted Successfully', { exact: true });
    
                await expect(successMessage).toBeVisible();
    
                await expect(successMessage).toBeHidden();
    
                console.log("deleted the order id after verification :"+orderList[i])
            }
        } else {
            console.log("No previous orders are present, hence moving forward with order creation")
        }
               await signOutButton.click();
    

    
})