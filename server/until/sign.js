const md5 = require("md5");
const ss = (params) => {
    let keyArr = Object.keys(params).sort((a,b) => {
       return a.charCodeAt(0) - b.charCodeAt(0)
    });
    let str = keyArr.map((el) => {
        return el + '=' + params[el];
    }).join(".");
    let sign = md5(str);

    return sign
} 
module.exports = ss;