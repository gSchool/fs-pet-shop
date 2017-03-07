const morgan = require('morgan');
const express = require('express');
const app = express();
const routes = require('./routes2.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

app.listen(PORT, function () {
    console.log(`app listening on port ${PORT}`);
});

module.exports = app
