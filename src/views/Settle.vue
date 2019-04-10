<template>
  <div class="home" @click="GotFocus">
    <!-- 导航栏 -->
    <div class="mav">
      <navigation-bar></navigation-bar>
    </div>
    <!-- 主体部分 -->
    <div class="body">
      <main-body></main-body>
    </div>
    <!-- 底部支付方式 -->
    <div class="tabbar">
      <nav-tabbar></nav-tabbar>
    </div>
    <input type="text" id="paytype" @keyup.enter="paytype($event)">
    <div class="paystatus" v-show="shouhi">{{tpaytype}}</div>

    <!--加载中-->
            <div v-show="show" class="loading">
                <div class="load" style="">
                    <div style="width: 100%; height: 1px"></div>
                    <van-loading type="spinner" class="vaload"  size="60px" style=" "/>
                </div>
            </div>
    <!-- 支付状态 -->
          <div class="paytype" v-show="payshow">
           <p>{{paytext}}</p>

          </div>
   <div id="bdtts_div_id">
      <!-- 语音播放器 -->
    <audio id="tts_autio_id" autoplay="autoplay">
       
    </audio>
</div>

  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";
import "vant/lib/toast/style";

import NavigationBar from "../components/Settle/NavigationBar.vue";
import MainBody from "@/components/Settle/MainBody.vue";
import NavTabbar from "@/components/Settle/NavTabbar.vue";
import utils from "../assets/js/geturl"; //公共方法；
import { Loading } from 'vant';

Vue.use(Loading).use(Toast);

export default {
  components: {
    NavigationBar,
    MainBody,
    NavTabbar
  },
  data() {
    return {
      tpaytype: "支付中...",
      shouhi: false,
      fanurl: "http://192.168.0.222:8082",//扫描完成之后返回地址,
      payshow:false,//支付状态提示框
      paytext:""
    };
  },
  computed:{
    //加载效果
    show(){
      return this.$store.state.loding;
    }
  },
  methods: {
    GotFocus() {
      console.log("结算页面获取焦点");
      document.getElementById("paytype").focus();
    },
    //返回地址方法
    returnAddress() {
      //获取是否需要语音播放
       this.$store.dispatch('sound').then(data=>{
          
      })
      //清空会员信息
      this.$store.commit("ScanCommoditydata/accountinfo", "");

      let fanurl = this.fanurl;
      setTimeout(function() {
        window.location.href =
          fanurl +
          "/#/?postaccessToken=" +
          utils.getCookie("postaccessToken") +
          "&posTicketCode=" +
          utils.getCookie("posTicketCode") +
          "&memberCode=" +
          utils.getCookie("memberCode");
      }, 5000);
    },

    //小票打印方法
    javaprintPdf() {
      let list = {
        posTicketType: "10",
        state: "10",
        posTicketCode: this.$store.getters["ScanCommoditydata/redata"].gondlist
          .data.list[0].pos_ticket_code
      };
      Vue.$http
        .post("/pc/posTicketItem/getPosTicketDetail", list)
        .then(data => {
          let list = data.data.data;

          let store_name = utils.getCookie("departmentName"); //店名；
          list.store_name = store_name;
          // list.url=this.$store.state.PointingAddress;//打印ip地址
          list.url = utils.getCookie("PointingAddress"); //打印ip地址
          if (
            /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
          ) {
            //  alert("安卓")
            if (utils.getCookie("PointingAddress") != "") {
              list.url = utils.getCookie("PointingAddress"); //打印ip地址
            }
          } else if (window.innerWidth != 1024) {
            //pos机
            if (utils.getCookie("PointingAddress") != "") {
              list.url = utils.getCookie("PointingAddress"); //打印ip地址
            }
          }
          this.$store
            .dispatch("ScanCommoditydata/javaperitertput", list)
            .then(data => {
              console.log(data.data);
              if (data.data.status == 0) {
                Toast.success({
                  mask: false,
                  message: "小票打印成功",
                  duration: 1000
                });
            let paymentName=this.$store.getters['ScanCommoditydata/redata'].paymentName;
            let goodsName=paymentName+"付款成功，欢迎下次光临";//商品名称
                       //语音播放
                        if(this.$store.state.sound.data=="1"){
                             utils.doTTS(goodsName);
                        }
                //this.printNumber();//打印小票次数
              } else {
                Toast.fail({
                  mask: false,
                  message: "小票打印失败",
                  duration: 1000
                });
              }
            });
        });
    },

    paytype(e) {

      //会员条码
      if(e.currentTarget.value.substring(0, 2)=="HY"&&e.currentTarget.value.length==16){
          //无会员信息
             if(this.$store.getters['ScanCommoditydata/redata'].accountinfo==""){
              let list={
                    "search":e.currentTarget.value,
                    "posTicketcCode":this.$store.getters['ScanCommoditydata/redata'].gondlist.data.list[0].pos_ticket_code,
                    "level2TypeId":"",
                    "pageSize":10,
                    "pageIndex":1
            };
               this.$store.dispatch('ScanCommoditydata/search',list).then(data=>{
                    if(data.status==0){
                      Toast.success({
                          mask: false,
                          message: '会员登录成功',
                          duration:2000,
                         });

                        this.$store.commit('ScanCommoditydata/ScanType',"商品");
                        document.getElementById("paytype").value="";


                          let list={
                                 payTypeId:"",
                            }
                         this.$store.dispatch('ScanCommoditydata/goulistdajax',list).then(data=>{
                         if(data.status==0){
            
                         }else{
                            alert(data.message);
                            }
                          });
                    }else{
                       Toast.fail({
                          mask: false,
                          message: '会员登录失败',
                          duration:2000,
                         });
                          document.getElementById("paytype").value="";
                    }
               })
              //有会员信息
             }else{
                document.getElementById("paytype").value="";
             }
      }
      //支付宝微信条码
      else{
      let list = {
        payTypeCode: this.$store.getters["ScanCommoditydata/redata"].confirmpy
          .payTypeCode,
        payTypeId: this.$store.getters["ScanCommoditydata/redata"].confirmpy.id,
        posTicketCode: this.$store.getters["ScanCommoditydata/redata"].gondlist
          .data.list[0].pos_ticket_code,
        state: 10,
        payMoney: this.$store.getters["ScanCommoditydata/redata"].settlementSummary.init_money,
        posTicketType: 10,
        restingOrderType: 10,
        sysParamId: "",
        authCode: e.currentTarget.value,
        memberPwd: "", //会员卡密码
        manualDiscountPassword: "", //口令密码
        manualDiscount: 0, //口令优惠金额
        isInputMember: "", //是否走了绿色通道（会员登录）
        isNoMemberToPay: "" //是否走了绿色通道（会员结算）
      };
      this.$store.dispatch("ScanCommoditydata/billinginfo", list).then(data => {
        if (data.status == 0) {
          let _this=this
          //  this.shouhi=true;
          /******************************************支付宝支付*****************************************************/
          if (
            this.$store.getters["ScanCommoditydata/redata"].confirmpy
              .payTypeCode == "ZFB"
          ) {
            if (data.data.resultCode == "SUCCESS") {
              let orderId = this.$store.getters["ScanCommoditydata/redata"]
                .gondlist.data.list[0].pos_ticket_code;
              if (typeof EventSource !== "undefined") {
                var source = new EventSource(
                  axios.defaults.baseURL + "/pc/pay/zfb/orderQuery/" + orderId
                );
                let stores = this.$store;
                source.addEventListener("payStatus", function(event) {
                  // alert(event.data);
                  console.log(event.data);
                  let jsondata = JSON.parse(event.data);
                  // event.data=JSON.stringify(event.data);
                  // stores.commit("SettlementPage/toPayMoney", {
                  //   name: "待付金额",
                  //   money: jsondata.data.toPayMoney
                  // });
                   _this.payshow=true;//显示支付提示框
                    _this.paytext="等待支付..."
                  if (jsondata.status == 0 && jsondata.data != null) {
                    if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeStatus == "TRADE_SUCCESS"
                    ) {
                      //支付成功
                      // stores.commit('SettlementPage/weistyle',"支付成功");
                     // this.tpaytype = "支付完成";

                      _this.tpaytype = "支付宝支付完成";
                    
                     _this.paytext="支付完成"

                      // Toast.success({
                      //   mask: false,
                      //   message: "支付宝支付完成",
                      //   duration: 2000
                      // });
                      _this.javaprintPdf();//打印小票
                      source.close();
                      //返回主页方法
                      _this.returnAddress();

                      
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeStatus == "WAIT_BUYER_PAY"
                    ) {
                      // stores.commit('SettlementPage/weistyle',"等待卖家付款");
                      _this.tpaytype = "等待用户付款";
                       _this.paytext="等待用户付款"
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeStatus == "TRADE_CLOSED"
                    ) {
                      //  stores.commit('SettlementPage/weistyle',"未付款");
                      _this.tpaytype = "未付款";
                       _this.paytext="未付款"
                      source.close();
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeStatus == "TRADE_FINISHED"
                    ) {
                      // stores.commit('SettlementPage/weistyle',"交易结束");
                      _this.tpaytype = "交易结束";
                       _this.paytext="交易结束"
                      source.close();
                    }
                  } else {
                    //stores.commit('SettlementPage/weistyle',jsondata.message);
                    _this.tpaytype = jsondata.message;
                     _this.paytext=jsondata.message
                     source.close();
                  }
                  //document.getElementById("result").innerHTML=event.data + "<br>";
                });
              } else {
                alert("抱歉，你的浏览器不支持 server-sent 事件...");
                // document.getElementById("result").innerHTML="抱歉，你的浏览器不支持 server-sent 事件...";
              }
            } else {
               _this.tpaytype = "交易异常";
            }

            /**********************************微信支付方式************************************************************************ */
          } else if (
            this.$store.getters["ScanCommoditydata/redata"].confirmpy
              .payTypeCode == "WEIXIN"
          ) {
            if (data.data.resultCode == "SUCCESS") {
              // this.tpaytype = "微信支付完成";
              // Toast.success({
              //   mask: false,
              //   message: "微信支付完成",
              //   duration: 2000
              // });

                _this.payshow=true;//显示支付提示框
                  _this.paytext="等待支付..."

           let orderId = this.$store.getters["ScanCommoditydata/redata"]
                .gondlist.data.list[0].pos_ticket_code;
              if (typeof EventSource !== "undefined") {
                var source = new EventSource(
                  axios.defaults.baseURL +
                    "/pc/pay/wx/wxPay/orderQuery/" +
                    orderId+"?sourceType=20"
                );
                let stores = this.$store;
                source.addEventListener("payStatus", function(event) {
                  // alert(event.data);
                  console.log(event.data);

                  let jsondata = JSON.parse(event.data);
                  // event.data=JSON.stringify(event.data);
                  if (jsondata.status == 0 && jsondata.data != null) {
                    if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "SUCCESS"
                    ) {
                      //支付成功
                      // stores.commit('SettlementPage/weistyle',"支付成功");
                      this.tpaytype = "支付完成";
                       _this.paytext="支付完成"
                        _this.javaprintPdf();//打印小票
                          _this.returnAddress();

                      source.close();
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "REFUND"
                    ) {
                      _this.tpaytype = "转入退款";
                        _this.paytext="转入退款"
                      source.close();
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "NOTPAY"
                    ) {
                      _this.tpaytype = "未支付";
                        _this.paytext="未支付"
                       source.close();
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "CLOSED"
                    ) {
                      _this.tpaytype = "已关闭";
                        _this.paytext="已关闭"
                      source.close();
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "REVOKED"
                    ) {
                      _this.tpaytype = "已撤销";
                        _this.paytext="已撤销"
                      source.close();
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "USERPAYING"
                    ) {
                      _this.tpaytype = "支付中...";
                        _this.paytext="支付中..."
                    } else if (
                      jsondata.status == 0 &&
                      jsondata.data.tradeState == "PAYERROR"
                    ) {
                      _this.tpaytype = "支付失败";
                        _this.paytext="支付失败"
                      source.close();
                    }
                  } else {
                    // stores.commit('SettlementPage/weistyle',jsondata.message);
                    _this.tpaytype = jsondata.message;
                      _this.paytext=jsondata.message
                     source.close();
                  }

                  //document.getElementById("result").innerHTML=event.data + "<br>";
                });
              } else {
                alert("抱歉，你的浏览器不支持 server-sent 事件...");
                // document.getElementById("result").innerHTML="抱歉，你的浏览器不支持 server-sent 事件...";
              }
              //返回主页方法
              this.returnAddress();
            } else {
              
            }

            /**************************************会员卡支付************************************************************************************** */
          } 
        } else {
          alert(data.message);
        }
      });
      }
    }
  },
  mounted() {


             
                   let paymentName=this.$store.getters['ScanCommoditydata/redata'].paymentName;
                 
                   if(this.$store.state.sound.data=="1"){
                  if(paymentName!="会员卡"){//支付宝微信
                          let sum=this.$store.getters['ScanCommoditydata/redata'].gondlist.data.list.length;
                        let price=this.$store.getters['ScanCommoditydata/redata'].gondlist.data.all_moeny;
                       // let paymentName=this.$store.getters['ScanCommoditydata/redata'].paymentName;
                      let goodsName="共"+sum+"件商品，"+price+"元,"+paymentName+"付款";//商品名称
                       //语音播放

                       utils.doTTS(goodsName);
                  }else{
                  //    let sum=88;
                  //       let price=88;
                  //    let goodsName="共"+sum+"件商品，"+price+"元，请使用"+paymentName+"付款";//商品名称
                  //  // utils.doTTS("");
                      utils.doTTS("会员卡支付成功，欢迎下次光临");
                      
                  }
                   }
                       



    console.log("结算页面初始化获取焦点");
    document.getElementById("paytype").value = "";
    document.getElementById("paytype").focus();

    if (
      this.$store.getters["ScanCommoditydata/redata"].membershipcess ==
      "会员卡支付成功"
    ) {
      // this.shouhi=true;
      this.tpaytype = "会员卡支付成功";
      Toast.success({
        mask: false,
        message: "支付成功",
        duration: 2000
      });
       //语音播放
      // utils.doTTS("会员卡付款成功，下次欢迎");

      this.$store.getters["ScanCommoditydata/redata"].membershipcess = "未知";
      //返回主页方法
      this.returnAddress();
    } else {
      // this.shouhi=true;
      // this.tpaytype="会员卡支付失败"
    }
  }
};
</script>
<style scoped>
.inpue {
  width: 100%;

  height: 15.064457rem;
  background: red;
}

.home {
  position: relative;
}
#paytype {
  width: 1px;
}


/*竖屏*/
@media screen and (min-width: 618px) and (max-width: 820px) {
  .mav {
    position: absolute;
    width: 100%;
    height: 3.765281rem;
    top: 0px;
    left: 0px;
    background: url("../assets/img/portrait/brush_3.png") no-repeat;

    z-index: 99;
    background-size: 100%;
  }
  .body {
    position: absolute;
    width: 100%;
    height: 20.899902rem;
    left: 0px;
    top: 2.865281rem;
    background: url("../assets/img/portrait/backgrod2.png") no-repeat;
    background-size: 100%;
  }

  .tabbar {
    position: absolute;
    width: 100%;
    height: 4.694377rem;
    left: 0px;
    top: 21.966962rem;
    background: url("../assets/img/portrait/brush_4.png") no-repeat;
    background-size: 100%;
  }
   .load{
width:1.041667rem /* 100/96 */;
 height: 1.041667rem /* 100/96 */; 
 background: #7D7D7D; 
 margin: auto;
  border-radius: .041667rem /* 4/96 */;
   margin-top: 4.90625rem /* 375/96 */
  }
  .vaload{
   margin: 5.15625rem /* 15/96 */ auto; background: #2d2d2d;padding: .504167rem /* 10/96 */;border-radius: .141667rem /* 4/96 */
  }
}

/* 横屏 */
@media screen and (min-width: 1018px) and (max-width: 1200px) {
  .paystatus {
    width: 5.156538rem;
    height: 2.946593rem;
    background: red;
    position: relative;
    top: 4.095948rem;
    left: 8.287293rem;
    text-align: center;
    line-height: 2.946593rem;
    color: aliceblue;
    font-size: 0.405157rem;
  }
  .mav {
    position: absolute;
    width: 100%;
    height: 2.320442rem;
    top: 0px;
    left: 0px;
    background: url("../assets/img/brush_1.png") no-repeat;
    background-size: 100%;
    z-index: 99;
  }
  .body {
    position: absolute;
    width: 100%;
    height: 12.246777rem;
    left: 0px;
    top: 1.197053rem;
    background: url("../assets/img/background_2.png") no-repeat;
    background-size: 100%;
  }
  .tabbar {
    position: absolute;
    width: 100%;
    height: 2.559853rem;
    left: 0px;
    top: 12.430939rem;
    background: url("../assets/img/brush_2.png") no-repeat;
    background-size: 100%;
  }
   .load{
width:1.041667rem /* 100/96 */;
 height: 1.041667rem /* 100/96 */; 
 background: #7D7D7D; 
 margin: auto;
  border-radius: .041667rem /* 4/96 */;
   margin-top: 4.90625rem /* 375/96 */
  }
  .vaload{
   margin: .15625rem /* 15/96 */ auto; background: #2d2d2d;padding: .504167rem /* 10/96 */;border-radius: .141667rem /* 4/96 */
  }
  .paytype{
    width: 4.166667rem /* 400/96 */;
    height: 2.28125rem /* 219/96 */;
    background: #ffffff;
    position: absolute;
    top: 5.041667rem /* 100/96 */;
    left: 7.6875rem /* 450/96 */;
    border-radius: .104167rem /* 10/96 */;
  }
  .paytype p{
    font-size: .4375rem /* 42/96 */;
    color: #be0000;
    line-height: 2.041667rem; /* 100/96 */
   
    
  } 
  
}

/* 电脑端 */

@media screen and (min-width: 1200px) {
  .home {
    position: fixed;
    width: 11.333333rem;
    height: 8.520833rem;

    top: 50%;
    left: 50%;
    margin-top: -4.260416rem;
    margin-left: -5.666666rem;
  }
  .paystatus {
    width: 2.916667rem;
    height: 1.666667rem;
    background: red;
    position: relative;
    top: 2.3125rem;
    left: 4.6875rem;
    text-align: center;
    line-height: 1.666667rem;
    color: aliceblue;
    font-size: 0.229167rem;
  }
  .mav {
    position: absolute;
    width: 100%;
    height: 1.3125rem;
    top: 0px;
    left: 0px;
    background: url("../assets/img/brush_1.png") no-repeat;
    background-size: 100%;
    z-index: 99;
  }
  .body {
    position: absolute;
    width: 100%;
    height: 6.604167rem;
    left: 0px;
    top: 0.875rem;
    background: url("../assets/img/background_2.png") no-repeat;
    background-size: 100%;
  }
  .tabbar {
    position: absolute;
    width: 100%;
    height: 1.65625rem;
    left: 0px;
    bottom: -0.041667rem;
    background: url("../assets/img/brush_2.png") no-repeat;
    background-size: 100%;
  }
  .load{
width:1.041667rem /* 100/96 */;
 height: 1.041667rem /* 100/96 */; 
 background: #7D7D7D; 
 margin: auto;
  border-radius: .041667rem /* 4/96 */;
   margin-top: 3.90625rem /* 375/96 */
  }
  .load{
width:0.741667rem /* 100/96 */;
 height: 0.741667rem /* 100/96 */; 
 background: #7D7D7D; 
 margin: auto;
  border-radius: .041667rem /* 4/96 */;
   margin-top: 1.90625rem /* 375/96 */
  }
  .vaload{
   margin: .15625rem /* 15/96 */ auto; background: #2d2d2d;padding: .204167rem /* 10/96 */;border-radius: .141667rem /* 4/96 */
  }
}
</style>

