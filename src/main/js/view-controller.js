/**
 * view-controller.js
 * 
 * SCToolのビュー全体を管理する
 * 
 */


import MenuController from './menu-controller';
import MenuType from './menu-type';

import GuestController from './guest-controller';
import TableController from './table-controller';

export default class ViewController {
    constructor(view) {
        this._view = view;

        this._menuController = new MenuController(view);
        this._menuController.initialize();

        this._guestController = new GuestController(view);
        this._guestController.initialize();

        this._tableController = new TableController(view);
        this._tableController.initialize();
    }


    initialize() {
        this._view.getElementById('guest-button').addEventListener('click', this._onClickGuestButton.bind(this));
        this._view.getElementById('table-button').addEventListener('click', this._onClickTableButton.bind(this));
    }

    _onClickGuestButton() {
        //alert("ViewController::onClickGuestButton()");

        if (this._menuController.confirmMenu() !== MenuType.MENU_GUEST) {
            this._menuController.changeMenu(MenuType.MENU_GUEST);
        } else {
            this._menuController.changeMenu(MenuType.MENU_NONE);
        }
    }

    _onClickTableButton() {
        //alert("ViewController::onClickTableButton()");

        if (this._menuController.confirmMenu() !== MenuType.MENU_TABLE) {
            this._menuController.changeMenu(MenuType.MENU_TABLE);
        } else {
            this._menuController.changeMenu(MenuType.MENU_NONE);
        }
    }


}