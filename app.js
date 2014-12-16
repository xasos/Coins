var express = require('express');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var http = require('http');
var port = process.env.PORT || 1337;
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var coinList = [];
var target = 'http://coinmarketcap.com/';

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.json({
        message: 'Welcome to coins-api! Documentation for querying the API is available here: https://github.com/xasos/Coins.'
    });
});

router.route('/coins/:ticker?/:property?')
    .get(function(req, res) {
        var ticker = req.params.ticker;
        var property = req.params.property;
        
        if (ticker) {
            if (property) {

            }
            else {

            }
        }        

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

                    var coins = {
                        name: coinName,
                        position: pos,
                        price: price,
                        currency: "usd",
                        marketCap: marketCap,
                        ticker: ticker,
                        volume: volume,
                        delta24hr: delta24hr,
                        timestamp: currentTime
                    };

                    if (coinName) {
                        coinList.push(coins);
                    }
                    console.log(coinList);
                });
            }
        });
        res.json(coinList);
    });
    
router.route('/coins/:ticker?/price/:currency')
    .get(function(req, res) {
        var ticker = req.params.ticker;
        var currency = req.params.currency;
        var requestURL = 'http://freecurrencyconverterapi.com/api/v2/convert?q=USD_'  

        if (ticker && currency) {
            requestURL += currency + '&compact=y'
            request(requestURL, function (error, response, body) {
                if (!error && response.statusCode == 200 && !isEmpty(body)) {
                    res.send(body);
                }
            });
        }
        else {
            res.status(500);
            res.render('error', { error: err });
        }    
    });

function isEmpty( obj ) { 
    for ( var prop in obj ) { 
        return false; 
    } 
    return true; 
}

function getCoinData() {

}

function convertCurrency() {
    var requestURL = 'http://freecurrencyconverterapi.com/api/v2/convert?q=USD_'  

    if (ticker && currency) {
        requestURL += currency + '&compact=y'
        request(requestURL, function (error, response, body) {
            if (!error && response.statusCode == 200 && !isEmpty(body)) {
                res.send(body);
            }
        });
    }
}

app.use('/', router);
app.listen(port);
console.log('Listening on port ' + port);
