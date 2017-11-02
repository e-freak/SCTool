/**
 * guest-controller.js
 * 
 * ゲストパネルに対する操作をコントロールする
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GuestController = (function () {
    function GuestController(view) {
        _classCallCheck(this, GuestController);

        //alert('GuestController::constructor()');

        this._view = view;
    }

    _createClass(GuestController, [{
        key: 'initialize',
        value: function initialize() {
            //alert('GuestController::initialize');

            this._view.getElementById('guest-form-add-button').addEventListener('click', this.onClickAddButton.bind(this));
        }
    }, {
        key: 'onClickAddButton',
        value: function onClickAddButton() {
            //alert('GuestController::onClickAddButton()');

            var name = this._view.getElementById('guest-form-name').value;
            var age = this._view.getElementById('guest-form-age').value;

            if (name) {
                var table = this._view.getElementById('guest-list-table');
                var row = table.insertRow(-1);
                var cell_guest_info_icon = row.insertCell(-1);
                var cell_guest_info_name = row.insertCell(-1);
                var cell_guest_info_age = row.insertCell(-1);
                var cell_guest_delete_button = row.insertCell(-1);

                cell_guest_info_name.innerHTML = name;
                cell_guest_info_age.innerHTML = age;

                // 追加されたボタンにIDとイベントリスナーを追加
                var id = 'guest-delete-button-' + row.rowIndex;
                cell_guest_delete_button.innerHTML = '<input type="button" id="' + id + '" class="guest-delete-button" value="-">';

                this._view.getElementById(id).addEventListener('click', this.onClickDeleteButton.bind(this, id));
            }
        }
    }, {
        key: 'onClickDeleteButton',
        value: function onClickDeleteButton(buttonID) {

            // TODO:中間行をダブルクリックしているとまとめて行が消えてしまう問題へ対応

            var button = this._view.getElementById(buttonID);

            var table = button.parentNode.parentNode.parentNode;
            var oldRowsLength = table.rows.length;

            // 全ボタンのイベントリスナーを削除する
            for (var i = 0; i < oldRowsLength; ++i) {
                var oldID = 'guest-delete-button-' + i;
                this._view.getElementById(oldID).removeEventListener('click', this.onClickDeleteButton);
            }

            // 対象行を削除
            var row = button.parentNode.parentNode;
            table.deleteRow(row.rowIndex);

            var newRowsLength = table.rows.length;

            // 残ったボタンに新規IDとイベントリスナーを振り直す
            for (var j = 0; j < newRowsLength; ++j) {
                var newID = 'guest-delete-button-' + j;
                var cell_guest_delete_button = table.rows[j].cells[3];
                cell_guest_delete_button.innerHTML = '<input type="button" id="' + newID + '" class="guest-delete-button" value="-">';
                cell_guest_delete_button.addEventListener('click', this.onClickDeleteButton.bind(this, newID));
            }
        }
    }]);

    return GuestController;
})();

exports['default'] = GuestController;
module.exports = exports['default'];