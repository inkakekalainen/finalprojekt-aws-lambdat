const fetch = require('node-fetch');
const aws = require('aws-sdk');
var AWS = require('aws-sdk');
var lambda = new aws.Lambda({
    region: 'eu-west-1'
});

var timestamp = new Date();

exports.handler = (event, context, callback) => {


    var params = {
        Message: "Nimi: " + event.name + "\n"
            +"Sähköposti: " + event.email + "\n"
            + "Viesti: " + event.message + "\n"
            + "timestamp: " + timestamp,
        TopicArn: 'arn:aws:sns:eu-west-1:194825235352:Uusi_Viesti_Koronasaitilta'
    };

// Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    publishTextPromise.then(
        function(data) {
            console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
            console.log("MessageID is " + data.MessageId);
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });
}