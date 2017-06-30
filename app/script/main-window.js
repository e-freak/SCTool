'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('electron');

var app = _require.app;
var BrowserWindow = _require.BrowserWindow;

var MainWindow = (function () {
    function MainWindow() {
        _classCallCheck(this, MainWindow);

        this.window = null;
        this.start();
    }

    _createClass(MainWindow, [{
        key: 'start',
        value: function start() {
            var _this = this;

            app.on('window-all-closed', function () {
                if (process.platform != 'darwin') {
                    app.quit();
                }
            });

            app.on('ready', function () {
                _this.createWindow();
            });
        }
    }, {
        key: 'createWindow',
        value: function createWindow() {
            var _this2 = this;

            this.window = new BrowserWindow({ width: 1240, height: 800, resizable: false, useContentSize: true });
            this.window.loadURL('file://' + __dirname + '/../../app/view/main.html');
            this.window.on('closed', function () {
                _this2.window = null;
            });
        }
    }]);

    return MainWindow;
})();

exports['default'] = MainWindow;
module.exports = exports['default'];