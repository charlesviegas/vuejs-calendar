require('dotenv').config({silent: true});

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
const serialize = require('serialize-javascript');

moment.tz.setDefault('UTC');

app.use('/public', express.static(path.join(__dirname, 'public')));

let events = [
    {description: 'Randam event', date: moment('2017-06-10', 'YYYY-MM-DD')},
    {description: 'Randam event', date: moment('2017-06-12', 'YYYY-MM-DD')},
    {description: 'Randam event', date: moment('2017-06-20', 'YYYY-MM-DD')}
];

app.get('/', (req, res) => {
    let source = '<!--APP-->';
    let target = `<script>var __INITIAL_STATE__ = ${ serialize(events) }</script>`;
    let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    res.send(template.replace(source, target));
});


app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
    events.push(req.body);
    res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    const reload = require('reload');
    const reloadServer = reload(server, app);
    require('./webpack-dev-middleware').init(app);
}

server.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
    if (process.env.NODE_ENV === 'development') {
        require("open")(`http://localhost:${process.env.PORT}`);
    }
});
