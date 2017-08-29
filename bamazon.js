var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "aanthony13",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
buy();


});


var buy = function(){
    inquirer.prompt([
        {
            name:"id",
            message:"What is the id of the product you would like to buy?"
        },{
            name:"amount",
            message:"How many units would you like to buy?"
        }

    ]).then(function(answers){
        connection.query("SELECT stock_quantity, price FROM products WHERE ? ",[{id: answers.id}], function(err, res) {
            if (err) throw err;
            var quantity = res
            console.log("Item price is: " + quantity[0].price)
            
            if (quantity[0].stock_quantity >= answers.amount){
        var query = connection.query(
        
            "UPDATE products SET stock_quantity = stock_quantity - " + parseInt(answers.amount)+ " WHERE ?",
            [{
                id: answers.id
              }
            ]
           
          );
          console.log("Your total is: "+ quantity[0].price * answers.amount)
          connection.end()
        }
        else{
            console.log("Insufficient quantity!")
            buy()
        }
        })
        
    });
       
}


  
  



