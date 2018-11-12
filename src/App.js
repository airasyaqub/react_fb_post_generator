import React, { Component } from 'react';
import './App.css';
import { Card, Row, Col, Icon, Upload, Input, TimePicker, Select, Divider, Button, Checkbox } from 'antd';
import FbPost from './fbPost.js'

const Option = Select.Option;
const { TextArea } = Input;
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 1000);
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profilePics: [],
      uploadedPics: [],
      editorShow: true
    }
    this.props1 = {
      listType: 'picture',
      className: 'upload-list-inline',
      onChange: this.handleUploadedPics,
      multiple: true,
      customRequest: dummyRequest
    };

  }

  handleProfilePic = ({ fileList }) => { this.setState({ profilePics: fileList }) };


  handleUploadedPics = (info) => {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-5);

    // 2. Read from response and show file link
    //console.log(fileList);

    this.setState({ uploadedPics: fileList });
  }

  includeEmojis = (checkedValues) => {
    //console.log('checked = ', checkedValues);
    this.setState({ emojiArr: checkedValues })
  }

  setTime = (time, timeString) => {
    //console.log(time, timeString);
    this.setState({ time: timeString });
  }

  setPrivacy = (value) => {
    this.setState({ privacy: value });
  }
  includeLikes = (e) => {
    this.setState({ likes: e.target.value });
  }

  render() {

    const { profilePics, uploadedPics, name, time, privacy, caption, emojiArr, likes, editorShow } = this.state;
    //console.log(emojiArr, likes);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    return (
      <div className="App">
        <Button type="primary" size={'large'} className='hideEditorBtn' onClick={() => this.setState({ editorShow: !editorShow })}>{editorShow ? 'Hide Editor' : 'Show editor'}</Button>
        <Row type="flex" justify="space-around">
          <Col md={12} sm={22} xs={22}>
            {editorShow && <div className="editor">
              <Card title="Post Editor">
                <div className='top'>
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={profilePics}
                    onPreview={() => { }}
                    onChange={this.handleProfilePic}
                    style={{ float: "left" }}
                  >
                    {profilePics.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Input placeholder='username' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={(e) => this.setState({ name: e.target.value })} className='editorName' maxLength='20' />
                  <TimePicker onChange={this.setTime} className="editorTime" use12Hours format="h:mm a" />
                  <Select defaultValue="Privacy" onChange={this.setPrivacy} className="editorPrivacy">
                    <Option value="friends">Friends</Option>
                    <Option value="public">Public</Option>
                  </Select>
                  <TextArea rows={1} className="editorCaption" onChange={(e) => { this.setState({ caption: e.target.value }) }} placeholder='Enter caption' style={{ marginTop: '10px' }} />
                </div>
                <Divider />
                <div className='middle'>
                  <h4>Upload your post's pictures</h4>
                  <Upload {...this.props1} fileList={uploadedPics}>
                    <Button>
                      <Icon type="upload" /> Upload
                    </Button>
                  </Upload>
                </div>
                <Divider />
                <div className='bottom'>
                  <Input placeholder='initial likes' onChange={this.includeLikes} className='editorLikes' type="number" />
                  <h4 style={{ marginTop: '0.5em' }}>Reactions</h4>
                  <Checkbox.Group style={{ width: '100%' }} onChange={this.includeEmojis}>
                    <Row>
                      <Col span={8}><Checkbox value="like">Like</Checkbox></Col>
                      <Col span={8}><Checkbox value="love">Love</Checkbox></Col>
                      <Col span={8}><Checkbox value="haha">Haha</Checkbox></Col>
                      <Col span={8}><Checkbox value="angry">Angry</Checkbox></Col>
                      <Col span={8}><Checkbox value="wow">Wow</Checkbox></Col>
                      <Col span={8}><Checkbox value="sad">Sad</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>

                </div>
              </Card>
            </div>}
          </Col>
          <Col md={10} sm={22} xs={22}>
            <FbPost uploadedPics={uploadedPics} Avatar={profilePics[0] ? profilePics[0].thumbUrl : null} name={name} time={time} privacy={privacy} caption={caption} likes={likes} emojiArr={emojiArr} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App