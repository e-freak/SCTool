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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _observable = require("./observable");

var _observable2 = _interopRequireDefault(_observable);

var _propertyEvent = require('../property/event');

var _propertyEvent2 = _interopRequireDefault(_propertyEvent);

var GuestController = (function (_Observable) {
    _inherits(GuestController, _Observable);

    function GuestController(view) {
        _classCallCheck(this, GuestController);

        //alert('GuestController::constructor()');

        _get(Object.getPrototypeOf(GuestController.prototype), 'constructor', this).call(this);

        this._view = view;
    }

    _createClass(GuestController, [{
        key: 'initialize',
        value: function initialize() {
            //alert('GuestController::initialize');
            this._view.getElementById('guest-form-add-button').addEventListener('click', this._onClickAddButton.bind(this));
        }
    }, {
        key: '_onClickAddButton',
        value: function _onClickAddButton() {

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
            this._view.getElementById(buttonID).addEventListener('click', this._onClickDeleteButton.bind(this, buttonID));

            // 仮イベント
            var param = {
                event: _propertyEvent2['default'].ADD_GUEST,
                src: srcFilePath
            };

            this.notifyAllObserver(param);
        }
    }, {
        key: '_onClickDeleteButton',
        value: function _onClickDeleteButton(buttonID) {

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

                    // 削除後、行が空になったらテーブルの存在ごと削除してしまう
                    // 背景色などの無駄なCSS効果が残るのを防ぐ
                    if (!table.rows.length) {
                        table.parentNode.removeChild(table);
                    }

                    continue;
                }

                // まだ削除が実行されていない場合はそのままの状態を維持する
                if (!deleted) {
                    continue;
                }

                // 削除した後の行情報を更新する

                var newIndex = i - 1;

                var oldAvaterID = 'guest-avatar-' + i;
                var newAvaterID = 'guest-avatar-' + index;
                var oldAvaterElement = this._view.getElementById(oldAvaterID);

                var oldButtonID = 'guest-delete-button-' + i;
                var newButtonID = 'guest-delete-button-' + index;
                var oldButtonElement = this._view.getElementById(oldButtonID);

                // ボタンの削除イベントは古いIDに紐付いているのでbindし直す
                oldButtonElement.removeEventListener('click', this._onClickDeleteButton);
                oldButtonElement.addEventListener('click', this._onClickDeleteButton.bind(this, newButtonID));

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
            } else {
                throw new Error('Unexpected Age : ' + age);
            }

            return '../image/avatar/' + fileName_prefix_gender + fileName_age;
        }
    }]);

    return GuestController;
})(_observable2['default']);

exports['default'] = GuestController;
module.exports = exports['default'];