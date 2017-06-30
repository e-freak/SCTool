import React from 'react';
import ReactDOM from 'react-dom';
import GuestContent from './components/guest-content';

export default class GuestContentRenderer {
    constructor(view) {
        this._view = view;
    }

    initialize() {
        alert('GuestContentRenderer initialize');
        const root = this._view.getElementById('guest-content-root');
        ReactDOM.render(React.createElement(GuestContent), root);
    }
}
