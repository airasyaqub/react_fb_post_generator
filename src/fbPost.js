import React, { Component } from 'react';
import './fbPost.css';
import { Card, Avatar, Divider, Icon } from 'antd';
import FbImageLibrary from './react-fb-image-grid'
import FacebookEmoji from 'react-facebook-emoji';
import defaultAvtar from './images/default-avatar.jpg';
import privacyPublic from './images/privacy-public.PNG';
import privacyFriends from './images/privacy-friends.PNG';
import Liked from './images/liked.PNG';
import Loved from './images/loved.PNG';
import Hahaed from './images/hahaed.PNG';
import Wowed from './images/wowed.PNG';
import Saded from './images/saded.PNG';
import Angred from './images/angred.PNG';



//<FbImageLibrary images={[]}/>

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) { break; }
    }
    if (shortValue % 1 != 0) var shortNum = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}


class FbPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emojiShow: false,
      userReaction: null,
      userReactionImg: null
    }
  }

  showEmojies = (val) => {
    this.setState({ emojiShow: val });
  }

  setUserReaction = (reaction) => {
    let { userReaction, userReactionImg } = this.state;
    if (userReaction === reaction) {
      this.setState({ userReaction: false, userReactionImg: false, emojiShow: false })
    }
    else {
      switch (reaction) {
        case 'love':
          userReactionImg = Loved;
          break;
        case 'angry':
          userReactionImg = Angred;
          break;
        case 'like':
          userReactionImg = Liked;
          break;
        case 'wow':
          userReactionImg = Wowed;
          break;
        case 'sad':
          userReactionImg = Saded;
          break;
        case 'haha':
          userReactionImg = Hahaed;
          break;
        default:
          userReactionImg = null;
      }
      //console.log(reaction, userReactionImg);
      this.setState({ userReaction: reaction, userReactionImg, emojiShow: false })
    }
  }

  render() {
    const { emojiShow, userReaction, userReactionImg } = this.state;
    const { name, time, privacy, caption, uploadedPics, emojiArr } = this.props;
    var defaultLike;
    let { likes } = this.props
    likes = abbreviateNumber(likes);
    //var userClickedEmoji;
    if (likes && userReaction !== 'like') {
      //console.log('in if')
      defaultLike = <img src={Liked} height='21' alt='like emotion' />;
    }
    //console.log(defaultLike);
    var imageArray = [];
    if (uploadedPics.length) {
      imageArray = uploadedPics.map((e, i) => {
        return e.thumbUrl;
      });
    }

    //console.log("userReaction-->" + userReaction);
    //console.log("userReactionImg-->" + userReactionImg);
    //console.log(userReaction && !emojiArr.includes(userReaction));


    return (
      <div className="post">
        <Card>
          <div className='postInfo'>
            <div className='basicInfo'>
              <Avatar size={50} src={this.props.Avatar ? this.props.Avatar : defaultAvtar} style={{ cursor: 'pointer' }} />
              <div className='details'>
                <h5 style={{ marginBottom: '0px', color: '#365899' }}>{name ? name : 'your name'}</h5>
                <span style={{ fontSize: '12px' }}>{time ? time : 'Just now'} - </span>
                <img src={privacy === 'friends' ? privacyFriends : privacyPublic} width='17' height='17' alt='post privacy' />
              </div>
            </div>
            <div className='furtherInfo'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className='mainPost'>
            <div className='caption'>
              <p>{caption ? caption : 'My Caption'}</p>
            </div>
            <div className='images' style={imageArray.length > 0 ? { height: 400 } : { height: 0 }}>
              <FbImageLibrary beautify images={imageArray} />
            </div>
          </div>
          <div className='postStatistics'>
            <div className='totalReactions'>
              {emojiArr.length ? (emojiArr.map((e, i) => {
                //console.log('map mai hun');
                switch (e) {
                  case 'like':
                    return <img src={Liked} height='21' alt='like emotion' key='like' />;
                  case 'love':
                    return <img src={Loved} height='21' alt='love emotion' key='love' />;
                  case 'haha':
                    return <img src={Hahaed} height='21' alt='haha emotion' key='haha' />;
                  case 'angry':
                    return <img src={Angred} height='21' alt='angry emotion' key='angry' />;
                  case 'wow':
                    return <img src={Wowed} height='21' alt='wow emotion' key='wow' />;
                  case 'sad':
                    return <img src={Saded} height='21' alt='sad emotion' key='sad' />;
                  default:
                    return null;
                }
              })) : defaultLike}
              {(userReaction && !emojiArr.includes(userReaction)) && <img src={userReactionImg} height='21' alt={`${userReaction} emotion`} />}
              {userReaction && likes && <span>you & {likes} others</span>}
              {userReaction && !likes && <span>you</span>}
              {!userReaction && likes && <span>{likes}</span>}
            </div>
            <Divider style={{ margin: '5px 0' }} />
            <div className='postInteractBtns'>
              <div className='likeBtn' onMouseEnter={() => { this.showEmojies(true) }}
                onMouseLeave={() => { this.showEmojies(false) }}>
                {emojiShow && <div className='emojies'>
                  <span className='emoji' onClick={() => this.setUserReaction('like')} ><FacebookEmoji type="like" size='sm' /></span>
                  <span className='emoji' onClick={() => this.setUserReaction('love')} ><FacebookEmoji type="love" size='sm' /></span>
                  <span className='emoji' onClick={() => this.setUserReaction('wow')} ><FacebookEmoji type="wow" size='sm' /></span>
                  <span className='emoji' onClick={() => this.setUserReaction('angry')} ><FacebookEmoji type="angry" size='sm' /></span>
                  <span className='emoji' onClick={() => this.setUserReaction('haha')} ><FacebookEmoji type="haha" size='sm' /></span>
                  <span className='emoji' onClick={() => this.setUserReaction('sad')} ><FacebookEmoji type="sad" size='sm' /></span>
                </div>}
                {userReactionImg ? (
                  <button onClick={() => { this.setUserReaction(userReaction) }} ><img src={userReactionImg} alt='' /></button>)
                  :
                  <button onClick={() => { this.setUserReaction('like') }} ><Icon type="like" style={{ fontSize: '18px' }} /> Like</button>
                }
              </div>
              <button className='cmntBtn'><Icon type="message" style={{ fontSize: '18px' }} /> Comment</button>
              <button className='shareBtn'><Icon type="retweet" style={{ fontSize: '18px' }} /> Share</button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

}

FbPost.defaultProps = {
  privacy: 'public',
  emojiArr: []
};

export default FbPost;

/*{userReactionImg ? (
  <button onClick={() => { this.showEmojies('like') }} ><img src={userReactionImg} /></button>)
  :
  <button onClick={() => { this.showEmojies('like') }} ><Icon type="like" style={{ fontSize: '18px' }} /> Like</button>
}*/