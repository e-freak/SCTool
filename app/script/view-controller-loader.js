// HTMLからのスコープでパスを設定する
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scriptViewController = require('../script/view-controller');

var _scriptViewController2 = _interopRequireDefault(_scriptViewController);

global.window.addEventListener('DOMContentLoaded', function () {
    global.controller = new _scriptViewController2['default'](global.document);
    global.controller.initialize();
}, false);