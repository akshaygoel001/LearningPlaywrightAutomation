const {test, expect} = require("@playwright/test");

test('Select dropdown options',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");

    await userName.fill("rahulshetty");

    await page.locator("[type='password']").fill("learning");

    const dropdown =  await page.locator("select.form-control");

    await dropdown.selectOption("consult");

    await page.locator("//input[@value='user']").click();

    await page.locator("#okayBtn").click();

    await page.pause();


})

test('Radio button handling',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");

    await userName.fill("rahulshetty");

    await page.locator("[type='password']").fill("learning");

    await page.locator("//input[@value='user']").click();

    await page.locator("#okayBtn").click();

    await expect(page.locator("//input[@value='user']")).toBeChecked();

    await page.locator("#terms").click();

    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();

    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(page.locator("[href*='documents-request']")).toHaveAttribute('class','blinkingText');


    //await page.pause();


})


test.only('Window handling',async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink =  await page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
         context.waitForEvent('page'),// listens for any new page
         documentLink.click(),

    ]);

    const text = await newPage.locator("//p[@class='im-para red']").textContent();
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);

    const userName = page.locator("#username");

    await userName.fill(domain);

    console.log(await userName.inputValue());
    //await page.pause();


})