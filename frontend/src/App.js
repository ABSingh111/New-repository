import './App.css';
import React, { useState } from "react";
import UploadForm from "./UploadForm";
import DownloadButton from "./DownloadButton";

const App = () => {
    const [message, setMessage] = useState({ text: "", type: "" });

    return (
        <div>
            <h1>Secret Santa Game</h1>
            <UploadForm setMessage={setMessage} />
            <DownloadButton setMessage={setMessage} />

            {message.text && (
                <p style={{
                    color: message.type === "error" ? "red" : message.type === "success" ? "green" : "orange",
                    fontWeight: "bold"
                }}>
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default App;

