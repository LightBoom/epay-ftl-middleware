var fs = require('fs');
var getPath = require('./getPath');
var path = require('path');
/**
 * require文件
 */
module.exports = function (req, res, callback = function(){}) {
    try {
        var p = getPath(req.path);
        delete require.cache[require.resolve(p)];
        try {
          var mod = require(p);
        } catch(err) {
          if (path.extname(p) === '.json') {
            var code = '(function(){return ' + fs.readFileSync(p, 'utf-8') + '})()';
            callback(eval(code));
          } else {
            throw err;
          }
        }
        if (typeof mod === 'function') {
            if (mod.length >= 2) {
                mod(req, function(data) {
                    callback(data);
                });
            } else {
                callback(mod(req));
            }
        } else {
            callback(mod);
        }
    } catch(err) {
        res.send(err.message);
    }
}
