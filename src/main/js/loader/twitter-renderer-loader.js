import TwitterRenderer from '../script/renderer/twitter-renderer';

global.window.addEventListener('DOMContentLoaded', () => {
    //alert('twitter-renderer-loader addEventListener');
    global.controller = new TwitterRenderer(global.document);
    global.controller.initialize();
}, false);
