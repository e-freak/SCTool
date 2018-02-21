/**
 * seating-chart-controller.js
 * 
 * 席次表キャンバスに対する操作をコントロールする
 * 
 */


import Observer from './observer';

import Event from '../../common/event'

import TableType from './table-type'



export default class SeatingChartController extends Observer {

    constructor(view, dataManager) {
        console.log('SeatingChartController::constructor()');

        super();

        this._view = view;
        this._dataManager = dataManager;
    }

    initialize() {
        console.log('SeatingChartController::initialize()');

        this._view.getElementById('seating-chart-panel').addEventListener('dragover', this._stopDefAction.bind(this));
        this._view.getElementById('seating-chart-panel').addEventListener('drop', this._stopDefAction.bind(this));

        this._view.getElementById('seating-chart-panel').addEventListener('dragover', this._onDragOverAvatar.bind(this));
        this._view.getElementById('seating-chart-panel').addEventListener('dragleave', this._onDragLeaveAvatar.bind(this));
        this._view.getElementById('seating-chart-panel').addEventListener('dragenter', this._onDragEnterAvatar.bind(this));
        this._view.getElementById('seating-chart-panel').addEventListener('drop', this._onDropAvatar.bind(this));
    }

    update(observable, data) {
        console.log('SeatingChartController::update()');

        const seatingChartPanel = this._view.getElementById('seating-chart-panel');

        // 古い情報を削除する
        seatingChartPanel.innerHTML = "";

        // 基本のitemレイアウトを作成する
        this._updateBaseLayout(data);

        // tableTypeに応じたテーブルを作成する
        this._updateTable(data);

    }

    _updateBaseLayout(data) {
        console.log('SeatingChartController::_updateBaseLayout()');

        const seatingChartPanel = this._view.getElementById('seating-chart-panel');

        const hNum = this._view.getElementById('table-layout-h').value;
        const vNum = this._view.getElementById('table-layout-v').value;
        const itemWidth = parseInt(seatingChartPanel.clientWidth / hNum);
        const itemHeight = parseInt(seatingChartPanel.clientHeight / vNum);

        const tableList = data["tableList"];
        for (let i = 0; i < tableList.length; ++i) {
            let itemElement = this._view.createElement("div");
            itemElement.id = `seating-chart-item-${i}`;
            itemElement.className = `seating-chart-item`;
            itemElement.style.width = String(itemWidth - 3) + 'px';
            itemElement.style.height = String(itemHeight - 3) + 'px';
            seatingChartPanel.appendChild(itemElement);
        }

    }

    _updateTable(data) {
        console.log('SeatingChartController::_updateTable()');
        let itemList = this._view.getElementsByClassName("seating-chart-item");

        let canvas = this._view.createElement("canvas");
        const tableSize = Math.min(itemList[0].style.clientWidth, itemList[0].style.clientHeight) * 0.3;
        canvas.width = tableSize;
        canvas.height = tableSize;

        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = "rgb(200,210,250)";
        ctx.fillStyle = "rgb(200,210,250)";

        const tableType = data["tableType"];
        switch (tableType) {
            case TableType.TABLE_ROUND:
                ctx.beginPath();
                ctx.arc(tableSize / 2, tableSize / 2, tableSize / 2, 0, Math.PI * 2, true);
                ctx.fill()
                break;
            case TableType.TABLE_SQUARE:
                ctx.fillRect(0, 0, tableSize, tableSize);
                break;
            default:
                ctx.beginPath();
                ctx.arc(tableSize / 2, tableSize / 2, tableSize / 2, 0, Math.PI * 2, true);
                ctx.fill()
                break;
        }

        for (let item of itemList) {
            let tableImgElement = this._view.createElement("img");
            tableImgElement.className = `seating-chart-table`;
            tableImgElement.width = canvas.width;
            tableImgElement.height = canvas.height;
            tableImgElement.src = canvas.toDataURL();
            tableImgElement.alt = `tableImage`;
            // tableImgElement.style.zIndex = -99;
            item.appendChild(tableImgElement);
            //item.style.textAlign = 'center';
        }

    }

    _updateGuest() {
        // https://qiita.com/hirokishirai/items/938c4341b0647766d8dc


    }

    _stopDefAction(evt) {
        evt.preventDefault();
    }

    _onDragOverAvatar() {}

    _onDragLeaveAvatar() {}

    _onDragEnterAvatar() {}

    _onDropAvatar(event) {
        console.log('GuestController::_onDropAvatar()');
        const srcFilePath = event.dataTransfer.getData("text");

        const param = {
            event: Event.EVENT_PUSH_GUEST,
            src: srcFilePath,
        }

        this._dataManager.handleEvent(param);
    }
}