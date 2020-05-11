var path = require("path");

exports.pathHelper = function() {
  const localPath = Array.prototype.slice.call(arguments, 0);
  const _root = path.resolve(__dirname);
  const relativePath = [_root].concat(localPath);
  return path.join.apply(path, relativePath);
};