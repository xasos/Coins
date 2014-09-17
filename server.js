var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var Coins = require('./app/models/coins');
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_app29621731:ecvpc0u4v5njka5rejrlcbvghe@ds035750.mongolab.com:35750/heroku_app29621731');

var port = process.env.PORT || 1337;
var router = express.Router();

router.use(function(req, res, next) {
	console.log('omgomgomg.');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to coins-api!' });
});

router.route('/coins') 
	.post(function(req, res) {
		
		var coin = new Coins(); 		
		coin.name = req.body.name;  

		// save the bear and check for errors
		coin.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Coin created!' });
		});
		
	})

	.get(function(req, res) {
		Coins.find(function(err, coins) {
			if (err) {
				res.send(err);
			};

			res.json(coins);
		});
	});

app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);