import React, { Component } from "react";
import Messages from "./components/Messages";
import NameInputForm from "./components/NameInputForm";
import Input from "./components/Input";
import "./App.css";

class App extends Component {
    state = {
        messages: [],
        members: [],
    };

    setMemberUsername = (username) => {
        const member = {
            username,
            color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
            id: this.drone.clientId,
        };
        this.setState((prevState) => ({
            members: [...prevState.members, member],
        }));
    };

    constructor() {
        super();
        this.drone = new window.Scaledrone("87bf5ec1VkT1n2AG");
        this.drone.on("open", (error) => {
            if (error) {
                console.error(error);
            }
        });
        const room = this.drone.subscribe("observable-room");
        room.on("data", (data, member) => {
            const { messages } = this.state;
            messages.push({ member, text: data });
            this.setState({ messages });
        });
    }

    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };

    render() {
        const { members, messages } = this.state;

        if (members.length === 0) {
            return <NameInputForm onUsernameSubmit={this.setMemberUsername} />;
        }

        return (
            <div className="App">
                <div>
                    <h1 className="App-header">My Chat App</h1>
                </div>
                {members.map((member) => (
                    <Messages
                        key={member.id}
                        messages={messages}
                        currentMember={member}
                        username={member.username}
                        color={member.color}
                    />
                ))}
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }
}

export default App;
