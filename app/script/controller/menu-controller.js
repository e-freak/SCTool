/**
 * menu-controller.js
 * 
 * メニューの選択状況を管理する
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertyMenuType = require('../property/menu-type');

var _propertyMenuType2 = _interopRequireDefault(_propertyMenuType);

var MenuController = (function () {
    function MenuController(view) {
        _classCallCheck(this, MenuController);

        console.log('MenuController::constructor()');

        this._view = view;
        this._menuType = _propertyMenuType2['default'].MENU_NONE;
    }

    _createClass(MenuController, [{
        key: 'initialize',
        value: function initialize() {
            console.log('MenuController::initialize()');
        }
    }, {
        key: 'confirmMenu',
        value: function confirmMenu() {
            console.log('MenuController::confirmMenu()');

            return this._MenuType;
        }
    }, {
        key: 'changeMenu',
        value: function changeMenu(menu) {
            console.log('MenuController::changeMenu()');

            switch (menu) {
                case _propertyMenuType2['default'].MENU_NONE:
                    this._MenuType = menu;
                    this._changeToNoneMenu();
                    break;
                case _propertyMenuType2['default'].MENU_GUEST:
                    this._MenuType = menu;
                    this._changeToGuestMenu();
                    break;
                case _propertyMenuType2['default'].MENU_TABLE:
                    this._MenuType = menu;
                    this._changeToTableMenu();
                    break;
                default:
                    // ${} 変数や式が入れられる
                    throw new Error('Unknown menu : ' + menu);
            }
        }
    }, {
        key: '_changeToNoneMenu',
        value: function _changeToNoneMenu() {
            console.log('MenuController::_changeToNoneMenu()');

            this._view.getElementById('menu-guest-panel').style.display = 'none';
            this._view.getElementById('menu-table-panel').style.display = 'none';
            this._view.getElementById('guest-button-img').style.borderColor = 'transparent';
            this._view.getElementById('table-button-img').style.borderColor = 'transparent';
        }
    }, {
        key: '_changeToGuestMenu',
        value: function _changeToGuestMenu() {
            console.log('MenuController:: _changeToGuestMenu()');

            this._view.getElementById('menu-guest-panel').style.display = 'block';
            this._view.getElementById('menu-table-panel').style.display = 'none';
            this._view.getElementById('guest-button-img').style.borderColor = '\#d9ded9';
            this._view.getElementById('table-button-img').style.borderColor = 'transparent';
        }
    }, {
        key: '_changeToTableMenu',
        value: function _changeToTableMenu() {
            console.log('MenuController:: _changeToTableMenu()');

            this._view.getElementById('menu-guest-panel').style.display = 'none';
            this._view.getElementById('menu-table-panel').style.display = 'block';
            this._view.getElementById('guest-button-img').style.borderColor = 'transparent';
            this._view.getElementById('table-button-img').style.borderColor = '\#d9ded9';
        }
    }]);

    return MenuController;
})();

exports['default'] = MenuController;
module.exports = exports['default'];