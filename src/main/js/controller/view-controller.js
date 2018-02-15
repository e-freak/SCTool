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

import SeatingChartLayouter from '../seating-chart/seating-chart-layouter';

export default class ViewController {
    constructor(view) {
        console.log("ViewController::constructor()");
        this._view = view;

        this._menuController = new MenuController(view);

        // 席次表のレイアウトを管理するクラス
        this._seatingChartLayouter = new SeatingChartLayouter(view);

        // 各種GUI操作を受けてレイアウトクラスにイベントを発送するクラス群
        this._guestController = new GuestController(view);
        this._guestController.addObserver(this._seatingChartLayouter);

        this._tableController = new TableController(view);
        this._tableController.addObserver(this._seatingChartLayouter);

        this._seatingChartController = new SeatingChartController(view);
        this._seatingChartController.addObserver(this._seatingChartLayouterr);

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