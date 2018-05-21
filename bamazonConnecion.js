var mysql = require('mysql');
var fs = require('fs');
var fakeData = require('./populateFakeData');


var connection = mysql.createConnection({
  host     : 'bamazon.ckvfwtes75ro.us-west-1.rds.amazonaws.com',
  user     : 'dimadimadima',
  password : 'localpancakes',
  database : 'bamazon_DB',
  multipleStatements: true
});

let dbData;

const startSeed = () => {
  fs.readFile('bamazonSeedData.sql', 'utf8', (err, data) => {
    if (err) throw err;
    dbData = data;
    execSQL(dbData)
    loadFakeData();
  })
}

const execSQL = (x) => {
  connection.connect();
  connection.query(x, (err, result) => {
    if (err) throw err; 
    console.log('hi')
  })
}

function loadFakeData(){
  connection.query(fakeData.join('\n'), (err, result) => {
    if (err) throw err;
    console.log('hello')
  })
  connection.end()
}

startSeed();




 