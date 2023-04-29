import React from "react";
import { useAuthValue } from "../context.js";
import { useMessages } from "./useMessages.js";
import "../index.css";

function Message({ message, isOwnMessage }) {
  const { displayName, text } = message;
  return (
    // <li className={["message", isOwnMessage && "own-message"].join(" ")}>
    //   <h4 className="sender">{isOwnMessage ? "You" : displayName}</h4>
    //   <div>{text}</div>
    // </li>
    <div className={isOwnMessage ? "outgoing-chats" : "received-chats"}>
      <div
        className={isOwnMessage ? "outgoing-chats-img" : "received-chats-img"}
      >
        <img className="msgimg" src="bat_ball.jpg"></img>
      </div>
      <div className={isOwnMessage ? "outgoing-msg" : "received-msg"}>
        <h4 className="sender">{isOwnMessage ? "You" : displayName}</h4>
        <div
          className={isOwnMessage ? "outgoing-chats-msg" : "received-msg-inbox"}
        >
          <p>{text}</p>
          <span className="time">time</span>
        </div>
      </div>
    </div>
  );
}

function MessageList({ roomId, user }) {
  const containerRef = React.useRef(null);
  const messages = useMessages(roomId);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
        ))}
      </ul>
    </div>
  );
}

export { MessageList };
