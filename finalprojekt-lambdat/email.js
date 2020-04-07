const fetch = require('node-fetch');
const aws = require('aws-sdk');
const ses = new aws.SES({region: 'eu-west-1'});
var lambda = new aws.Lambda({
    region: 'eu-west-1'
});

exports.handler = (event, context, callback) => {
    let user
    let response
    fetch('http://finalprojectapplication-env.eba-bixfaf3m.eu-west-1.elasticbeanstalk.com/api/'+ event.id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            user = {
                email: data.email
            }
            response = {
                email: user.email,
                message: event.message,
                emailSender: event.email
            };
            lambda.invoke({
                FunctionName: 'sesLamnbda',
                Payload: JSON.stringify(response, null, 2) // pass params
            }, function(error, data) {
                if (error) {
                    context.done('error', error);
                }
                if(data.Payload){
                    context.succeed(data.Payload)
                }
            });

            callback(null, response);
        });




};
