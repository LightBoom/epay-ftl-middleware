/**
 * 文件列表视图
 */
module.exports = function (files) {
  return (
    '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
    '<title>FreemarkerMiddleware</title>' +
    '</head>' +
    '<body>' +
    '<ul>' +
    files.map(function(option) {
      if (typeof option === 'string') {
        option = {
          href: option,
          text: option
        }
      }
      return '<li><a href="' + option.href + '">' + option.text + '</a></li>'
    }).join('') +
    '</ul>' +
    '</body>' +
    '</html>'
  )
}
