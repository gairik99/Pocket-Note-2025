const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userController");
const validateToken = require("../middleware/authmiddleware");
const {
  addGroup,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/userController");

router.route("/").post(createUser);
router.route("/addGroup").patch(validateToken, addGroup);
router.route("/addNote").patch(validateToken, addNote);
router.route("/updateNote").patch(validateToken, updateNote);
router.route("/deleteNote").delete(validateToken, deleteNote);
// router.route("/updateimageurl").patch(validateToken, updateImageUrl);

module.exports = router;
