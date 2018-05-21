const faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

const getProduct = () => {
  const name = faker.commerce.productName();
  const dept = faker.commerce.department();
  const price = faker.commerce.price();
  const stock = Math.ceil(Math.random() * 10000);
  return `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${name}', '${dept}', ${price}, ${stock});`;
}


let fakeData = [];
  let count = 0;
  while(count < 50){
    fakeData.push(getProduct())
    count++;
  }

module.exports = fakeData;


