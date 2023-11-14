"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataSource = require("./data-source");
var _Comment = require("./entity/Comment");
var _Post = require("./entity/Post");
var _User = require("./entity/User");
_dataSource.AppDataSource.initialize().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var u1, p1, c1;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 创建 user1
            u1 = new _User.User();
            u1.username = "ClariS";
            u1.passwordDigest = "123456";
            _context.next = 5;
            return connection.manager.save(u1);
          case 5:
            console.log("users 数据填充了");

            // 创建 post1
            p1 = new _Post.Post();
            p1.title = "Post 1";
            p1.content = "My First Post";
            p1.author = u1;
            _context.next = 12;
            return connection.manager.save(p1);
          case 12:
            console.log("posts 数据填充了");

            // 创建 comment1
            c1 = new _Comment.Comment();
            c1.user = u1;
            c1.post = p1;
            c1.content = "xxx";
            _context.next = 19;
            return connection.manager.save(c1);
          case 19:
            console.log("comments 数据填充了");
            _context.t0 = connection.isInitialized;
            if (!_context.t0) {
              _context.next = 24;
              break;
            }
            _context.next = 24;
            return connection.destroy();
          case 24:
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