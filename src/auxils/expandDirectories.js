var fs = require("fs");

module.exports = function expandDirectories (directories, prepend_directory=null, include_file_directory=false) {

  var paths = new Array();
  var original_path_size = 0;

  if (prepend_directory) {
    directories = directories.map(x => prepend_directory + x);
    original_path_size = prepend_directory.split("/").length;
  };

  for (var i = 0; i < directories.length; i++) {

    var relative = directories[i].split("/");

    if (include_file_directory) {
      relative.splice(relative.length - 1);
    };

    // Special loop
    for (var j = relative.length; j > 0; j--) {

      relative_path = Array.from(relative).slice(0, j);
      var path = relative_path.join("/");

      if (path === "") {
        continue;
      };

      if (paths.some(x => x.path === path) || relative_path.length < original_path_size) {
        continue;
      };

      paths.push({path: path, depth: relative_path.length});

    };

  };

  paths.sort((a, b) => a.depth - b.depth);

  for (var i = 0; i < paths.length; i++) {

    fs.mkdirSync(paths[i].path);

  };

};
