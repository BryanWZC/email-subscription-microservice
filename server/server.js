const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

// Database 
const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Private modules
const {
    sendEmailGetMessageId,
    getUserId
} = require('./mailjet');

const email = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    mailjetUserId: {
        type: Number,
        required: true,
        unique: true
    },
    mailjetMessageId: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Email = mongoose.model('sub.email', email);

// Middleware
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);

// Express routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get('/dist/bundle.js', (req, res) => res.sendFile(path.join(__dirname, '../dist', 'bundle.js')));

app.get('/test', (req, res) => res.send('Route seems to work well.'));

app.get('/sent', (req, res) => res.sendFile(path.join(__dirname, '../public/success.html')));

app.get('/fail', (req, res) => res.sendFile(path.join(__dirname, '../public/fail.html')));

app.get('/404', (req, res) => res.sendFile(path.join(__dirname, '../public/404.html')));

app.get('/emails', async (req, res) => {
    const emailArr = (await Email.find({}).lean().exec()).map(json => {
        const { email } = json;
        return coverEmails(email);
    });
    res.json({ emails: emailArr });
});

app.post('/submit', async (req, res) => {
    try {
    const email = req.body.email.trim();
    const mailjetMessageId = await sendEmailGetMessageId(email);
    const mailjetUserId = await getUserId(mailjetMessageId);

    const findUpdate = await findUserAndUpdate(email, mailjetUserId);
    if(!findUpdate) await Email.create({ email, mailjetUserId, mailjetMessageId});

    res.status(200).redirect('/sent');
    } catch (error) {
        res.status(401).redirect('/fail');
    }
});

app.listen(3000, 
    async () => {
        await connect();
        console.log('Server is running. Listening on port 3000.');
    });

// Functions
/**
 * An error handler for express middleware
 */
function errorHandler(err, req, res, next){
    res.redirect('/404');
}

async function findUserAndUpdate(email, userId){
    return await Email.findOneAndUpdate({email}, {$push: {mailjetMessageId: [userId]}}, {useFindAndModify: false});
}

function coverEmails(email) {
    const arr = email.split('@');
    const username = arr[0];
    const length = arr[0].length; 
    return length > 3 ?
        `${username.slice(0,3).padEnd(length, '*')}@${arr.slice(1).join()}` :
        `${username[0].padEnd(length, '*')}@${arr.slice(1).join()}`;
}