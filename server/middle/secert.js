const ss =  require("../until/sign.js");
module.exports = (req, res, next) => {
    const reqData = {...req.query, ...req.body};
    if(ss(reqData) === req.headers.authorization) {
        next()
    }else {
        res.status(500).send({code: -1, msg: "参数错误,错误的sign"})
    }
  };