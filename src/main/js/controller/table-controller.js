/**
 * table-controller.js
 * 
 * テーブルパネルに対する操作をコントロールする
 * 
 */

import Observable from './observable';

import Event from '../property/event'
import TableType from '../property/table-type';



export default class TableController extends Observable {

    constructor(view) {
        //alert('TableController::constructor()');

        super();

        this._view = view;
        this._tableType = TableType.TABLE_ROUND;
    }

    initialize() {
        //alert('TableController::initialize');

        // ラジオの値が変更されたときの動作を定義する
        const tableTypeRadios = this._view.getElementsByName('table-type');

        for (let i = 0; i < tableTypeRadios.length; ++i) {
            tableTypeRadios[i].addEventListener('change', this._onChangeTableTypeRadio.bind(this, tableTypeRadios[i].id));
        }

        // 初期値としてTableType.TABLE_ROUNDを明示する
        this._onChangeTableTypeRadio('table-type-radio-round');
    }


    _onChangeTableTypeRadio(radioID) {
        //alert('TableController::onChangeTableTypeRadio');

        switch (radioID) {
            case 'table-type-radio-round':
                this._tableType = TableType.TABLE_ROUND;
                this._changeToRoundTable();
                break;
            case 'table-type-radio-square':
                this._tableType = TableType.TABLE_SQUARE;
                this._changeToSquareTable();
                break;
            default:
                // ${} 変数や式が入れられる
                throw new Error(`Unexpected Table : ${radioID}`);
        }

        const param = {
            event: Event.CHANGE_TABLE_TYPE,
            tableType: this._tableType
        }

        this.notifyAllObserver(param);


    }

    _changeToRoundTable() {

        this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-blue.png';
        this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-round').style.borderColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-yellow.png';
        this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#004986';
        this._view.getElementById('table-type-radio-img-square').style.borderColor = 'transparent';


    }

    _changeToSquareTable() {

        this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-yellow.png';
        this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#004986';
        this._view.getElementById('table-type-radio-img-round').style.borderColor = 'transparent';
        this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-blue.png';
        this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-square').style.borderColor = '\#d9ded9';


    }


}