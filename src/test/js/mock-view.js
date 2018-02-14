/**
 * mock-view.js
 * 
 * @author yuki
 */

import MockElement from './mock-element';



export default class MockView {

    constructor() {
        this._location = {};
        this.getElementByIdList = [];
    }

    getElementById(fieldID) {
        const element = this._createMockElement();
        this.getElementByIdList.push({ fieldID: fieldID, element: element });
        return element;
    }

    get location() {
        return this._location;
    }

    _createMockElement() {
        return new MockElement();
    }

}