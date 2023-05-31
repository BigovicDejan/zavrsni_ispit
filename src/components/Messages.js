import React from "react";

const Messages = ({ messages, currentMember }) => {
    return (
        <ul className="Messages-list">
            {messages.map((message) => {
                const { member, text } = message;
                const messageFromMe = member.id === currentMember.id;
                const className = messageFromMe
                    ? "Messages-message currentMember"
                    : "Messages-message";

                const messageUsername = messageFromMe
                    ? currentMember.username
                    : member.username;
                const messageColor = messageFromMe
                    ? currentMember.color
                    : member.color;

                return (
                    <li className={className} key={message.id}>
                        <span
                            className="avatar"
                            style={{ backgroundColor: messageColor }}
                        />
                        <div className="Message-content">
                            <div className="username">{messageUsername}</div>
                            <div className="text">{text}</div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Messages;
