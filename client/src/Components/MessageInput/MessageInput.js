import React from 'react';
import './MessageInput.css';

const MessageInput = ({message, setMessage, sendMessage}) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null }
        />
        <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
    </form>
);

export default MessageInput;