var getPath = require('./getPath');
var getDirFiles = require('./getDirFiles');
var directoryView = require('./directoryView');
/**
 * 渲染文件列表
 */
module.exports = function (req, res, next) {
  var files;
  var filterFiles = req.epayFilterFiles || require('./filterFiles');
  var filterMap = req.epayFilterMap;
  
  if ((files = filterMap[req.path]) /* 先根据map查询是否有配置 */
    || (files = filterFiles(req))) {
    render(res, files);
  } else {
    getDirFiles(getPath(req.path), function(err, files) {
      if (err) {
        console.error(err);
        next();
      } else {
        filterFiles(req, files);
        render(res, files);
      }
    })
  }

  function render(res, files) {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(directoryView(files))
  }
}