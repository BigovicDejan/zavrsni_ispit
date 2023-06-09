import React, { useState } from "react";

const Input = ({ handleSendMessage }) => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") {
            return;
        }
        handleSendMessage(text);
        setText("");
    };

    return (
        <div className="Input">
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={text}
                    type="text"
                    placeholder="Enter your message and press ENTER"
                    autoFocus
                />
                <button type="submit"></button>
            </form>
        </div>
    );
};

export default Input;
