// show object spread works, i.e. babel works
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const router = express.Router();
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");

const secretPrivateKey = "test123";
// const mongoose = require("mongoose");
// const AccessLog = require("./AccessLog");
// mongoose.connect(
//   process.env.MONGODB_URL,
//   {useNewUrlParser: true}
// );
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// console.log("db connected");

router.post("/postToken", (res, req) => {
  console.log(res.body);
  console.log(res.body.username);
  res.json("postToken");
  // res.json({
  //   result: "ok",
  //   token: jwt.sign(
  //     {
  //       name: res.body.username,
  //       data: "============="
  //     },
  //     secretPrivateKey,
  //     {
  //       expiresIn: 60 * 1
  //     }
  //   )
  // });
});
app.get("/getData", function(req, res) {
  res.send(req.user);
});
app.use(
  expressJWT({
    secret: secretPrivateKey
  }).unless({
    path: ["/.netlify/functions/api/postToken"]
  })
);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({msg: "invalid jwt"});
  } else {
    next();
  }
});
app.use(express.json());
app.use("/.netlify/functions/api", router);
module.exports = app;
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
