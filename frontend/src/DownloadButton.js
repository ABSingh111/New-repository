import React from "react";
import axios from "axios";

const DownloadButton = ({ setMessage }) => {
    // Function to handle the download when the user clicks the "Download" button
    const handleDownload = async () => {
        try {
            // Make a GET request to the backend to download the file
            const response = await axios.get("http://127.0.0.1:5000/download", {
                responseType: "blob",  // Set the response type to 'blob' to handle file download
            });

            // Check if the server response is successful (status 200)
            if (response.status === 200) {
                // Create a URL for the downloaded blob (file data)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                
                // Create an anchor element to trigger the file download
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "SecretSantaOutput.csv");  // Specify the default file name for download
                document.body.appendChild(link);  // Append the link to the body
                link.click();  // Programmatically click the link to start the download
                link.remove();  // Remove the link from the DOM after downloading

                // Set a success message after downloading the file
                setMessage({ text: "✅ File downloaded successfully!", type: "success" });
            } else {
                // If the response is unexpected, show a warning message
                setMessage({ text: "⚠️ Unexpected server response", type: "warning" });
            }
        } catch (error) {
            console.error("Download Error:", error);  // Log the error to the console for debugging

            // Show an error message if there's a problem with the network or the server
            setMessage({ text: "❌ Network error! Please check the backend.", type: "error" });
        }
    };

    // Render a button that triggers the file download
    return <button onClick={handleDownload}>Download Secret Santa List</button>;
};

export default DownloadButton;
