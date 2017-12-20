var faker = require('faker');


console.log("==================== \nWelcome To My Shop! \n====================")
for(var i=0; i<10;i++){
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}