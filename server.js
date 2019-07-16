require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const port = process.env.APP_PORT || 5000

const app = express();
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.post('/events', (req, res) => {
    pusher.trigger('github', 'push', {
        payload: req.body,
    });
    res.status(200).end();
});


const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});