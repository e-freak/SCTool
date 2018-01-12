// HTMLからのスコープでパスを設定する
import ViewController from '../script/controller/view-controller';

global.window.addEventListener('DOMContentLoaded', () => {
    global.controller = new ViewController(global.document);
    global.controller.initialize();
}, false);