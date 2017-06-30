import GuestContentRenderer from '../script/renderer/guest-content-renderer';

global.window.addEventListener('DOMContentLoaded', () => {
    alert('GuestContentRendererLoader addEventListener');
    global.controller = new GuestContentRenderer(global.document);
    global.controller.initialize();
}, false);
