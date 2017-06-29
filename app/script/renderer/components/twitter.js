// ReactはDOMを生成する仕組み 拡張構文JSXを利用する
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _servicesTwitter = require('../services/twitter');

var _servicesTwitter2 = _interopRequireDefault(_servicesTwitter);

var TwitterContent = (function (_React$Component) {
    _inherits(TwitterContent, _React$Component);

    function TwitterContent(props) {
        _classCallCheck(this, TwitterContent);

        //alert('TwitterContent constractor');
        // propは値を変更しない、stateは動的変更する変数
        _get(Object.getPrototypeOf(TwitterContent.prototype), 'constructor', this).call(this, props);
        this.state = { tweets: [] };
    }

    // ReactのDOM生成テンプレート関数

    _createClass(TwitterContent, [{
        key: 'render',
        value: function render() {
            alert('TwitterContent render');
            return(
                // コンポーネントツリーを返す
                // electronでMacライクなUIを作成するPhoton CSSテンプレートを利用する→classNemeはそのクラス
                // {...}はJSXの仕組み　任意のJavascript式を埋め込む
                // 親のstatueを渡すと、子はthis.propsからアクセスできる
                _react2['default'].createElement(
                    'div',
                    { className: 'window' },
                    _react2['default'].createElement(
                        'div',
                        { id: 'window-content', className: 'window-content' },
                        _react2['default'].createElement(Timeline, { tweets: this.state.tweets })
                    )
                )
            );
        }

        // DOMコンポーネント作成後に実行されるファンクション
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            _servicesTwitter2['default'].get('statuses/home_timeline')['catch'](function (error) {
                console.log(error);
            }).then(function (result) {
                _this.setState({ tweets: result.data });
                _this.connectStream();
            });
        }
    }, {
        key: 'connectStream',
        value: function connectStream() {
            var _this2 = this;

            var stream = _servicesTwitter2['default'].stream('user');

            stream.on('error', function (error) {
                throw error;
            });

            stream.on('tweet', function (tweet) {
                var tweets = _this2.state.tweets;
                var newTweets = [tweet].concat(tweets);
                _this2.setState({ tweets: newTweets });
            });
        }
    }]);

    return TwitterContent;
})(_react2['default'].Component);

exports['default'] = TwitterContent;

var Timeline = (function (_React$Component2) {
    _inherits(Timeline, _React$Component2);

    function Timeline() {
        _classCallCheck(this, Timeline);

        _get(Object.getPrototypeOf(Timeline.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Timeline, [{
        key: 'render',
        value: function render() {
            alert('TimeLine render');

            //map() メソッドは、与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成します。
            var tweets = this.props.tweets.map(function (tweet) {
                //Tweetクラスにtweetプロパティを追加してTweetクラスで使えるようにしている
                return _react2['default'].createElement(Tweet, { tweet: tweet, key: tweet.id });
            });

            return _react2['default'].createElement(
                'ul',
                { className: 'list-group' },
                tweets
            );
        }
    }]);

    return Timeline;
})(_react2['default'].Component);

var Tweet = (function (_React$Component3) {
    _inherits(Tweet, _React$Component3);

    function Tweet() {
        _classCallCheck(this, Tweet);

        _get(Object.getPrototypeOf(Tweet.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tweet, [{
        key: 'render',
        value: function render() {
            alert('Tweet render');

            var isRetweet = this.props.tweet.hasOwnProperty('retweeted_status');
            var status = isRetweet ? this.props.tweet.retweeted_status : this.props.tweet;
            var media = status.entities.media || [];
            // アロー関数と無名関数はthisの扱いが異なる
            var firstImage = media.find(function (item) {
                return item.type === 'photo';
            });

            return _react2['default'].createElement(
                'li',
                { className: 'list-group-item' },
                _react2['default'].createElement('img', { src: status.user.profile_image_url_https, className: 'img-rounded media-object pull-left', width: '32', height: '32' }),
                _react2['default'].createElement(
                    'div',
                    { className: 'media-body' },
                    _react2['default'].createElement(
                        'strong',
                        { className: 'user-name' },
                        ' ',
                        status.user.name,
                        ' '
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: 'user-screen_name' },
                        ' @',
                        status.user.screen_name,
                        ' '
                    ),
                    _react2['default'].createElement(
                        'p',
                        { className: 'text' },
                        status.text
                    ),
                    firstImage ? _react2['default'].createElement('img', { src: firstImage.media_url_https, className: 'img-rounded media-object media-img' }) : null,
                    isRetweet ? _react2['default'].createElement(
                        'span',
                        { className: 'icon icon-retweet' },
                        'Retweeted by ',
                        this.props.tweet.user.name,
                        ' '
                    ) : null
                )
            );
        }
    }]);

    return Tweet;
})(_react2['default'].Component);

module.exports = exports['default'];