const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("story", StorySchema);
