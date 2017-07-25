var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
/*var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
*/
var connector = new builder.ChatConnector({
    appId: d4b9df70-270c-46cf-b81b-8c9333dd1019,
    appPassword: 4WZZb69yqQtBqAFOWSah8H4
});
// Listen for messages from users 
server.post('/api/messages', connector.listen());



// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    
if(session.message.text=="Valerie")
{ 
session.send("MAMA! ", session.message.text);
}else{
session.send("You said: %s", session.message.text);}
});
