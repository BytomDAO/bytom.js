/*
 This file is part of bytom.js.

 bytom.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 bytom.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with bytom.js.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

import Client from "../client";
import _ from 'lodash';

let Blockcenter = function Blockcenter(provider) {
    // overwrite setProvider
  let _provider = provider || window.bytom.currentProvider || ''

  let client = new Client({
    url: _provider,
    chain: window.bytom ? window.bytom.chain : 'vapor'
  })


  this.setProvider = function (provider, chain) {
    _provider = provider
    client = new Client({
      url:  provider,
      chain: chain|| 'vapor'
    })

    return true;
  };


  this.queryAsset = function (id){
    return client.assets.list(id);
  }

  this.queryAll = function () {
    return client.assets.listAll().then((resp)=>{
      const result = _.filter(resp, function(o) { return o.symbol !== 'Asset'; });
      return result;
    });
  }

};



module.exports = Blockcenter;

