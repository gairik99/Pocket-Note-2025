import axios from "axios";

const API_URL = "https://note2-backend.onrender.com/api/v1/users";

// Function to create a new note
export const createNote = async (noteData, token) => {
  try {
    const response = await axios.patch(`${API_URL}/addNote`, noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Something went wrong while adding the note"
    );
  }
};

// Function to update an existing note
export const updateNote = async (noteData, token) => {
  try {
    const response = await axios.patch(`${API_URL}/updateNote`, noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Something went wrong while updating the note"
    );
  }
};

export const deleteNote = async (noteId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteNote`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { _id: noteId }, // Send noteId in the request body
    });
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Something went wrong while deleting the note"
    );
  }
};
