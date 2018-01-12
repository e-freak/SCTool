/**
 * seating-chart-manager.js
 * 
 * 席次表描画を管理する
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

var _observer = require('./observer');

var _observer2 = _interopRequireDefault(_observer);

var _propertyEvent = require('../property/event');

var _propertyEvent2 = _interopRequireDefault(_propertyEvent);

var _seatingChartDrawer = require('./seating-chart-drawer');

var _seatingChartDrawer2 = _interopRequireDefault(_seatingChartDrawer);

var SeatingChartManager = (function (_Observer) {
    _inherits(SeatingChartManager, _Observer);

    function SeatingChartManager(view) {
        _classCallCheck(this, SeatingChartManager);

        //alert('SeatingChartManager::constructor()');

        _get(Object.getPrototypeOf(SeatingChartManager.prototype), 'constructor', this).call(this);

        this._view = view;

        this._drawer = new _seatingChartDrawer2['default'](this._view.getElementById('seating-chart'));
        this._drawer.initialize();
    }

    _createClass(SeatingChartManager, [{
        key: 'update',
        value: function update(observable, param) {
            switch (param.event) {
                case _propertyEvent2['default'].CHANGE_TABLE_TYPE:
                    this._changeTableType(param);
                    break;
                case _propertyEvent2['default'].ADD_GUEST:
                    this._addGuest(param);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_changeTableType',
        value: function _changeTableType(param) {
            //alert('SeatingChartManager::_changeTableType');
            this._drawer.drawTable(param.tableType);
        }
    }, {
        key: '_addGuest',
        value: function _addGuest(param) {
            this._drawer.drawGuest(param.src);
        }
    }]);

    return SeatingChartManager;
})(_observer2['default']);

exports['default'] = SeatingChartManager;
module.exports = exports['default'];