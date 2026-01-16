const {test,expect} = require("@playwright/test");


test('Screenshot capture', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.screenshot({path:'loginpage.png'});

    

    await page.locator("#displayed-text").screenshot({path:'textbox.png'});

    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();

})


test('Visual Testing', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    
    expect(await page.screenshot()).toMatchSnapshot({path:'homepage.png'});

})