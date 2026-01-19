const {test, expect} = require("@playwright/test");


test('Locators Supported', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title);

    const userName = page.locator("#username");

    await userName.fill("rahulshettyacademy");

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    await page.pause();

})

test('Get text content', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title);

    const userName = page.locator("#username");

    await userName.fill("rahulshetty");

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
})

test('Extract specific indext text from list of webelements', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title);

    const userName = page.locator("#username");

    await userName.fill("rahulshettyacademy");

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    console.log(await page.locator(".card-title a").first().textContent());

    console.log(await page.locator(".card-title a").nth(1).textContent());
    
    console.log(await page.locator(".card-title a").allTextContents());
})

test('Extract all texts from list of webelements', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title);

    const userName = page.locator("#username");

    await userName.fill("rahulshettyacademy");

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    await page.waitForLoadState('networkidle');

    console.log(await page.locator(".card-title a").allTextContents());
})