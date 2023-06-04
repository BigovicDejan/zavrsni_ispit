import React, { useState } from "react";

const NameInputForm = ({ onFormSubmit }) => {
    const [username, setUsername] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(username);
    };

    return (
        <div>
            <header>
                <h1 className="Header">Choose your name</h1>
            </header>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username"></label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your choice here"
                    required
                    autoFocus
                />
                <button type="submit"></button>
            </form>
        </div>
    );
};

export default NameInputForm;
