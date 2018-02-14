/**
 * seating-chart-controller.js
 * 
 * 席次表キャンバスに対する操作をコントロールする
 * 
 */

import Observable from "./observable";

import Event from '../property/event'


export default class SeatingChartController extends Observable {

    constructor(view) {
        console.log('SeatingChartController::constructor()');

        super();

        this._view = view;
    }

    initialize() {
        console.log('SeatingChartController::initialize()');

        this._view.getElementById('seating-chart').addEventListener('dragover', this._stopDefAction.bind(this));
        this._view.getElementById('seating-chart').addEventListener('drop', this._stopDefAction.bind(this));

        this._view.getElementById('seating-chart').addEventListener('dragover', this._onDragOverAvatar.bind(this));
        this._view.getElementById('seating-chart').addEventListener('dragleave', this._onDragLeaveAvatar.bind(this));
        this._view.getElementById('seating-chart').addEventListener('dragenter', this._onDragEnterAvatar.bind(this));
        this._view.getElementById('seating-chart').addEventListener('drop', this._onDropAvatar.bind(this));
    }

    _stopDefAction(evt) {
        evt.preventDefault();
    }

    _onDragOverAvatar() {

        console.log('GuestController::_onDragOverAvatar()');
        this._view.getElementById('seating-chart').style.borderColor = 'red';
        this._view.getElementById('seating-chart').style.borderWidth = '10px';
    }

    _onDragLeaveAvatar() {

        console.log('GuestController::_onDragLeaveAvatar()');
        this._view.getElementById('seating-chart').style.borderColor = 'transparent';
    }

    _onDragEnterAvatar() {
        console.log('GuestController::_onDragEnterAvatar()');
    }
    _onDropAvatar(event) {
        console.log('GuestController::_onDropAvatar()');
        const srcFilePath = event.dataTransfer.getData("text");

        const param = {
            event: Event.EVENT_PUSH_GUEST,
            src: srcFilePath,
        }

        this.notifyAllObserver(param);
    }
}