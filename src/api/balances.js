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
    list: (guid) => connection.request('/account/list-addresses', {guid}).then((resp)=>{
      let voteBalance
      const votes = (resp[0].votes || [])
      if(votes.length>0){
        voteBalance = new BN(_.sumBy(votes,'total'))
      }

      const balances = resp[0].balances.map((balance)=> {
        delete balance['icon']
        delete balance['alias']
        delete balance['inUsd']
        delete balance['inCny']
        delete balance['inBtc']
        delete balance['totalReceived']
        delete balance['totalSent']

        if(voteBalance && balance.asset === BTM){
          balance.availableBalance = (new BN(balance.balance).sub(voteBalance)).toString()
        }else{
          balance.availableBalance = balance.balance
        }

        return balance
      })

      return balances
    }),
  }
}

export default balancesApi
