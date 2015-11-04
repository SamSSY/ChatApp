const React = require('react');
const ThreadItem = require('./ThreadItem');
const MessageItem = require('./MessageItem');

const initialState = {
  newMessage: '',
  threads: [
    {
      target: {
        name: 'Sam'
      },
      messages: [
        { fromMe:false, text: 'you', time: '7:00' },
        { fromMe:true, text: 'my', time: '10:21' },
        { fromMe:true, text: 'turn', time: '10:25' },
      ]
    },
    {
      target: {
        name: 'Irene'
      },
      messages: [
        { fromMe:false, text: 'hi', time: '13:10' },
      ]
    },
    {
      target: {
        name: 'Ray'
      },
      messages: [
        { fromMe:false, text: 'hello', time: '17:20' },
      ]
    },
    {
      target: {
        name: 'Michael'
      },
      messages: [
        { fromMe:false, text: 'hello', time: '19:20' },
      ]
    }
  ],
  currentIndex: 0
};





// ChatApp
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleThreadItemClick(index) {
    this.setState({
      currentIndex: index
    });
  }

  handleNewMessageChange(event) {
    this.setState({
      newMessage: event.target.value
    })
  }

  // handle enter press
  handleInputKeyDown(event) {
    const inputValue = event.target.value;
    
    if (event.keyCode == 13 && inputValue !== '') {
      const { newMessage, threads, currentIndex } = this.state;
      const now = new Date();
      
      threads[currentIndex].messages.push({
        fromMe: true,
        text: newMessage,
        time: `${now.getHours()}:${now.getMinutes()}`
      });

      this.setState({
        newMessage: '',
        threads: threads
      });
    }
  }

  renderThreadItem(thread, i) {
    const { target, messages } = thread;
    const lastMessage = messages[messages.length - 1];
    
    return (
      <ThreadItem
        key={i}
        name={target.name}
        content={lastMessage.text}
        time={lastMessage.time}
        onClick={this.handleThreadItemClick.bind(this, i)} />
    );
  }

  renderMessageItem(msg, i) {
    return (
      <MessageItem
        key={i}
        fromMe={msg.fromMe}
        text={msg.text} />
    );
  }

  //NOTE: arr.map(callback[, thisArg])
  //thisArg: Optional. Value to use as this when executing callback.
  render() {
    const { newMessage, threads, currentIndex } = this.state;
    const targetThread = threads[currentIndex];
    const targetName = targetThread.target.name;
    const messages = targetThread.messages;
    return (

      <div className="chat-app clearfix">
        <div className="chat-app_left">
          <div className="heading">
            <h3 className="messenger-title">Friends</h3>
          </div>
          <div className="thread-list">
            {threads.map(this.renderThreadItem, this)}
          </div>
        </div>
        <div className="chat-app_right">
          <div className="heading">
            <div className="current-target">{targetName}</div>
          </div>
          <div className="message-list">
            {messages.map(this.renderMessageItem, this)}
          </div>
          <div className="footer">
            <input
              className="new-message"
              type="text"
              value={newMessage}
              onChange={this.handleNewMessageChange.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)} />
          </div>
        </div>
      </div>
    
    );
  }
}

module.exports = ChatApp;
