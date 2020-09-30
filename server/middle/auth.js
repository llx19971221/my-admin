const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    console.log('进入了auth middle')
    const {token} = req.headers;
    jwt.verify(token, 'llx', function(err, decode) {
        if(err) {
            res.send({code: -101, msg: "令牌过期，请重新登陆"});
        }else {
            req.headers.user = decode.userName;
            next();
        }
    })
  };