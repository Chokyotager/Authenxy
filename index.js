// Run Electron module

var encrypt = require("./src/encrypt.js");
var decrypt = require("./src/decrypt.js");

var fs = require("fs");

//var out = encrypt(__dirname + "/test", "passwordlock");
//fs.writeFileSync(__dirname + "/lcn.auxy", out);

decrypt(__dirname + "/lcn.auxy", "passwordlock");
