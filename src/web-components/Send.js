const uuidv1 = require('uuid/v1');

export class Send extends HTMLElement {
  static get observedAttributes() {
    return ['options'];
  }

	constructor() {
		super();

    this.uuid = uuidv1()

    this.address = ''
    this.amount = ''
    this.txid = ''

    this.currency = "btc"
    this.unit = "btc"

    this._innerHtml = this._innerHtml.bind(this)
    this._unitSelect = this._unitSelect.bind(this)
    this._currencySelect = this._currencySelect.bind(this)
    this._currencySelector = this._currencySelector.bind(this)
    this._optionsSelect = this._optionsSelect.bind(this)
    this._setup = this._setup.bind(this)
	}

	connectedCallback() {
    let _this = this

    if (!this.hasAttribute('cryptocurrency'))
      this.setAttribute('cryptocurrency', 'btc')
    this.currency = this.getAttribute('cryptocurrency')
    if (!this.hasAttribute('cryptounit'))
      this.setAttribute('cryptounit', 'btc')
    this.unit = this.getAttribute('cryptounit')
    if (!this.hasAttribute('fiatcurrency'))
      this.setAttribute('fiatcurrency', 'usd')
    if (!this.hasAttribute('fiatunit'))
      this.setAttribute('fiatunit', 'dollar')  
    this.setAttribute('uuid', this.uuid)

    this._innerHtml()

    this._setup()

    this._currencySelect()
    this._unitSelector()
	}

  set options(value) {
    const isOptions = Boolean(value)
    if (isOptions)
      this.setAttribute('options', '')
    else
      this.removeAttribute('options')
  }

  get options() {
    return this.hasAttribute('options')
  }

  _setup() {
    let _this = this

    this.addressInput = document.getElementById(`${this.uuid}-address`)

    this.addressInput.addEventListener('change', function (e) {
      _this.address = e.srcElement.value
      console.log(this.address)
    })

    this.amountInput = document.getElementById(`${this.uuid}-amount`)

    this.amountInput.addEventListener('change', function(e) {
      _this.amount = e.srcElement.value
      console.log(this.amount)
    })

    this.submit = document.getElementById(`${this.uuid}-submit`)

    this.submit.addEventListener('click', function() {
      document.dispatchEvent(new CustomEvent('submitTransaction', { detail: { 
        address: _this.address, 
        amount: _this.amount,
        currency: _this.currency,
        unit: _this.unit
      }}))
    })

    document.addEventListener('submittedTransaction', function(e) {
      document.getElementById(`${_this.uuid}-transaction-box`).innerHTML = `
        <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-file-code"></i></div>
          </div>
          <input type="text" class="form-control" id="${this.uuid}-transaction-id" value="${e.detail.txid}">
        </div>
      `
    })
  }

  _currencySelect() {
    let _this = this

    this.currencySelect = document.getElementById(`${this.uuid}-currency-select`)

    _this.currencySelect.value = this.currency

    this.currencySelect.addEventListener('change', function(e) {
      console.log(e)
      _this.currency = e.srcElement.value
      _this._innerHtml()
      _this._setup()
      _this._currencySelect()
      _this._unitSelector()
      _this.currencySelect.value = e.srcElement.value
    })
  }

  _currencySelector() {
    if (this.currency === "btc") {
      return `
        <option value="btc" selected>BTC</option>
        <option value="eth">ETH</option>
      `
    } else {
      return `
        <option value="btc">BTC</option>
        <option value="eth" selected>ETH</option>
      `
    }
  }

  _unitSelect() {
    if (this.currency === "btc") {
      this.unit = "btc"
      return `
        <option value="btc" selected>BTC</option>
        <option value="mbtc">mBTC</option>
        <option value="sat">sat</option>
        <option value="usd">USD</option>
      `
    } else if (this.currency === "eth") {
      this.unit = "eth"
      return `
        <option value="eth" selected>ETH</option>
        <option value="gwei">Gwei</option>
        <option value="wei">Wei</option>
        <option value="usd">USD</option>
      `
    }
  }

  _unitSelector() {
    let _this = this

    this.unitSelect = document.getElementById(`${this.uuid}-unit-select`)

    this.unitSelect.addEventListener('change', function(e) {
      console.log(e)
      _this.unit = e.srcElement.value
      _this._innerHtml()
      _this._setup()
      _this._currencySelect()
      _this._unitSelector()
      _this.unitSelect.value = e.srcElement.value
    })
  }

  _optionsSelect() {
    if (this.options) {
      return `
        <div class="col-sm-3 my-1">
          <label for="customRange1">Currency</label>
          <select class="custom-select" id="${this.uuid}-currency-select">
            ${this._currencySelector()}
          </select>
        </div>
        <div class="col-sm-3 my-1">
          <label for="customRange1">Unit</label>
          <select class="custom-select" id="${this.uuid}-unit-select">
            ${this._unitSelect()}
          </select>
        </div>
      `
    } else {
      return ``
    }
  }

  _currencyIcon() {
    if (this.currency === "btc") {
      return `<i class="fab fa-bitcoin"></i>`
    } else if (this.currency === "eth") {
      return `<i class="fab fa-ethereum"></i>`
    }
  }

	_innerHtml() {
		this.innerHTML = `
      <div class="form-row align-items-center">
        ${this._optionsSelect()}
        <div class="col-sm-7 my-1">
          <label class="sr-only" for="inlineFormInputGroupUsername">Address</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text"><i class="fas fa-qrcode"></i></div>
            </div>
            <input type="text" class="form-control" id="${this.uuid}-address" placeholder="Address">
          </div>
        </div>
        <div class="col-sm-7 my-1">
          <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">${this._currencyIcon()}</div>
            </div>
            <input type="text" class="form-control" id="${this.uuid}-amount" placeholder="Amount">
          </div>
        </div>
        <div class="col-sm-7 my-1">
          <button type="submit" class="btn btn-primary btn-block form-control" id="${this.uuid}-submit">Submit</button>
        </div>
      </div>
      <div class="form-row align-items-center">
        <div class="col-sm-7 my-1" id="${this.uuid}-transaction-box">
          <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text"><i class="fas fa-file-code"></i></div>
            </div>
            <input type="text" readonly class="form-control" id="${this.uuid}-transaction-id" placeholder="Transaction ID">
          </div>
        </div>
      </div>
		`
	}
}

customElements.define('crypto-send', Send);
