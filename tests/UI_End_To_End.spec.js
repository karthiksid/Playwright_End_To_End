import { test, expect } from '@playwright/test'


const LocatorsUsed ={

    waitForItemNameDisplay: '//div/h2',
    waitForCartLoading :'//button/label'

}

test('End_To_End_Framework', async ({ page }) => {

    
    const userName = await page.locator("#userEmail");
    const userPassword = await page.locator('#userPassword');
    const submitBtn = await page.locator('#login');
    const shoppinngItemsList = await page.locator('h5>b');
    const viewButtonShoppingList = await page.locator("//h5/following::button[contains(text(),'View')]");
    const itemNameInViewLandingPage = await page.locator("//div/h2");
    const addToCartInLandingPage = await page.getByRole('button',{name:'Add to Cart'})
    const cartCountAfterAdding = await page.locator("//button/label");



    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill('karthiksiddanilearnautomation@gmail.com');
    await userPassword.fill('TestPassword1');
    await submitBtn.click();

    await page.waitForLoadState('networkidle');

    //Get the count of items available on the shopping page
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
        console.log('click on the view for item '+(i+1))    
        await page.waitForSelector(LocatorsUsed.waitForItemNameDisplay);
        const ItemNameDisplayed = (await itemNameInViewLandingPage.textContent()).trim();
        expect(ItemsList).toContain(ItemNameDisplayed)
        console.log('verified the '+ItemNameDisplayed)
        await addToCartInLandingPage.click()
        console.log('item added to cart is '+ItemNameDisplayed)
        await page.goBack();
    }

    //Verifying the cart after adding the items

    await page.waitForSelector(LocatorsUsed.waitForCartLoading);
    const countInCart = Number(await cartCountAfterAdding.textContent());
    console.log('items count present in cart after adding items is '+countInCart)
    expect (countInCart).toEqual(countOfItems);

})