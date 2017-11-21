/**
 * 过滤文件列表规则
 */
module.exports = function (req, files) {
  router = req.epayRouter;
  if (!files && req.path === '/') {
    files = [];
    for (var ro in router) {
      files.unshift({
        href: ro === '/' ? router[ro].routePath : ro.slice(1),
        text: router[ro].name
      });
    }
  } else if (files) {
    files.unshift('../');
  }
  return files;
}
