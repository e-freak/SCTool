/**
 * seating-chart-manager.js
 * 
 * 席次表描画を管理する
 */
import Observer from './observer'

import Event from '../property/event'
import SeatingChartDrawer from './seating-chart-drawer'

export default class SeatingChartManager extends Observer {
    constructor(view) {
        //alert('SeatingChartManager::constructor()');

        super();

        this._view = view;

        this._drawer = new SeatingChartDrawer(this._view.getElementById('seating-chart'));
        this._drawer.initialize();
    }

    update(observable, param) {
        switch (param.event) {
            case Event.CHANGE_TABLE_TYPE:
                this._changeTableType(param);
                break;
            case Event.ADD_GUEST:
                this._addGuest(param);
                break;
            default:
                break;
        }
    }

    _changeTableType(param) {
        //alert('SeatingChartManager::_changeTableType');
        this._drawer.drawTable(param.tableType);

    }

    _addGuest(param) {
        this._drawer.drawGuest(param.src);

    }


}