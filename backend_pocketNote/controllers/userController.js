const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create(req.body);

    const { password, ...userWithoutPassword } = newUser.toObject();
    return res.status(201).json({
      status: "ok",
      user: userWithoutPassword,
    });
  } catch (err) {
    return res.status(400).json({
      message: `user is not created ${err}`,
    });
  }
};

const addGroup = async (req, res) => {
  try {
    const { id } = req.user; // Get user ID from authenticated request
    const { fname, sname, color } = req.body; // Extract group details

    // Validate required fields
    if (!fname || !sname || !color) {
      return res.status(400).json({
        message: "Please provide full name, short name, color",
      });
    }

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newGroup = user.group.create({
      fname,
      sname,
      color,
    });

    user.group.push(newGroup); // Push new group to array
    await user.save(); // Save the updated user document

    return res.status(200).json({
      status: "ok",
      data: newGroup, // This will now include _id
      message: "Group added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: `Error adding group: ${err.message}`,
    });
  }
};

const addNote = async (req, res) => {
  try {
    const { id } = req.user;
    const { note, date, time, groupId } = req.body;

    // Validate required fields
    if (!note || !date || !time || !groupId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided groupId exists in the user's groups
    const groupExists = user.group.some(
      (group) => group._id.toString() === groupId
    );
    if (!groupExists) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    // Create the new note object and push it to the user's notes
    const newNote = { note, date, time, groupId };
    user.notes.push(newNote);

    // Save the updated user document
    await user.save();

    // Retrieve the newly added note
    const savedNote = user.notes[user.notes.length - 1];

    return res.status(200).json({
      status: "ok",
      message: "Note added successfully",
      data: savedNote, // Send both the _id and the note details
    });
  } catch (err) {
    return res.status(500).json({
      message: `Error adding Note: ${err.message}`,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { _id, note } = req.body; // Extract note ID and updated note text from the request body
    const { id } = req.user; // Extract user ID from the authenticated user

    // Find the user by their ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific note in the user's notes array
    const noteToUpdate = user.notes.find((n) => n._id.toString() === _id);

    if (!noteToUpdate) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update the note text
    noteToUpdate.note = note;

    // Save the updated user document
    await user.save();

    // Respond with the updated note
    res.status(200).json({
      status: "ok",
      message: "Note updated successfully",
      note: noteToUpdate,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { _id } = req.body; // Extract note ID from the request body
    const { id } = req.user; // Extract user ID from the authenticated user

    // Find the user by their ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the note in the user's notes array
    const noteIndex = user.notes.findIndex(
      (note) => note._id.toString() === _id
    );

    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Remove the note from the array
    user.notes.splice(noteIndex, 1);

    // Save the updated user document
    await user.save();

    // Respond with success message
    res
      .status(200)
      .json({ status: "ok", message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the note" });
  }
};

// const updateImageUrl = (req, res) => {
//   try {
//   } catch (err) {}
// };

module.exports = {
  createUser,
  addGroup,
  addNote,
  updateNote,
  deleteNote,
  // updateImageUrl,
};
