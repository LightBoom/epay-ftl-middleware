// ===================================================
// copy a lot of code from freemarker-middleware: https://github.com/luobotang/freemarker-middleware
// ===================================================

module.exports = function({
  router,
  filterFiles,
  filterMap = {}
}) {
	var fs = require('fs');
	var path = require('path');
  var renderDirectory = require('./lib/renderDirectory');
  var renderFile = require('./lib/renderFile');
  var requireFile = require('./lib/requireFile');
  var getPath = require('./lib/getPath');

  // 从视图路径路由到相对于node进程的真实路径
  return function (req, res, next) {
    req.epayRouter = router;
		for (var ro in router) {
			if (ro !== '/' && req.path.indexOf(ro) === 0) {
				req.url = req.path.replace(ro, router[ro].base);
				return renderMiddleware(req, res, next);
			} else if (ro === '/' && req.path.length > 1) {
				req.url = req.path.replace(router[ro].routePath, '/').replace(ro, router[ro].base);
				return renderMiddleware(req, res, next);
			}
		}
		return renderMiddleware(req, res, next);
	}

  // 渲染文件夹或文件
	function renderMiddleware(req, res, next) {
		fs.stat(getPath(req.path), function(err, stats) {
			if (err) return noExtnameRenderMiddleware(req, res, next);
			if (stats.isDirectory()) {
        req.epayFilterFiles = filterFiles; // 文件夹信息过滤规则
        req.epayFilterMap = filterMap; // 直接mock route对应files
				renderDirectory(req, res, next);
			} else if (stats.isFile()) {
				renderFile(req, res, next);
			} else {
				next();
			}
		});
	}

  // 无后缀文件渲染
  function noExtnameRenderMiddleware(req, res, next) {
      if (path.extname(req.path) === '') {
          requireFile(req, res, function (data) {
              res.json(data);
          });
      } else {
          next();
      }
  }
}