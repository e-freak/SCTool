'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scriptRendererGuestContentRenderer = require('../script/renderer/guest-content-renderer');

var _scriptRendererGuestContentRenderer2 = _interopRequireDefault(_scriptRendererGuestContentRenderer);

global.window.addEventListener('DOMContentLoaded', function () {
    alert('GuestContentRendererLoader addEventListener');
    global.controller = new _scriptRendererGuestContentRenderer2['default'](global.document);
    global.controller.initialize();
}, false);