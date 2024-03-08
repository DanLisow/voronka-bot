const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  chatId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  image: { type: String, required: true },
  lives: { type: Number, default: 3 },
  availableTime: { type: Number, default: 24 },
  actualLesson: { type: String, default: "first" },
  lessons: {
    first: { type: Boolean, default: true },
    second: { type: Boolean, default: false },
    third: { type: Boolean, default: false },
    fourth: { type: Boolean, default: false },
    fifth: { type: Boolean, default: false },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
