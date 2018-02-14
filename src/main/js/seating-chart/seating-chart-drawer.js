/**
 * seating-chart-drawer.js
 * 
 * 席次表を描画する
 */

import TableType from '../property/table-type';

export default class SeatingChartDrawer {
    constructor(canvas) {
        console.log('SeatingChartDrawer::constructor()');

        this._canvas = canvas;
        this._ctx = this._canvas.getContext('2d');
    }

    initialize() {}

    drawTable(data) {
        console.log('SeatingChartDrawer::drawTable()');

        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        const general = data["general"];
        const tableList = data["tableList"];

        this._ctx.strokeStyle = general["tableColor"];
        this._ctx.fillStyle = general["tableColor"];

        for (let i = 0; i < (general["layout"]["h"] * general["layout"]["v"]); ++i) {


            const tableType = general["tableType"];
            const size = general["tableSize"];
            const posX = tableList[i]["position"]["h"];
            const posY = tableList[i]["position"]["v"];

            switch (tableType) {
                case TableType.TABLE_ROUND:
                    console.log("posX:" + posX);
                    console.log("posY:" + posY);
                    console.log("size:" + size);
                    this._ctx.beginPath()
                    this._ctx.arc(posX, posY, size, 0, Math.PI * 2, true);
                    this._ctx.fill();
                    break;
                case TableType.TABLE_SQUARE:
                    this._ctx.fillRect(posX - size, posY - size, size * 2, size * 2);
                    break;
                default:
                    throw new Error(`Unknown TableType : ${tableType}`);
            }
        }
    }

    drawGuest(src) {
        let img = new Image();
        img.src = src;

        this._ctx.drawImage(img, 0, 0)


    }

}