class DashboardPage {
    constructor(page) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.productsTitle = page.locator("div.card-body b");
        this.cart = page.getByRole("listitem").getByRole("button", { name: "Cart" });


    }

    async searchProductAddCart(productName) {
        await this.productsTitle.first().waitFor();
        await this.products.filter({ hasText: productName }).getByRole("button", { name: " Add To Cart" }).click();

    }

    async navigateToCart() {
        await this.cart.click();
    }
}
module.exports = { DashboardPage };