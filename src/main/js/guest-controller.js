/**
 * guest-controller.js
 * 
 * ゲストパネルに対する操作をコントロールする
 * 
 */



export default class GuestController {

    constructor(view) {
        //alert('GuestController::constructor()');

        this._view = view;
    }

    initialize() {
        //alert('GuestController::initialize');

        this._view.getElementById('guest-form-add-button').addEventListener('click', this.onClickAddButton.bind(this));

    }

    onClickAddButton() {
        //alert('GuestController::onClickAddButton()');

        const name = this._view.getElementById('guest-form-name').value;
        const age = this._view.getElementById('guest-form-age').value;

        if (name) {
            let table = this._view.getElementById('guest-list-table');
            let row = table.insertRow(-1);
            let cell_guest_info_icon = row.insertCell(-1);
            let cell_guest_info_name = row.insertCell(-1);
            let cell_guest_info_age = row.insertCell(-1);
            let cell_guest_delete_button = row.insertCell(-1);

            cell_guest_info_name.innerHTML = name;
            cell_guest_info_age.innerHTML = age;

            // 追加されたボタンにIDとイベントリスナーを追加
            const id = `guest-delete-button-${row.rowIndex}`;
            cell_guest_delete_button.innerHTML = `<input type="button" id="${id}" class="guest-delete-button" value="-">`;

            this._view.getElementById(id).addEventListener('click', this.onClickDeleteButton.bind(this, id));
        }

    }

    onClickDeleteButton(buttonID) {

        // TODO:中間行をダブルクリックしているとまとめて行が消えてしまう問題へ対応



        const button = this._view.getElementById(buttonID);

        const table = button.parentNode.parentNode.parentNode;
        const oldRowsLength = table.rows.length;

        // 全ボタンのイベントリスナーを削除する
        for (let i = 0; i < oldRowsLength; ++i) {
            const oldID = `guest-delete-button-${i}`;
            this._view.getElementById(oldID).removeEventListener('click', this.onClickDeleteButton);
        }

        // 対象行を削除
        const row = button.parentNode.parentNode;
        table.deleteRow(row.rowIndex);

        const newRowsLength = table.rows.length;

        // 残ったボタンに新規IDとイベントリスナーを振り直す
        for (let j = 0; j < newRowsLength; ++j) {
            const newID = `guest-delete-button-${j}`;
            let cell_guest_delete_button = table.rows[j].cells[3];
            cell_guest_delete_button.innerHTML = `<input type="button" id="${newID}" class="guest-delete-button" value="-">`;
            cell_guest_delete_button.addEventListener('click', this.onClickDeleteButton.bind(this, newID));
        }
    }




}