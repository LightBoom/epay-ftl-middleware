var getPath = require('./getPath');
/**
 * 获取根目录路径
 */
module.exports = function (req) {
  router = req.epayRouter;
  for (var ro in router) {
    if (req.path.indexOf(router[ro].base) === 0) {
      var p = req.path.replace(router[ro].base, '/')
      return {
        root: getPath(router[ro].base),
        path: p.slice(1)
      }
    }
  }
}
