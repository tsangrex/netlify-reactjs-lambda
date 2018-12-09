// show object spread works, i.e. babel works
const mongoose = require("mongoose");

const obj = {
  foo: process.env.MONGODB_URL
};
export function handler(event, context, callback) {
  console.log(process);
  console.log(process.env);
  console.log(process.env.MONGODB_URL);
  console.log("queryStringParameters", event.queryStringParameters);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!", ...obj})
  });
}
