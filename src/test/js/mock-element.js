/**
 * mock-element.js
 * 
 * @author yuki
 */



export default class MockElement {

    constructor() {
        this._parentNode = undefined;
        this.style = {};
        this.addEventListenerList = [];
        this.appendChildList = [];
        this.cloneNodeList = [];
        this.removeChildList = [];
    }

    addEventListener(type, listener) {
        this.addEventListenerList.push({ type: type, listener: listener });
    }

    appendChild(element) {
        this.appendChildList.push({ element: element });
    }

    cloneNode(deepCopyFlag) {
        this.cloneNodeList.push({ deepCopyFlag: deepCopyFlag });
        return this;
    }

    removeChild(element) {
        this.removeChildList.push({ element: element });
    }

    get parentNode() {
        if (!this._parentNode) {
            this._parentNode = new MockElement();
        }
        return this._parentNode;
    }

}