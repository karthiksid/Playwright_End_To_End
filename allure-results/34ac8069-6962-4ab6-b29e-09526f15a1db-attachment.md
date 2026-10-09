# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01_UI_End_To_End_POM.spec.js >> End_To_End_Framework with Page Object Model Representation
- Location: tests\01_UI_End_To_End_POM.spec.js:19:6

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

Expected: 3
Received: 0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
    - text:    
    - generic [ref=e25]:
      - paragraph [ref=e26]: Home | Search
      - heading "Filters" [level=4] [ref=e28]
      - generic [ref=e29]:
        - textbox "search" [ref=e31]
        - generic [ref=e32]:
          - heading "Price Range" [level=6] [ref=e33]
          - generic [ref=e34]:
            - textbox "Min Price" [ref=e36]
            - textbox "Max Price" [ref=e38]
        - generic [ref=e39]:
          - heading "Categories" [level=6] [ref=e40]
          - generic [ref=e41]: 
          - generic [ref=e43]:
            - checkbox [ref=e44]
            - generic [ref=e45]: fashion
          - generic [ref=e46]:
            - checkbox [ref=e47]
            - generic [ref=e48]: electronics
          - generic [ref=e49]:
            - checkbox [ref=e50]
            - generic [ref=e51]: household
        - generic [ref=e52]:
          - heading "Sub Categories" [level=6] [ref=e53]
          - generic [ref=e54]: 
          - generic [ref=e56]:
            - checkbox [ref=e57]
            - generic [ref=e58]: t-shirts
          - generic [ref=e59]:
            - checkbox [ref=e60]
            - generic [ref=e61]: shirts
          - generic [ref=e62]:
            - checkbox [ref=e63]
            - generic [ref=e64]: shoes
          - generic [ref=e65]:
            - checkbox [ref=e66]
            - generic [ref=e67]: mobiles
          - generic [ref=e68]:
            - checkbox [ref=e69]
            - generic [ref=e70]: laptops
        - generic [ref=e71]:
          - heading "Search For" [level=6] [ref=e72]
          - generic [ref=e73]: 
          - generic [ref=e75]:
            - checkbox [ref=e76]
            - generic [ref=e77]: men
          - generic [ref=e78]:
            - checkbox [ref=e79]
            - generic [ref=e80]: women
    - generic [ref=e81]:
      - generic [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e84]: Showing 3 results |
          - generic [ref=e85]: User can only see maximum 9 products on a page
        - generic [ref=e86]:
          - generic [ref=e90]:
            - heading "ADIDAS ORIGINAL" [level=5] [ref=e91]
            - generic [ref=e92]: $ 11500
            - button "View" [ref=e94] [cursor=pointer]:
              - generic [aria-hidden] [ref=e95]: 
              - text: View
            - button " Add To Cart" [ref=e96] [cursor=pointer]:
              - generic [ref=e97]: 
              - text: Add To Cart
          - generic [ref=e101]:
            - heading "ZARA COAT 3" [level=5] [ref=e102]
            - generic [ref=e103]: $ 11500
            - button "View" [ref=e105] [cursor=pointer]:
              - generic [aria-hidden] [ref=e106]: 
              - text: View
            - button " Add To Cart" [ref=e107] [cursor=pointer]:
              - generic [ref=e108]: 
              - text: Add To Cart
          - generic [ref=e112]:
            - heading "iphone 13 pro" [level=5] [ref=e113]
            - generic [ref=e114]: $ 55000
            - button "View" [ref=e116] [cursor=pointer]:
              - generic [aria-hidden] [ref=e117]: 
              - text: View
            - button " Add To Cart" [ref=e118] [cursor=pointer]:
              - generic [ref=e119]: 
              - text: Add To Cart
      - list "Pagination" [ref=e124]:
        - listitem [ref=e125]:
          - text: «
          - generic [ref=e126]:
            - text: Previous
            - generic [ref=e127]: page
        - listitem [ref=e128]:
          - generic [ref=e129]: You're on page
          - text: "1"
        - listitem [ref=e130]:
          - generic [ref=e131]:
            - text: Next
            - generic [ref=e132]: page
          - text: »
    - generic [ref=e133]: Design and Developed By - Kunal Sharma
  - alert "Product Added To Cart" [ref=e135]
```

# Test source

```ts
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
  83  |     
  84  | const checkForOrders = await YourOrdersPage
  85  |     .waitFor({ state: 'visible', timeout: 3000 })
  86  |     .then(() => true)
  87  |     .catch(() => false);
  88  |  
  89  | 
  90  | //const checkForOrders = expect(YourOrdersPage).toBeVisible();
  91  | 
  92  | 
  93  |     if(checkForOrders){
  94  |         console.log("checking the previous order if present or not")
  95  |     const countOfPreviousOrdersIntially = await page.locator("//tbody/tr/th").count();
  96  |     console.log("count of orders are : " + countOfPreviousOrdersIntially)
  97  | 
  98  | 
  99  |     if (countOfPreviousOrdersIntially > 0) {
  100 |         for (let i = 0; i < countOfPreviousOrdersIntially; i++) {
  101 | 
  102 | 
  103 |             const deleteButton = deleteOlderOrderLink.first();
  104 | 
  105 |             await deleteButton.waitFor({ state: 'visible' });
  106 |             await deleteButton.click();
  107 | 
  108 |             // Wait for the success message to appear
  109 |             const successMessage = page.getByText('Orders Deleted Successfully', { exact: true });
  110 | 
  111 |             await expect(successMessage).toBeVisible();
  112 | 
  113 |             await expect(successMessage).toBeHidden();
  114 | 
  115 | 
  116 | 
  117 |         }
  118 |     } 
  119 |     
  120 | 
  121 |     }else {
  122 |         console.log("No previous orders are present, hence moving forward with order creation")
  123 |     }
  124 | 
  125 | 
  126 |     const homeButtonInOrderHistoryPage = await page.locator("//li/button[contains(text(),' HOME')]");
  127 |     const shoppinngItemsList = await page.locator('h5>b');
  128 | 
  129 |     await homeButtonInOrderHistoryPage.click();
  130 |     
  131 |     //Get the count of items available on the shopping page
  132 | 
  133 |     await page.waitForLoadState('networkidle');
  134 | 
  135 |     await shoppinngItemsList.last().waitFor();
  136 | 
  137 | 
  138 |     const countOfItems = await shoppinngItemsList.count();
  139 |     const ItemsList = [];
  140 | 
  141 |     console.log('items available are : ')
  142 |     for (let i = 0; i < countOfItems; i++) {
  143 |         if (await shoppinngItemsList.nth(i).isVisible()) {
  144 | 
  145 |             const itemName = (await shoppinngItemsList.nth(i).textContent()).trim();
  146 |             ItemsList.push(itemName)
  147 |             console.log(itemName);
  148 |         }
  149 |     }
  150 | 
  151 | 
  152 |     //Verify the each landing page of the item
  153 | 
  154 | 
  155 |     for (let i = 0; i < ItemsList.length; i++) {
  156 |         await viewButtonShoppingList.nth(i).click();
  157 |         console.log('click on the view for item ' + (i + 1))
  158 |         await page.waitForSelector(LocatorsUsed.waitForItemNameDisplay);
  159 |         const ItemNameDisplayed = (await itemNameInViewLandingPage.textContent()).trim();
  160 |         expect(ItemsList).toContain(ItemNameDisplayed)
  161 |         console.log('verified the ' + ItemNameDisplayed)
  162 |         await addToCartInLandingPage.click()
  163 |         console.log('item added to cart is ' + ItemNameDisplayed)
  164 |         await page.goBack();
  165 |     }
  166 | 
  167 |     //Verifying the cart after adding the items
  168 | 
  169 |     //await page.waitForSelector(LocatorsUsed.waitForCartLoading, { delay: 1000 });
  170 |     const countInCart = Number(await cartCountAfterAdding.textContent());
  171 |     console.log('items count present in cart after adding items is ' + countInCart)
> 172 |     expect(countInCart).toEqual(countOfItems);
      |                         ^ Error: expect(received).toEqual(expected) // deep equality
  173 | 
  174 |     await cartInLandingPage.click();
  175 |     console.log('cart is clicked')
  176 | 
  177 |     await checkoutButton.click();
  178 |     console.log('checkoutButton is clicked')
  179 | 
  180 |     await page.waitForSelector(LocatorsUsed.waitForPayment)
  181 |     await cvvCode.pressSequentially('123', { delay: 100 })
  182 |     console.log('typed in the CVV code');
  183 |     await NameOnCard.pressSequentially('karthik', { delay: 100 })
  184 |     console.log('typed in the name')
  185 |     await EnterCountryDetails.pressSequentially('India', { delay: 100 })
  186 |     await selectIndia.click();
  187 |     console.log('selected the country')
  188 |     await placeOrder.click();
  189 |     console.log('clicked on place order')
  190 |     await page.waitForSelector(LocatorsUsed.waitForOrder);
  191 | 
  192 | 
  193 |     //Get the count of orders available on the orders page
  194 |     const countOfOrderPlaced = await orderIDsPlaced.count();
  195 |     const orderList = [];
  196 | 
  197 |     console.log("order ID's available are : ")
  198 |     for (let i = 0; i < countOfOrderPlaced; i++) {
  199 |         if (await orderIDsPlaced.nth(i).isVisible()) {
  200 | 
  201 |             const orderID = (await orderIDsPlaced.nth(i).textContent()).replace(/\|/g, '').trim();
  202 |             orderList.push(orderID)
  203 |             console.log(orderID);
  204 |         }
  205 |     }
  206 | 
  207 | 
  208 |     //goto order history page
  209 |     await orderHistoryLink.click();
  210 |     console.log('clicked on the order history page');
  211 | 
  212 | 
  213 |     await page.waitForLoadState('networkidle');
  214 |     await page.waitForSelector(LocatorsUsed.waitForOrderList)
  215 | 
  216 |     const OrderIDCount = await OrderIdInOrderHistoryPage.count()
  217 | 
  218 |     console.log("order id count " + OrderIDCount)
  219 | 
  220 | 
  221 |     console.log("getting the orderID's from your orders page")
  222 | 
  223 |     for (let i = 0; i < OrderIDCount; i++) {
  224 | 
  225 |         const OrderIdNumberGrabbedFromList = await page.locator("//tbody/tr/th").nth(i);
  226 |         const EachOrderIdNumberGrabbedFromList = (await OrderIdNumberGrabbedFromList.textContent()).trim();
  227 |         console.log(EachOrderIdNumberGrabbedFromList);
  228 |         expect(orderList).toContain(EachOrderIdNumberGrabbedFromList);
  229 |     }
  230 | 
  231 | 
  232 | 
  233 | 
  234 |     await OrdersLinkOnLandingPage.waitFor();
  235 | 
  236 |     await OrdersLinkOnLandingPage.click();
  237 | 
  238 |     await YourOrdersPage.waitFor();
  239 | 
  240 | 
  241 |     //Veiw the order and compare the orderId's
  242 | 
  243 |     //deleting the previous orders if any    
  244 |     console.log("checking the order if present or not")
  245 |     const countOfPreviousOrders = await page.locator("//tbody/tr/th").count();
  246 |     console.log("count of orders which are to be viewed are : " + countOfPreviousOrders)
  247 | 
  248 |     if (countOfPreviousOrders > 0) {
  249 |         for (let i = 0; i < countOfPreviousOrders; i++) {
  250 | 
  251 | 
  252 |             const viewButton = veiwOlderOrderLink.nth(i);
  253 | 
  254 |             await viewButton.waitFor();
  255 |             await viewButton.click();
  256 |             
  257 |             // Wait for the success message to appear
  258 | 
  259 |             const orderGrabbedFromIndOrderViewPage =await orderIDFromViewOrderPage.textContent();
  260 |             expect(orderList).toContain(orderGrabbedFromIndOrderViewPage);
  261 |             console.log("verified the order "+orderGrabbedFromIndOrderViewPage);
  262 |             await OrdersLinkOnLandingPage.click();
  263 |                   
  264 |                    
  265 | 
  266 |         }
  267 |     } else {
  268 |         console.log("No previous orders are present, hence moving forward with order creation")
  269 |     }
  270 | 
  271 | 
  272 |     //deleting the previous orders if any    
```