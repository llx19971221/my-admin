import api from "@/api";
// console.log(api)
import ss from "./sign";
import ls from "./ls";
import axios from "axios";
import router from "vue-router";
axios.defaults.withCredentials = true;
import { Message } from "element-ui";
export let fnObj = {};//方法map
let cancelObj = {};//取消请求map
const methodsArr = ['get', 'put', 'post', 'delete', 'patch', 'head', 'request'];//方法名
for(let key in api) {
    let myApi = api[key];//每个api绑定axios请求，最终只传参数
    fnObj[key] = (params) => {
        let apiArr = myApi.split(" ");
        let method = apiArr[1], url = apiArr[0];
        if(!methodsArr.some(e => e === method)) {
            [method, url] = [url, method];
            if(!method) {
                method = 'get';
            }
        }
        // console.log(myApi)
        let op = {
            url,
            method,
            timeout: 30000
        }
        //拿到url和method组成键值
        let key = url + method;
        //防止暴力点击
        cancelObj[key] && cancelObj[key]('点击过快，重新发起请求');
        let source = axios.CancelToken.source();
        let token = source.token;
        let cancelFn = source.cancel;
        op['cancelToken'] = token;//取消token
        cancelObj[key] = cancelFn;//取消方法

        if(method !== 'get') {
            op['data'] = params;
        }else {
            op['params'] = params;
        }
        //无论怎么样都要情况最后的cancelObj[key]
        return axios(op).then(res => {
            let { data, list } = res;
            if(data) {
                res = data;
            }else {
                res = list;
            }
            return res;
        }).catch(err => {
            /(\d+)/g.test(err.message);
            let code = RegExp.$1;
            Message.error(url + '  ' + (Reflect.has(errorCode,code) ? errorCode[code] : err.message));
        })
    }
    
}
// const errorCode = {
//     '-321': '账号密码错误',
// }
axios.interceptors.request.use(config => {
    let ssData = ss(config.data);
    config.headers.Authorization = ssData.sign;
    config.headers.token = ls.get("token");
    config.data = ssData.data;
    return config;
})
//错误代码
axios.interceptors.response.use(config => {
    const { data } = config;
    const {code, msg} = data;
    config.data['flag'] = true;
    if(code !== 200 && code !== '200') {
        Message.error(msg);
        config.data['flag'] = false;
        if(code === '-111' || code === -111) {
            ls.remove("token");
            router.redirect("/login")
        }
    }
    return config;
})

export default fnObj