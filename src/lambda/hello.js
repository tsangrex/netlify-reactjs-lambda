// show object spread works, i.e. babel works
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser);
const mongoose = require("mongoose");
const AccessLog = require("./AccessLog");
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
router.post("/postToken", (res, req) => {
  console.log(res.body);
  req.json("post token");
});
app.use("/.netlify/functions/", router);
module.exports.handler = serverless(app);
// export function handler(event, context, callback) {
//   context.callbackWaitsForEmptyEventLoop = false;
//   let accessLog = new AccessLog({
//     event: JSON.stringify(event),
//     context: JSON.stringify(context)
//   });
//   console.log("before save");
//   accessLog.save(function(err) {
//     if (err) {
//       console.log("save error", err);
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify({msg: "failed to create", ...obj})
//       });
//     } else {
//       console.log("save success");
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify({msg: "create success", ...obj})
//       });
//     }
//   });
//   console.log("after save");
// }
