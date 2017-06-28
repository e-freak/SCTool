'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scriptRendererTwitterRenderer = require('../script/renderer/twitter-renderer');

var _scriptRendererTwitterRenderer2 = _interopRequireDefault(_scriptRendererTwitterRenderer);

global.window.addEventListener('DOMContentLoaded', function () {
    //alert('twitter-renderer-loader addEventListener');
    global.controller = new _scriptRendererTwitterRenderer2['default'](global.document);
    global.controller.initialize();
}, false);