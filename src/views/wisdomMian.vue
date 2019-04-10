<template>
  <div v-if="radioData!=''" >
    <p>智慧门店收银首页</p>
    <div v-if="radioData.list.length!=0">
      <p class="goodlist">稳定商品集合:</p>
      <div class="datas" v-for="(val,index) in radioData.list" :key="index">{{val}}</div>
      <!-- <p class="goodlist">不稳定商品集合:</p>
      <div  class="datas" v-for="(val,index1) in radioData.data.not_enough_list" :key="index1" >{{val}}</div>-->
    </div>
    <div v-if="radioData.not_enough_list.length!=0">
      <p class="goodlist">不稳定商品集合:</p>
      <div
        class="datas"
        v-for="(val,index1) in radioData.not_enough_list"
        :key="index1"
      >{{val}}</div>
    </div>

    <div>
    
      <button class="zhuans" @click="packedin">将射频商品转换到购物车</button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import utils from "../assets/js/geturl"; //公共方法；
export default {
  data() {
    return {
      radioData: ""
    };
  },
  computed: {},
  methods: {
   

    //sse获取射频商品
    radioFrequency() {
      let _this = this;

      if (typeof EventSource !== "undefined") {
        var source = new EventSource(
          axios.defaults.baseURL +
            "/rfid/initRFIDShoppingCard/532286587170455552/COM3?token=" +
            utils.getCookie("postaccessToken") +
            "&posTicketType=" +
            10
        );
        // source.onopen = function() {
        //   console.log("sse链接成功");
        // };

         source.addEventListener("payStatus",function (event) {
           let jsondata= JSON.parse(event.data);
            console.log("射频数据:" +event.data);
              _this.radioData =  JSON.parse(event.data);
         })


        // //链接成功
        // source.onmessage = function(event) {
        //   alert(event.data)
        //   let jsondata = JSON.parse(event.data);
        //   _this.radioData = JSON.parse(event.data);
        //   console.log("射频数据:" + event.data);
        // };
        // // 链接发生错误
        source.onerror = function(event) {
          console.log("sse接口发生错误：" + JSON.stringify(event));

          //  _this.radioFrequency();
        };
       
      } else {
        alert("抱歉，你的浏览器不支持 server-sent 事件...");
      }
    },
    //将射频商品加入购物车
    packedin() {
      Vue.$http
        .post("/rfid/addRFIDGoodsToShoppingCard", {
          posTicketType: 10,
          state: 10,
          restingOrderType: 10,
          sourceType: 40,
          restingOrderType: 10,
          memberCode: "HY00000337874833"
        })
        .then(data => {
          console.log("购物车数据：" + data);
        });
    },
    //商品集合初始化
    collectionInitial(posTicketCode) {
      Vue.$http
        .get("/intelligenStore/posPayment/generatePayQR", {
          params: {
            state: 10,
            posTicketType: 10,
            posTicketCode: posTicketCode
          }
        })
        .then(data => {
          console.log("商品集合初始化数据：" + data);
        });
    }
  },
  mounted() {
    this.radioFrequency();
  }
};
</script>
<style scoped>
.datas {
  margin: 0.208333rem /* 20/96 */;
  font-size: 0.125rem /* 12/96 */;
  text-align: left;
  border: 0.010417rem /* 1/96 */ solid red;
}
.goodlist {
  margin: 0.208333rem /* 20/96 */;
  font-size: 0.125rem /* 12/96 */;
  text-align: left;
}
.zhuan {
  width: 9.375rem /* 900/96 */;
  height: 0.520833rem /* 50/96 */;
  border: none;
  background: rebeccapurple;
  color: aliceblue;
  margin: 0.208333rem /* 20/96 */ auto;
}
</style>
