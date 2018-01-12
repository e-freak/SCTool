/**
 * observable.js
 * 
 * @author yuki
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = (function () {
    function Observable() {
        _classCallCheck(this, Observable);

        this._observerList = [];
    }

    _createClass(Observable, [{
        key: "addObserver",
        value: function addObserver(observer) {
            if (observer) {
                if (!this._observerList.includes(observer)) {
                    this._observerList.push(observer);
                }
            }
        }
    }, {
        key: "notifyAllObserver",
        value: function notifyAllObserver(param) {
            var _this = this;

            this._observerList.forEach(function (observer) {
                observer.update(_this, param);
            });
        }
    }, {
        key: "removeAllObserver",
        value: function removeAllObserver() {
            this._observerList = [];
        }
    }]);

    return Observable;
})();

exports["default"] = Observable;
module.exports = exports["default"];