require('dotenv').config();
require('./config/mongo')();
require("./cron").run();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/ping', require('./controllers/ping'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
