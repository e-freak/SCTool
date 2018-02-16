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

    notifyAllObserver(data) {
        this._observerList.forEach((observer) => {
            observer.update(this, data);
        });
    }

    removeAllObserver() {
        this._observerList = [];
    }

}