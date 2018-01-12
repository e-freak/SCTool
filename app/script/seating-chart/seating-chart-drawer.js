/**
 * seating-chart-drawer.js
 * 
 * 席次表を描画する
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertyTableType = require('../property/table-type');

var _propertyTableType2 = _interopRequireDefault(_propertyTableType);

var SeatingChartDrawer = (function () {
    function SeatingChartDrawer(canvas) {
        _classCallCheck(this, SeatingChartDrawer);

        //alert('SeatingChartDrawer::constructor()');

        this._canvas = canvas;
        this._ctx = this._canvas.getContext('2d');
    }

    _createClass(SeatingChartDrawer, [{
        key: 'initialize',
        value: function initialize() {
            this._ctx.fillStyle = "rgb(100,0,0)";
        }
    }, {
        key: 'drawTable',
        value: function drawTable(tableType) {
            switch (tableType) {
                case _propertyTableType2['default'].TABLE_ROUND:
                    this._ctx.fillStyle = "rgb(100,0,0)";
                    this._ctx.fillRect(100, 0, 50, 50);
                    break;
                case _propertyTableType2['default'].TABLE_SQUARE:
                    this._ctx.fillStyle = "rgb(0,100,0)";
                    this._ctx.fillRect(0, 100, 50, 50);
                    break;
                default:
                    throw new Error('Unknown TableType : ' + tableType);
            }
        }
    }, {
        key: 'drawGuest',
        value: function drawGuest(src) {
            var img = new Image();
            img.src = src;

            this._ctx.drawImage(img, 0, 0);
        }
    }]);

    return SeatingChartDrawer;
})();

exports['default'] = SeatingChartDrawer;
module.exports = exports['default'];