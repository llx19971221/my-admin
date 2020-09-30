const express = require("express");
const path = require('path');
const routers  = require("./router");
const middles  = require("./middle");
const app = express();
const cors = require("cors");
app.listen("1234");
app.use(cors({
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true,
    "optionsSuccessStatus": 200
}));
app.use(express.static(path.join(__dirname, './static')));
app.use(express.json());// 添加json解析
app.use(express.urlencoded({extended: false}));

//格式正确可以请求登陆接口，但是其他接口必须要求令牌不过期，所以登陆放在令牌前，其他接口放在令牌后
app.use(middles.secert)
app.use('/api/login', routers.loginRouter);
app.use(middles.auth)
app.use('/api/userControl/queryAll', routers.userControl.queryAll)
