var path = require('path');
var getViewPath = require('./getViewPath');
var getData = require('./getData');
var spawn = require('child_process').spawn;
/**
 * 渲染ftl模版
 */
module.exports = function (req, res, next) {
  var view = getViewPath(req);
  var cmd = spawn('java', [
    '-jar',
    path.join(__dirname, '/jar/FMtoll.jar'),
    JSON.stringify({
      encoding: 'utf-8',
      viewFolder: view.root
    }),
    view.path,
    JSON.stringify(getData(req))
  ]);
  res.set('Content-Type', 'text/html; charset=utf-8');
  cmd.stdout.pipe(res);
  cmd.stderr.on('data', function(err) {
    console.error(err)
  });
  cmd.stderr.setEncoding('utf-8');
}
