// ReactはDOMを生成する仕組み 拡張構文JSXを利用する
import React from 'react';
import T from '../services/twitter';

export default class TwitterContent extends React.Component {

    constructor(props) {
        //alert('TwitterContent constractor');
        super(props);
        this.state = {tweets: []};
    }

    // ReactのDOM生成テンプレート関数
    render(){
        alert('TwitterContent render');
        return (
            // コンポーネントツリーを返す
            // electronでMacライクなUIを作成するPhoton CSSテンプレートを利用する→classNemeはそのクラス
            // {...}はJSXの仕組み　任意のJavascript式を埋め込む
            <div className='window'>
                <div id='window-content' className='window-content'>
                    <Timeline tweets={this.state.tweets}/>
                </div>
            </div>
        );
    }

    componentDidMount(){
        T.get('statuses/home_timeline')
        .catch(error => { console.log(error); })
        .then((result) => {this.setState({tweets: result.data});
                           this.connectStream();});
    }

    connectStream(){
        const stream = T.stream('user');

        stream.on('error', (error) => { throw error;});

        stream.on('tweet', (tweet) => { const tweets = this.state.tweets;
                                        const newTweets = [tweet].concat(tweets);
                                        this.setState({tweets: newTweets});
                                      });
    }
}


class Timeline extends React.Component {

    render(){
        alert('TimeLine render');
        const tweets = this.props.tweets.map((tweet) => {
             return <li className='list-group-item'>
                <img src="../image/icontest.png" className='img-rounded media-object pull-left' width='32' height='32'/>     
            </li>;
            });
            
        return (
            <ul className='list-group'>{tweets}</ul>
        );
        
        /*
        const tweets = this.props.tweets.map((tweet) => {
             return <Tweet tweet={tweet} key={tweet.id} />;
             });
    
        return (
            <ul className='list-group'>{tweets}</ul>
        );
        */
    }
} 


class Tweet extends React.Component {

    render(){
        alert('Tweet render');
        /*
        const isRetweet = this.props.tweet.hasOwnProperty('retweeted_status');
        const status = isRetweet ? this.props.tweet.retweeted_status : this.props.tweet;
        const media = status.entities.media || [];
        // アロー関数と無名関数はthisの扱いが異なる
        const firstImage = media.find((item) => { return item.type === 'photo' ;});

        return (
            <li className='list-group-item'>
                <img src={status.user.profile_image_url_https} className='img-rounded media-object pull-left' width='32' height='32'/>
                <div className='media-body'>
                    <strong className="user-name"> {status.user.name} </strong>
                    <span className="user-screen_name"> @{status.user.screen_name} </span>
                    <p className="text">{status.text}</p>
                    { firstImage ? <img src={firstImage.media_url_https} className='img-rounded media-object media-img' /> : null }
                    { isRetweet ? <span className="icon icon-retweet">Retweeted by {this.props.tweet.user.name} </span> : null }
                </div>                
            </li>
        );
        */
    }
} 
