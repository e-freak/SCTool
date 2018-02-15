/**
 * seating-chart-layouter.js
 * 
 * 各種変更イベントを受け付けて、席次表配置を管理する
 */
import Observer from './observer'

import Event from '../property/event'
import SeatingChartDecorator from './seating-chart-decorator'

export default class SeatingChartLayouter extends Observer {
    constructor(view) {
        console.log('SeatingChartLayouter::constructor()');

        super();

        this._view = view;
        const seatingChartPanel = this._view.getElementById('seating-chart-panel');

        this._seatingChartData = {
            "panelInfo": {
                "size": {
                    "w": seatingChartPanel.clientWidth,
                    "h": seatingChartPanel.clientHeight
                }
            }
        };

        this._decorator = new SeatingChartDecorator();
        this._decorator.initialize();
    }

    update(observable, param) {
        console.log('SeatingChartLayouter::update()');
        switch (param.event) {
            case Event.EVENT_GENERATE_SEATING_CHART:
                break;
            case Event.EVENT_CHANGE_TABLE_SETTING:
                this._handleToChangeTableSetting(param);
                break;
            case Event.EVENT_PUSH_TABLE:
                break;
            case Event.EVENT_POP_TABLE:
                break;
            case Event.EVENT_SWAP_TABLE:
                break;
            case Event.EVENT_PUSH_GUEST:
                this._handleToPushGuest(param);
                break;
            case Event.EVENT_POP_GUEST:
                break;
            case Event.EVENT_SWAP_GUEST:
                break;
            default:
                break;
        }
    }

    _handleToChangeTableSetting(param) {
        console.log('SeatingChartLayouter::_handleToChangeTableSetting()');

        this._createSeatingChartData(param);

        this._createSeatingChart();
    }

    _handleToPushGuest(param) {
        console.log('SeatingChartLayouter::_handleToPushGuest()');
        this._drawer.drawGuest(param.src);
    }

    _createSeatingChartData(param) {
        console.log('SeatingChartLayouter::_createSeatingChartData()');


        const sectionSizeW = parseInt(parseInt(this._seatingChartData["panelInfo"]["size"]["w"]) / (parseInt(param["tableLayoutH"])));
        const sectionSizeH = parseInt(parseInt(this._seatingChartData["panelInfo"]["size"]["h"]) / (parseInt(param["tableLayoutV"])));

        // 全体的なレイアウト情報を追加
        let generalInfo = {
            "floorLayout": {
                "sectionNum": {
                    "h": param["tableLayoutH"],
                    "v": param["tableLayoutV"]
                },
                "sectionSize": {
                    "w": sectionSizeW,
                    "h": sectionSizeH
                }
            },
            "tableInfo": {
                "type": param["tableType"],
                "color": "rgb(200,210,250)",
                "seatLimit": 6
            }

        };

        this._seatingChartData["generalInfo"] = generalInfo;

        // テーブルリスト情報を作成する
        let tableList = {};

        for (let v = 0; v < param.tableLayoutV; ++v) {
            for (let h = 0; h < param.tableLayoutH; ++h) {

                const idVal = v * param.tableLayoutH + h;
                let table = {
                    "id": idVal
                };
                tableList[idVal] = table;
            }
        }

        this._seatingChartData["tableList"] = tableList;
    }

    _createSeatingChart() {
        console.log('SeatingChartLayouter::_createSeatingChart()');


        const seatingChartPanel = this._view.getElementById('seating-chart-panel');

        const hNum = this._seatingChartData["generalInfo"]["floorLayout"]["sectionNum"]["h"];
        const vNum = this._seatingChartData["generalInfo"]["floorLayout"]["sectionNum"]["v"];

        for (let v = 0; v < vNum; ++v) {
            let rowHTML = "";
            for (let h = 0; h < hNum; ++h) {
                const number = parseInt(v * hNum + h);
                const rowID = `section-row-${number}`;
                rowHTML += `<div id="${rowID}" class="section-row" style="background-color:#FFCC00;">`;
            }

            const colID = `section-col-${v}`;
            seatingChartPanel.innerHTML += `<div id="${colID}" class="section-col">` + rowHTML + `</div>`;
        }

        this._view.getElementsByClassName('section-col').array.forEach(element => {

        });;
        /*.forEach((element) => {
            console.log("roop");

        });*/

        //this._view.getElementsByClassName('section-col').forEach(element => {
        /*

        element.style.width = '100%';
        const hSize = this._seatingChartData["generalInfo"]["floorLayout"]["sectionSize"]["h"] + "px";
        element.style.height = hSize;
        */
        //});

        /*
        this._view.getElementsByClassName('section-row').forEach(element => {

            const wSize = this._seatingChartData["generalInfo"]["floorLayout"]["sectionSize"]["w"] + "px";
            element.style.width = wSize;
            element.style.height = '100%';

        });*/

    }


}