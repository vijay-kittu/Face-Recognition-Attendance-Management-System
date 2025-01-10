import React, { useState } from "react";
import axios from "axios";

const MarkAttendance = () => {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8080/api/attendance", formData);
      setStatus(response.data.recognized ? "Attendance marked" : "Face not recognized");
    } catch (error) {
      console.error(error);
      setStatus("Failed to mark attendance.");
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleSubmit}>Mark Attendance</button>
      <p>{status}</p>
    </div>
  );
};

export default MarkAttendance;
