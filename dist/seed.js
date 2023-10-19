"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataSource = require("./data-source");
var _Post = require("./entity/Post");
_dataSource.AppDataSource.initialize().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);
          case 2:
            posts = _context.sent;
            if (!(posts.length === 0)) {
              _context.next = 7;
              break;
            }
            _context.next = 6;
            return connection.manager.save(Array.from(new Array(40), function (_, index) {
              return new _Post.Post({
                title: "Post ".concat(index + 1),
                content: "\u8FD9\u662F\u6211\u7684\u7B2C".concat(index + 1, "\u7BC7\u6587\u7AE0")
              });
            }));
          case 6:
            console.log("posts 数据填充了");
          case 7:
            if (!connection.isInitialized) {
              _context.next = 10;
              break;
            }
            _context.next = 10;
            return connection.destroy();
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});