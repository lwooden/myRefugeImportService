const request = require('request')
const fetch = require("node-fetch");
const db = require('./../db/dbconnect')

passage = {
    "location": undefined,
    "text": undefined,
    "categoryId": undefined
}

//'http://bible-api.com/john 3:16?translation=kjv'

const getPassageDetails = async (verseRef, translation, categoryId) => {

    url = 'http://bible-api.com/' + verseRef + '?' + 'translation=' + translation

    try {
      const response = await fetch(url);
      const json = await response.json();

      passage.location = json.reference
      passage.text = json.verses[0].text
      passage.categoryId = categoryId

      //console.log(json);
      console.log(passage)
      console.log(passage.text)

     let sql = `INSERT INTO passages (passage_text,passage_loc,category_id) VALUES (${passage.text},${passage.location},${passage.categoryId})`
     db.query(sql, (error, result) => {
        if(err) {
          throw err
        }
        console.log(result.affectedRows)
        // let dbResponse = await postToSql(passage)
        // console.log(dbResponse)

     })

    } catch(error) {
        console.log(error)

    }

  }

  // const postToSql = (passage) => {

  //   return new Promise((resolve, reject) => {
  //     //you'll have to make a db object before this

  //     var sql = `INSERT INTO passages (passage_text,passage_loc,category_id) VALUES (${passage.text},${passage.location},${passage.categoryId})`
  //     var values = [passage.text, passage.location, passage.categoryId]
      
  //     connection.query(sql, values, function (err, result) {
  //       if(err) {
  //         reject("Error posting to databse => " + err)
  //       }

  //       resolve(result)
  
  //     })

  //   })

  // }

getPassageDetails('john 3:16', 'kjv', 1)




