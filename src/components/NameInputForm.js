import React, { useState } from "react";

const NameInputForm = ({ onUsernameSubmit }) => {
    const [username, setUsername] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onUsernameSubmit(username);
    };

    const handleNameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <div>
            <h1 className="App-header">Enter Your Name</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    required
                />
                <button type="submit">Start Chat</button>
            </form>
        </div>
    );
};

export default NameInputForm;
