const {test, expect, request} = require("@playwright/test");
const {APIUtils} = require("./utils/APIutils");

const loginData = {userEmail: "demo234@test.com", userPassword: "Test123456"};
const createOrderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginData);
    response = await apiUtils.createOrder(createOrderPayload);
})


test('API Test + End to End test', async ({page})=>{


    const productName = 'ZARA COAT 3';
    const email = "demo234@test.com";

    await page.addInitScript(value=>{
        window.localStorage.setItem("token",value)

    }, response.token
    );

    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByRole("button",{name:'ORDERS'}).click();

    await page.locator("tbody .ng-star-inserted th").first().waitFor();

    await page.locator("tbody .ng-star-inserted").filter({hasText:response.orderId}).getByRole("button",{name:'View'}).click();

})