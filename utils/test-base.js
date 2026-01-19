const base = require("@playwright/test");


exports.customtest = base.test.extend(
    {

    testDataforPlaceOrder : {
        useremail: "demo234@test.com",
        password: "Test123456",
        productName: "ZARA COAT 3",
        country: "India"
    
    }
}
)