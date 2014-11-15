# Coins

Cryptocurrency Price API written in Node.js/Express. Data is currently scraped from [TargetMoon](http://targetmoon.com/).

## Usage
**Base URL:** http://coins-api.herokuapp.com

**Output:** JSON

### Get Coin Prices

Get information about top coins

#### `GET /coins/:ticker`

Example Query:
```
http://coins-api.herokuapp.com/coins/btc
```

Response:
```json
{
  "coin": "Bitcoin",
  "ticker": "BTC",
  "price": "383.95",
  "24hrvolume": "12268800",
  "24hrchange": "-0.95",
  "supply": "13412775"
}
```

### Get Price in Other Currencies

#### `GET /coins/:ticker/:currency`

Example Query:
```
http://coins-api.herokuapp.com/coins/btc/chf
```

Response:
```json
{
  "price": "368.25"
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
$ (git add, git commit)
$ git push heroku master
```

## Credits
All the data was scraped from targetmoon.com. Additionally, these API documents were modeled off of the wonderful API documentation for [Hook](https://github.com/karan/Hook) by @karan.

## License
[MIT License](LICENSE)
