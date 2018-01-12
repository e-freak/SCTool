/**
 * observable.js
 * 
 * @author yuki
 */



export default class Observable {

    constructor() {
        this._observerList = [];
    }

    addObserver(observer) {
        if (observer) {
            if (!this._observerList.includes(observer)) {
                this._observerList.push(observer);
            }
        }
    }

    notifyAllObserver(param) {
        this._observerList.forEach((observer) => {
            observer.update(this, param);
        });
    }

    removeAllObserver() {
        this._observerList = [];
    }

}