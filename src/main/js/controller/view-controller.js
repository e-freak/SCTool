/**
 * view-controller.js
 * 
 * SCToolのビュー全体を管理する
 * 
 */


import MenuController from './menu-controller';
import MenuType from './menu-type';

import GuestController from './observer/guest-controller';
import TableController from './observer/table-controller';
import SeatingChartController from './observer/seating-chart-controller';

import DataManager from '../observable/data-manager';

export default class ViewController {
    constructor(view) {
        console.log("ViewController::constructor()");
        this._view = view;

        this._menuController = new MenuController(view);

        // 席次表のデータを管理するクラス
        this._dataManager = new DataManager(view);

        // コントローラークラス
        this._guestController = new GuestController(view, this._dataManager);
        this._tableController = new TableController(view, this._dataManager);
        this._seatingChartController = new SeatingChartController(view, this._dataManager);

        // 情報の変更がされた場合、各コントローラクラスに通知する
        this._dataManager.addObserver(this._guestController);
        this._dataManager.addObserver(this._tableController);
        this._dataManager.addObserver(this._seatingChartController);

    }


    initialize() {
        console.log("ViewController::initialize()");
        this._menuController.initialize();
        this._guestController.initialize();
        this._tableController.initialize();
        this._seatingChartController.initialize();

        this._view.getElementById('guest-button').addEventListener('click', this._onClickGuestButton.bind(this));
        this._view.getElementById('table-button').addEventListener('click', this._onClickTableButton.bind(this));
    }

    _onClickGuestButton() {
        console.log("ViewController::onClickGuestButton()");

        if (this._menuController.confirmMenu() !== MenuType.MENU_GUEST) {
            this._menuController.changeMenu(MenuType.MENU_GUEST);
        } else {
            this._menuController.changeMenu(MenuType.MENU_NONE);
        }
    }

    _onClickTableButton() {
        console.log("ViewController::onClickTableButton()");

        if (this._menuController.confirmMenu() !== MenuType.MENU_TABLE) {
            this._menuController.changeMenu(MenuType.MENU_TABLE);
        } else {
            this._menuController.changeMenu(MenuType.MENU_NONE);
        }
    }


}