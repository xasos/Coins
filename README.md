# Coins

Cryptocurrency Price API written in Node.js/Express. Data is currently scraped from [CoinMarketCap](http://coinmarketcap.com/).

## Usage
**Base URL:** http://coins-api.herokuapp.com

### Get Coin Prices
```
GET /coins/:id
```

Example Query:
```
http://hook-api.herokuapp.com/coins/1299101
```

Response:
```

```

### Get Price in Other Currencies
```
GET /coins/:id/chf
```

Example Query:
```
http://hook-api.herokuapp.com/coins/1299101/chf
```

Response:
```

```

## Run Locally
$ npm install
$ node server.js

## Deploy to Heroku 
$ npm install
$ heroku create
$ heroku addons:add mongolab
$ (git add, git commit)
$ git push heroku master

## Credits
All the data was scraped from coinmarketcap.com. Additionally, these API documents were modeled off of the wonderful API documentation for [Hook](https://github.com/karan/Hook) by @karan.

## License
[MIT License](LICENSE)
