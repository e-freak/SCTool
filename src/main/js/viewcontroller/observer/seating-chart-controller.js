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
            // パネルエレメント追加
            let itemPanelElement = this._view.createElement("div");
            itemPanelElement.id = `seating-chart-item-panel-${i}`;
            itemPanelElement.className = `seating-chart-item-panel`;
            seatingChartPanel.appendChild(itemPanelElement);

            // デザイン
            itemPanelElement.style.width = String(itemPanelWidth - 3) + 'px';
            itemPanelElement.style.height = String(itemPanelHeight - 3) + 'px';

            // イベントリスナー追加
            itemPanelElement.addEventListener('dragover', this._stopDefAction.bind(this));
            itemPanelElement.addEventListener('drop', this._stopDefAction.bind(this));
            itemPanelElement.addEventListener('drop', this. _onDropToItemPanel.bind(this));

        }
    }

    _updateTable(data) {
        console.log('SeatingChartController::_updateTable()');
        let itemPanelList = this._view.getElementsByClassName("seating-chart-item-panel");

        if (itemPanelList.length === 0) {
            return;
        };

        let canvas = this._view.createElement("canvas");
        const canvasSize = parseInt(Math.min(itemPanelList[0].clientWidth, itemPanelList[0].clientHeight) * 0.5);
        canvas.width = canvas.height = canvasSize;

        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = "rgb(200,210,250)";
        ctx.fillStyle = "rgb(200,210,250)";

        const tableType = data["tableType"];
        switch (tableType) {
            case TableType.TABLE_SQUARE:
                const per = 0.8;
                const origin = canvasSize * (1 - per) * 0.5;
                ctx.fillRect(origin, origin, canvasSize * per, canvasSize * per);
                break;

            case TableType.TABLE_ROUND:
            default:
                ctx.beginPath();
                ctx.arc(canvasSize * 0.5, canvasSize * 0.5, canvasSize * 0.5, 0, Math.PI * 2, true);
                ctx.fill();
                break;
        }

        for (let i = 0; i < itemPanelList.length; ++i) {
            // テーブルエレメント追加
            let tableImgElement = this._view.createElement("img");
            tableImgElement.id = `seating-chart-item-panel-element-table-${i}`;
            tableImgElement.className = `seating-chart-item-panel-element-table`;
            tableImgElement.width = canvas.width;
            tableImgElement.height = canvas.height;
            tableImgElement.src = canvas.toDataURL();
            tableImgElement.alt = `tableImage`;
            itemPanelList[i].appendChild(tableImgElement);

            // デザイン
            itemPanelList[i].style.display = 'flex';
            itemPanelList[i].style.justifyContent = 'center';
            itemPanelList[i].style.alignItems = 'center';

            // イベントリスナー追加
            tableImgElement.addEventListener('dragstart', this._onDragStartTable.bind(this));
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

        for (let i = 0; i < tableList.length; ++i) {
            const guestList = tableList[i]["GuestList"];

            for (let j = 0; j < guestList.length; ++j) {
                const guestInfo = guestList[j];

                // ゲストエレメント追加
                let guestImgElement = this._view.createElement("img");
                guestImgElement.id = `seating-chart-item-panel-element-guest-${j}`;
                guestImgElement.className = `seating-chart-item-panel-element-guest`;
                const guestSize = parseInt(Math.min(itemPanelList[i].clientWidth, itemPanelList[i].clientHeight) * 0.2);
                guestImgElement.width = guestSize;
                guestImgElement.height = guestSize;
                guestImgElement.src = guestInfo["src"];
                guestImgElement.alt = `guestImage`;
                itemPanelList[i].appendChild(guestImgElement);

                
                // デザイン
                itemPanelList[i].style.position = 'relative';
                guestImgElement.style.position = 'absolute';

                const tableType = data["tableType"];
                switch (tableType) {
                    case TableType.TABLE_SQUARE:
                        {
                            // 向かい合わせに配置する
                            let x = 0;
                            let y = 0;
                            if((j + 1) % 2 !== 0){
                                // 奇数（左列配置）の場合
                                const leftGuestNum = Math.ceil(guestList.length / 2);
                                // 位置 - CSS（右上）合わせ
                                x = (itemPanelList[i].clientWidth * 0.2) - (guestImgElement.width / 2);
                                y = (itemPanelList[i].clientHeight / (leftGuestNum+1)) * Math.ceil((j+1) / 2) - (guestImgElement.height / 2);

                            }
                            else{
                                // 偶数（右列配置の場合）
                                const rightGuestNum = Math.floor(guestList.length / 2);
                                // 位置 - CSS（右上）合わせ
                                x = (itemPanelList[i].clientWidth * 0.8) - (guestImgElement.width / 2);
                                y = (itemPanelList[i].clientHeight / (rightGuestNum + 1)) * Math.floor((j+1)/ 2) - (guestImgElement.height / 2);
                            }
                            guestImgElement.style.left = String(x) + 'px';
                            guestImgElement.style.top = String(y) + 'px';
                        }
                        break;
                    case TableType.TABLE_ROUND:
                    default:
                        {
                            // 円周状に配置する
                            const centerX = itemPanelList[i].clientWidth / 2;
                            const centerY = itemPanelList[i].clientHeight / 2;

                            // 天頂から始める
                            const deg = ((360.0 / guestList.length) * j) - 90.0;
                            const radian = (deg * Math.PI) / 180.0;
                            const radius = parseInt(Math.min(itemPanelList[i].clientWidth, itemPanelList[i].clientHeight)) * 0.5 * 0.75;
                            // 単位円上の座標 * 半径 + 中央合わせ - CSS（右上）合わせ
                            const x = Math.cos(radian) * radius + centerX - (guestImgElement.width / 2);
                            const y = Math.sin(radian) * radius + centerY - (guestImgElement.height / 2);

                            guestImgElement.style.left = String(x) + 'px';
                            guestImgElement.style.top = String(y) + 'px';
                        }
                        break;
                }
            }    
        }

    }

    

    _stopDefAction(evt) {
        evt.preventDefault();
    }

    //_onDragOverAvatar() {}

    //_onDragLeaveAvatar() {}

    //_onDragEnterAvatar() {}

    _onDropToItemPanel(event) {
        console.log('SeatingChartController::_onDropItemPanel()');

        // 自身のパネルインデックスを取得
        let itemPanelList = this._view.getElementsByClassName("seating-chart-item-panel");
        let myPanel = this._view.getElementById(event.currentTarget.id);
        let myPanelIndex = [].slice.call(itemPanelList).indexOf(myPanel);

        // 受け取ったものによって処理を変更
        const targetID = event.dataTransfer.getData("text");

        console.log(targetID);

        switch (this._view.getElementById(targetID).className) {
            case "guest-avatar":
                {
                    const param = {
                        event: Event.EVENT_PUSH_GUEST,
                        targetTableIndex: myPanelIndex,
                        GuestInfo: {
                            src: this._view.getElementById(targetID).src
                        }
                    }

                    this._dataManager.handleEvent(param);
                }
                break;

            case "seating-chart-item-panel-element-table":
                {
                    let targetPanel = this._view.getElementById(targetID).parentNode;
                    let targetPanelIndex = [].slice.call(itemPanelList).indexOf(targetPanel);
                    
                    const param = {
                        event: Event.EVENT_SWAP_TABLE,
                        targetTableIndex: [targetPanelIndex,myPanelIndex]
                    }

                    this._dataManager.handleEvent(param);
                }
                break;
            break;
            default:
            break
        }



        
    }

    _onDragStartTable(event) {
        console.log('SeatingChartController::_onDragStartTable()');
        event.dataTransfer.setData("text/plain", event.currentTarget.id);
    }

}