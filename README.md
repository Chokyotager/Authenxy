<div align="center">
  <br />
  <p>
    <a href="https://github.com/Chokyotager/Authenxy"><img src="/assets/Authenxy.png" alt="banner" /></a>
  </p>
  <br />
  <p>
  </p>
</div>

## About
Folder encryption open-source software in NodeJS.

## Installation
`npm install authenxy`

### Examples
#### Encrypting
```js
var authenxy = require("authenxy");
var fs = require("fs");


var encrypted = authenxy.encrypt(__dirname, "iliketrains");
fs.writeFileSync("trains.auxy", encrypted);
```

#### Decrypting
```js
var authenxy = require("authenxy");
var fs = require("fs");

var encrypted = fs.readFileSync("trains.auxy");
authenxy.decrypt(encrypted, "iliketrains", __dirname + "/trains/");
```

## Methods
1. `.encrypt(<folder directory>, <password>)`

Returns: `Buffer` of encrypted data.

2. `.decrypt(<buffer>, <password>, <output folder directory>)`

Expands the encrypted buffer into selected directory. If the directory already exists or an incorrect password is entered, an error will be thrown.

Returns: `null`.


## Algorithm
![Authenxy algorithm](/assets/Authenxy%20algorithm.png?raw=True)
