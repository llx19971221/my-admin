const ss =  require("../until/sign.js");
module.exports = (req, res, next) => {
    console.log('进入了secert middle')
    const reqData = {...req.query, ...req.body};
    if(ss(reqData) === req.headers.authorization) {
        next()
    }else {
        res.status(500).send({code: -100, msg: "参数错误,错误的sign"})
    }
  };