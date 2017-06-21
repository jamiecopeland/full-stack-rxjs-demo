import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../redux/chat';
const styles = {
  root: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bpttom: 0,
    right: 0,
    flexDirection: 'column',
    height: '100%',
  },
  messageListContainer: {
    height: '100%',
    borderTop: 'solid 1px gray',
    overflow: 'hidden',
    flexGrow: 1,
  },
  messageList: {

  },
  message: {
    padding: '0.3rem',
  },
  messageUserName: {
    fontWeight: 'bold',
    marginRight: '0.3rem'
  },
  messageBody: {

  },
  inputContainer: {

  },
  input: {
    fontSize: '1rem',
    padding: '0.2rem'
  }
}

const generateUserName = () => `user${(Math.random() *  1000).toFixed()}`;

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      draft: '',
      userName: generateUserName()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollHack.scrollIntoView({block: "end", behavior: "smooth"});
  }

  sendMessage = () => {
    const { userName, draft } = this.state;
    this.props.sendMessage({
      message: {
        userName,
        body: draft,
      }
    });

    this.setState({ draft: '' });
  }

  onMessageInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.sendMessage();
      return;
    }
  }

  onMessageInputChange = (event) => {
    this.setState({ draft: event.target.value })
  }

  onUserNameInputChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.messageListContainer}>
          <ul style={styles.messageList}>
            {
              this.props.messages.map(({ userName, body }, index) => (
                <li key={index} style={styles.message}>
                  <span style={styles.messageUserName}>{userName}</span>
                  <span style={styles.messageBody}>{body}</span>
                </li>
              ))
            }
            <span ref={el => this.scrollHack = el} />
          </ul>
        </div>
        <div style={styles.inputContainer}>
          <div>
              <input
                value={this.state.draft}
                onChange={this.onMessageInputChange}
                onKeyDown={this.onMessageInputKeyDown}
                style={styles.input}
              />
              <button onClick={this.sendMessage}>Send</button>
            </div>
            <div>
              <input
                onChange={this.onUserNameInputChange}
                value={this.state.userName}
                style={styles.input}
              />
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.chat.messages
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (payload) => dispatch(sendMessage(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
