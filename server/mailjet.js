const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const mailjet = require('node-mailjet');

// provides a validation object to be sent to API
const connection = mailjet
        .connect(
            process.env.MJ_APIKEY_PUBLIC,
            process.env.MJ_APIKEY_PRIVATE
        );

/**
 * Sends an email and returns the Mailjet message Id to be stored in the database
 * 
 * @param  {String} address - Email address to send an email to 
 * @return {Promise}         - The Mailjet message id 
 */
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

/**
 * Get the Mailjet user id for a particular email
 * 
 * @param  {String} messageId - The message id of the email sent to an email address
 * @return {Promise}          - The Mailjet user id
 */
async function getUserId(messageId){
    const request = await connection.get('message').id(messageId).request();
    return String(request.body.Data[0].ContactID)
}

module.exports = {
    sendEmailGetMessageId,
    getUserId
}