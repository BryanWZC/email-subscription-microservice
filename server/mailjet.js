const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const mailjet = require('node-mailjet');

const connection = mailjet
        .connect(
            process.env.MJ_APIKEY_PUBLIC,
            process.env.MJ_APIKEY_PRIVATE
        );

async function sendEmailGetMessageId(address){
    const emailAddress = address;

    const request = await connection
            .post('send', {version: 'v3.1'})
            .request({
                Messages:[
                    {
                        From: {
                            Email: 'services@awesomedev.ca',
                        },
                        To: [{
                            Email: emailAddress
                        }],
                        Subject: 'Welcome to the Pack',
                        TemplateID: 1761672,
                        TemplateLanguage: true,
                    }
                ]
            });
    const messageId = request.body.Messages[0].To[0].MessageID;
    return messageId;
}

async function getUserId(messageId){
    const request = await connection.get('message').id(messageId).request();
    return request.body.Data[0].ContactID
}

module.exports = {
    sendEmailGetMessageId,
    getUserId
}