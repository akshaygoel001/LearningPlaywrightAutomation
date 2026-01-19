const { test, expect } = require("@playwright/test");
const {customtest} = require("../utils/test-base");
const { POManager } = require("../pageObjects/poManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

for (const data of dataset) {
    test(`End to End test with POM for ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginpage = poManager.getLoginPage();
        await loginpage.goToURL();
        await loginpage.validLogin(data.useremail, data.password);

        const dashboard = poManager.getDashboardPage();
        await dashboard.searchProductAddCart(data.productName);
        await dashboard.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductisDisplayed(data.productName);
        await cartPage.checkout();
        await cartPage.selectCountryOption(data.country, data.useremail);
        await cartPage.placeOrder();

        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.verifyOrderPlacedSuccessText();
        const orderId = await orderHistoryPage.getOrderId();
        console.log(orderId);

        const orderReviewPage = poManager.getOrderReviewPage();
        await orderReviewPage.navigateToOrdersPage();
        await orderReviewPage.viewOrder(orderId);
        await orderReviewPage.verifyOrderDetails(orderId);


    });

}

customtest('End to End test with POM using Custom fixture ', async ({ page,testDataforPlaceOrder }) => {

        const poManager = new POManager(page);

        const loginpage = poManager.getLoginPage();
        await loginpage.goToURL();
        await loginpage.validLogin(testDataforPlaceOrder.useremail, testDataforPlaceOrder.password);

        const dashboard = poManager.getDashboardPage();
        await dashboard.searchProductAddCart(testDataforPlaceOrder.productName);
        await dashboard.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductisDisplayed(testDataforPlaceOrder.productName);
        await cartPage.checkout();
        await cartPage.selectCountryOption(testDataforPlaceOrder.country, testDataforPlaceOrder.useremail);
        await cartPage.placeOrder();
});
