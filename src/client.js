import Connection from './connection'
import transactionApi from './api/transactions'
import balancesApi from './api/balances'
import assetsApi from './api/assets'

class Client {
  constructor(baseUrl) {
    this.connection = new Connection(baseUrl)

    this.transactions = new transactionApi(this.connection)
    this.balances = new balancesApi(this.connection)
    this.assets = new assetsApi(this.connection)
  }
}

module.exports = Client
