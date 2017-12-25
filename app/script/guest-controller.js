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

    // TODO:　削除ボタンによって、旧アイコンが変更になってしまう
    //        javasctipt側でテーブルを準備して、対応させること

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

            var name = this._view.getElementById('guest-form-name').value;
            var age = this._view.getElementById('guest-form-age').value;

            if (!(name && age)) {
                return;
            }

            // 行を追加する
            var table = this._view.getElementById('guest-list-table');
            var row = table.insertRow(-1);
            var cell_guest_info_avatar = row.insertCell(-1);
            var cell_guest_info_name = row.insertCell(-1);
            var cell_guest_info_age = row.insertCell(-1);
            var cell_guest_delete_button = row.insertCell(-1);

            // 名前と年齢はそのまま表示
            cell_guest_info_name.innerHTML = name;
            cell_guest_info_age.innerHTML = age;

            // アバターは行に応じたIDを割り振り、画像は年齢に応じたものにする
            var srcFilePath = this._selectAvatar(age);

            var avatarID = 'guest-avatar-' + row.rowIndex;
            cell_guest_info_avatar.innerHTML = '<img id="' + avatarID + '" class="guest-avatar" src="' + srcFilePath + '" alt="Avatar">';

            // ボタンも行に応じたIDを割り振り、行削除用のイベントリスナーを追加する
            var buttonID = 'guest-delete-button-' + row.rowIndex;
            cell_guest_delete_button.innerHTML = '<input type="button" id="' + buttonID + '" class="guest-delete-button" value="-">';
            this._view.getElementById(buttonID).addEventListener('click', this.onClickDeleteButton.bind(this, buttonID));
        }
    }, {
        key: 'onClickDeleteButton',
        value: function onClickDeleteButton(buttonID) {

            // TODO:中間行をダブルクリックしているとまとめて行が消えてしまう問題へ対応

            var targetButton = this._view.getElementById(buttonID);
            var table = targetButton.parentNode.parentNode.parentNode;
            var rowsLength = table.rows.length;
            var targetRow = targetButton.parentNode.parentNode;

            var deleted = false;

            for (var i = 0; i < rowsLength; ++i) {

                // 対象行は削除して終了する
                if (i === targetRow.rowIndex) {
                    table.deleteRow(i);
                    deleted = true;

                    // テーブルが空になったら、テーブルごと削除してしまう
                    if (!table.rows.length) {
                        table.parentNode.removeChild(table);
                    }

                    continue;
                }

                // まだ削除が実行されていない場合はそのままの状態を維持する
                if (!deleted) {
                    continue;
                }

                // 以後はdeleted === trueの削除行の処理

                var newIndex = i - 1;

                var oldAvaterID = 'guest-avatar-' + i;
                var newAvaterID = 'guest-avatar-' + index;
                var oldAvaterElement = this._view.getElementById(oldAvaterID);

                var oldButtonID = 'guest-delete-button-' + i;
                var newButtonID = 'guest-delete-button-' + index;
                var oldButtonElement = this._view.getElementById(oldButtonID);

                // ボタンの削除イベントは古いIDに紐付いているのでbindし直す
                oldButtonElement.removeEventListener('click', this.onClickDeleteButton);
                oldButtonElement.addEventListener('click', this.onClickDeleteButton.bind(this, newButtonID));

                // IDを新しい行に合わせて更新する
                oldAvaterElement.id = newAvaterID;
                oldButtonElement.id = newButtonID;
            }
        }
    }, {
        key: '_selectAvatar',
        value: function _selectAvatar(age) {

            var fileName_prefix_gender = Math.random() >= 0.5 ? 'man-' : 'woman-';

            var fileName_age = '';

            if (age >= 0 && age <= 15) {
                fileName_age = 'child1.png';
            } else if (age > 15 && age <= 40) {
                fileName_age = 'young1.png';
            } else if (age > 40 && age <= 65) {
                fileName_age = 'middle-aged1.png';
            } else if (age > 65) {
                fileName_age = 'elder1.png';
            } else if (age < 0 || age > 99 || age === undefined) {
                return;
            }

            return '../image/avatar/' + fileName_prefix_gender + fileName_age;
        }
    }]);

    return GuestController;
})();

exports['default'] = GuestController;
module.exports = exports['default'];