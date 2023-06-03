import React from "react";
import { v4 as uuidv4 } from "uuid";

const Message = ({ member, text, currentMember }) => {
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
        ? "Messages-message currentMember"
        : "Messages-message";

    const messageUsername = messageFromMe
        ? currentMember.username
        : member.username;

    const messageColor = messageFromMe ? currentMember.color : member.color;

    return (
        <li className={className} key={uuidv4()}>
            <span
                className="avatar"
                style={{ backgroundColor: messageColor }}></span>
            <div className="Message-content">
                <div className="username">{messageUsername}</div>
                <div className="text">{text}</div>
            </div>
        </li>
    );
};

const Messages = ({ messages, currentMember }) => {
    return (
        <ul className="Messages-list">
            {messages.map((message) => (
                <Message
                    key={uuidv4()}
                    member={message.member}
                    text={message.text}
                    currentMember={currentMember}
                />
            ))}
        </ul>
    );
};

export default Messages;
