import React, { useState, useEffect } from "react";
import Messages from "./components/Messages";
import NameInputForm from "./components/NameInputForm";
import Input from "./components/Input";
import "./App.css";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [drone, setDrone] = useState(null);

    const setMemberUsername = (username) => {
        const member = {
            username,
            color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
            id: drone.clientId,
        };
        setMembers((prevMembers) => [...prevMembers, member]);
    };

    const onSendMessage = (message) => {
        drone.publish({
            room: "observable-room",
            message,
        });
    };

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

    if (members.length === 0) {
        return <NameInputForm onSubmit={setMemberUsername} />;
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
            <Input onSendMessage={onSendMessage} />
        </div>
    );
};

export default App;
