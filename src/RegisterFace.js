import React, { useState } from "react";
import axios from "axios";

const RegisterFace = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);

    try {
      const response = await axios.post("http://localhost:8080/api/register", formData);
      setStatus(response.data.message);
    } catch (error) {
      console.error(error);
      setStatus("Failed to register face.");
    }
  };

  return (
    <div>
      <h2>Register Face</h2>
      <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleSubmit}>Register</button>
      <p>{status}</p>
    </div>
  );
};

export default RegisterFace;
