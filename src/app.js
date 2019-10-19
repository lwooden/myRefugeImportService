const request = require('request')
const db = require('./../db/dbconnect')


const getPassageDetails = (verseRef, translation, categoryId, callback) => {

  // build url dynamically based on args passed
  url = 'http://bible-api.com/' + verseRef + '?' + 'translation=' + translation

  // make the request
  request({url, json: true}, (error, response, body) => { 

    passage = {
      "location": undefined,
      "text": undefined,
      "categoryId": undefined
    }

    // error checking   
    if(error) {   
      callback("Unable to connect to Bible service!", undefined)
      }
      
      // update the passage object with values from the response
      passage.location = body.reference
      passage.text = body.verses[0].text
      passage.categoryId = categoryId

      // pass the newly updated passage object back to the function caller
      callback(passage)

     })

}

const postToSql = (passage) => {

  return new Promise((resolve, reject) => {
      //you'll have to make a db object before this

      // build SQL Query
      let sql = "INSERT INTO `passages` (`passage_text`,`passage_loc`,`category_id`) VALUES ('"+passage.text+"','"+passage.location+"','"+passage.categoryId+"')"
      //var values = [passage.text, passage.location, passage.categoryId]
      
      db.query(sql, function (err, result) {

        // error handling
        if(err) {

          reject("Error posting to databse => " + err)
        }

        resolve(result)

        // success validation
        console.log("Insert Row : " + result.insertId)
        console.log("Number of rows affected : " + result.affectedRows)
        console.log("Number of records affected with warning : " + result.warningCount)

        // close the connection
        db.end()
  
      })

    })

  }



getPassageDetails('john 3:24', 'kjv', 1, (passage) => {
  //console.log(passage)
  postToSql(passage)
})