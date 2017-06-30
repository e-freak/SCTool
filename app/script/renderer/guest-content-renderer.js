'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsGuestContent = require('./components/guest-content');

var _componentsGuestContent2 = _interopRequireDefault(_componentsGuestContent);

var GuestContentRenderer = (function () {
    function GuestContentRenderer(view) {
        _classCallCheck(this, GuestContentRenderer);

        this._view = view;
    }

    _createClass(GuestContentRenderer, [{
        key: 'initialize',
        value: function initialize() {
            alert('GuestContentRenderer initialize');
            var root = this._view.getElementById('guest-content-root');
            _reactDom2['default'].render(_react2['default'].createElement(_componentsGuestContent2['default']), root);
        }
    }]);

    return GuestContentRenderer;
})();

exports['default'] = GuestContentRenderer;
module.exports = exports['default'];