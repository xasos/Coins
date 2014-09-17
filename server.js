var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://heroku_app29621731:ecvpc0u4v5njka5rejrlcbvghe@ds035750.mongolab.com:35750/heroku_app29621731');


var port = process.env.PORT || 1337;
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to coins-api!' });
});

app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);