/**
 * table-controller.js
 * 
 * テーブルパネルに対する操作をコントロールする
 * 
 */

import Observer from "./observer";

import Event from '../../observable/event'

import TableType from './table-type';



export default class TableController extends Observer {

    constructor(view, dataManager) {
        console.log('TableController::constructor()');

        super();

        this._view = view;
        this._dataManager = dataManager;
    }

    initialize() {
        console.log('TableController::initialize()');

        this._view.getElementById('table-layout-h').addEventListener('change', this._onChangeTableLayout.bind(this));
        this._view.getElementById('table-layout-v').addEventListener('change', this._onChangeTableLayout.bind(this));

        const tableTypeRadios = this._view.getElementsByName('table-type');
        for (let i = 0; i < tableTypeRadios.length; ++i) {
            tableTypeRadios[i].addEventListener('change', this._onChangeTableType.bind(this));
        }

        // HTMLの初期値をdataManagerに反映させる
        this._onChangeTableLayout();
        this._onChangeTableType();
    }

    update(observable, data) {
        console.log('TableController::update()');

        // tableTypeの変更を反映
        const tableType = data["tableType"];

        switch (tableType) {
            case TableType.TABLE_ROUND:
                this._changeToRoundTable();
                break;
            case TableType.TABLE_SQUARE:
                this._changeToSquareTable();
                break;
            default:
                this._changeToRoundTable();
                break;
        }

        // tableListの数を反映
        //const tableList = data["tableList"];


    }

    _onChangeTableLayout() {
        console.log('TableController::onChangeTableLayout()');

        const tableTotal = this._view.getElementById('table-layout-h').value * this._view.getElementById('table-layout-v').value;

        const param = {
            "event": Event.EVENT_CHANGE_TABLE_TOTAL,
            "tableTotal": tableTotal
        };

        this._dataManager.handleEvent(param);
    }


    _onChangeTableType() {
        console.log('TableController::onChangeTableType()');
        const tableTypeRadios = this._view.getElementsByName('table-type');

        let checkedID;
        for (let i = 0; i < tableTypeRadios.length; ++i) {
            if (tableTypeRadios[i].checked) {
                checkedID = tableTypeRadios[i].id;
                continue;
            }
        }

        let tableType;
        switch (checkedID) {
            case 'table-type-radio-round':
                tableType = TableType.TABLE_ROUND;
                break;
            case 'table-type-radio-square':
                tableType = TableType.TABLE_SQUARE;
                break;
            default:
                // ${} 変数や式が入れられる
                throw new Error(`Unexpected Table : ${tableType}`);
        }

        const param = {
            "event": Event.EVENT_CHANGE_TABLE_TYPE,
            "tableType": tableType
        };

        this._dataManager.handleEvent(param);
    }

    _changeToRoundTable() {
        console.log('TableController::_changeToRoundTable()');
        this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-blue.png';
        this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-round').style.borderColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-yellow.png';
        this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#004986';
        this._view.getElementById('table-type-radio-img-square').style.borderColor = 'transparent';
    }

    _changeToSquareTable() {
        console.log('TableController::_changeToSquareTable()');
        this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-yellow.png';
        this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#004986';
        this._view.getElementById('table-type-radio-img-round').style.borderColor = 'transparent';
        this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-blue.png';
        this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-square').style.borderColor = '\#d9ded9';


    }


}