const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  name: { type: String },
  opened: { type: Boolean, default: true },
  approved: { type: Boolean, default: false },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
