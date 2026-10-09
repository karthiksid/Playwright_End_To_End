const LocatorsUsed = {

    waitForItemNameDisplay: '//div/h2',
    waitForCartLoading: '//button/label',
    waitForPayment: "//div[starts-with(text(),' Payment Method ')]",
    waitForOrder: "//h1[starts-with(text(),' Thankyou')]",
    waitForOrderList: "//h1",
    waitForOrderDisplay: "//li/button[contains(text(),' ORDERS')]"


}

class LandingPage {



    constructor(page) {
        this.page = page;
        this.shoppinngItemsList = page.locator('h5>b');
        this.viewButtonShoppingList = page.locator("//h5/following::button[contains(text(),'View')]");
        this.itemNameInViewLandingPage = page.locator("//div/h2");
        this.addToCartInLandingPage = page.getByRole('button', { name: 'Add to Cart' })
        this.cartCountAfterAdding = page.locator("//button/label");
        this.cartInLandingPage = page.locator("//button[contains(text(),' Cart ')]");
        this.deleteOlderOrderLink = page.locator("//tbody/tr[1]/td/button").filter({ hasText: 'Delete' })
        this.YourOrdersPage = page.locator("//h1");        
        this.homeButtonInOrderHistoryPage = page.locator("//li/button[contains(text(),' HOME')]");
        this.itemNameInViewLandingPage = page.locator("//div/h2");
        

    }

    


    async waitForUrlToLoad() {
        await this.page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    }


    async CheckForPastOrders() {

        const checkForOrders = await this.YourOrdersPage
            .waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true)
            .catch(() => false);

        return checkForOrders;
    }

    async PrintThePastOrders() {
        const countOfPreviousOrdersIntially = await this.page.locator("//tbody/tr/th").count();
        console.log("count of orders are : " + countOfPreviousOrdersIntially)

        if (countOfPreviousOrdersIntially > 0) {
            for (let i = 0; i < countOfPreviousOrdersIntially; i++) {


                const deleteButton = this.deleteOlderOrderLink.first();

                await deleteButton.waitFor({ state: 'visible' });
                await deleteButton.click();

                // Wait for the success message to appear
                const successMessage = this.page.getByText('Orders Deleted Successfully', { exact: true });

                await expect(successMessage).toBeVisible();

                await expect(successMessage).toBeHidden();

            }
        }

    }

    async clickHomeButtonInOrderHistoryPage() {
        await this.homeButtonInOrderHistoryPage.click();
    }

    async waitForShoppingItemsToAppear() {
        this.shoppinngItemsList.last().waitFor();
    }


   

    async countAndPrintTheShoppingItemsList() {

        const countOfItems = await this.shoppinngItemsList.count();     
        console.log("count of items are : "+countOfItems ) 
        let ItemsList = [];

        console.log('items available are : ')
        for (let i = 0; i < countOfItems; i++) {
            if (await this.shoppinngItemsList.nth(i).isVisible()) {

                const itemName = (await this.shoppinngItemsList.nth(i).textContent()).trim();
                ItemsList.push(itemName)
                console.log(itemName);
            }
        }

        return countOfItems;
    }

    async viewAndAddItems(){

         for (let i = 0; i < this.countAndPrintTheShoppingItemsList.length; i++) {
                await this.viewButtonShoppingList.nth(i).click();
                console.log('click on the view for item ' + (i + 1))
                await this.page.waitForSelector(LocatorsUsed.waitForItemNameDisplay);
                const ItemNameDisplayed = (await this.itemNameInViewLandingPage.textContent()).trim();
                expect(this.countAndPrintTheShoppingItemsList).toContain(ItemNameDisplayed)
                console.log('verified the ' + ItemNameDisplayed)
                await this.addToCartInLandingPage.click()
                console.log('item added to cart is ' + ItemNameDisplayed)
                await this.page.goBack();
            }

    }

async IsCountMatching(){
 const countInCart = Number(await this.cartCountAfterAdding.textContent());
        console.log('items count present in cart after adding items is ' + countInCart)
        expect(countInCart).toEqual(countOfItems);
    
}
    


}



module.exports = { LandingPage }