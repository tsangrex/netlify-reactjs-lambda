const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AccessLogSchema = new Schema({
  event: {type: String},
  context: {type: String}
});

// Export the model
module.exports = mongoose.model("AccessLog", AccessLogSchema);
