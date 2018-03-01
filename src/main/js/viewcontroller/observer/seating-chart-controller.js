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

        const trashbox = this._view.getElementById('trashbox');

        // イベントリスナー追加
        trashbox.addEventListener('dragover', this._stopDefAction.bind(this));
        trashbox.addEventListener('dragenter', this._stopDefAction.bind(this));
        trashbox.addEventListener('dragleave', this._stopDefAction.bind(this));
        trashbox.addEventListener('drop', this._stopDefAction.bind(this));
        trashbox.addEventListener('dragenter', this._onDragEnterTrashbox.bind(this));
        trashbox.addEventListener('dragleave', this._onDragLeaveTrashbox.bind(this));
        trashbox.addEventListener('drop', this._onDropTrashbox.bind(this));

        trashbox.className = 'trashbox close';
    }

    update(observable, data) {
        console.log('SeatingChartController::update()');

        const seatingChart = this._view.getElementById('seating-chart');

        // 古い情報を削除する
        seatingChart.innerHTML = "";

        // テーブル数を元に基本のレイアウトを作成する
        this._updateBaseLayout(data);

        // テーブルタイプに応じてテーブルを描画する
        this._updateTable(data);

        // ゲストを描画する
        this._updateGuest(data);

    }

    _updateBaseLayout(data) {
        console.log('SeatingChartController::_updateBaseLayout()');

        const seatingChart = this._view.getElementById('seating-chart');

        const hNum = this._view.getElementById('table-layout-h').value;
        const vNum = this._view.getElementById('table-layout-v').value;
        const itemPanelWidth = parseInt(seatingChart.clientWidth / hNum);
        const itemPanelHeight = parseInt(seatingChart.clientHeight / vNum);

        const tableList = data["tableList"];
        for (let i = 0; i < tableList.length; ++i) {
            // パネル追加
            let itemPanelElement = this._view.createElement("div");
            itemPanelElement.id = `seating-chart-panel-item-${i}`;
            itemPanelElement.className = `seating-chart-panel-item`;
            seatingChart.appendChild(itemPanelElement);

            // デザイン
            itemPanelElement.style.width = String(itemPanelWidth) + 'px';
            itemPanelElement.style.height = String(itemPanelHeight) + 'px';

            // イベントリスナー追加
            itemPanelElement.addEventListener('dragover', this._stopDefAction.bind(this));
            itemPanelElement.addEventListener('drop', this._stopDefAction.bind(this));
            itemPanelElement.addEventListener('drop', this._onDropItemPanel.bind(this));

        }
    }

    _updateTable(data) {
        console.log('SeatingChartController::_updateTable()');
        let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");

        if (itemPanelList.length === 0) {
            return;
        };

        for (let i = 0; i < itemPanelList.length; ++i) {

            let canvas = this._view.createElement("canvas");
            const canvasSize = parseInt(Math.min(itemPanelList[i].clientWidth, itemPanelList[i].clientHeight) * 0.5);
            canvas.width = canvas.height = canvasSize;

            let ctx = canvas.getContext('2d');
            ctx.strokeStyle = "rgb(200,210,250)";
            ctx.fillStyle = "rgb(200,210,250)";
            ctx.font = "36px 'Sakkal Majalla'";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const charCode = 65 + i; // "A"開始

            const tableType = data["tableType"];
            switch (tableType) {
                case TableType.TABLE_SQUARE:
                    const per = 0.8;
                    const origin = canvasSize * (1 - per) * 0.5;
                    ctx.fillRect(origin, origin, canvasSize * per, canvasSize * per);

                    // 白抜きでテーブル番号を書く
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillText(String.fromCharCode(charCode), canvasSize * 0.5, canvasSize * 0.5, canvasSize * per * 0.5);
                    break;

                case TableType.TABLE_ROUND:
                default:
                    ctx.beginPath();
                    ctx.arc(canvasSize * 0.5, canvasSize * 0.5, canvasSize * 0.5, 0, Math.PI * 2, true);
                    ctx.fill();

                    // 白抜きでテーブル番号を書く
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillText(String.fromCharCode(charCode), canvasSize * 0.5, canvasSize * 0.5, canvasSize * 0.5 * 0.5);
                    break;
            }


            // テーブルエレメント追加
            let tableImgElement = this._view.createElement("img");
            tableImgElement.id = `seating-chart-element-table-${i}`;
            tableImgElement.className = `seating-chart-element-table`;
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
        let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");

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


                let guestElement = this._view.createElement("div");

                // ゲストエレメント追加
                let guestImgElement = this._view.createElement("img");
                guestImgElement.id = `seating-chart-element-guest-${i}-${j}`;
                guestImgElement.className = `seating-chart-element-guest`;
                const guestSize = parseInt(Math.min(itemPanelList[i].clientWidth, itemPanelList[i].clientHeight) * 0.2);
                guestImgElement.width = guestSize;
                guestImgElement.height = guestSize;
                guestImgElement.src = guestInfo["src"];
                guestImgElement.alt = `guestImage`;

                // ツールチップエレメント追加
                let guestTooltipElement = this._view.createElement("div");
                guestTooltipElement.id = `guest-tooltip-${i}-${j}`;
                guestTooltipElement.className = `guest-tooltip`;
                guestTooltipElement.innerHTML = guestInfo["name"];

                guestElement.appendChild(guestImgElement);
                guestElement.appendChild(guestTooltipElement);

                itemPanelList[i].appendChild(guestElement);

                // デザイン
                itemPanelList[i].style.position = 'relative';
                guestImgElement.style.position = 'absolute';
                guestTooltipElement.style.position = 'absolute';
                guestTooltipElement.style.display = 'none';

                const tableType = data["tableType"];
                switch (tableType) {
                    case TableType.TABLE_SQUARE:
                        {
                            // 向かい合わせに配置する
                            let x = 0;
                            let y = 0;
                            if ((j + 1) % 2 !== 0) {
                                // 奇数（左列配置）の場合
                                const leftGuestNum = Math.ceil(guestList.length / 2);
                                // 位置 - CSS（右上）合わせ
                                x = (itemPanelList[i].clientWidth * 0.2) - (guestImgElement.width / 2);
                                y = (itemPanelList[i].clientHeight / (leftGuestNum + 1)) * Math.ceil((j + 1) / 2) - (guestImgElement.height / 2);

                            } else {
                                // 偶数（右列配置の場合）
                                const rightGuestNum = Math.floor(guestList.length / 2);
                                // 位置 - CSS（右上）合わせ
                                x = (itemPanelList[i].clientWidth * 0.8) - (guestImgElement.width / 2);
                                y = (itemPanelList[i].clientHeight / (rightGuestNum + 1)) * Math.floor((j + 1) / 2) - (guestImgElement.height / 2);
                            }
                            guestImgElement.style.left = String(x) + 'px';
                            guestImgElement.style.top = String(y) + 'px';

                            guestTooltipElement.style.left = String(x + guestImgElement.width + 10) + 'px';
                            guestTooltipElement.style.top = String(y) + 'px';
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


                            guestTooltipElement.style.left = String(x + guestImgElement.width + 10) + 'px';
                            guestTooltipElement.style.top = String(y) + 'px';
                        }
                        break;
                }


                // イベントリスナー追加

                guestImgElement.addEventListener('dragstart', this._onDragStartGuest.bind(this));

                guestImgElement.addEventListener('dragover', this._stopDefAction.bind(this));
                guestImgElement.addEventListener('drop', this._stopDefAction.bind(this));
                guestImgElement.addEventListener('drop', this._onDropGuestImgElement.bind(this));

                guestImgElement.addEventListener('mouseover', this._onMouseOverGuestImgElement.bind(this));
                guestImgElement.addEventListener('mouseout', this._onMouseOutGuestImgElement.bind(this));


            }
        }

    }



    _stopDefAction(evt) {
        evt.preventDefault();
    }

    _onDropItemPanel(event) {
        console.log('SeatingChartController::_onDropItemPanel()');

        // 受け取ったものによって処理を変更
        const targetID = event.dataTransfer.getData("text");

        switch (this._view.getElementById(targetID).className) {
            case "guest-avatar":
                {
                    // ゲストリストからの新規追加

                    // 自身のパネルインデックスを取得
                    let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");
                    let myPanel = this._view.getElementById(event.currentTarget.id);
                    let myPanelIndex = [].slice.call(itemPanelList).indexOf(myPanel);


                    const param = {
                        event: Event.EVENT_PUSH_GUEST,
                        targetTableIndex: myPanelIndex,
                        GuestInfo: {
                            id: targetID,
                            name: this._view.getElementById(targetID).parentNode.nextSibling.innerHTML,
                            src: this._view.getElementById(targetID).src
                        }
                    }

                    this._dataManager.handleEvent(param);
                }
                break;

            case "seating-chart-element-guest":
                {
                    // ゲストの移動                     
                    let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");

                    // 自身のインデックスを取得
                    let myPanel = this._view.getElementById(event.currentTarget.id);
                    let myPanelIndex = [].slice.call(itemPanelList).indexOf(myPanel);

                    let myImgElementList = myPanel.getElementsByClassName("seating-chart-element-guest");
                    let myImgElementIndex = (myImgElementList === undefined) ? 0 : myImgElementList.length;

                    // 対象物のインデックスを取得
                    let targetPanel = this._view.getElementById(targetID).parentNode.parentNode;
                    let targetPanelIndex = [].slice.call(itemPanelList).indexOf(targetPanel);

                    let targetImgElementList = targetPanel.getElementsByClassName("seating-chart-element-guest");
                    let targetImgElement = this._view.getElementById(targetID);
                    let targetImgElementIndex = [].slice.call(targetImgElementList).indexOf(targetImgElement);

                    const param = {
                        event: Event.EVENT_MOVE_GUEST,
                        // src,dstの順
                        targetTableIndex: [targetPanelIndex, myPanelIndex],
                        targetGuestIndex: [targetImgElementIndex, myImgElementIndex]
                    }

                    this._dataManager.handleEvent(param);
                }
                break;

            case "seating-chart-element-table":
                {
                    // テーブルの入れ替え

                    // 自身のパネルインデックスを取得
                    let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");
                    let myPanel = this._view.getElementById(event.currentTarget.id);
                    let myPanelIndex = [].slice.call(itemPanelList).indexOf(myPanel);

                    // 対象物が属するパネルインデックスを取得
                    let targetPanel = this._view.getElementById(targetID).parentNode;
                    let targetPanelIndex = [].slice.call(itemPanelList).indexOf(targetPanel);

                    const param = {
                        event: Event.EVENT_SWAP_TABLE,
                        // src,dstの順
                        targetTableIndex: [targetPanelIndex, myPanelIndex]
                    }

                    this._dataManager.handleEvent(param);
                }
                break;
            default:
                break
        }




    }

    _onMouseOverGuestImgElement(event) {
        console.log('SeatingChartController::_onMouseOverGuestImgElement()');

        // 通常Tooltipが一つ
        let element = this._view.getElementById(event.currentTarget.id).nextSibling;

        if (element) {

            element.style.display = 'block';
        }
    }

    _onMouseOutGuestImgElement(event) {
        console.log('SeatingChartController::_onMouseOutGuestImgElement()');

        // 通常Tooltipが一つ
        let element = this._view.getElementById(event.currentTarget.id).nextSibling;

        if (element) {

            element.style.display = 'none';
        }
    }


    _onDropGuestImgElement(event) {
        console.log('SeatingChartController::_onDropGuestImgElement()');

        // 受け取ったものによって処理を変更
        const targetID = event.dataTransfer.getData("text");

        switch (this._view.getElementById(targetID).className) {

            case "seating-chart-element-guest":
                {
                    // ゲストの入れ替え                     

                    let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");

                    // 自身のインデックスを取得
                    let myPanel = this._view.getElementById(event.currentTarget.id).parentNode.parentNode;
                    let myPanelIndex = [].slice.call(itemPanelList).indexOf(myPanel);

                    let myImgElementList = myPanel.getElementsByClassName("seating-chart-element-guest");
                    let myImgElement = this._view.getElementById(event.currentTarget.id);
                    let myImgElementIndex = [].slice.call(myImgElementList).indexOf(myImgElement);

                    // 対象物のインデックスを取得
                    let targetPanel = this._view.getElementById(targetID).parentNode.parentNode;
                    let targetPanelIndex = [].slice.call(itemPanelList).indexOf(targetPanel);

                    let targetImgElementList = targetPanel.getElementsByClassName("seating-chart-element-guest");
                    let targetImgElement = this._view.getElementById(targetID);
                    let targetImgElementIndex = [].slice.call(targetImgElementList).indexOf(targetImgElement);

                    const param = {
                        event: Event.EVENT_SWAP_GUEST,
                        // src,dstの順
                        targetTableIndex: [targetPanelIndex, myPanelIndex],
                        targetGuestIndex: [targetImgElementIndex, myImgElementIndex]
                    }

                    this._dataManager.handleEvent(param);
                }
                break;
            default:
                break
        }




    }

    _onDragEnterTrashbox(event) {
        console.log('SeatingChartController::_onDragEnterTrashbox()');

        this._view.getElementById("trashbox").className = "trashbox open";
    }

    _onDragLeaveTrashbox(event) {
        console.log('SeatingChartController::_onDragLeaveTrashbox()');

        this._view.getElementById("trashbox").className = "trashbox close";
    }

    _onDropTrashbox(event) {
        console.log('SeatingChartController::_onDropTrashbox()');

        // 対象を削除する
        const targetID = event.dataTransfer.getData("text");

        switch (this._view.getElementById(targetID).className) {
            case "seating-chart-element-guest":
                {
                    // 対象物のインデックスを取得する
                    let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");
                    let targetPanel = this._view.getElementById(targetID).parentNode.parentNode;
                    let targetPanelIndex = [].slice.call(itemPanelList).indexOf(targetPanel);

                    let guestImgList = this._view.getElementsByClassName("seating-chart-element-guest");
                    let targetElement = this._view.getElementById(targetID);
                    let targetElementIndex = [].slice.call(guestImgList).indexOf(targetElement);


                    const param = {
                        event: Event.EVENT_POP_GUEST,
                        targetTableIndex: targetPanelIndex,
                        targetGuestIndex: targetElementIndex
                    }

                    this._dataManager.handleEvent(param);
                }
                break;

            case "seating-chart-element-table":
                {

                    // 対象物のインデックスを取得する
                    let itemPanelList = this._view.getElementsByClassName("seating-chart-panel-item");
                    let targetPanel = this._view.getElementById(targetID).parentNode;
                    let targetPanelIndex = [].slice.call(itemPanelList).indexOf(targetPanel);

                    const param = {
                        event: Event.EVENT_POP_TABLE,
                        targetTableIndex: targetPanelIndex
                    }

                    this._dataManager.handleEvent(param);
                }
                break;
            default:
                break
        }


        this._view.getElementById("trashbox").className = "trashbox close";

    }


    _onDragStartTable(event) {
        console.log('SeatingChartController::_onDragStartTable()');
        event.dataTransfer.setData("text/plain", event.currentTarget.id);
    }

    _onDragStartGuest(event) {
        console.log('SeatingChartController::_onDragStartGuest()');
        event.dataTransfer.setData("text/plain", event.currentTarget.id);
    }


}