export default class ViewController {
    constructor(view) {
        this._view = view;
    }
  

    initialize() {
        this._view.getElementById('guest').addEventListener('click', this.onClickGuestButton);
        this._view.getElementById('table').addEventListener('click', this.onClickTableButton);
    }

   onClickGuestButton() {
        alert("Guestボタンが押下されました");
        this._view.getElementById('property-panel').style.display = 'none';
        this._view.getElementById('guest-panel').style.display = 'block';
        this._view.getElementById('table-panel').style.display = 'none';
        //this._view.getElementById('property-panel').style.visiblity = 'hidden';
        //this._view.getElementById('guest-panel').style.visiblity = 'visible';
        //this._view.getElementById('table-panel').style.visiblity = 'hidden';
    }

    onClickTableButton() {
        alert("Tableボタンが押下されました");
    }
}