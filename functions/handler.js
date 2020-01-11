'use strict';


module.exports.addSubscriber = async function (event) {

  const email = event.queryStringParameters.email

  const Mailchimp = require('mailchimp-api-v3')

  const mailchimp = new Mailchimp("24698b3cbe514209e82fb084cb6d84e5-us20");

  return mailchimp.post('/lists/4a61409add/members', {
    "email_address": email,
    "status": 'pending',
    "tags": ["firebaseSignup"],
    "merge_fields": {
      "SOURCE": "sidebox"
    }

  }).then((results) => {
    console.log('added new user to mailchimp list', results);

    let response = {
      statusCode: 200,
      headers: {
        "x-custom-header": "my custom header value",
        "content-type": "application/json",
        "Access-Control-Allow-Origin": '*'
        //****** needed to add the next 3 lines
      },
      body: JSON.stringify({ status: "success", message: "awaiting confirmation" })
    };
    console.log("response: " + JSON.stringify(response))
    return response;


  })
    .catch((err) => {

      console.log('err:', err.status)

      let response = {
        statusCode: err.status,
        headers: {
          "x-custom-header": "my custom header value",
          "content-type": "application/json",
          "Access-Control-Allow-Origin": '*'
          //****** needed to add the next 3 lines
        },
        body: JSON.stringify({ status: "error", message: err.title })
      };
      console.log("response: " + JSON.stringify(response))
      return response
    })
};

