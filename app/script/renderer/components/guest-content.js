'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var GuestContent = (function (_React$Component) {
    _inherits(GuestContent, _React$Component);

    function GuestContent(props) {
        _classCallCheck(this, GuestContent);

        _get(Object.getPrototypeOf(GuestContent.prototype), 'constructor', this).call(this, props);
        this.state = { guests: [] };
    }

    _createClass(GuestContent, [{
        key: 'render',
        value: function render() {
            alert('GuestContent render');

            return _react2['default'].createElement(
                'div',
                { className: 'guest-panel-root' },
                _react2['default'].createElement(
                    'div',
                    { className: 'guest-list-header' },
                    _react2['default'].createElement(
                        'strong',
                        null,
                        'Guest'
                    ),
                    _react2['default'].createElement(
                        'button',
                        { id: 'guest-add-button', className: 'guest-add-button' },
                        'Add'
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { id: 'guest-list', className: 'guest-list' },
                    _react2['default'].createElement(GuestList, { guests: this.state.guests })
                )
            );
        }
    }]);

    return GuestContent;
})(_react2['default'].Component);

exports['default'] = GuestContent;

var GuestList = (function (_React$Component2) {
    _inherits(GuestList, _React$Component2);

    function GuestList() {
        _classCallCheck(this, GuestList);

        _get(Object.getPrototypeOf(GuestList.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(GuestList, [{
        key: 'render',
        value: function render() {
            alert('GuestList render');

            var guests = this.props.guests.map(function (guest) {
                //Tweetクラスにtweetプロパティを追加してTweetクラスで使えるようにしている
                return _react2['default'].createElement(Guest, { guest: guest });
            });

            return _react2['default'].createElement(
                'ul',
                { className: 'list-group' },
                guests
            );
        }
    }]);

    return GuestList;
})(_react2['default'].Component);

var Guest = (function (_React$Component3) {
    _inherits(Guest, _React$Component3);

    function Guest() {
        _classCallCheck(this, Guest);

        _get(Object.getPrototypeOf(Guest.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Guest, [{
        key: 'render',
        value: function render() {
            alert('Guest render');

            return _react2['default'].createElement(
                'li',
                { className: 'guest-list-item' },
                _react2['default'].createElement('img', { src: this.props.guest.icon, className: 'guest-icon', width: '32', height: '32' }),
                _react2['default'].createElement(
                    'div',
                    { className: 'guest-body' },
                    _react2['default'].createElement(
                        'strong',
                        { className: 'guest-name' },
                        ' ',
                        gthis.props.guest.name,
                        ' '
                    )
                )
            );
        }
    }]);

    return Guest;
})(_react2['default'].Component);

module.exports = exports['default'];