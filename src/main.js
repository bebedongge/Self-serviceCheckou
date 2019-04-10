import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/js/px2rem";
import utils from './assets/js/geturl';//公共方法；


//html 根 font-zies:40.9(平板竖屏)；font-zies:54.3(平板横屏)；font-zies:96(大于1200px的电脑)；

import 'element-ui/lib/theme-chalk/index.css';
import {Message} from 'element-ui';
import './assets/css/element.css';


import axios from 'axios'
// axios.defaults.timeout = 5000; // 超时时间
Vue.prototype.$http = axios
Vue.$http=axios;
//axios.defaults.baseURL="http://192.168.0.210:8085";

if (location.hostname === 'localhost' || location.hostname === '192.168.0.222') {//本地开发环境
    axios.defaults.baseURL = "http://192.168.0.86:8085";
} else if (location.hostname === 'app.51xxcg.com') {//线上环境
    axios.defaults.baseURL = "http://47.96.112.195:8085";
}else {
    axios.defaults.baseURL = "http://47.96.112.195:8085";
}


//发送前过滤
axios.interceptors.request.use(function (config) {
   
    store.state.loding=true;//显示加载效果
    
    if (!config.isPayload) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
        config.headers["Authorization"] = 'Bearer '+utils.getCookie("postaccessToken");
        config.transformRequest = function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        };
    } else {
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
        config.headers["Authorization"] = 'Bearer '+utils.getCookie("postaccessToken");
    }
    return config;
}

    );

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    store.state.loding=false;//显示加载效果
    // 对响应数据做点什么
    // console.log(response);
    if (response.data.status==0){
        return response;
    }else {
        Message.error({
            message: response.data.message,
            duration:1000,
            center:true,
            showClose:true
        })

        if(document.getElementById("sahuoqu")!=null){
            document.getElementById("sahuoqu").value="";//清空扫描框里的数据
        }
        if( document.getElementById("paytype")!=null){
            document.getElementById("paytype").value="";//清空结算页面扫描框里的内容
        }
       
           
            console.log("测试："+document.getElementById("paytype"));
           
          
       
        // document.getElementById("huoqu").value="";//清空首页输入框里的数据

        return Promise.reject("拦截器--错误信息："+JSON.stringify(response.data)) //请求错误时，直接结束
    }

}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            case 400:
                Message.error({
                    message: "请求错误(400)",
                    duration:1000,
                    center:true
                })
                break;
            case 401:
                // 这里写清除token的代码
                Message.error({
                    message: "未授权，请重新登录(401)",
                    duration:1000,
                    center:true
                })

                break;
            case 403:
                Message.error({
                    message: "拒绝访问(403)",
                    duration:1000,
                    center:true
                })
                break;
            case 404:
                Message.error({
                    message: "请求出错(404)",
                    duration:1000,
                    center:true
                })
                break;
            case 408:
                Message.error({
                    message: "请求超时(408)",
                    duration:1000,
                    center:true
                })
                break;
            case 500:
                Message.error({
                    message: "服务器错误(500)",
                    duration:1000,
                    center:true
                })
                break;
            case 501:
                Message.error({
                    message: "服务未实现(501)",
                    duration:1000,
                    center:true
                })
                break;
            case 502:
                Message.error({
                    message: "网络错误(502)",
                    duration:1000,
                    center:true
                })
                break;
            case 503:
                Message.error({
                    message: "服务不可用(503)",
                    duration:1000,
                    center:true
                })
                break;
            case 504:
                Message.error({
                    message: "网络超时(504)",
                    duration:1000,
                    center:true
                })
                break;
            case 505:
                Message.error({
                    message: "HTTP版本不受支持(505)",
                    duration:1000,
                    center:true
                })
            break;
            default:
                Message.error({
                    message: "连接出错",
                    duration:1000,
                    center:true
                })
        }
    }
   // return Promise.reject(error);
  //  return Promise.reject("拦截器--错误信息："+error.response.data) //请求错误时，直接结束
     // return Promise.reject(error);
     if (error.response==undefined){
        // alert("拦截器--错误信息：该ip地址没有装打印服务") //请求错误时，直接结束
         Message.error({
             //   message: "连接出错",
             message: "该设备指向ip地址没有安装称重/打印服务!",
             duration:1000,
             center:true
         })
     }else {
         return Promise.reject("拦截器--错误信息："+error.response.data) //请求错误时，直接结束
     }
});


    


    
   let postaccessToken=utils.getUrlKey("postaccessToken");
   //alert(postaccessToken)
   if(postaccessToken==null){
    postaccessToken=utils.getCookie("postaccessToken");
   }
   let posTicketCode=utils.getUrlKey("posTicketCode");
   if(posTicketCode==null){
    posTicketCode="";
   }
   let memberCode=utils.getUrlKey("memberCode");
   if(memberCode==null){
    memberCode="";
   }

   let information={
    postaccessToken:postaccessToken,
    posTicketCode:posTicketCode,
    memberCode:"",
   }

    //alert(postaccessToken);
    store.commit("information", information);

    //将信息postaccessToken、posTicketCode、memberCode存入cookie
    utils.setCookie("postaccessToken",postaccessToken,1);
    // utils.setCookie("posTicketCode",posTicketCode);//小票code
    // utils.setCookie("memberCode",memberCode);//会员code


   // alert(utils.getCookie("postaccessToken"))





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
