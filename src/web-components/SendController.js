import bitcoin from 'bitcoinjs-lib'

const ChainAbstractionLayer = require('chainabstractionlayer/dist/bundle.js')

document.addEventListener('submitTransaction', function(e) {
  let address = e.detail.address
  let amount = e.detail.amount
  let currency = e.detail.currency
  let unit = e.detail.unit

  let chain

  if (currency === "btc") {
    chain = new ChainAbstractionLayer("bitcoin+s://bitcoin:local321@btc.leep.it/")

    chain.sendToAddress(address, amount)
      .then((result) => {
        console.log(result)
        document.dispatchEvent(new CustomEvent('submittedTransaction', { detail: { txid: result } }))
      })
      .catch((e) => {
        document.dispatchEvent(new CustomEvent('submittedTransaction', { detail: { txid: e.message } }))
      })
  } else {
    chain = new ChainAbstractionLayer("ethereum+s://bitcoin:local321@eth.leep.it/")

    document.dispatchEvent(new CustomEvent('submittedTransaction', { detail: { txid: 'Ethereum chain not yet supported' } }))
  }

  console.log('transaction sent')
})