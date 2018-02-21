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


    }

    update(observable, data) {
        console.log('SeatingChartController::update()');

        const seatingChartPanel = this._view.getElementById('seating-chart-panel');

        // 古い情報を削除する
        seatingChartPanel.innerHTML = "";

        // テーブル数を元に基本のitemレイアウトを作成する
        this._updateBaseLayout(data);

        // テーブルタイプに応じてテーブルを描画する
        this._updateTable(data);

        // ゲストを描画する
        this._updateGuest(data);

    }

    _updateBaseLayout(data) {
        console.log('SeatingChartController::_updateBaseLayout()');

        const seatingChartPanel = this._view.getElementById('seating-chart-panel');

        const hNum = this._view.getElementById('table-layout-h').value;
        const vNum = this._view.getElementById('table-layout-v').value;
        const itemPanelWidth = parseInt(seatingChartPanel.clientWidth / hNum);
        const itemPanelHeight = parseInt(seatingChartPanel.clientHeight / vNum);

        const tableList = data["tableList"];
        for (let i = 0; i < tableList.length; ++i) {
            let itemPanelElement = this._view.createElement("div");
            itemPanelElement.id = `seating-chart-item-panel-${i}`;
            itemPanelElement.className = `seating-chart-item-panel`;
            itemPanelElement.style.width = String(itemPanelWidth - 3) + 'px';
            itemPanelElement.style.height = String(itemPanelHeight - 3) + 'px';

            itemPanelElement.addEventListener('dragover', this._stopDefAction.bind(this));
            itemPanelElement.addEventListener('drop', this._stopDefAction.bind(this));
            itemPanelElement.addEventListener('drop', this._onDropAvatar.bind(this));

            seatingChartPanel.appendChild(itemPanelElement);
        }
    }

    _updateTable(data) {
        console.log('SeatingChartController::_updateTable()');
        let itemPanelList = this._view.getElementsByClassName("seating-chart-item-panel");

        if (itemPanelList.length === 0) {
            return;
        };

        let canvas = this._view.createElement("canvas");
        const tableSize = parseInt(Math.min(itemPanelList[0].clientWidth, itemPanelList[0].clientHeight) * 0.5);

        canvas.width = canvas.height = tableSize;

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


        for (let itemPanel of itemPanelList) {
            let tableImgElement = this._view.createElement("img");
            tableImgElement.className = `seating-chart-item-panel-element-table`;
            tableImgElement.width = canvas.width;
            tableImgElement.height = canvas.height;
            tableImgElement.src = canvas.toDataURL();
            tableImgElement.alt = `tableImage`;
            // tableImgElement.style.zIndex = -99;
            itemPanel.appendChild(tableImgElement);
            itemPanel.style.display = 'flex';
            itemPanel.style.justifyContent = 'center';
            itemPanel.style.alignItems = 'center';
        }

    }

    _updateGuest(data) {
        console.log('SeatingChartController::_updateGuest()');
        // https://qiita.com/hirokishirai/items/938c4341b0647766d8dc

        const tableList = data["tableList"];
        let itemPanelList = this._view.getElementsByClassName("seating-chart-item-panel");

        if (tableList.length !== itemPanelList.length) {
            throw Error("Logic Error");
        };

        if (tableList.length === 0 || itemPanelList.length === 0) {
            return;
        };

        const guestSize = parseInt(Math.min(itemPanelList[0].clientWidth, itemPanelList[0].clientHeight) * 0.2);

        for (let i = 0; i < tableList.length; ++i) {

            const guestList = tableList[i]["GuestList"];
            for (let j = 0; j < guestList.length; ++j) {

                const guestInfo = guestList[j];

                let guestImgElement = this._view.createElement("img");
                guestImgElement.id = `seating-chart-item-panel-element-guest-${j}`;
                guestImgElement.className = `seating-chart-item-panel-element-guest`;
                guestImgElement.width = guestSize;
                guestImgElement.height = guestSize;
                guestImgElement.src = guestInfo["src"];
                guestImgElement.alt = `guestImage`;
                // tableImgElement.style.zIndex = -99;

                itemPanelList[i].appendChild(guestImgElement);

                // 円周状に配置する
                itemPanelList[i].style.position = 'relative';
                guestImgElement.style.position = 'absolute';

                let deg = 360.0 / guestList.length;
                let red = (deg * Math.PI / 180.0);
                let circle_r = guestImgElement.clientWidth * 2.5;
                const x = Math.cos(red * j) * circle_r + circle_r;
                const y = Math.sin(red * j) * circle_r + circle_r;

                guestImgElement.style.left = String(x) + 'px';
                guestImgElement.style.top = String(y) + 'px';


            }




        }
    }

    _stopDefAction(evt) {
        evt.preventDefault();
    }

    //_onDragOverAvatar() {}

    //_onDragLeaveAvatar() {}

    //_onDragEnterAvatar() {}

    _onDropAvatar(event) {
        console.log('GuestController::_onDropAvatar()');

        // 自身のパネルインデックスを取得
        let itemPanelList = this._view.getElementsByClassName("seating-chart-item-panel");
        let myPanel = this._view.getElementById(event.target.id);
        let myPanelIndex = [].slice.call(itemPanelList).indexOf(myPanel);

        alert(myPanelIndex);

        const targetID = event.dataTransfer.getData("text");

        const param = {
            event: Event.EVENT_PUSH_GUEST,
            targetTableIndex: myPanelIndex,
            GuestInfo: {
                src: this._view.getElementById(targetID).src
            }
        }

        this._dataManager.handleEvent(param);
    }
}