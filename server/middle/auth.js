const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const {token} = req.headers;
    jwt.verify(token, 'llx', function(err, decode) {
        if(err) {
            res.send({code: -111, msg: "令牌过期，请重新登陆"});
        }else {
            req.headers.user = decode.userName;
            next();
        }
    })
  };