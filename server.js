var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var urls = [];
var coinList = {name: '', price: '', ticker: '', delta24hr: ''}
var target = 'http://coinmarketcap.com/';

var port = process.env.PORT || 1337;
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Request');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to coins-api!' });
});

router.route('/coins') 
	.get(function(req, res) {
		Coins.find(function(err, coins) {
			if (err) {
				res.send(err);
			};

			res.json(coins);
		});
	});

router.route('/test') 
	.get(function(req, res) {
		scrapeCoins(10);
		res.json({"text": "yo"});
	})

var scrapeCoins = function(numCoins) {
	request(target, function(err, resp, body) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(body);
			$('tr').each(function(i) {
				if ($(this).attr("id")) {
					var coinName = JSON.stringify($(this).attr("id"));
					console.log(coinName.substring(4, coinName.length - 1));
				}

				console.log($(this).find('td'));				
			});
		}
	});
};

// router.route('/coins/:coin_id') 
// 	.get(function(req, res) {
// 		Coin.findById(req.params.coin_id, function(err, coin) {
// 			if (err) {
// 				res.send(err);
// 			};

// 			res.json(coin);
// 		});
// 	});
// }

app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);