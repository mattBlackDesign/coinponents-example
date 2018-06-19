import bitcoin from 'bitcoinjs-lib'

const ChainAbstractionLayer = require('chainabstractionlayer/dist/bundle.js')

document.addEventListener('getBalance', function(e) {
  let source = e.detail.source

  if (source === "chain") {
    let chain = new ChainAbstractionLayer("bitcoin+s://bitcoin:local321@btc.leep.it/")

    chain.getBalance().then((data) => {
      document.dispatchEvent(new CustomEvent('gotBalance', { detail: { balance: parseInt(data), units: 'btc' } }))
    })
  } else if (source === "metamask") {
    web3.eth.getBalance(web3.eth.accounts[0], function(error, result) {
      if (!error)
        document.dispatchEvent(new CustomEvent('gotBalance', { detail: { balance: parseCurrency(result, web3), units: 'eth' } }))
      else
        console.log('Error: ', error)
    })
  }

  console.log('got balance')
})

document.addEventListener('cryptoToFiat', function(e) {
  let crypto = e.detail.crypto
  let balance = parseInt(e.detail.balance)
  fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let crypto_type = json.filter((elem) => elem.symbol === crypto.toUpperCase())

      let price = parseFloat(crypto_type[0].price_usd)

      document.dispatchEvent(new CustomEvent('gotCryptoToFiat', { detail: { balance: balance * price }}))
    })
})

function parseCurrency(result, web3) {
  return parseAmt(web3.fromWei(result.toString(), "ether"))
}

function parseAmt(amt) {
  return parseFloat(amt).toFixed(2)
}