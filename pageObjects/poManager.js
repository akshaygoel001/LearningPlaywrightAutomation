const { LoginPage } = require('./loginPage');
const { DashboardPage } = require('./dashboardPage');
const {CartPage} = require("./cartPage") ;
const {OrderHistoryPage} = require('./orderHistoryPage');
const {OrderReviewPage} = require('./orderReviewPage');


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
    getOrderReviewPage(){
        return this.orderReviewPage;
    }


}
module.exports = {POManager};