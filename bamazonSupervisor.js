var mysql = require("mysql");
var i = require('inquirer');
var t = require('table');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dimadimadima',
  password : 'localpancakes',
  database : 'bamazon_DB'
});

connection.connect(); 

const getChoice = (type) => {
  const choices = {
    'View Products Sales By Department': viewSalesByDept,
    'Create New Department': createNewDepartment
  }
  return choices[type]();
}

i.prompt([
  {
    name: 'choice',
    message: 'What would you like to do today?',
    type: 'list',
    choices: ['View Products Sales By Department', 'Create New Department']
  }
]).then(a => {
  getChoice(a.choice); 
})

const viewSalesByDept = () => {
  console.log('hi');
  connection.query('SELECT * FROM products GROUP BY', function (error, results, fields) {
    if (error) throw error;
    products = results.map(x => `Id:${x.item_id} | ${x.product_name} | $${x.price} | stock:${x.stock_quantity}`);
    console.log(products);

  });
  connection.end();
}

const createNewDepartment = () => {
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
