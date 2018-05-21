var mysql = require("mysql");
var i = require('inquirer');
require('dotenv').config();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dimadimadima',
  password : 'localpancakes',
  database : 'bamazon_DB'
});

connection.connect(); 

connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log(results.map(x => `${x.item_id} | ${x.product_name} | ${x.price}`));
  startQs()
});

const validateN = (n) => !isNaN(parseInt(n)) && n < 100000;

const startQs = () => {
  
  i.prompt([
    {
      name: 'id',
      message: 'What is the id of the item you want to buy?',
      type: 'input',
      validate: validateN
    },
    {
      name: 'quantity',
      message: 'How many of them would you like to buy?',
      type: 'input',
      validate: validateN
    }
  ]).then(a => {
    a.id > 50 ? startQs() : checkInventory(a.id, a.quantity);
  
  })
  
  const checkInventory = (id, quantity) => {
    connection.query('SELECT * FROM products WHERE item_id = ?', [id], function (error, results, fields) {
      if (error) throw error;
      if(results[0].stock_quantity > quantity){
        const total = results[0].price * quantity;
        completeSale(id, quantity, total);
        console.log(`You owe $${total}
        db is updated, ${results[0].product_name} has ${results[0].stock_quantity - quantity} quantity left.`);
  
      } else {
        console.log('Insufficient Quantity!');
      }
      connection.end();
    });
  }
  
  const completeSale = (id, quantity, total) => {
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [quantity, id] ,function (error, results, fields) {
      if (error) throw error;
    });
    connection.query('UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?', [total, id] ,function (error, results, fields) {
      if (error) throw error;
    });
  }
}

