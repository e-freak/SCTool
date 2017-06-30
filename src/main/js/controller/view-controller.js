export default class ViewController {
    constructor(view) {
        this._view = view;
    }

    initialize() {
        this._view.getElementById('guest-button').addEventListener('click', this.onClickGuestButton.bind(this));
        this._view.getElementById('table-button').addEventListener('click', this.onClickTableButton.bind(this));
        this._view.getElementById('twitter-button').addEventListener('click', this.onClickTwitterButton.bind(this));
    }

    onClickGuestButton() {
        this._view.getElementById('property-panel').style.display = 'none';
        this._view.getElementById('guest-panel').style.display = 'block';
        this._view.getElementById('table-panel').style.display = 'none';
        this._view.getElementById('twitter-panel').style.display = 'none';
    }

    onClickTableButton() {
        this._view.getElementById('property-panel').style.display = 'none';
        this._view.getElementById('guest-panel').style.display = 'none';
        this._view.getElementById('table-panel').style.display = 'block';
        this._view.getElementById('twitter-panel').style.display = 'none';
    }

    onClickTwitterButton() {
        this._view.getElementById('property-panel').style.display = 'none';
        this._view.getElementById('guest-panel').style.display = 'none';
        this._view.getElementById('table-panel').style.display = 'none';
        this._view.getElementById('twitter-panel').style.display = 'block';
    }
}