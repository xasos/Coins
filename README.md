# Coins

Cryptocurrency Price REST API written in Node.js. Data is scraped from [CoinMarketCap](http://coinmarketcap.com/).

*Note: This is an unofficial API and __not__ supported or controlled by CoinMarketCap itself. Any questions, comments, feedback or feature requests should be directed to [xasos](http://github.com/xasos) or via an [issue](https://github.com/xasos/Coins/issues) in this repo.*

**NOTICE**: Not complete, under active development.

## Usage
**Base URL:** http://coins-api.herokuapp.com

**Output:** JSON

### Get All Coin Prices

Get price information about all coins.

#### `GET /coins`

Example Query:
```
http://coins-api.herokuapp.com/coins
```

Response:
```json
  {
    "name": "bitcoin",
    "position": "1",
    "price": "356.51",
    "marketCap": "4847623128",
    "ticker": "BTC",
    "volume": "29824000",
    "delta24hr": "2.37",
    "timestamp": 1418325595612,
    "currency": "usd"
  },
  {
    "name": "ripple",
    "position": "2",
    "price": "0.016374",
    "marketCap": "505654484",
    "ticker": "XRP",
    "volume": "1620910",
    "delta24hr": "6.48",
    "timestamp": 1418325595612,
    "currency": "usd"
  },
  ...
  ...
```

### Get Individual Coin Prices

Get information about individual coins

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
### Isolated Properties

Simply append any property to the URL after the ticker

#### `GET /coins/:ticker/:property`

Example Query:
```
http://coins-api.herokuapp.com/coins/btc/supply
```

Response:
```json
{
  "supply": "13412775"
}
```

### Get Price in Other Currencies

#### `GET /coins/:ticker/price/:currency`

Example Query:
```
http://coins-api.herokuapp.com/coins/btc/price/chf
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
$ node app.js
```

## Deploy to Heroku 
```sh
$ npm install
$ heroku create
$ (git add, git commit)
$ git push heroku master
```

## Credits
All the data was scraped from [CoinMarketCap](http://coinmarketcap.com/). The currency converter uses the [The Free Currency Converter API](http://www.freecurrencyconverterapi.com/). Additionally, these API documents are modeled off the wonderful API documentation for [Hook](https://github.com/karan/Hook) by @karan.

## License
[MIT License](LICENSE)
