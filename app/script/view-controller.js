'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ViewController = (function () {
    function ViewController(view) {
        _classCallCheck(this, ViewController);

        this._view = view;
    }

    _createClass(ViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._view.getElementById('guest').addEventListener('click', this.onClickGuestButton);
            this._view.getElementById('table').addEventListener('click', this.onClickTableButton);
        }
    }, {
        key: 'onClickGuestButton',
        value: function onClickGuestButton() {
            alert("Guestボタンが押下されました");
            this._view.getElementById('property-panel').style.display = 'none';
            this._view.getElementById('guest-panel').style.display = 'block';
            this._view.getElementById('table-panel').style.display = 'none';
            //this._view.getElementById('property-panel').style.visiblity = 'hidden';
            //this._view.getElementById('guest-panel').style.visiblity = 'visible';
            //this._view.getElementById('table-panel').style.visiblity = 'hidden';
        }
    }, {
        key: 'onClickTableButton',
        value: function onClickTableButton() {
            alert("Tableボタンが押下されました");
        }
    }]);

    return ViewController;
})();

exports['default'] = ViewController;
module.exports = exports['default'];