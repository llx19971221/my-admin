const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const request = require("request");
const iconvLite = require('iconv-lite');
const {login: loginModel, address} = require("../dataBase/schema");


router.post("/", (req, response) => {
    const { body: {userName, password, ip} } = req;
    loginModel.find({
        userName,
        password
    }).then(async (result) => {
        let len = result.length;
        if(len === 0 || !result) {
            response.send({code: -102, msg: "账号或密码错误"})
        }else {
            let user = result[0];//用户名
            user = {userName: user.userName, isSuper: user.isSuper, createTime: user.createTime}
            let num = await address.countDocuments({
                ip
            });//查询是否存在ip
            if(num <= 0) {
                //不存在就请求一次
                request.get("https://whois.pconline.com.cn/ipJson.jsp?json=true&ip=" + ip,{
                    encoding: null,
                },(err, r, body) => {
                    if(err) {
                        throw new Error(err);
                    }
                    else {//得到ip相关信息，保存
                        let obj = JSON.parse(iconvLite.decode(body, 'gb2312'));
                        let service = obj.addr.split(" ")[1];
                        let addressStr = obj.pro + '|' + obj.city + "|" + service;
                        address.create({
                            ip,
                            address: addressStr,
                            service
                        }).then(() => {
                            let token = createToken({userName});
                            response.send({data: user, token, code: 200})
                        })
                    }
                })
            }else {//有的话，更新登陆时间
                let loginTime = new Date();
                address.updateOne({
                    ip
                }, {
                    loginTime
                }).then(() => {
                    let token = createToken({userName});
                    response.send({data: user, token, code: 200})
                })
            }
                
        }
    })
})

const createToken = (payload) => {
    return jwt.sign(payload, 'llx', {expiresIn: '3m'});
}
module.exports = router;