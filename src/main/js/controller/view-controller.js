/**
 * view-controller.js
 * 
 * SCToolのビュー全体を管理する
 * 
 */


import MenuController from './menu-controller';
import MenuType from '../property/menu-type';

import GuestController from './guest-controller';
import TableController from './table-controller';
import SeatingChartController from './seating-chart-controller';

import SeatingChartManager from '../seating-chart/seating-chart-manager';

export default class ViewController {
    constructor(view) {
        console.log("ViewController::constructor()");
        this._view = view;

        this._menuController = new MenuController(view);

        // 席次表キャンバスの描画を管理するクラス
        this._seatingChartManager = new SeatingChartManager(view);

        // 各種GUI操作を受けて管理クラスにイベントを発送するクラス群
        this._guestController = new GuestController(view);
        this._guestController.addObserver(this._seatingChartManager);

        this._tableController = new TableController(view);
        this._tableController.addObserver(this._seatingChartManager);

        // 席次表キャンバスの描画以外の操作管理を行う
        this._seatingChartController = new SeatingChartController(view);
        this._seatingChartController.addObserver(this._seatingChartManager);

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