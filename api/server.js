const https = require("https");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const cors = require('cors');

const token = require("./token");

// allow cross origin requests from our mashup
var corsOptions = {
  origin: 'https://localhost:8080',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Main api endpoint localhost:9000/token
app.get("/token", (req, res) => {
  /* *** Using Same User *** */
  // const sub = "anon-view-sub";
  // const name = "Anon Viewer";
  // const email = "anon-viewer@anon.com";
  // const groups = "anon-view";

  /* *** Create different random user *** */
  const uuid = uuidv4();
  const sub = `_${uuid}`;
  const name = sub;
  const email = `${uuid}@anon.com`;
  const groups = "anon-view";
  
  const genT = token.generate(sub, name, email, groups);
  res.json({ token: genT });
});

const options = {
  key: fs.readFileSync(path.join(__dirname, "./serverprivate.key")),
  cert: fs.readFileSync(path.join(__dirname, "./serverpublic.pem")),
  passphrase: "0000"
 };

 https
  .createServer(options, app)
  .listen(9000, () => { console.log("JWT Server Running on Port 9000"); });