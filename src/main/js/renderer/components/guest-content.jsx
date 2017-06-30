import React from 'react';

export default class GuestContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {guests: []};
    }

    render(){
        alert('GuestContent render');
        
        return (
            <div className='guest-panel-root'>
                <div className="guest-list-header">
                    <strong>Guest</strong>
                    <button id="guest-add-button" className="guest-add-button">Add</button>
                </div>
                <div id='guest-list' className='guest-list'>
                    <GuestList guests={this.state.guests}/>
                </div>
            </div>
        );
    }
}

class GuestList extends React.Component {

    render(){
        alert('GuestList render');
        
        const guests = this.props.guests.map((guest) => {
            //Tweetクラスにtweetプロパティを追加してTweetクラスで使えるようにしている
            return <Guest guest={guest} />;
        });
    
        return (
            <ul className='list-group'>{guests}</ul>
        );
    }
} 

class Guest extends React.Component {

    render(){
        alert('Guest render');

        return (
            <li className='guest-list-item'>
                <img src={this.props.guest.icon} className='guest-icon' width='32' height='32'/>
                <div className='guest-body'>
                    <strong className="guest-name"> {gthis.props.guest.name} </strong>
                </div>                
            </li>
        );
        
    }
} 
