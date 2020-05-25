/**
 * Any balance on the blockchain is simply a summation of unspent outputs.
 *
 * @typedef {Object} Balance
 * @global
 *
 * @property {Number} amount
 * Sum of the unspent outputs.
 *
 * @property {String} account_alias
 * Account alias.
 *
 * @property {String} account_id
 * Account id.
 *
 * @property {String} asset_id
 * Asset id.
 *
 * @property {String} asset_alias
 * Asset alias.
 *
 * @property {Object} asset_definition
 * Asset definition
 */
import _ from 'lodash';
import { BTM } from  '../utils/environment'
const BN = require('bn.js');

/**
 * API for interacting with {@link Balance balances}.
 *
 * @module BalancesApi
 */
const balancesApi = (connection) => {
  return {
    /**
     * Get asset balances by account.
     *
     * @param {Object} params - Filter and pagination information.
     * @param {String} params.account_id account id.
     * @returns {Promise<Array<Balance>>} The result balances.
     */
    list: (address) => connection.request(`/account/address?address=${address}`, '', 'GET').then((resp)=>{
      const balances = resp.balances.map((balance)=> {
        delete balance['inUsd']
        delete balance['inCny']
        delete balance['inBtc']
        delete balance['totalReceived']
        delete balance['totalSent']

        balance.symbol = balance.asset.symbol
        balance.name = balance.asset.name
        balance.asset = balance.asset.assetId

        return balance
      })

      return balances
    }),
  }
}

export default balancesApi
