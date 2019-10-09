const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'myrefuge.cwqssovwkip1.us-east-1.rds.amazonaws.com',
    user     : 'root',
    password : 'password1',
    database : 'myRefugeDb'
  });
   
connection.connect(function(err) {
  if(err) throw err;
  console.log('Connection Established');
  var sql = `INSERT INTO passages (passage_text,passage_loc,category_id) VALUES (${passage.text},${passage.location},${passage.categoryId})`
  var values = [passage.text, passage.location, passage.categoryId]

  connection.query(sql, values, function (err, result) {
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows)
  })

})

//connection.end(); 
//console.log('Connection closed');




