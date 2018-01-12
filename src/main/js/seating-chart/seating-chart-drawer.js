/**
 * seating-chart-drawer.js
 * 
 * 席次表を描画する
 */

import TableType from '../property/table-type';

export default class SeatingChartDrawer {
    constructor(canvas) {
        //alert('SeatingChartDrawer::constructor()');

        this._canvas = canvas;
        this._ctx = this._canvas.getContext('2d');
    }

    initialize() {
        this._ctx.fillStyle = "rgb(100,0,0)";
    }

    drawTable(tableType) {
        switch (tableType) {
            case TableType.TABLE_ROUND:
                this._ctx.fillStyle = "rgb(100,0,0)";
                this._ctx.fillRect(100, 0, 50, 50);
                break;
            case TableType.TABLE_SQUARE:
                this._ctx.fillStyle = "rgb(0,100,0)";
                this._ctx.fillRect(0, 100, 50, 50);
                break;
            default:
                throw new Error(`Unknown TableType : ${tableType}`);
        }
    }

    drawGuest(src) {
        var img = new Image();
        img.src = src;

        this._ctx.drawImage(img, 0, 0)


    }

}