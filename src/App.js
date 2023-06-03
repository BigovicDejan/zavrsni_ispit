import React, { useState, useEffect } from "react";
import Messages from "./components/Messages";
import NameInputForm from "./components/NameInputForm";
import Input from "./components/Input";
import "./App.css";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        const newDrone = new window.Scaledrone("87bf5ec1VkT1n2AG");

        newDrone.on("open", (error) => {
            if (error) {
                console.error(error);
            }
        });

        setDrone(newDrone);

        return () => {
            newDrone.close();
        };
    }, []);

    const setMemberUsername = (username) => {
        const member = {
            username,
            color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
            id: drone.clientId,
        };
        setMembers((prevMembers) => [...prevMembers, member]);
        setMessages((prevMessages) => [
            ...prevMessages,
            { member, text: `Welcome to the chat session, ${username}!` },
        ]);
    };

    const onSendMessage = (message) => {
        const { username, color, id } = members.find(
            (member) => member.id === drone.clientId
        );
        drone.publish({
            room: "observable-room",
            message: JSON.stringify({ text: message, username, color, id }),
        });
    };

    useEffect(() => {
        if (drone) {
            const room = drone.subscribe("observable-room");
            room.on("data", (data, member) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { member, text: data },
                ]);
            });
        }
    }, [drone]);

    return (
        <div className="App">
            <div>
                <h1 className="App-header">Chat away</h1>
            </div>
            {members.length === 0 ? (
                <NameInputForm onFormSubmit={setMemberUsername} />
            ) : (
                <div>
                    {members.map((member) => (
                        <Messages
                            key={member.id}
                            messages={messages}
                            currentMember={member}
                        />
                    ))}
                    <Input handleSendMessage={onSendMessage} />
                </div>
            )}
        </div>
    );
};

export default App;
