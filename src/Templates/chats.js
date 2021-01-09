import React from "react"

const ChatTemplate = (props) => {
  return (
    <div className="chat-container">
      <h3>Chat App</h3>
      <form onSubmit={props.handleMessageSubmit}>
        <input
          name="message"
          onChange={props.handleChange}
          placeholder="message"
        />
        <button>Send Message</button>
      </form>

      <div>
        {props.chats}
      </div>
    </div>
  )
}

export default ChatTemplate