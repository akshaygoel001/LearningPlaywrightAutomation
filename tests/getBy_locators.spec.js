const {test, expect} = require("@playwright/test");

test('Playwright special locators', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").check();

    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("Test123456");

    await page.getByRole("button",{name:'Submit'}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name: 'Shop'}).click();
    
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();



})

test('Optimized End to End test', async ({page})=>{

    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = "demo234@test.com";

    await page.getByPlaceholder("email@example.com").fill(email);

    await page.getByPlaceholder("enter your passsword").fill("Test123456");

    await page.getByRole("button",{name:'Login'}).click();

    await page.waitForLoadState('networkidle');

    await page.locator("div.card-body b").first().waitFor();

    const products = await page.locator("div.card-body");

    const count = await products.count();

    await page.locator(".card-body").filter({hasText:productName}).getByRole("button",{name:" Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();

    expect(await page.getByText("ZARA COAT 3").isVisible()).toBeTruthy();

    await page.getByRole("button",{name:"Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind",{ delay: 150 });

    await page.locator("section.ta-results").filter({hasText:'India'}).click();

    //await page.locator("section.ta-results").filter({toEqual:'India'}).click();

    //await page.getByRole("button",{name:'India'}).nth(1).click();

    expect(await page.getByLabel(email).isVisible());

    await page.getByText("PLACE ORDER").click();

    await expect( page.getByText("THANKYOU FOR THE ORDER.")).toBeVisible();

    const orderIdtext = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderId = orderIdtext.split("|")[1].trim()
    console.log(orderId);

    await page.getByRole("button",{name:'ORDERS'}).click();

    await page.locator("tbody .ng-star-inserted th").first().waitFor();

    await page.locator("tbody .ng-star-inserted").filter({hasText:orderId}).getByRole("button",{name:'View'}).click();

    //await page.pause();

})

test('Calendar Handling', async ({page})=>{

    const month = "6";
    const date = "15";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();

    await page.locator("//abbr[text()='"+date+"']").click();

    expect(await page.locator(".react-date-picker__inputGroup input[name='month']").inputValue("value")).toEqual(month);
    expect(await page.locator(".react-date-picker__inputGroup input[name='day']").inputValue("value")).toEqual(date);
    expect(await page.locator(".react-date-picker__inputGroup input[name='year']").inputValue("value")).toEqual(year);

})