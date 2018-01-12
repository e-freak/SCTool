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

        console.log('SeatingChartManager::constructor()');

        _get(Object.getPrototypeOf(SeatingChartManager.prototype), 'constructor', this).call(this);

        this._view = view;

        var canvasPanel = this._view.getElementById('canvas-panel');
        var canvas = this._view.getElementById('seating-chart');

        this._canvasSizeH = canvas.width = canvasPanel.clientWidth;
        this._canvasSizeV = canvas.height = canvasPanel.clientHeight;

        this._seatingChartData = {};
        this._drawer = new _seatingChartDrawer2['default'](this._view.getElementById('seating-chart'));
        this._drawer.initialize();
    }

    _createClass(SeatingChartManager, [{
        key: 'update',
        value: function update(observable, param) {
            console.log('SeatingChartManager::update()');
            switch (param.event) {
                case _propertyEvent2['default'].EVENT_GENERATE_SEATING_CHART:
                    break;
                case _propertyEvent2['default'].EVENT_CHANGE_TABLE_SETTING:
                    this._changeTableSetting(param);
                    break;
                case _propertyEvent2['default'].EVENT_PUSH_TABLE:
                    break;
                case _propertyEvent2['default'].EVENT_POP_TABLE:
                    break;
                case _propertyEvent2['default'].EVENT_SWAP_TABLE:
                    break;
                case _propertyEvent2['default'].EVENT_PUSH_GUEST:
                    this._pushGuest(param);
                    break;
                case _propertyEvent2['default'].EVENT_POP_GUEST:
                    break;
                case _propertyEvent2['default'].EVENT_SWAP_GUEST:
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_changeTableSetting',
        value: function _changeTableSetting(param) {
            console.log('SeatingChartManager::_changeTableSetting()');

            var tableIntervalH = parseInt(this._canvasSizeH / (parseInt(param["tableLayoutH"]) + 1));
            var tableIntervalV = parseInt(this._canvasSizeV / (parseInt(param["tableLayoutV"]) + 1));

            console.log("canvasSizeH:" + this._canvasSizeH);
            console.log("canvasSizeV:" + this._canvasSizeV);
            console.log("param.tableLayoutH:" + param["tableLayoutH"]);
            console.log("param.tableLayoutV:" + param["tableLayoutV"]);
            console.log("tableIntervalH:" + tableIntervalH);
            console.log("tableIntervalV:" + tableIntervalV);
            var general = {
                "layout": {
                    "h": param["tableLayoutH"],
                    "v": param["tableLayoutV"]
                },
                "tableType": param["tableType"],
                // 円卓のときは半径、長卓の場合は1辺の半分で扱う
                "tableSize": parseInt(Math.min(tableIntervalH, tableIntervalV) / 3),
                "tableColor": "rgb(200,210,250)",
                "seatLimit": 6
            };

            this._seatingChartData["general"] = general;

            var tableList = {};

            for (var v = 0; v < param.tableLayoutV; ++v) {
                for (var h = 0; h < param.tableLayoutH; ++h) {

                    var idVal = v * param.tableLayoutH + h;
                    var table = {
                        "id": idVal,
                        "position": {
                            "h": h * tableIntervalH + tableIntervalH,
                            "v": v * tableIntervalV + tableIntervalV
                        }
                    };
                    tableList[idVal] = table;
                }
            }

            this._seatingChartData["tableList"] = tableList;

            this._drawer.drawTable(this._seatingChartData);
        }
    }, {
        key: '_pushGuest',
        value: function _pushGuest(param) {
            console.log('SeatingChartManager::_pushGuest()');
            //this._drawer.drawGuest(param.src);
        }
    }]);

    return SeatingChartManager;
})(_observer2['default']);

exports['default'] = SeatingChartManager;
module.exports = exports['default'];