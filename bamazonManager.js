var mysql = require("mysql");
var i = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dimadimadima',
  password : 'localpancakes',
  database : 'bamazon_DB'
});

connection.connect(); 

const getChoice = (type) => {
  const choices = {
    'View Products for Sale': viewProducts,
    'View Low Inventory': viewLowInventory,
    'Add to Inventory': addToInventory,
    'Add New Product': addNewProduct
  }
  return choices[type]();
}

i.prompt([
  {
    name: 'choice',
    message: 'What would you like to do today?',
    type: 'list',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
  }
]).then(a => {
  getChoice(a.choice); 
  
})

const viewProducts = () => {
  console.log('hi');
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    products = results.map(x => `Id:${x.item_id} | ${x.product_name} | $${x.price} | stock:${x.stock_quantity}`);
    console.log(products);

  });
  connection.end();
}

const viewLowInventory = () => {
  connection.query('SELECT * FROM products WHERE stock_quantity < 2000', function (error, results, fields) {
    if (error) throw error;
    products = results.map(x => `Id:${x.item_id} | ${x.product_name} | $${x.price} | stock:${x.stock_quantity}`);
    console.log(products);
  });
  connection.end();
}

const addToInventory = () => {
  i.prompt({
    type: 'input',
    message: 'Which item would you like to add to?',
    name: 'item'
  }).then(a => {
    connection.query('UPDATE products SET stock_quantity = stock_quantity + 500 WHERE item_id = ?', [a.item], function (error, results, fields) {
      if (error) throw error;
      console.log('500 items have been added')
      connection.end();
    });
  })
}

const addNewProduct = () => {
  i.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the product?'
    },
    {
      type: 'input',
      name: 'dept',
      message: 'Which department does the product belong?'
    },
    {
      type: 'input',
      name: 'price',
      message: 'What is the price of this item?'
    },
    { 
      type: 'input',
      name: 'quantity',
      message: 'What is the quantity of this product?'
    }
  ]).then(a => {
    connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (? , ? , ? , ?)', [a.name, a.dept, a.price, a.quantity] , function (error, results, fields) {
      if (error) throw error;
      console.log('its been added!')
      connection.end();
    });
  })
}

