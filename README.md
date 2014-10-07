# Coins

Cryptocurrency Price API written in Node.js/Express. Data is currently scraped from [CoinMarketCap](http://coinmarketcap.com/).
## Usage
**Base URL:** http://coins-api.herokuapp.com
9
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

## Credits
All the data was scraped from coinmarketcap.com. Additionally, these API documents were modeled off the wonderful API documentation for [Hook](https://github.com/karan/Hook) by @karan.

## License
[MIT License](LICENSE)
