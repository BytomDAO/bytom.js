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

let Blockcenter = function Blockcenter() {
    // overwrite setProvider

  let client = new Client({
    url:  window.bytom.currentProvider,
    chain: window.bytom.chain || 'vapor'
  })

  let _provider = ''

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


};



module.exports = Blockcenter;

