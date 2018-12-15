const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AccessLogSchema = new Schema({
  username: {type: String},
  token: {type: String}
});

// Export the model
module.exports = mongoose.model("AccessLog", AccessLogSchema);
