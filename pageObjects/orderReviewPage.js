const { expect } = require("@playwright/test");


class OrderReviewPage{

    constructor(page){
        this.page = page;
        this.orderBtn = page.getByRole("button", { name: 'ORDERS' });
        this.ordersTable = page.locator("tbody .ng-star-inserted th");
        this.ordersRow = page.locator("tbody .ng-star-inserted");
        this.orderDetailId = page.locator("div.col-text");

    }

    async navigateToOrdersPage(){
        await this.orderBtn.click();
        await this.ordersTable.first().waitFor();
        


    }
    async viewOrder(orderId){
        
        await this.ordersRow.filter({ hasText: orderId }).getByRole("button", { name: 'View' }).click();

    }

    async verifyOrderDetails(orderId){
        await expect(this.orderDetailId).toHaveText(orderId);

    }
}
module.exports = {OrderReviewPage};