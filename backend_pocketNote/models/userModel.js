const { mongoose } = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Provide Full Name"],
    },
    sname: {
      type: String,
      required: [true, "Provide Short Name"],
    },
    color: {
      type: String,
      required: [true, "Provide group color"],
    },
  },
  { timestamps: true }
);

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "Provide Full Name"],
    },
    date: {
      type: String,
      required: [true, "Provide Short Name"],
    },
    time: {
      type: String,
      required: [true, "Provide group color"],
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Provide the group ID"],
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide your name"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Provide your email"],
    },
    password: {
      type: String,
      required: [true, "Provide a password"],
    },
    imageurl: String,
    group: [groupSchema],
    notes: [noteSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
