import React from "react";
import { useAuthValue } from "../context.js";
import { sendMessage } from "../backend/sendMessage.js";
import "../index.css";
function MessageInput({ roomId, user }) {
  //   const { user } = useAuthValue();
  // console.log(user.uid);
  const [value, setValue] = React.useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(roomId, user, value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="msg-bottom input-group-text">
      <input
        type="text"
        placeholder="Write a message..."
        value={value}
        onChange={handleChange}
        className="form-control"
        required
        minLength={1}
      />
      <button
        type="submit"
        className="input-group-append input-group-text"
        disabled={value < 1}
        // className="send-message"
      >
        Send
      </button>
    </form>
  );
}

export { MessageInput };
