import React, { useState } from "react";

const NameInputForm = ({ onSubmit }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username);
    };

    return (
        <div>
            <h1>Unesi svoje Ime/Nadimak</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ime/Nadimak"
                    required
                />
                <button type="submit">Započni chat</button>
            </form>
        </div>
    );
};

export default NameInputForm;
