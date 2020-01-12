var jwt = require("jsonwebtoken");

// TODO : YOGENDRA
module.exports = {
  sendGridApiKey: "DummyKey",
  secret: "hodlers",
  getToken(email) {
    let token = jwt.sign(
      {
        email
      },
      "hodlers"
    );
    return token;
  }
};
