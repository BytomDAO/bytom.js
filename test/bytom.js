/* eslint-env mocha */

const bytom = require('../dist/index.js')
const uuid = require('uuid')
const chai = require('chai')
const assert = require('assert')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

const url = 'http://https://bcapi.bystack.com/'

const Bytom = new bytom()

let mockHsmKey, xAssetId, yAssetId

describe('Bytom.js', () => {
  describe('Bytom.version', () => {

    it('successful', () => {
      console.log(Bytom.version)
      return expect(Bytom.version).to.be.
    })

    it('rejected due to missing key fields', () => {
      return expect(client.assets.create({alias: 'asset'})).to.be.rejectedWith('BTM202')
    })
  })

  describe('Single asset creation', () => {

    it('successful', () => {
      return client.assets.create({
        alias: `asset-${uuid.v4()}`,
        definition: {
          decimals: 8,
          description: {},
          name: `TESTASSET-${uuid.v4()}`,
          symbol: `TESTASSET-${uuid.v4()}`
        },
        root_xpubs: [mockHsmKey.xpub],
        quorum: 1})
        .then(resp => expect(resp.id).not.to.be.empty)
    })

    it('rejected due to missing key fields', () => {
      return expect(client.assets.create({alias: 'asset'})).to.be.rejectedWith('BTM202')
    })
  })


  describe('Single asset alias update', () => {

    it('successful', () => {
      const alias = `asset-${uuid.v4()}`
      return client.assets.updateAlias({
        id: xAssetId,
        alias: alias
      })
        .then(() => {
          return client.assets.list(xAssetId)
        })
        .then(page => {
          assert.deepEqual(page.alias, alias.toUpperCase())
        })
    })

    it('rejected due to missing ID/Alias', () => {
      return expect(
        client.assets.updateAlias({
          // ID/Alias intentionally omitted
          alias: `asset-${uuid.v4()}`,
        })
      ).to.be.rejectedWith('BTM000')
    })
  })

  describe('listAll', () => {
    it('success example', () => {
      return client.assets.listAll()
      .then((resp) => {
        expect(resp.map(item => item.alias)).to.be.an('array').that.include(yAssetAlias.toUpperCase())
      })
    })

    it('list success', () => {
      return client.assets.list(xAssetId)
      .then(page => {
        assert.deepEqual(page.id, xAssetId)
      })
    })
  })
})