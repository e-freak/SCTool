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
        console.log('TableController::constructor()');

        super();

        this._view = view;
        this._tableLayoutH = 1;
        this._tableLayoutV = 1;
        this._tableType = TableType.TABLE_ROUND;
    }

    initialize() {
        console.log('TableController::initialize');

        this._view.getElementById('table-layout-h').addEventListener('change', this._onChangeTableLayout.bind(this));
        this._view.getElementById('table-layout-v').addEventListener('change', this._onChangeTableLayout.bind(this));

        const tableTypeRadios = this._view.getElementsByName('table-type');
        for (let i = 0; i < tableTypeRadios.length; ++i) {
            tableTypeRadios[i].addEventListener('change', this._onChangeTableType.bind(this));
        }

        // HTMLで指定した初期値と連動させる
        this._onChangeTableLayout();
        this._onChangeTableType();
    }

    _generateParam() {
        console.log('TableController::_generateParam()');
        const param = {
            "event": Event.EVENT_CHANGE_TABLE_SETTING,
            "tableType": this._tableType,
            "tableLayoutH": this._tableLayoutH,
            "tableLayoutV": this._tableLayoutV
        };

        return param;
    }

    _onChangeTableLayout() {
        console.log('TableController::onChangeTableLayout');

        this._tableLayoutH = this._view.getElementById('table-layout-h').value;
        this._tableLayoutV = this._view.getElementById('table-layout-v').value;

        this.notifyAllObserver(this._generateParam());
    }


    _onChangeTableType() {
        console.log('TableController::onChangeTableType');
        const tableTypeRadios = this._view.getElementsByName('table-type');

        let checkedID;
        for (let i = 0; i < tableTypeRadios.length; ++i) {
            if (tableTypeRadios[i].checked) {
                checkedID = tableTypeRadios[i].id;
                continue;
            }
        }

        switch (checkedID) {
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

        this.notifyAllObserver(this._generateParam());


    }

    _changeToRoundTable() {
        console.log('TableController::_changeToRoundTable');
        this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-blue.png';
        this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-round').style.borderColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-yellow.png';
        this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#004986';
        this._view.getElementById('table-type-radio-img-square').style.borderColor = 'transparent';


    }

    _changeToSquareTable() {
        console.log('TableController::_changeToSquareTable');
        this._view.getElementById('table-type-radio-img-round').src = '../image/table/table-round-c-yellow.png';
        this._view.getElementById('table-type-radio-img-round').style.backgroundColor = '\#004986';
        this._view.getElementById('table-type-radio-img-round').style.borderColor = 'transparent';
        this._view.getElementById('table-type-radio-img-square').src = '../image/table/table-square-c-blue.png';
        this._view.getElementById('table-type-radio-img-square').style.backgroundColor = '\#d9ded9';
        this._view.getElementById('table-type-radio-img-square').style.borderColor = '\#d9ded9';


    }


}