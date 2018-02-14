/**
 * guest-controller.js
 * 
 * ゲストパネルに対する操作をコントロールする
 * 
 */

import Observable from "./observable";

import Event from '../property/event'


export default class GuestController extends Observable {

    constructor(view) {
        console.log('GuestController::constructor()');

        super();

        this._view = view;
    }

    initialize() {
        console.log('GuestController::initialize()');
        this._view.getElementById('guest-form-add-button').addEventListener('click', this._onClickAddButton.bind(this));
    }

    _onClickAddButton() {
        console.log('GuestController::_onClickAddButton()');

        const name = this._view.getElementById('guest-form-name').value;
        const age = this._view.getElementById('guest-form-age').value;

        if (!(name && age)) {
            return;
        }

        // 行を追加する
        let table = this._view.getElementById('guest-list-table');
        let row = table.insertRow(-1);
        let cell_guest_info_avatar = row.insertCell(-1);
        let cell_guest_info_name = row.insertCell(-1);
        let cell_guest_info_age = row.insertCell(-1);
        let cell_guest_delete_button = row.insertCell(-1);

        // 名前と年齢はそのまま表示
        cell_guest_info_name.innerHTML = name;
        cell_guest_info_age.innerHTML = age;

        // アバターは行に応じたIDを割り振り、画像は年齢に応じたものにする
        // ドラッグ時のデータ発送イベントリスナーを追加する
        const srcFilePath = this._selectAvatar(age);

        const avatarID = `guest-avatar-${row.rowIndex}`;
        cell_guest_info_avatar.innerHTML = `<img id="${avatarID}" class="guest-avatar" src="${srcFilePath}" alt="Avatar" draggable=true>`;
        this._view.getElementById(avatarID).addEventListener('dragstart', this._onDragStartAvatar.bind(this));

        // ボタンも行に応じたIDを割り振り、行削除用のイベントリスナーを追加する
        const buttonID = `guest-delete-button-${row.rowIndex}`;
        cell_guest_delete_button.innerHTML = `<input type="button" id="${buttonID}" class="guest-delete-button" value="-">`;
        this._view.getElementById(buttonID).addEventListener('click', this._onClickDeleteButton.bind(this));

    }

    _onClickDeleteButton(event) {
        console.log('GuestController::_onClickDeleteButton()');
        const buttonID = event.target.id;
        const targetButton = this._view.getElementById(buttonID);
        const table = targetButton.parentNode.parentNode.parentNode;
        const rowsLength = table.rows.length;
        const targetRow = targetButton.parentNode.parentNode;

        let deleted = false;

        for (let i = 0; i < rowsLength; ++i) {

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
            const newIndex = i - 1;

            const oldAvaterID = `guest-avatar-${i}`;
            const newAvaterID = `guest-avatar-${newIndex}`;
            let oldAvaterElement = this._view.getElementById(oldAvaterID);
            oldAvaterElement.id = newAvaterID;

            const oldButtonID = `guest-delete-button-${i}`;
            const newButtonID = `guest-delete-button-${newIndex}`;
            let oldButtonElement = this._view.getElementById(oldButtonID);
            oldButtonElement.id = newButtonID;
        }

    }

    _selectAvatar(age) {
        console.log('GuestController::_selectAvatar()');

        let fileName_prefix_gender = (Math.random() >= 0.5) ? 'man-' : 'woman-';

        let fileName_age = '';

        if (age >= 0 && age <= 15) {
            fileName_age = 'child1.png';
        } else if (age > 15 && age <= 40) {
            fileName_age = 'young1.png';
        } else if (age > 40 && age <= 65) {
            fileName_age = 'middle-aged1.png';
        } else if (age > 65) {
            fileName_age = 'elder1.png';
        } else {
            throw new Error(`Unexpected Age : ${age}`);
        }

        return '../image/avatar/' + fileName_prefix_gender + fileName_age;

    }

    _onDragStartAvatar(event) {
        console.log('GuestController::_onDragStartAvatar()');
        event.dataTransfer.setData("text", event.target.src);
    }

}