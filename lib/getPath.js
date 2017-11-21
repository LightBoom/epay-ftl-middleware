var path = require('path');
/**
 * 获取绝对路径，path相对于node执行目录
 */
module.exports = function (p) {
  return path.posix.join(process.cwd(), p);
}
