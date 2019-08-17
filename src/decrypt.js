var auxils = require("./auxils.js");
var crypto = require("crypto");
var fs = require("fs");
var zlib = require("zlib");

module.exports = function (buffer, password, expand_to) {

  var data = buffer;

  var initialisation_vector = data.slice(data.length - 16);
  var zipped_data = data.slice(0, data.length - 16);

  var inflated = zlib.inflateSync(zipped_data);

  var password_salt = inflated.slice(inflated.length - 32);

  // Decipher
  var key = crypto.scryptSync(password, password_salt, 32);

  var decipher = crypto.createDecipheriv("aes-256-cbc", key, initialisation_vector);

  var decrypted = decipher.update(inflated.slice(0, inflated.length - 32));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Expand
  var out = JSON.parse(zlib.inflateSync(decrypted));

  var root_directory = expand_to;

  var directories = Object.keys(out.files);

  // Expand directories
  auxils.expandDirectories(directories, root_directory, true);

  for (var i = 0; i < directories.length; i++) {

    var key = directories[i];
    var file_data = out.files[key];
    fs.writeFileSync(root_directory + key, file_data, "binary");

  };

};
