// HTMLからのスコープでパスを設定する
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scriptControllerViewController = require('../script/controller/view-controller');

var _scriptControllerViewController2 = _interopRequireDefault(_scriptControllerViewController);

global.window.addEventListener('DOMContentLoaded', function () {
    global.controller = new _scriptControllerViewController2['default'](global.document);
    global.controller.initialize();
}, false);