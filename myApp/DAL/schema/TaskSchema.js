const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    boardID: {
      type: mongoose.ObjectId,
      ref: "board",
      required: true,
    },
    describe: {
      type: String,
    },
    status: {
      type: Number,
    },
    member: {
      type: Array.of(UserSchema),
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.path("_id").ref("task");

module.exports = TaskSchema;
