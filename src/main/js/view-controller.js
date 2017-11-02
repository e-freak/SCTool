/**
 * view-controller.js
 * 
 * SCToolのビュー全体を管理する
 * 
 */


import MenuController from './menu-controller';
import MenuType from './menu-type';

import GuestController from './guest-controller';

export default class ViewController {
    constructor(view) {
        this._view = view;

        this._menuController = new MenuController(view);
        this._menuController.initialize();

        this._guestController = new GuestController(view);
        this._guestController.initialize();
    }


    initialize() {
        this._view.getElementById('guest-button').addEventListener('click', this.onClickGuestButton.bind(this));
        this._view.getElementById('table-button').addEventListener('click', this.onClickTableButton.bind(this));
    }

    onClickGuestButton() {
        //alert("ViewController::onClickGuestButton()");

        if (this._menuController.confirmMenu() !== MenuType.MENU_GUEST) {
            this._menuController.changeMenu(MenuType.MENU_GUEST);
        } else {
            this._menuController.changeMenu(MenuType.MENU_NONE);
        }



        //this._view.getElementById('property-guest-panel').style.display = 'block';
        //this._view.getElementById('property-table-panel').style.display = 'none';
        //this._view.getElementById('guest-button-img').style.borderColor = '\#d9ead9';
    }
    onClickTableButton() {
        if (this._menuController.confirmMenu() !== MenuType.MENU_TABLE) {
            this._menuController.changeMenu(MenuType.MENU_TABLE);
        } else {
            this._menuController.changeMenu(MenuType.MENU_NONE);
        }




        //this._view.getElementById('property-guest-panel').style.display = 'none';
        //this._view.getElementById('property-table-panel').style.display = 'block';
        //this._view.getElementById('table-button-img').style.borderColor = '\#d9ead9';
    }


}