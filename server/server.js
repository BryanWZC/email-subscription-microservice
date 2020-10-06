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

const email = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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

app.post('/submit', async (req, res) => {
    res.json(await Email.create({ email: req.body.email }));
});

app.get('/emails', async (req, res) => {
    const emailArr = (await Email.find({}).lean().exec()).map(json => {
        const { email } = json;
        return email;
    });
    res.json({ emails: emailArr });
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
    res.status(500).render('error', {error: err});
}