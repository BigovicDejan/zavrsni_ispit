import React from "react";
import { v4 as uuidv4 } from "uuid";

const Message = ({ member, text, currentMember }) => {
    const { username, color } = member;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
        ? "Messages-message currentMember"
        : "Messages-message";

    const messageUsername = messageFromMe ? "You" : username;

    return (
        <li className={className} key={uuidv4()}>
            <span className="avatar" style={{ backgroundColor: color }}></span>
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
            {messages.map((message) => {
                if (message.isWelcomeMessage) {
                    return (
                        <li className="Messages-welcome" key={uuidv4()}>
                            {message.text}
                        </li>
                    );
                }

                const { text, username, color, id } = JSON.parse(message.text);
                const member = { username, color, id };
                const messageFromMe = member.id === currentMember.id;

                return (
                    <Message
                        key={message.id}
                        member={member}
                        text={text}
                        currentMember={currentMember}
                        messageFromMe={messageFromMe}
                    />
                );
            })}
        </ul>
    );
};

export default Messages;
