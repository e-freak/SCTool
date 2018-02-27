/**
 * date-manager.js
 * 
 * 各種変更イベントを受けて席次データを管理する
 * # 席次表に表示するテーブル情報とそれに紐づくゲストの情報だけ管理し、
 * # その他の非アクティブな情報やレイアウトに関する情報には関与しないこと
 */

import Observable from './observable';

import Event from '../../common/event'

export default class DataManager extends Observable {
    constructor() {
        console.log('DataManager::constructor()');

        super();

        this._tableType = undefined;
        this._tableList = [];

        const DEFAULT_TABLE_MIN = 0;
        const DEFAULT_TABLE_MAX = 25;
        const DEFAULT_GUEST_MIN = 0;
        const DEFAULT_GUEST_MAX = 8;

        this._tableMin = DEFAULT_TABLE_MIN;
        this._tableMax = DEFAULT_TABLE_MAX;
        this._guestMin = DEFAULT_GUEST_MIN;
        this._guestMax = DEFAULT_GUEST_MAX;
    }

    handleEvent(param) {
        console.log('DataManager::handleEvent()');
        switch (param.event) {
            case Event.EVENT_CHANGE_TABLE_TYPE:
                this._handleToChangeTableType(param);
                break;
            case Event.EVENT_CHANGE_TABLE_TOTAL:
                this._handleToChangeTableTotal(param);
                break;
            case Event.EVENT_DELETE_GUEST:
                this._handleToDeleteGuest(param);
                break;
            case Event.EVENT_PUSH_TABLE:
                this._handleToPushTable(param);
                break;
            case Event.EVENT_POP_TABLE:
                this._handleToPopTable(param);
                break;
            case Event.EVENT_SWAP_TABLE:
                this._handleToSwapTable(param);
                break;
            case Event.EVENT_PUSH_GUEST:
                this._handleToPushGuest(param);
                break;
            case Event.EVENT_POP_GUEST:
                this._handleToPopGuest(param);
                break;
            case Event.EVENT_SWAP_GUEST:
                this._handleToSwapGuest(param);
                break;
            case Event.EVENT_MOVE_GUEST:
                this._handleToMoveGuest(param);
                break;
            default:
                break;
        }

        const data = {
            "tableType": this._tableType,
            "tableList": this._tableList
        };

        this.notifyAllObserver(data)
    }

    _handleToChangeTableType(param) {
        console.log('DataManager::_handleToChangeTableType()');

        this._tableType = param["tableType"];
    }

    _handleToChangeTableTotal(param) {
        console.log('DataManager::_handleToChangeTableTotal()');

        const newTableTotal = parseInt(param["tableTotal"]);

        if (newTableTotal < this._tableMin || newTableTotal > this._tableMax) {
            throw Error("Range Error");
        }

        let newTableList = [];

        // 指定のテーブル数に合わせて、データを更新する
        // 上限以上のテーブルは、削除する
        for (let num = 0; num < newTableTotal; num++) {
            let tableInfo = this._tableList[num];

            // テーブルに不足があれば生成する
            if (tableInfo == undefined) {
                tableInfo = {
                    "GuestList": []
                }
            }
            newTableList.push(tableInfo);
        }

        this._tableList = newTableList;
    }

    _handleToDeleteGuest(param) {
        console.log('DataManager::_handleToDeleteGuest()');

        // ゲストIDを元に一致するゲストを調べる
        const targetGuestID = param["GuestInfo"]["id"];

        let targetTableIndex = -1;
        let targetGuestIndex = -1;

        for (let i = 0; i < this._tableList.length; ++i) {
            const guestList = this._tableList[i]["GuestList"];

            for (let j = 0; j < guestList.length; ++j) {
                if (targetGuestID === guestList[j]["id"]) {
                    targetTableIndex = i;
                    targetGuestIndex = j;
                    break;
                }
            }
        }


        // 存在しないインデックス指定は処理しない
        if (!this._isExistGuestIndex(targetTableIndex, targetGuestIndex)) {
            throw Error("Range Error - [tableIndex]" + targetTableIndex + " [guestIndex]" + targetGuestIndex);
        }

        let targetGuestList = this._tableList[targetTableIndex]["GuestList"];

        // 下限に達している場合は処理しない
        if (targetGuestList.length <= this._guestMin) {
            throw Error("Range Error");
        }

        // ゲスト情報を削除する
        targetGuestList.splice(targetGuestIndex, 1);

        // 結果を反映
        this._tableList[targetTableIndex]["GuestList"] = targetGuestList;


    }


    _handleToPushTable(param) {
        console.log('DataManager::_handleToPushTable()');

        // すでに上限に達している場合は処理しない
        if (this._tableList.length >= this._tableMax) {
            throw Error("Range Error");
        }

        // 末尾追加指定を除き、存在しないインデックス指定は処理しない
        const index = parseInt(param["targetTableIndex"]);
        if (!this._isExistTableIndex(index)) {
            if (index !== this._tableList.length) {
                throw Error("Range Error");
            }
        }

        // 新規テーブル情報を挿入or末尾追加
        const newTableInfo = {
            "GuestList": {}
        };

        this._tableList.splice(index, 0, newTableInfo);
    }

    _handleToPopTable(param) {
        console.log('DataManager::_handleToPopTable()');


        // すでに下限に達している場合は処理しない
        if (this._tableList.length <= this._tableMin) {
            throw Error("Range Error");
        }

        // 存在しないインデックス指定は処理しない
        const index = parseInt(param["targetTableIndex"]);
        if (!this._isExistTableIndex(index)) {
            throw Error("Range Error");
        }


        // テーブル情報を削除
        this._tableList.splice(index, 1);
    }

    _handleToSwapTable(param) {
        console.log('DataManager::_handleToSwapTable()');

        const index1 = parseInt(param["targetTableIndex"][0]);
        const index2 = parseInt(param["targetTableIndex"][1]);

        // 存在しないインデックス指定は処理しない
        if (!this._isExistTableIndex(index1) || !this._isExistTableIndex(index2)) {
            throw Error("Range Error");
        }


        // テーブル情報を入れ替え
        const tableInfo1 = this._tableList[index1];
        this._tableList[index1] = this._tableList[index2];
        this._tableList[index2] = tableInfo1;

    }

    _handleToPushGuest(param) {
        console.log('DataManager::_handleToPushGuest()');

        // 存在しないテーブルインデックス指定は処理しない
        const tableIndex = parseInt(param["targetTableIndex"]);
        if (this._isExistTableIndex(tableIndex) === false) {
            throw Error("Range Error - [tableIndex]" + tableIndex);
        };

        let guestList = this._tableList[tableIndex]["GuestList"];

        // すでに上限に達している場合は処理しない
        if (guestList.length >= this._guestMax) {
            throw Error("Range Error");
        }

        // 既に存在するゲストの場合、先に旧情報を削除する
        const targetGuestID = param["GuestInfo"]["id"];
        let oldTableIndex = -1;
        let oldGuestIndex = -1;

        for (let i = 0; i < this._tableList.length; ++i) {
            const guestList = this._tableList[i]["GuestList"];

            for (let j = 0; j < guestList.length; ++j) {
                if (targetGuestID === guestList[j]["id"]) {
                    oldTableIndex = i;
                    oldGuestIndex = j;
                    break;
                }
            }
        }

        if (this._isExistGuestIndex(oldTableIndex, oldGuestIndex)) {
            let oldGuestList = this._tableList[oldTableIndex]["GuestList"];

            // 下限に達している場合は処理しない
            if (oldGuestList.length <= this._guestMin) {
                throw Error("Range Error");
            }

            // ゲスト情報を削除する
            oldGuestList.splice(oldGuestIndex, 1);

            // 結果を反映
            this._tableList[oldTableIndex]["GuestList"] = oldGuestList;
        }

        // 新規ゲスト情報を追加する
        const newGuestInfo = {
            "id": param["GuestInfo"]["id"],
            "src": param["GuestInfo"]["src"]
        };

        guestList.splice(guestList.length, 0, newGuestInfo);

        // 結果を反映
        this._tableList[tableIndex]["GuestList"] = guestList;

    }

    _handleToPopGuest(param) {
        console.log('DataManager::_handleToPopGuest()');

        // 存在しないインデックス指定は処理しない
        const tableIndex = parseInt(param["targetTableIndex"]);
        const guestIndex = parseInt(param["targetGuestIndex"]);
        if (!this._isExistGuestIndex(tableIndex, guestIndex)) {
            throw Error("Range Error - [tableIndex]" + tableIndex + " [guestIndex]" + guestIndex);
        }

        let guestList = this._tableList[tableIndex]["GuestList"];

        // 下限に達している場合は処理しない
        if (guestList.length <= this._guestMin) {
            throw Error("Range Error");
        }

        // ゲスト情報を削除する
        guestList.splice(guestIndex, 1);

        // 結果を反映
        this._tableList[tableIndex]["GuestList"] = guestList;
    }

    _handleToSwapGuest(param) {
        console.log('DataManager::_handleToSwapGuest()');

        // 存在しないインデックス指定は処理しない
        const srcTableIndex = parseInt(param["targetTableIndex"][0]);
        const srcGuestIndex = parseInt(param["targetGuestIndex"][0]);
        const dstTableIndex = parseInt(param["targetTableIndex"][1]);
        const dstGuestIndex = parseInt(param["targetGuestIndex"][1]);

        if (!this._isExistGuestIndex(srcTableIndex, srcGuestIndex) ||
            !this._isExistGuestIndex(dstTableIndex, dstGuestIndex)) {
            throw Error("Range Error - [srcTableIndex]" + srcTableIndex + " [srcGuestIndex]" + srcGuestIndex +
                " [dstTableIndex]" + dstTableIndex + " [dstGuestIndex]" + dstGuestIndex);
        }

        // ゲスト情報を直接入れ替える
        const srcGuestInfo = this._tableList[srcTableIndex]["GuestList"][srcGuestIndex];
        this._tableList[srcTableIndex]["GuestList"][srcGuestIndex] = this._tableList[dstTableIndex]["GuestList"][dstGuestIndex];
        this._tableList[dstTableIndex]["GuestList"][dstGuestIndex] = srcGuestInfo;

    }

    _handleToMoveGuest(param) {
        console.log('DataManager::_handleToMoveGuest()');

        // srcのゲストが存在し、dstのゲストが存在しない状態でないと処理をしない
        const srcTableIndex = parseInt(param["targetTableIndex"][0]);
        const srcGuestIndex = parseInt(param["targetGuestIndex"][0]);
        const dstTableIndex = parseInt(param["targetTableIndex"][1]);
        const dstGuestIndex = parseInt(param["targetGuestIndex"][1]);

        if (!this._isExistGuestIndex(srcTableIndex, srcGuestIndex) ||
            !this._isExistTableIndex(dstTableIndex) ||
            this._isExistGuestIndex(dstTableIndex, dstGuestIndex)) {
            throw Error("Range Error - [srcTableIndex]" + srcTableIndex + " [srcGuestIndex]" + srcGuestIndex +
                " [dstTableIndex]" + dstTableIndex + " [dstGuestIndex]" + dstGuestIndex);
        }

        let srcGuestList = this._tableList[srcTableIndex]["GuestList"];
        let dstGuestList = this._tableList[dstTableIndex]["GuestList"];

        // 上限・下限に達している場合は処理しない
        if (srcGuestList.length <= this._guestMin) {
            throw Error("Range Error");
        }
        if (dstGuestList.length >= this._guestMax) {
            throw Error("Range Error");
        }

        // dstにゲスト情報をコピーする
        const srcGuestInfo = this._tableList[srcTableIndex]["GuestList"][srcGuestIndex];
        dstGuestList.splice(dstGuestList.length, 0, srcGuestInfo);
        this._tableList[dstTableIndex]["GuestList"] = dstGuestList;

        // srcのゲスト情報を削除する
        srcGuestList.splice(srcGuestIndex, 1);
        this._tableList[srcTableIndex]["GuestList"] = srcGuestList;
    }

    _isExistTableIndex(tableIndex) {
        console.log('DataManager::_isExistTableIndex()');

        return (tableIndex >= 0 && tableIndex < this._tableList.length) ? true : false;
    }

    _isExistGuestIndex(tableIndex, guestIndex) {
        console.log('DataManager::_isExistGuestIndex()');

        if (this._isExistTableIndex(tableIndex) === false) { return false };

        const guestList = this._tableList[tableIndex]["GuestList"];

        return (guestIndex >= 0 && guestIndex < guestList.length) ? true : false;
    }

}