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
        console.log('SeatingChartManager::constructor()');

        super();

        this._view = view;

        const canvasPanel = this._view.getElementById('canvas-panel');
        let canvas = this._view.getElementById('seating-chart');

        this._canvasSizeH = canvas.width = canvasPanel.clientWidth;
        this._canvasSizeV = canvas.height = canvasPanel.clientHeight;

        this._seatingChartData = {};
        this._drawer = new SeatingChartDrawer(this._view.getElementById('seating-chart'));
        this._drawer.initialize();


    }

    update(observable, param) {
        console.log('SeatingChartManager::update()');
        switch (param.event) {
            case Event.EVENT_GENERATE_SEATING_CHART:
                break;
            case Event.EVENT_CHANGE_TABLE_SETTING:
                this._changeTableSetting(param);
                break;
            case Event.EVENT_PUSH_TABLE:
                break;
            case Event.EVENT_POP_TABLE:
                break;
            case Event.EVENT_SWAP_TABLE:
                break;
            case Event.EVENT_PUSH_GUEST:
                this._pushGuest(param);
                break;
            case Event.EVENT_POP_GUEST:
                break;
            case Event.EVENT_SWAP_GUEST:
                break;
            default:
                break;
        }
    }

    _changeTableSetting(param) {
        console.log('SeatingChartManager::_changeTableSetting()');

        const tableIntervalH = parseInt(this._canvasSizeH / (parseInt(param["tableLayoutH"]) + 1));
        const tableIntervalV = parseInt(this._canvasSizeV / (parseInt(param["tableLayoutV"]) + 1));

        console.log("canvasSizeH:" + this._canvasSizeH);
        console.log("canvasSizeV:" + this._canvasSizeV);
        console.log("param.tableLayoutH:" + param["tableLayoutH"]);
        console.log("param.tableLayoutV:" + param["tableLayoutV"]);
        console.log("tableIntervalH:" + tableIntervalH);
        console.log("tableIntervalV:" + tableIntervalV);
        let general = {
            "layout": {
                "h": param["tableLayoutH"],
                "v": param["tableLayoutV"]
            },
            "tableType": param["tableType"],
            // 円卓のときは半径、長卓の場合は1辺の半分で扱う
            "tableSize": parseInt(Math.min(tableIntervalH, tableIntervalV) / 3),
            "tableColor": "rgb(200,210,250)",
            "seatLimit": 6,
        };

        this._seatingChartData["general"] = general;

        let tableList = {};

        for (let v = 0; v < param.tableLayoutV; ++v) {
            for (let h = 0; h < param.tableLayoutH; ++h) {

                const idVal = v * param.tableLayoutH + h;
                let table = {
                    "id": idVal,
                    "position": {
                        "h": h * tableIntervalH + tableIntervalH,
                        "v": v * tableIntervalV + tableIntervalV,
                    },
                };
                tableList[idVal] = table;
            }
        }

        this._seatingChartData["tableList"] = tableList;

        this._drawer.drawTable(this._seatingChartData);
    }

    _pushGuest(param) {
        console.log('SeatingChartManager::_pushGuest()');
        //this._drawer.drawGuest(param.src);

    }


}