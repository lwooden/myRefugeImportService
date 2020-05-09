const request = require('request')

const getPassageDetails = (verseRef, translation, categoryId, callback) => {

  url = 'http://bible-api.com/' + verseRef + '?' + 'translation=' + translation

  request({url, json: true}, (error, response, body) => { 

    passage = {
      "passageLocation": undefined,
      "passageText": undefined,
      "categoryId": undefined
    }
 
    if(error) {   
      callback("Unable to connect to Bible service!", undefined)
      }
      // update the passage object with values from the response
      passage.passageLocation = body.reference
      passage.passageText = body.verses[0].text
      passage.categoryId = categoryId

      // pass the newly updated passage object back to the function caller
      callback(passage)

     })

}

const postToAPI = (passage) => {
  url = 'http://localhost:3001/api/passages'
  request.post({url, json: passage}, (error, response, body) => { 
    if (error) {
      console.error(error)
      return
    }

    console.log(`statusCode: ${response.statusCode}`)
    console.log(body)
  })
}



getPassageDetails('john 3:25', 'kjv', 1, async (passage) => {
  //console.log(passage)
  await postToAPI(passage)
})