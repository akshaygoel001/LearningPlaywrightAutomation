const {test,expect} = require("@playwright/test");


test.describe.configure({mode:'parallel'})
test('@Web Hidden element validations', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.goto("https://www.google.com/");

    await page.goBack();

    //await page.goForward();

    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#show-textbox").click();

    await expect(page.locator("#displayed-text")).toBeVisible();
})

test('@Web Popups and Mouse hover', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on("dialog",dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
})

test('Handling frames', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const framePage =  page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const text = await framePage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);
})