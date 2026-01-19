const {test, expect} = require('@playwright/test');


// npx playwright test tests/UIBasicstest.spec.js

test('Browser Context playwright test',async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title);

    const userName = page.locator("#username");

    await userName.fill("rahulshettyacademy");

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    //console.log(await page.locator("[style*='block']").textContent());

    console.log(await page.locator(".card-title a").first().textContent());

    console.log(await page.locator(".card-title a").nth(1).textContent());

});

test('Page playwright test',async ({page})=> {

    
    await page.goto("https://google.com/");
    console.log(await page.title);
    await expect(page).toHaveTitle("Google");



});

test('Products title',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill("demo234@test.com");

    await page.locator("#userPassword").fill("Test123456")

    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');

    console.log(await page.locator("div.card-body b").allTextContents());


})