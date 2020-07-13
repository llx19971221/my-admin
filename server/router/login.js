const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const loginModel = require("../dataBase/schema/login");

router.post("/", (req, res) => {
    const { body: {userName, password}, headers: {token} } = req;
    loginModel.find({
        userName,
        password
    }).then((result) => {
        let len = result.length;
        if(len === 0) {
            res.send({code: -321, msg: "账号或密码错误"})
        }else {
            let user = result[0];
            let token = createToken({userName});
            res.send({data: user, token, code: 200})
        }
    })
})

const createToken = (payload) => {
    return jwt.sign(payload, 'llx', {expiresIn: 30});
}
module.exports = router;