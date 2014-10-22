# Coins

Cryptocurrency Price API written in Node.js/Express. Data is currently scraped from [TargetMoon](http://targetmoon.com/).

## Usage
**Base URL:** http://coins-api.herokuapp.com

### Get Coin Prices
```
GET /coins/:id
```

Example Query:
```
/coins/1299101
```

Response:
```
{"coin": "Bitcoin"
```

### Get Price in Other Currencies
```
GET /coins/:id/chf
```

Example Query:
```
/coins/1299101/chf
```

Response:
```
{
  "coin": "Bitcoin",
  "ticker": "BTC",
  "price": "383.95",
  "24hrvolume": "12268800",
  "24hrchange": "-0.95",
  "supply": "13412775"
}
```

## Run Locally
```sh
$ npm install
$ node server.js
```

## Deploy to Heroku 
```sh
$ npm install
$ heroku create
$ heroku addons:add mongolab
$ (git add, git commit)
$ git push heroku master
```

## Credits
All the data was scraped from targetmoon.com. Additionally, these API documents were modeled off of the wonderful API documentation for [Hook](https://github.com/karan/Hook) by @karan.

## License
[MIT License](LICENSE)
