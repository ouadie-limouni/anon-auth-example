const jsonWebToken = require("jsonwebtoken");
const fs = require("fs");

const key = fs.readFileSync("private.key.txt", "utf8");

const methods = {
  generate: function (sub, name, email, groups = []) {
    // keyid and issuer have to match with the IDP config and the audience has to be qlik.api/jwt-login-session
    const signingOptions = {
      keyid: '[WEB INTEGRATION ID]',
      algorithm: "RS256",
      issuer: '[ISSUER (SAME AS TENANT DOMAIN)]',
      expiresIn: "30s",
      audience: "qlik.api/login/jwt-session"
    };

    // These are the claims that will be accepted and mapped anything else will be ignored. sub, subtype and name are mandatory.
    const payload = {
      sub: sub,
      subType: "user",
      name: name,
      email: email,
      email_verified: true,
      groups: groups
    };

    const token = jsonWebToken.sign(payload, key, signingOptions);
    return token;
  }
};

module.exports = methods;