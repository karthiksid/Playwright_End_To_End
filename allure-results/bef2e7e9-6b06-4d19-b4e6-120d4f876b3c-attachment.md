# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01_UI_End_To_End_POM.spec.js >> End_To_End_Framework with Page Object Model Representation
- Location: tests\01_UI_End_To_End_POM.spec.js:19:6

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('h5>b').last() to be visible

```

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('//div/ul/li/button[contains(text(),\'Checkout\')]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  41  |     const selectIndia = await page.locator("//button/span[starts-with(text(),' India')]");
  42  |     const placeOrder = await page.locator("//a[contains(text(),'Place Order')]");
  43  | 
  44  |     const orderIDsPlaced = await page.locator("//tr[3]/td/label[contains(text,'')]");
  45  |     const orderHistoryLink = await page.locator("//td/label[contains(text(),'Orders')]");
  46  | 
  47  |     const OrderIdInOrderHistoryPage = await page.locator("//tbody/tr/th");
  48  |     const YourOrdersPage = await page.locator("//h1");
  49  |     const OrdersLinkOnLandingPage = await page.locator("//li/button[contains(text(),' ORDERS')]");
  50  | 
  51  |     //const deleteOlderOrderLink = await page.locator("//tbody/tr[1]/td/button[contains(text(),'Delete')]");
  52  |     const deleteOlderOrderLink = await page.locator("//tbody/tr[1]/td/button").filter({ hasText: 'Delete' })
  53  | 
  54  | 
  55  |     //const veiwOlderOrderLink = await page.locator("//tbody/tr/td/button[contains(text(),'View')]");
  56  |     const veiwOlderOrderLink = await page.locator("//tbody/tr/td/button").filter({ hasText: 'View' })
  57  | 
  58  | 
  59  | 
  60  |     const orderIDFromViewOrderPage = await page.locator("//div/small[contains(text(),'Order Id')]/following::div[1]");
  61  | 
  62  |     const signOutButton = await page.getByRole("button", { name: " Sign Out " });
  63  | 
  64  |     /****************************************************************************** Locators space **********************************************************************************/
  65  | 
  66  | 
  67  | 
  68  | 
  69  |     await loginPageObject.openLoginPage();
  70  |     loginPageObject.performLoginOperation(userLoginName, userSecret);
  71  |     await page.waitForLoadState('networkidle');
  72  |     await OrdersLinkOnLandingPage.waitFor();
  73  |     await OrdersLinkOnLandingPage.click();
  74  |     await landingPageObject.waitForUrlToLoad()
  75  | 
  76  | 
  77  |     const hasPastOrders = await landingPageObject.CheckForPastOrders();
  78  | 
  79  |     //const checkForOrders = expect(YourOrdersPage).toBeVisible();
  80  | 
  81  |     console.log("checking the previous order if present or not")
  82  | 
  83  |     if (hasPastOrders) {
  84  |         landingPageObject.PrintThePastOrders();
  85  |     } else {
  86  |         console.log("No previous orders are present, hence moving forward with order creation")
  87  |     }
  88  | 
  89  | 
  90  |     await landingPageObject.clickHomeButtonInOrderHistoryPage();
  91  | 
  92  |     //Get the count of items available on the shopping page
  93  | 
  94  |     await page.waitForLoadState('networkidle');
  95  |     
  96  |     landingPageObject.waitForShoppingItemsToAppear();
  97  |     landingPageObject.countAndPrintTheShoppingItemsList();
  98  |     landingPageObject.viewAndAddItems();
  99  | 
  100 |     const shoppinngItemsList =await page.locator('h5>b');
  101 |      const countOfItems = await shoppinngItemsList.count();      
  102 |     
  103 |     /*
  104 |     console.log('items available are : ')
  105 |     for (let i = 0; i < countOfItems; i++) {
  106 |         if (await shoppinngItemsList.nth(i).isVisible()) {
  107 | 
  108 |             const itemName = (await shoppinngItemsList.nth(i).textContent()).trim();
  109 |             ItemsList.push(itemName)
  110 |             console.log(itemName);
  111 |         }
  112 |     }*/
  113 | 
  114 | 
  115 |     //Verify the each landing page of the item
  116 | 
  117 | /*
  118 |     for (let i = 0; i < ItemsList.length; i++) {
  119 |         await viewButtonShoppingList.nth(i).click();
  120 |         console.log('click on the view for item ' + (i + 1))
  121 |         await page.waitForSelector(LocatorsUsed.waitForItemNameDisplay);
  122 |         const ItemNameDisplayed = (await itemNameInViewLandingPage.textContent()).trim();
  123 |         expect(ItemsList).toContain(ItemNameDisplayed)
  124 |         console.log('verified the ' + ItemNameDisplayed)
  125 |         await addToCartInLandingPage.click()
  126 |         console.log('item added to cart is ' + ItemNameDisplayed)
  127 |         await page.goBack();
  128 |     } */
  129 | 
  130 |     //Verifying the cart after adding the items
  131 | 
  132 |  //   await page.waitForSelector(LocatorsUsed.waitForCartLoading, { delay: 1000 });
  133 |     
  134 |  const countInCart = Number(await cartCountAfterAdding.textContent());
  135 |     console.log('items count present in cart after adding items is ' + countInCart)
  136 |     expect(countInCart).toEqual(countOfItems);
  137 | 
  138 |     await cartInLandingPage.click();
  139 |     console.log('cart is clicked')
  140 | 
> 141 |     await checkoutButton.click();
      |                          ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  142 |     console.log('checkoutButton is clicked')
  143 | 
  144 |     await page.waitForSelector(LocatorsUsed.waitForPayment)
  145 |     await cvvCode.pressSequentially('123', { delay: 100 })
  146 |     console.log('typed in the CVV code');
  147 |     await NameOnCard.pressSequentially('karthik', { delay: 100 })
  148 |     console.log('typed in the name')
  149 |     await EnterCountryDetails.pressSequentially('India', { delay: 100 })
  150 |     await selectIndia.click();
  151 |     console.log('selected the country')
  152 |     await placeOrder.click();
  153 |     console.log('clicked on place order')
  154 |     await page.waitForSelector(LocatorsUsed.waitForOrder);
  155 | 
  156 | 
  157 |     //Get the count of orders available on the orders page
  158 |     const countOfOrderPlaced = await orderIDsPlaced.count();
  159 |     const orderList = [];
  160 | 
  161 |     console.log("order ID's available are : ")
  162 |     for (let i = 0; i < countOfOrderPlaced; i++) {
  163 |         if (await orderIDsPlaced.nth(i).isVisible()) {
  164 | 
  165 |             const orderID = (await orderIDsPlaced.nth(i).textContent()).replace(/\|/g, '').trim();
  166 |             orderList.push(orderID)
  167 |             console.log(orderID);
  168 |         }
  169 |     }
  170 | 
  171 | 
  172 |     //goto order history page
  173 |     await orderHistoryLink.click();
  174 |     console.log('clicked on the order history page');
  175 | 
  176 | 
  177 |     await page.waitForLoadState('networkidle');
  178 |     await page.waitForSelector(LocatorsUsed.waitForOrderList)
  179 | 
  180 |     const OrderIDCount = await OrderIdInOrderHistoryPage.count()
  181 | 
  182 |     console.log("order id count " + OrderIDCount)
  183 | 
  184 | 
  185 |     console.log("getting the orderID's from your orders page")
  186 | 
  187 |     for (let i = 0; i < OrderIDCount; i++) {
  188 | 
  189 |         const OrderIdNumberGrabbedFromList = await page.locator("//tbody/tr/th").nth(i);
  190 |         const EachOrderIdNumberGrabbedFromList = (await OrderIdNumberGrabbedFromList.textContent()).trim();
  191 |         console.log(EachOrderIdNumberGrabbedFromList);
  192 |         expect(orderList).toContain(EachOrderIdNumberGrabbedFromList);
  193 |     }
  194 | 
  195 | 
  196 | 
  197 | 
  198 |     await OrdersLinkOnLandingPage.waitFor();
  199 | 
  200 |     await OrdersLinkOnLandingPage.click();
  201 | 
  202 |     await YourOrdersPage.waitFor();
  203 | 
  204 | 
  205 |     //Veiw the order and compare the orderId's
  206 | 
  207 |     //deleting the previous orders if any    
  208 |     console.log("checking the order if present or not")
  209 |     const countOfPreviousOrders = await page.locator("//tbody/tr/th").count();
  210 |     console.log("count of orders which are to be viewed are : " + countOfPreviousOrders)
  211 | 
  212 |     if (countOfPreviousOrders > 0) {
  213 |         for (let i = 0; i < countOfPreviousOrders; i++) {
  214 | 
  215 | 
  216 |             const viewButton = veiwOlderOrderLink.nth(i);
  217 | 
  218 |             await viewButton.waitFor();
  219 |             await viewButton.click();
  220 | 
  221 |             // Wait for the success message to appear
  222 | 
  223 |             const orderGrabbedFromIndOrderViewPage = await orderIDFromViewOrderPage.textContent();
  224 |             expect(orderList).toContain(orderGrabbedFromIndOrderViewPage);
  225 |             console.log("verified the order " + orderGrabbedFromIndOrderViewPage);
  226 |             await OrdersLinkOnLandingPage.click();
  227 | 
  228 | 
  229 | 
  230 |         }
  231 |     } else {
  232 |         console.log("No previous orders are present, hence moving forward with order creation")
  233 |     }
  234 | 
  235 | 
  236 |     //deleting the previous orders if any    
  237 |     console.log("checking the order if present or not")
  238 |     console.log("count of orders which needs to be deleted are : " + countOfPreviousOrders)
  239 | 
  240 |     if (countOfPreviousOrders > 0) {
  241 |         for (let i = 0; i < countOfPreviousOrders; i++) {
```