var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');

var port = process.env.PORT || 1337;
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var coinList = [];
var target = 'http://coinmarketcap.com/';

router.use(function(req, res, next) {
	console.log('Request');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to coins-api! Documentation for querying the API is available here: https://github.com/xasos/Coins.' });
});

router.get('/coins/:id', function (req, res, next) {
  console.log('asdasd');
  next();
});

router.route('/coins') 
	.get(function(req, res) {		
		request(target, function(err, resp, body) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(body);
			var currentTime = Date.now();
	
			$('tr').each(function(i) {
				if ($(this).attr("id")) {
					var coinName = $(this).attr("id").slice(3);
				}

				var pos = $(this).find('td').eq(0).text().trim();

				var marketCap = $(this).find('td').eq(2).text().trim();
				marketCap = marketCap.slice(2).replace(/,/g, "");
				
				var price = $(this).find('td').eq(3).text().trim();
				price = price.slice(2).replace(/,/g, "");

				var ticker = $(this).find('td').eq(4).text().trim();
				ticker = ticker.split('\n').slice(1, 2).join('\n').trim();

				var volume = $(this).find('td').eq(5).text().trim();
				volume = volume.slice(2).replace(/,/g, "");

				var delta24hr = $(this).find('td').eq(6).text().trim();
				delta24hr = delta24hr.slice(0, -2);

				var coins = {"name": coinName, "position": pos, "price": price, "marketCap": marketCap, "ticker": ticker, "volume": volume, "delta24hr": delta24hr, "timestamp": currentTime, "currency": "usd"};
				if(coinName) {
					coinList.push(coins);
				}				
				console.log(coinList);
			});					
		}
	});
		res.json(coinList);
	});

// var scrapeCoins = function(numCoins) {
// 	request(target, function(err, resp, body) {
// 		if (!err && resp.statusCode == 200) {
// 			var $ = cheerio.load(body);

// 			$('tr').each(function(i) {
// 				if ($(this).attr("id")) {
// 					var coinName = $(this).attr("id").slice(3);
// 				}

// 				var pos = $(this).find('td').eq(0).text().trim();

// 				var marketCap = $(this).find('td').eq(2).text().trim();
// 				marketCap = marketCap.slice(2).replace(/,/g, "");
				
// 				var price = $(this).find('td').eq(3).text().trim();
// 				price = price.slice(2).replace(/,/g, "");

// 				var ticker = $(this).find('td').eq(4).text().trim();
// 				ticker = ticker.split('\n').slice(1, 2).join('\n').trim();

// 				var volume = $(this).find('td').eq(5).text().trim();
// 				volume = volume.slice(2).replace(/,/g, "");

// 				var delta24hr = $(this).find('td').eq(6).text().trim();
// 				delta24hr = delta24hr.slice(0, -2);

// 				var coins = {'name': coinName, 'position': pos, 'price': price, 'ticker': ticker, 'volume': volume, 'delta24hr': delta24hr, 'timestamp': Date.now()};
// 				if(coinName) {
// 					coinList.push(coins);
// 				}				
// 				console.log(coinList);
// 			});					
// 		}
// 	});	
// };

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
