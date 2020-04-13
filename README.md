# Bytom.js

This is the Bytom [JavaScript API][docs]

You need to run a bytom/bycoin environment to use this library.

## Installation

### Node

```bash
npm install bytom.js
```
## Usage

```js
// in node.js
var bytomJS = require('bytom.js');

var bytomJS = new bytomJS('http//remote-node');
console.log(bytomJS);

```

Additionally you can set a provider using `bytomJS.setProvider()` :

```js
bytomJS.setProvider('http//remote-node');
```

## Building

### Requirements

-   [Node.js](https://nodejs.org)
-   [npm](https://www.npmjs.com/)

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

### Building

Build only the bytom.js package:

```bash
npm run build
```

This will put all the browser build files into the `dist` folder.

### Testing (mocha)

```bash
npm test
```
