import ViewController from '../script/view-controller';

global.window.addEventListener('DOMContentLoaded', () => {
    global.controller = new ViewController(global.document);
    global.controller.initialize();
}, false);
