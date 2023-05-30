import React, { Component } from "react";

class Messages extends Component {
    render() {
        const { messages, currentMember, username, color } = this.props;

        return (
            <ul className="Messages-list">
                {messages.map((message) =>
                    this.renderMessage(
                        message,
                        currentMember.id,
                        username,
                        color
                    )
                )}
            </ul>
        );
    }

    renderMessage(message, currentMemberId, username, color) {
        const { member, text } = message;
        const messageFromMe = member.id === currentMemberId;
        const className = messageFromMe
            ? "Messages-message currentMember"
            : "Messages-message";

        const messageUsername = messageFromMe ? "You" : member.username;
        const messageColor = messageFromMe ? color : member.color;

        return (
            <li className={className}>
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
    }
}

export default Messages;
