const {test, expect} = require("@playwright/test");

test('End to End test', async ({page})=>{

    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = "demo234@test.com";

    await page.locator("#userEmail").fill(email);

    await page.locator("#userPassword").fill("Test123456")

    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');

    console.log(await page.locator("div.card-body b").allTextContents());

    const products = await page.locator("div.card-body");

    const count = await products.count();

    for(let i = 0 ; i < count ; i++){

        if(await products.nth(i).locator("b").textContent() == productName){

            await products.nth(i).locator("text=' Add To Cart'").click();
            break;

        }

    }

    await page.locator("[routerlink*='cart']").click();

    expect(await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();

    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind",{ delay: 150 });

    const options = await page.locator(".ta-results");
    await options.first().waitFor();

    const optionsCount = await options.locator("button").count();
    console.log(await options.locator("button").allTextContents());

    for(let i = 0 ; i< optionsCount ; i++){

        if(await options.locator("button").nth(i).textContent() === " India"){
            await options.locator("button").nth(i).click();
            break;
        }

    }

    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);

    await page.locator("text=Place Order ").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderIdtext = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    const orderId = orderIdtext.split("|")[1].trim()

    console.log(orderId);

    await page.locator(".btn[routerlink*='myorders']").click();

    await page.locator("tbody .ng-star-inserted th").first().waitFor();

    const orderIdCount = await page.locator("tbody .ng-star-inserted th").count();

    const orders = await page.locator("tbody .ng-star-inserted th").allTextContents();

    console.log(orders);
    for(let i = 0 ; i< orderIdCount ;i++){
        
        if(await page.locator("tbody .ng-star-inserted th").nth(i).textContent() == orderId ){

            await page.locator("tbody .ng-star-inserted button.btn-primary").nth(i).click();

            const orderPageId= await page.locator("div.col-text").first().textContent();
            console.log(orderPageId);

            const orderidVisible = await page.locator("div.col-text").first().isVisible();
            console.log("order id is visible -> ",orderidVisible);

            await expect( page.locator("div.col-text").first()).toBeVisible();
            break;


        }

    }

    //await page.pause();

})