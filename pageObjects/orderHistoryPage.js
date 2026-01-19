const { expect } = require("@playwright/test");


class OrderHistoryPage {

    constructor(page) {
        this.page = page;
        this.orderPlaceSuccessMessage = page.getByText("THANKYOU FOR THE ORDER.");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");


    }

    async verifyOrderPlacedSuccessText() {
        await expect(this.orderPlaceSuccessMessage).toBeVisible();

    }
    async getOrderId() {
        const orderIdtext = await this.orderId.textContent();
        return orderIdtext.split("|")[1].trim();

    }

}

module.exports = {OrderHistoryPage};