const jwt = require("jsonwebtoken");
var { secret, sendGridApiKey } = require("../configuration/local");

var sg = require("sendgrid")(sendGridApiKey);
const pug = require("pug");

const User = require("../models/user");
const Auction = require("../models/auction");
const BankSession = require("../models/bank-session");
const Bid = require("../models/bid");

// exports.uploadImage = async data => {
//   try {
//     let Key = String(new Date().getTime()) + ".jpg";

//     var params = {
//       Body: data,
//       Bucket: "bankofhodlers",
//       Key
//     };

//     await s3.putObject(params).promise();
//     return Key;
//   } catch (error) {
//     throw {
//       status: false,
//       message: "Something went Wrong"
//     };
//   }
// };

exports.deleteSession = async email => {
  try {
    await BankSession.remove({ email });
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.getUser = async email => {
  try {
    let data = await User.findOne({ email });
    return data && data._doc;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.createUser = async reqData => {
  try {
    let user = new User(reqData);
    await user.save();
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.createAuction = async reqData => {
  try {
    let auction = new Auction(reqData);
    await auction.save();
    return;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.createSession = async reqData => {
  try {
    let bankSession = new BankSession(reqData);
    bankSession.save();
    return;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.getItemByItemId = async itemId => {
  try {
    let data = await Auction.findById(itemId);
    return data && data._doc;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.updateAuctionItemWhichIsSold = async function(itemId, email) {
  await Auction.findByIdAndUpdate(itemId, { auctioned: true, wonBy: email });
};

exports.getBidUsingItemId = async itemId => {
  try {
    let data = await Bid.find({ itemId });
    return data;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.getBidUsingEmailId = async user => {
  try {
    let data = await Bid.find({ user });
    return data;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.getAllItem = async () => {
  try {
    let allItems = await Auction.find();
    return allItems;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.createBid = async reqData => {
  try {
    reqData._id = reqData.bidId;
    let bid = new Bid(reqData);
    await bid.save();
    return;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.apikey, secret);
    email = decoded.email;

    let data = await BankSession.find({ email });
    let check = data.find(item => item._doc.sessionId === req.headers.apikey);
    if (check) {
      Object.assign(req.body, {
        email
      });
      next();
    } else throw {};
  } catch (error) {
    res.send({
      status: "false",
      info: "Invalid Token or You might be logged out"
    });
  }
};

exports.sendEmail = async (email, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      email = "yogendrasaxena56@gmail.com"; // just for checking purpose, comment it later
      const html = pug.renderFile(`${__dirname}/../public/email.pug`, { data });
      var subject = "Winner Details";
      var request = sg.emptyRequest({
        method: "POST",
        path: "/v3/mail/send",
        body: {
          personalizations: [
            {
              to: [
                {
                  email
                }
              ],
              subject
            }
          ],
          from: {
            email: "yogendrasaxena56@gmail.com"
          },
          content: [
            {
              type: "text/html",
              value: html
            }
          ]
        }
      });

      sg.API(request, function(error, response) {
        if (error)
          resolve({
            status: false,
            message: "Failed"
          });
        else
          resolve({
            status: true,
            message: "Success"
          });
      });
    } catch (error) {
      console.log("Error is " + error);
    }
  });
};
