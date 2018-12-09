// show object spread works, i.e. babel works
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URL,
  {useNewUrlParser: true}
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const obj = {
  foo: "test"
};
console.log("db connected");
const AccessLog = require("./AccessLog");
export function handler(event, context, callback) {
  let accessLog = new AccessLog({
    event: event,
    context: context
  });
  console.log("before save");
  accessLog.save(function(err) {
    if (err) {
      console.log("save error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({msg: "failed to create", ...obj})
      });
    } else {
      console.log("save success");
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: "create success", ...obj})
      });
    }
  });
  console.log("after save");
}
