import axios from "axios";

// Spring Boot Base URL
const SPRING_BOOT_API = "http://localhost:8080";

// Flask Base URL
const FLASK_API = "http://127.0.0.1:5000/register";

// Function to register a face
export const registerFace = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${FLASK_API}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering face:", error);
    throw error;
  }
};

// Function to mark attendance (Spring Boot)
export const markAttendance = async (username) => {
  try {
    const response = await axios.post(`${SPRING_BOOT_API}/attendance`, { username });
    return response.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
};
