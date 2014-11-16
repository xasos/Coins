var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var coins = {name: '', position: '', price: '', ticker: '', volume: '', delta24hr: ''};
var coinList = [];
var stuff = {};
var target = 'http://coinmarketcap.com/';

var port = process.env.PORT || 1337;
var router = express.Router();
var coinName, pos, marketCap, price, volume, delta24hr;

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
		res.json(scrapeCoins(10));
	})

var scrapeCoins = function(numCoins) {
	request(target, function(err, resp, body) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(body);

			$('tr').each(function(i) {
				if ($(this).attr("id")) {
					coinName = JSON.stringify($(this).attr("id"));
				}

				pos = $(this).find('td').eq(0).text().trim();

				marketCap = $(this).find('td').eq(2).text().trim();
				marketCap = marketCap.slice(2).replace(/,/g, "");
				
				price = $(this).find('td').eq(3).text().trim();
				price = marketCap.slice(2).replace(/,/g, "");

				//console.log($(this).find('td').eq(4).text().trim());

				volume = $(this).find('td').eq(5).text().trim();
				volume = volume.slice(2).replace(/,/g, "");

				delta24hr = $(this).find('td').eq(6).text().trim();
				delta24hr = delta24hr.slice(0, -2);

				coins = {"name": coinName, "position": pos, "price": price, "ticker": "btc", "volume": volume, "delta24hr": delta24hr};
				coinList.push(coins);
			});			
			console.log(coinList);
		}
	});
		return {"yo": "yo"};	
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