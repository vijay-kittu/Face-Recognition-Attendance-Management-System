/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterFace from "./RegisterFace";
import MarkAttendance from "./MarkAttendance";

function App() {
  return (
    <Router>
      <div>
        <h1>Face Recognition Attendance System</h1>
        <Routes>
          <Route path="/register" element={<RegisterFace />} />
          <Route path="/attendance" element={<MarkAttendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

*/

/*import React, { useState } from "react";
import { registerFace, markAttendance } from "./api";

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRegister = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    try {
      const response = await registerFace(file);
      console.log("Face Registered:", response);
      alert(response.message);
    } catch (error) {
      alert("Error in face registration.");
    }
  };

  const handleMarkAttendance = async () => {
    const username = "example_user"; // Replace with dynamic username
    try {
      const response = await markAttendance(username);
      console.log("Attendance Marked:", response);
      alert(response.message);
    } catch (error) {
      alert("Error in marking attendance.");
    }
  };

  return (
    <div>
      <h1>Face Recognition Attendance System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleRegister}>Register Face</button>
      <button onClick={handleMarkAttendance}>Mark Attendance</button>
    </div>
  );
}

export default App;
*/

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { registerFace } from "./api"; // API function for registering face

function App() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  // Capture the image from the webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleRegister = async () => {
    if (!image) {
      alert("Please capture an image first.");
      return;
    }
  
    try {
      // Convert the image to a Blob
      const response = await fetch(image);
      const blob = await response.blob();
  
      // Create a FormData instance to append the file and other details
      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");
      formData.append("name", "John Doe"); // Add a name field
  
      // Call the backend to register the face
      const result = await registerFace(formData); // API call to Flask
      alert(result.message);
    } catch (error) {
      console.error("Error registering face:", error);
      alert("Failed to register face.");
    }
  };
  

  return (
    <div>
      <h1>Face Registration</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={capture}>Capture</button>
      <button onClick={handleRegister}>Register Face</button>
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured face" />
        </div>
      )}
    </div>
  );
}

export default App;
