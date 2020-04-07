const aws = require('aws-sdk');
const ses = new aws.SES({region: 'eu-west-1'});

exports.handler = (event, context, callback) => {
    const para = {
        EmailAddress: event.email
    };


    const params = {
        Destination: {
            ToAddresses: [event.emailSender]
        },
        Message: {
            Body: {
                Text: {
                    Data: event.message

                }
            },
            Subject: {
                Data: "Uusi viesti Korona-apu -sovelluksesta"
            }
        },
        Source: event.email
    };

    ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            console.log(data);
            context.succeed(event);
        }
    });
}