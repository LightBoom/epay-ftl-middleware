var getPath = require('./getPath');
var renderFtl = require('./renderFtl');
var requireFile = require('./requireFile');
/**
 * 渲染文件
 */
module.exports = function (req, res, next) {
  if (/\.ftl$/.test(req.path)) {
    renderFtl(req, res, next)
  } else if (/\.js(on)?$/.test(req.path)) {
    requireFile(req, res, function (data) {
        res.json(data);
    });
  } else {
    res.sendFile(getPath(req.path));
  }
}
