import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/predict";

export const predictImage = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};