/**
 * menu-controller.js
 * 
 * メニューの選択状況を管理する
 * 
 */

import MenuType from './menu-type';


export default class MenuController {

    constructor(view) {
        console.log('MenuController::constructor()');

        this._view = view;
        this._menuType = MenuType.MENU_NONE;
    }

    initialize() {
        console.log('MenuController::initialize()');

    }

    confirmMenu() {
        console.log('MenuController::confirmMenu()');

        return this._MenuType;
    }

    changeMenu(menu) {
        console.log('MenuController::changeMenu()');

        switch (menu) {
            case MenuType.MENU_NONE:
                this._MenuType = menu;
                this._changeToNoneMenu();
                break;
            case MenuType.MENU_GUEST:
                this._MenuType = menu;
                this._changeToGuestMenu();
                break;
            case MenuType.MENU_TABLE:
                this._MenuType = menu;
                this._changeToTableMenu();
                break;
            default:
                // ${} 変数や式が入れられる
                throw new Error(`Unknown menu : ${menu}`);
        }
    }

    _changeToNoneMenu() {
        console.log('MenuController::_changeToNoneMenu()');

        this._view.getElementById('menu-guest-panel').style.display = 'none';
        this._view.getElementById('menu-table-panel').style.display = 'none';
        this._view.getElementById('guest-button-img').style.borderColor = 'transparent';
        this._view.getElementById('table-button-img').style.borderColor = 'transparent';
    }

    _changeToGuestMenu() {
        console.log('MenuController:: _changeToGuestMenu()');

        this._view.getElementById('menu-guest-panel').style.display = 'block';
        this._view.getElementById('menu-table-panel').style.display = 'none';
        this._view.getElementById('guest-button-img').style.borderColor = '\#d9ded9';
        this._view.getElementById('table-button-img').style.borderColor = 'transparent';
    }

    _changeToTableMenu() {
        console.log('MenuController:: _changeToTableMenu()');

        this._view.getElementById('menu-guest-panel').style.display = 'none';
        this._view.getElementById('menu-table-panel').style.display = 'block';
        this._view.getElementById('guest-button-img').style.borderColor = 'transparent';
        this._view.getElementById('table-button-img').style.borderColor = '\#d9ded9';
    }

}