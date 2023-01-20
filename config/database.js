 let mysql = require('mysql');

 let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db_crud_api'
 })

 connection.connect( function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('connection succuessfuly');
  }
 })

 module.exports = connection;