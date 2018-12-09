// show object spread works, i.e. babel works
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const obj = {
  foo: "test"
};
const AccessLog = require("./AccessLog");
export function handler(event, context, callback) {
  let accessLog = new AccessLog({
    event: event,
    context: context
  });
  accessLog.save(function(err) {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({msg: "failed to create", ...obj})
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: "create success", ...obj})
      });
    }
  });
}
