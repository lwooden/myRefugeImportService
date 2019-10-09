const request = require('request')
const fetch = require("node-fetch");

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

    } catch (error) {
      console.log(error);
    }

    // call database function to save passage.text
    // call database function to save passage.categoryId


  }

getPassageDetails('john 3:16', 'kjv', 1)




