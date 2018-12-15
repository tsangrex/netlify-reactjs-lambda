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
const JWTAuth = (req, res, next) => {
  console.log("JWTAuth");
  const authorizationToken = req.headers["authorization"];
  if (authorizationToken) {
    console.log(authorizationToken);
    let tokens = authorizationToken.split(" ");
    jwt.verify(tokens[1], secretPrivateKey, (err, decoded) => {
      if (err || tokens[0] !== "Bearer") {
        console.log("failed jwt");
        let message = "Failed to authenticate token.";
        if (err.name === "TokenExpiredError") {
          message = "Token has expired, please login again.";
        }
        res.json({success: false, message: message});
        next();
      } else {
        console.log("success jwt");
        console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: "No token provided."
    });
    next();
  }
};
router.post("/postToken", (req, res) => {
  console.log("postToken");
  // res.json("postToken");
  res.json({
    result: "ok",
    token: jwt.sign(
      {
        name: req.body.username,
        data: "============="
      },
      secretPrivateKey,
      {
        expiresIn: 60 * 1
      }
    )
  });
});
router.get("/getData", JWTAuth, function(req, res) {
  console.log("getData");
  res.json(req.decoded);
});
// app.use(
//   expressJWT({
//     secret: secretPrivateKey
//   }).unless({
//     path: [
//       "/.netlify/functions/api/postToken",
//       "/.netlify/functions/api/getData"
//     ]
//   })
// );

// app.use(function(err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).json({msg: "invalid path"});
//   } else {
//     res.json({msg: "valid path"});
//   }
// });
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
