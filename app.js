var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());



// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {

if(session.message.text!="")
{ 


request({
    url: ""+process.env.ENDPOINT_URL,
    method: "POST",
    json: false,   // <--Very important!!!
    body: "message_in="+session.message.text
}, function (error, response, body){

      var parseThis = JSON.parse(body);
      session.send(parseThis.message);
});


}else{
session.send("You said: %s", session.message.text);}
});
