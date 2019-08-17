var fs = require("fs");

module.exports = function directoryTree (directory, remove_root=false) {

  var sub_directories = fs.readdirSync(directory).map(x => directory + "/" + x);
  var ret = new Array();

  for (var i = 0; i < sub_directories.length; i++) {

    if (fs.lstatSync(sub_directories[i]).isDirectory()) {

      ret = ret.concat(directoryTree(sub_directories[i]));
      continue;

    };

    ret.push(sub_directories[i])

  };

  if (remove_root) {

    ret.map(x => x.substring(directory.length));

  };

  return ret;

};
