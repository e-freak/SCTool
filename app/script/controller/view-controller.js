/**
 * view-controller.js
 * 
 * SCToolのビュー全体を管理する
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _menuController = require('./menu-controller');

var _menuController2 = _interopRequireDefault(_menuController);

var _menuType = require('./menu-type');

var _menuType2 = _interopRequireDefault(_menuType);

var _guestController = require('./guest-controller');

var _guestController2 = _interopRequireDefault(_guestController);

var _tableController = require('./table-controller');

var _tableController2 = _interopRequireDefault(_tableController);

var _seatingChartSeatingChartManager = require('../seating-chart/seating-chart-manager');

var _seatingChartSeatingChartManager2 = _interopRequireDefault(_seatingChartSeatingChartManager);

var ViewController = (function () {
    function ViewController(view) {
        _classCallCheck(this, ViewController);

        this._view = view;

        this._seatingChartManager = new _seatingChartSeatingChartManager2['default'](view);

        this._menuController = new _menuController2['default'](view);

        this._guestController = new _guestController2['default'](view);
        this._guestController.addObserver(this._seatingChartManager);

        this._tableController = new _tableController2['default'](view);
        this._tableController.addObserver(this._seatingChartManager);
    }

    _createClass(ViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._menuController.initialize();
            this._guestController.initialize();
            this._tableController.initialize();

            this._view.getElementById('guest-button').addEventListener('click', this._onClickGuestButton.bind(this));
            this._view.getElementById('table-button').addEventListener('click', this._onClickTableButton.bind(this));
        }
    }, {
        key: '_onClickGuestButton',
        value: function _onClickGuestButton() {
            //alert("ViewController::onClickGuestButton()");

            if (this._menuController.confirmMenu() !== _menuType2['default'].MENU_GUEST) {
                this._menuController.changeMenu(_menuType2['default'].MENU_GUEST);
            } else {
                this._menuController.changeMenu(_menuType2['default'].MENU_NONE);
            }
        }
    }, {
        key: '_onClickTableButton',
        value: function _onClickTableButton() {
            //alert("ViewController::onClickTableButton()");

            if (this._menuController.confirmMenu() !== _menuType2['default'].MENU_TABLE) {
                this._menuController.changeMenu(_menuType2['default'].MENU_TABLE);
            } else {
                this._menuController.changeMenu(_menuType2['default'].MENU_NONE);
            }
        }
    }]);

    return ViewController;
})();

exports['default'] = ViewController;
module.exports = exports['default'];