/**
 * table-controller.js
 * 
 * テーブルパネルに対する操作をコントロールする
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _observable = require('./observable');

var _observable2 = _interopRequireDefault(_observable);

var _propertyEvent = require('../property/event');

var _propertyEvent2 = _interopRequireDefault(_propertyEvent);

var _propertyTableType = require('../property/table-type');

var _propertyTableType2 = _interopRequireDefault(_propertyTableType);

var TableController = (function (_Observable) {
    _inherits(TableController, _Observable);

    function TableController(view) {
        _classCallCheck(this, TableController);

        //alert('TableController::constructor()');

        _get(Object.getPrototypeOf(TableController.prototype), 'constructor', this).call(this);

        this._view = view;
        this._tableType = _propertyTableType2['default'].TABLE_ROUND;
    }

    _createClass(TableController, [{
        key: 'initialize',
        value: function initialize() {
            //alert('TableController::initialize');

            // ラジオの値が変更されたときの動作を定義する
            var tableTypeRadios = this._view.getElementsByName('table-type');

            for (var i = 0; i < tableTypeRadios.length; ++i) {
                tableTypeRadios[i].addEventListener('change', this._onChangeTableTypeRadio.bind(this, tableTypeRadios[i].id));
            }

            // 初期値としてTableType.TABLE_ROUNDを明示する
            this._onChangeTableTypeRadio('table-type-radio-round');
        }
    }, {
        key: '_onChangeTableTypeRadio',
        value: function _onChangeTableTypeRadio(radioID) {
            //alert('TableController::onChangeTableTypeRadio');

            switch (radioID) {
                case 'table-type-radio-round':
                    this._tableType = _propertyTableType2['default'].TABLE_ROUND;
                    this._changeToRoundTable();
                    break;
                case 'table-type-radio-square':
                    this._tableType = _propertyTableType2['default'].TABLE_SQUARE;
                    this._changeToSquareTable();
                    break;
                default:
                    // ${} 変数や式が入れられる
                    throw new Error('Unexpected Table : ' + radioID);
            }

            var param = {
                event: _propertyEvent2['default'].CHANGE_TABLE_TYPE,
                tableType: this._tableType
            };

            this.notifyAllObserver(param);
        }
    }, {
        key: '_changeToRoundTable',
        value: function _changeToRoundTable() {

            this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-blue.png';
            this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#d9ded9';
            this._view.getElementById('table-type-radio-img-round').style.borderColor = '\#d9ded9';
            this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-yellow.png';
            this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#004986';
            this._view.getElementById('table-type-radio-img-square').style.borderColor = 'transparent';
        }
    }, {
        key: '_changeToSquareTable',
        value: function _changeToSquareTable() {

            this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-yellow.png';
            this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#004986';
            this._view.getElementById('table-type-radio-img-round').style.borderColor = 'transparent';
            this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-blue.png';
            this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#d9ded9';
            this._view.getElementById('table-type-radio-img-square').style.borderColor = '\#d9ded9';
        }
    }]);

    return TableController;
})(_observable2['default']);

exports['default'] = TableController;
module.exports = exports['default'];