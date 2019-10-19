const mysql = require('mysql')


// Create Connection
const db = mysql.createConnection({
    host     : 'myrefuge.cwqssovwkip1.us-east-1.rds.amazonaws.com',
    user     : 'root',
    password : 'password1',
    database : 'myRefuge'
  })
  


// Connect
db.connect(function(err) {
  if(err) throw err;
  console.log('Connection Established')

  })



//connection.end(); 
//console.log('Connection closed');

// Export connection as Middleware
module.exports = db