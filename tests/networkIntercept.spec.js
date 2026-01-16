const {test, expect, request} = require("@playwright/test");
const {APIUtils} = require("./utils/APIutils");

const loginData = {userEmail: "demo234@test.com", userPassword: "Test123456"};
const createOrderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;

const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginData);
    response = await apiUtils.createOrder(createOrderPayload);
})


test('No orders test(Response intercept)', async ({page})=>{


    const productName = 'ZARA COAT 3';
    const email = "demo234@test.com";

    await page.addInitScript(value=>{
        window.localStorage.setItem("token",value)

    }, response.token
    );

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>{
            await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            );
        }
    );

    await page.getByRole("button",{name:'ORDERS'}).click();

    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());
})

test('Request intercept', async ({ page }) => {
 
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("demo234@test.com");
    await page.locator("#userPassword").fill("Test123456");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
 
})

test.only('Abort network calls', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.css', route => route.abort());
 
    await page.goto("https://rahulshettyacademy.com/client");
    await page.on('request', request => console.log(request.url()));
    await page.on('response', response => console.log(response.url(), response.status()));
    await page.locator("#userEmail").fill("demo234@test.com");
    await page.locator("#userPassword").fill("Test123456");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

})