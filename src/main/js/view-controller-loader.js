// HTMLからのスコープでパスを設定する
import ViewController from '../script/viewcontroller/view-controller';

global.window.addEventListener('DOMContentLoaded', () => {
    global.controller = new ViewController(global.document);
    global.controller.initialize();
}, false);