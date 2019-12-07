var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "bamaz0n",
    database: "bamazon"
})

// connect to mySQL database
connection.connect(function (err) {
    if (err) throw err;
    // get all products
    products().then(function (result) {
        // then list them
        result.forEach(function (item) {
            console.log('Item ID: ' + item.itemid + ' | Product Name: ' + item.productname + ' | Price: ' + item.price);
        });
        // then ask what the user would like to buy
    }).then(function () {
        return likeToBuy();
    });
});

function products() {
    return new Promise(function (resolve, reject) {
        // query for all items in products table
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
}

function likeToBuy() {
    return inquirer.prompt([{
        name: 'product_id',
        message: 'What is the ID of the product you would like to buy?',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('\nPlease enter a valid ID.');
                return false;
            }
        }
    }, {
        name: 'number_of_units',
        message: 'How many units would you like to buy?',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('\nPlease enter a valid quantity.');
                return false;
            }
        }
    }]).then(function (answer) {
        return new Promise(function (resolve, reject) {
            // query for all items 
            connection.query("SELECT * FROM products WHERE itemid=?", answer.product_id, function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        }).then(function (result) {
            // if there aren't enough of the item
            if (answer.number_of_units > result[0].stockquantity) {
                return "Insufficient quantity!";
            } else {
                var object = {};
                // answer is the users responses to the prompts
                object.answer = answer;
                // result is the results of the query
                object.result = result;
                return object;
            }
        }).catch(function (err) {
            console.log(err);
            connection.destroy();
        }).then(function (object) {
            // if there was sufficient quantity
            if (object.answer) {
                var newQuantity = object.result[0].stockquantity - object.answer.number_of_units;
                var product = object.answer.product_id;
                var totalCost = (object.result[0].price * object.answer.number_of_units).toFixed(2);
                // query that updates the quantity of the item
                connection.query("UPDATE products SET stockquantity=? WHERE itemid=?", [newQuantity, product], function (err, res) {
                    if (err) reject(err);
                    console.log('Your total cost is $' + totalCost);
                   
                    connection.destroy();
                });
            } else {
                console.log(object);
                // end connection
                connection.destroy();
            }
        });
    });
}