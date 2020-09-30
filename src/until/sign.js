const md5 = require("md5");
export const ss = (params = {}) => {
    let date = Date.now();
    params['timeout'] = date;
    let keyArr = Object.keys(params).sort((a,b) => {
       return a.charCodeAt(0) - b.charCodeAt(0)
    });
    let str = keyArr.map((el) => {
        return el + '=' + params[el];
    }).join(".");
    let sign = md5(str, '9165');

    return {
        data: params,
        sign
    }
} 
export default ss;