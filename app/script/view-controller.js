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

var ViewController = (function () {
    function ViewController(view) {
        _classCallCheck(this, ViewController);

        this._view = view;
        this._menuController = new _menuController2['default'](view);
        this._menuController.initialize();
    }

    _createClass(ViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._view.getElementById('guest-button').addEventListener('click', this.onClickGuestButton.bind(this));
            this._view.getElementById('table-button').addEventListener('click', this.onClickTableButton.bind(this));
        }
    }, {
        key: 'onClickGuestButton',
        value: function onClickGuestButton() {
            //alert("ViewController::onClickGuestButton()");

            if (this._menuController.confirmMenu() !== _menuType2['default'].MENU_GUEST) {
                this._menuController.changeMenu(_menuType2['default'].MENU_GUEST);
            } else {
                this._menuController.changeMenu(_menuType2['default'].MENU_NONE);
            }

            //this._view.getElementById('property-guest-panel').style.display = 'block';
            //this._view.getElementById('property-table-panel').style.display = 'none';
            //this._view.getElementById('guest-button-img').style.borderColor = '\#d9ead9';
        }
    }, {
        key: 'onClickTableButton',
        value: function onClickTableButton() {
            if (this._menuController.confirmMenu() !== _menuType2['default'].MENU_TABLE) {
                this._menuController.changeMenu(_menuType2['default'].MENU_TABLE);
            } else {
                this._menuController.changeMenu(_menuType2['default'].MENU_NONE);
            }

            //this._view.getElementById('property-guest-panel').style.display = 'none';
            //this._view.getElementById('property-table-panel').style.display = 'block';
            //this._view.getElementById('table-button-img').style.borderColor = '\#d9ead9';
        }
    }]);

    return ViewController;
})();

exports['default'] = ViewController;
module.exports = exports['default'];