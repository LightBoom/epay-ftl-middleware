/**
 * 获取同步mock数据
 */
module.exports = function (req) {
  return req.$data || {};
}
