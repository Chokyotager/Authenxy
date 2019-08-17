var auxils = require("./auxils.js");
var crypto = require("crypto");
var fs = require("fs");
var zlib = require("zlib");
var os = require("os");

module.exports = function (directory, password) {

  // Create cipher
  var initialisation_vector = crypto.randomBytes(16);
  var password_salt = crypto.randomBytes(32);

  var key = crypto.scryptSync(password, password_salt, 32);

  var cipher = crypto.createCipheriv("aes-256-cbc", key, initialisation_vector);
  var files = auxils.directoryTree(directory);

  var digestable = {files: new Object(), metadata: {
    node: {version: process.version, versions: process.versions},
    os: {type: os.type(), arch: os.arch(), cpus: os.cpus(), endianess: os.endianness(), release: os.release()},
    encrypted_at: new Date().getTime()
  }};

  for (var i = 0; i < files.length; i++) {

    var file_data = fs.readFileSync(files[i], "binary");
    var relative_directory = files[i].substring(directory.length);
    digestable.files[relative_directory] = file_data;

  };

  var data = Buffer.from(JSON.stringify(digestable));
  data = zlib.deflateSync(data);

  var encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final(), password_salt]);

  return Buffer.concat([zlib.deflateSync(encrypted), initialisation_vector]);

};
