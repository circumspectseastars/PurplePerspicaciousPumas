import React from 'react';
import Input from './ChatInput.jsx';
import Messages from './ChatMessages.jsx';
import io from 'socket.io-client';
import { Col, Panel, Glyphicon } from 'react-bootstrap';


// import 'bootstrap/dist/css/bootstrap.css';

const socket = io();

class ChatWindow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
    this.messageSubmit = this.messageSubmit.bind(this)
  }

  componentWillMount() {
    console.log('componentWillMount has run')
    socket.on('send:message', (message) =>{
      console.log(message);
      var newMessage = this.state.messages
      newMessage.push(message)
      this.setState({messages: newMessage})
    })
  }

  messageSubmit(message) {
    var newMessage = this.state.messages
    newMessage.push(message)
    this.setState({messages: newMessage})
    console.log(this.state.messages)
    socket.emit('send:message', message)
  }

  render() {
    const divStyle = {
      position: 'relative',
      display: 'inline-block',
      maxWidth: "280px"
    }
    const componentStyle = {
      position: 'absolute',
      width: '15%'
    }
    return(
      <div style={{"float":"right"}}>
          <Panel header={"Game Chat"} className="animated zoomInRight chat" bsStyle="danger" >
            <div style={divStyle}>
              <Messages message={this.state.messages} style={componentStyle} userName={this.props.userName}/>
              <Input userName={this.props.userName} submit={this.messageSubmit} style={componentStyle} />
            </div>
          </Panel>
      </div>
    )
  }

}

export default ChatWindow;
