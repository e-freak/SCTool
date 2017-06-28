// HTMLからのスコープでパスを設定する
import ViewController from '../script/controller/view-controller';

global.window.addEventListener('DOMContentLoaded', () => {
    //alert('view-controller-loader addEventListener');
    global.controller = new ViewController(global.document);
    global.controller.initialize();
}, false);
