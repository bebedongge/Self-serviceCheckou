<template>
  <div class="mian">
    <div class="botn"></div>
    <div class="tyoe">
      <div class="witype" @click="paymentMethod('ZFB')">
        <img class="img" src="../../assets/img/pay_treasure_blue.png" alt>
        <p class="zie">支付宝支付</p>
      </div>
      <img class="fen" src="../../assets/img/fen.png" alt>
      <div class="witype" @click="paymentMethod('WEIXIN')">
        <img class="img" src="../../assets/img/wechat_green.png" alt>
        <p class="zie">微信支付</p>
      </div>
      <img class="fen" src="../../assets/img/fen.png" alt>
      <div class="witype" @click="paymentMethod('MEMBER_CARD')">
        <img class="hui" src="../../assets/img/card_gray.png" alt>
        <p class="zie">会员卡支付</p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import "vant/lib/toast/style";
Vue.use(Toast);
import utils from "../../assets/js/geturl"; //公共方法；

export default {
  name: "NavTabbar",
  data() {
    return {};
  },
  computed: {
    Payment() {
      return this.$store.getters["ScanCommoditydata/redata"].data;
    }
  },
  methods: {
    //用户选择的支付方式
    paymentMethod(type) {
      let paytype = "";
      if (type == "ZFB") {
        //保存支付方式名称
           this.$store.commit("ScanCommoditydata/paymentName", "支付宝");

        paytype = this.$store.getters["ScanCommoditydata/redata"].mpayment
          .data[1];
        this.$store.commit("ScanCommoditydata/confirmpy", paytype);

        let list = {
          payTypeId: this.$store.getters["ScanCommoditydata/redata"].confirmpy.id,
          posTicketCode:this.$store.getters["ScanCommoditydata/redata"].gondlist.data.list[0].pos_ticket_code
        };
        this.$store
          .dispatch("ScanCommoditydata/settlementSummary", list)
          .then(data => {});

        this.$router.push("/settle");
      } else if (type == "WEIXIN") {
        //保存支付方式名称
           this.$store.commit("ScanCommoditydata/paymentName", "微信");
        paytype = this.$store.getters["ScanCommoditydata/redata"].mpayment
          .data[2];
        this.$store.commit("ScanCommoditydata/confirmpy", paytype);
        let list = {
          payTypeId: this.$store.getters["ScanCommoditydata/redata"].confirmpy
            .id,
            posTicketCode:this.$store.getters["ScanCommoditydata/redata"].gondlist.data.list[0].pos_ticket_code
        };
        this.$store
          .dispatch("ScanCommoditydata/settlementSummary", list)
          .then(data => {

          });
        this.$router.push("/settle");
      } else if (type == "MEMBER_CARD") {
         //保存支付方式名称
           this.$store.commit("ScanCommoditydata/paymentName", "会员卡");

          this.$store.commit("ScanCommoditydata/ScanType", "会员卡扫描");
          paytype = this.$store.getters["ScanCommoditydata/redata"].mpayment
            .data[0];
          this.$store.commit("ScanCommoditydata/confirmpy", paytype); //会员卡支付


        if (this.$store.getters["ScanCommoditydata/redata"].gondlist.data.member_code == "") {
          // alert("请扫描会员卡");
          Toast.fail({
            mask: false,
            message: "请扫描会员卡",
            duration: 2000
          });
          // this.$store.commit("ScanCommoditydata/ScanType", "会员卡扫描");
          // paytype = this.$store.getters["ScanCommoditydata/redata"].mpayment
          //   .data[0];
          // this.$store.commit("ScanCommoditydata/confirmpy", paytype); //会员卡支付
        } else {
          let lists = {
            payTypeId: this.$store.getters["ScanCommoditydata/redata"].confirmpy
              .id
          };
          this.$store
            .dispatch("ScanCommoditydata/goulistdajax", lists)
            .then(data => {});

            

          let list = {
            payTypeCode: this.$store.getters["ScanCommoditydata/redata"].confirmpy.payTypeCode,
            payTypeId: this.$store.getters["ScanCommoditydata/redata"].confirmpy.id,
            posTicketCode: this.$store.getters["ScanCommoditydata/redata"].gondlist.data.list[0].pos_ticket_code,
            state: 10,
            payMoney: this.$store.getters["ScanCommoditydata/redata"].gondlist.data.all_moeny,
            posTicketType: 10,
            restingOrderType: 10,
            sysParamId: "",
            authCode: "",
            memberPwd:"",
            manualDiscountPassword: "", //口令密码
            manualDiscount: 0, //口令优惠金额
            isInputMember: "", //会员登录方式
            isNoMemberToPay: "", //支付结算是否走了绿色通道,
            // sourceType:20//订单来源订单来源（商城APP：10，自助收银：20，后端做单：30）
          };

          if (
            this.$store.getters["ScanCommoditydata/redata"].accountinfo
              .memberPayToken == true
          ) {
            //会员卡支付需要密码

            this.$store.commit("ScanCommoditydata/showHidden", true);
          } else {
            this.$store
              .dispatch("ScanCommoditydata/billinginfo", list)
              .then(data => {

                   this.javaprintPdf();

                if (data.status == 0) {
                  this.$store.commit(
                    "ScanCommoditydata/membershipcess",
                    "会员卡支付成功"
                  );
                 
                  paytype = this.$store.getters["ScanCommoditydata/redata"]
                    .mpayment.data[0];
                  this.$store.commit("ScanCommoditydata/confirmpy", paytype); //会员卡支付
                  this.$router.push("/settle");
                } else {
                  alert(data.message);
                }
              });
          }
        }
      }
    
    
    },

   //小票打印方法
     javaprintPdf(){
                let list={
                    posTicketType:"10",
                    state:"10",
                    posTicketCode:this.$store.getters["ScanCommoditydata/redata"].gondlist.data.list[0].pos_ticket_code,
                }
                Vue.$http.post('/pc/posTicketItem/getPosTicketDetail',list).then(data=>{
                   // this.$store.commit('TradingParticulars/recepts',data.data);
                    let list=data.data.data;

                    let store_name=utils.getCookie('departmentName')//店名；
                    // let state=""
                    // if(this.$store.getters['indext'].listtype.state=='00'){
                    //     state="00";
                    // };
                    // let pos_ticket_type="10";
                    // if (this.$store.getters['indext'].listtype.posTicketType=='20'){
                    //     pos_ticket_type="20"
                    // }
                    // list.state=state;
                    // list.pos_ticket_type=pos_ticket_type;
                    list.store_name=store_name;
                   // list.url=this.$store.state.PointingAddress;//打印ip地址
                     list.url=utils.getCookie('PointingAddress');//打印ip地址
                    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                        //  alert("安卓")
                        if (utils.getCookie('PointingAddress')!=''){
                            list.url=utils.getCookie('PointingAddress');//打印ip地址
                        }
                    }else if (window.innerWidth!=1024){//pos机
                        if (utils.getCookie('PointingAddress')!=''){
                            list.url=utils.getCookie('PointingAddress');//打印ip地址
                        }
                    }else{
                       list.url=utils.getCookie('PointingAddress');//打印ip地址
                    }
                    this.$store.dispatch('ScanCommoditydata/javaperitertput',list).then(data=>{
                        console.log(data.data);
                        if (data.data.status==0){
                            Toast.success({
                                mask: false,
                                message:'小票打印成功',
                                duration:1000
                            });
                            //this.printNumber();//打印小票次数
                        }else {
                            Toast.fail({
                                mask: false,
                                message:'小票打印失败',
                                duration:1000
                            });
                        }
                    })

                })
            },

  }
};
</script>
<style scoped>
/*竖屏*/
@media screen and (min-width: 218px) and (max-width: 1018px) {
  .mian {
    width: 17.310513rem;
    height: 2.811736rem;
    margin: 0 auto;
    margin-top: 1.466993rem;
  }
  .botn {
    width: 100%;
    height: 0.018416rem;
  }
  .tyoe {
    margin-top: 0.368324rem;
  }
  .witype {
    width: 2.266993rem;
    height: 1.466993rem;
    float: left;
  }
  .zie {
    font-family: AmericanTypewriter-Semibold;
    font-size: 0.440098rem;
    color: #ffffff;
    letter-spacing: 0;
    /* text-align: left; */
    height: 0.460405rem;
    line-height: 0.460405rem;
    margin-top: 0.244499rem;
  }
  .fen {
    float: left;
    margin: 0px 2.611215rem;
  }
}

/* 横屏 */
@media screen and (min-width: 1018px) and (max-width: 1200px) {
  .mian {
    width: 11.178637rem;
    height: 2.154696rem;
    margin: 0 auto;
    margin-top: 0.313076rem;
  }
  .botn {
    width: 100%;
    height: 0.018416rem;
  }
  .tyoe {
    margin-top: 0.368324rem;
  }
  .witype {
    width: 1.694291rem;
    height: 1.694291rem;
    float: left;
  }
  .zie {
    font-family: AmericanTypewriter-Semibold;
    font-size: 0.331492rem;
    color: #ffffff;
    letter-spacing: 0;
    /* text-align: left; */
    height: 0.460405rem;
    line-height: 0.460405rem;
  }
  .fen {
    float: left;
    margin: 0px 1.481215rem;
  }
}

/* 电脑端 */
@media screen and (min-width: 1200px) {
  .mian {
    width: 6.322917rem;
    height: 100%;
    margin: 0 auto;
    margin-top: 0.204167rem;
  }
  .botn {
    width: 100%;
    height: 0.018416rem;
  }
  .tyoe {
    margin-top: 0.252083rem;
  }
  .witype {
    width: 0.947917rem;
    height: 0.635417rem;
    float: left;
    margin-top: -0.260417rem;
  }
  .zie {
    font-family: AmericanTypewriter-Semibold;
    font-size: 0.1775rem;
    color: #ffffff;
    letter-spacing: 0;
    /* text-align: left; */
    height: 0.260417rem;
    line-height: 0.260417rem;
    margin-top: -0.104167rem;
  }
  .fen {
    float: left;
    margin: 0rem 0.855rem;
    height: 1rem;
    width: 0.010417rem;
  }
  .img {
    width: 0.635417rem;
    height: 0.635417rem;
  }
  .hui {
    width: 0.625rem;
    height: 0.458333rem;
  }
}
</style>
