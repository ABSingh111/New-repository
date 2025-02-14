import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ setMessage }) => {
    // State to store the uploaded employee file and previous year file
    const [empFile, setEmpFile] = useState(null);
    const [prevFile, setPrevFile] = useState(null);

    // Handle the file upload when the user clicks the "Upload" button
    const handleUpload = async () => {
        // Create a new FormData object to hold the files
        const formData = new FormData();
        formData.append("employee_file", empFile);  // Append the employee file to form data
        formData.append("previous_year_file", prevFile);  // Append the previous year file to form data

        try {
            // Send a POST request to the Flask backend with the form data
            const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }  // Set content type for file upload
            });

            // Check if the server response is successful (status 200)
            if (response.status === 200) {
                // Update the message state with success message
                setMessage({ text: "✅ Success: " + response.data.message, type: "success" });
            } else {
                // Handle any unexpected response from the server
                setMessage({ text: `⚠️ Unexpected Response: ${JSON.stringify(response.data)}`, type: "warning" });
            }
        } catch (error) {
            console.error("Upload Error:", error);  // Log the error to the console for debugging

            // Handle different types of errors based on the response from the server
            if (error.response) {
                // If there's a server error, show the error message from the server
                setMessage({
                    text: `❌ Server Error: ${error.response.data.error || "Something went wrong!"} (Status: ${error.response.status})`,
                    type: "error"
                });
            } else if (error.request) {
                // If no response was received from the server (network error)
                setMessage({ text: "❌ Network Error! Please check Flask server and try again.", type: "error" });
            } else {
                // For any other error (like invalid setup or unexpected issues)
                setMessage({ text: `❌ Error: ${error.message}`, type: "error" });
            }
        }
    };

    return (
        <div>
            <h2>Upload Employee & Previous Year CSV</h2>
            {/* Input field to upload the employee CSV file */}
            <input type="file" onChange={(e) => setEmpFile(e.target.files[0])} />
            {/* Input field to upload the previous year CSV file */}
            <input type="file" onChange={(e) => setPrevFile(e.target.files[0])} />
            {/* Button to trigger the upload function */}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadForm;
