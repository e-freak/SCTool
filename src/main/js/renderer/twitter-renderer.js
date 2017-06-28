import React from 'react';
import ReactDOM from 'react-dom';
import TwitterContent from './components/twitter';

export default class TwitterRenderer {
    constructor(view) {
        //alert('TwitterRenderer constractor');
        this._view = view;
    }

    initialize() {
        //alert('TwitterRenderer initialize');
        const root = this._view.getElementById('twitter-root');
        ReactDOM.render(React.createElement(TwitterContent), root);
    }
}
