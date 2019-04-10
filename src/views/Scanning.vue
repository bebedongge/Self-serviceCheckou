<template>
  <div class="home" @click="sahuoqu">
    
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

<!-- 会员卡支付输入密码框 -->
<!-- <div class="memberPassword" v-show="showhide"> -->
  <div class="memberPassword" v-show="false">
  <member-password></member-password>
</div>
    <input type="text"  id="sahuoqu" @input="scanning($event)" >
     <!-- <input type="text"  id="sahuoqu"   @keyup.enter="scanning($event)"> -->
<div id="bdtts_div_id">
      <!-- 语音播放器 -->
    <audio id="tts_autio_id" autoplay="autoplay">
       
    </audio>
</div>
  </div>
</template>

<script>
import Vue from 'vue';
 import {Toast} from 'vant';
 import 'vant/lib/toast/style';
// @ is an alias to /src
import NavigationBar from "../components/Scanning/NavigationBar.vue";
import MainBody from "@/components/Scanning/MainBody.vue";
import NavTabbar from "@/components/Scanning/NavTabbar.vue";
import MemberPassword from "@/components/Scanning/MemberPassword.vue"
import utils from '../assets/js/geturl';//公共方法；

export default {
  components: {
    NavigationBar,
    MainBody,
    NavTabbar,
    MemberPassword
  },
 computed:{
    showhide(){
      return this.$store.getters['ScanCommoditydata/redata'].showHidden;
    }
 },

  methods:{
    //扫描商品条码或者会员卡号
    scanning(e){
         //扫描的会员卡号
        if (e.currentTarget.value.substring(0, 2)=="HY"&&e.currentTarget.value.length==16){
             //无会员信息
          //   if(this.$store.getters['ScanCommoditydata/redata'].accountinfo==""){
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
                        document.getElementById("sahuoqu").value="";


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
                          document.getElementById("sahuoqu").value="";
                    }
               })
              //有会员信息
            //  }else{
            //      document.getElementById("sahuoqu").value="";
            //  }  
        }
        //扫描的商品条码
        else if(e.currentTarget.value.length==13&&e.currentTarget.value.substring(0, 2)!="HY"){
                 console.log("商品条码："+e.currentTarget.value);

           let posTicketCode=utils.getCookie('posTicketCode');
            if(this.$store.getters['ScanCommoditydata/redata'].posticketcode!=""){
              posTicketCode=this.$store.getters['ScanCommoditydata/redata'].posticketcode;
            }

            let list={
                    "barCode":e.currentTarget.value,//条码
                    "posTicketCode":posTicketCode,
                    "memberCode":utils.getCookie('memberCode')
            }
                this.$store.dispatch('ScanCommoditydata/fgondlist',list).then(data=>{

                     console.log("扫描商品条码接收的数据："+JSON.stringify(data));

                      
                      if(data.status==500){
                         document.getElementById("sahuoqu").value="";

                         Toast.fail({
                          mask: false,
                          message:"加入失败",
                          duration:2000,
                         });

                      }else{
                        let goodsName=data.data.shortName+"一"+data.data.goodsUnitName;//商品名称


                       //商品条码输入框
                       document.getElementById("sahuoqu").value="";
                       //语音播放
                        if(this.$store.state.sound.data=="1"){
                       utils.doTTS(goodsName);
                       }
                  

             //扫描成功之后调初始化挂单列表接口
                if(data.status==0){

                  let lists={
                    payTypeId:"",
                  }
                  this.$store.dispatch('ScanCommoditydata/goulistdajax',lists).then(data=>{
                   
                     if(data.status==0){
                       document.getElementById("sahuoqu").value=""; //商品条码输入框
                       this.$store.commit('ScanCommoditydata/posticketcode',data.data.list[0].pos_ticket_code);
                     }else{
                          alert("a:"+data.message);
                     }
                  })
                }else{
                   document.getElementById("sahuoqu").value="";
                   alert("b:"+data.message);
                }

                      }
 
            })
        }else if(e.currentTarget.value.length>16){
           document.getElementById("sahuoqu").value="";



        }
    },




     tiao1(e){
        

/**********************************用户未选择会员卡支付扫描************************************************************************** */         
        if(this.$store.getters['ScanCommoditydata/redata'].ScanType=="商品"){
         //SPJJGC_PT00000003
        //console.log(e);
           console.log("商品条码："+e.currentTarget.value);

           let posTicketCode=utils.getCookie('posTicketCode');
            if(this.$store.getters['ScanCommoditydata/redata'].posticketcode!=""){
              posTicketCode=this.$store.getters['ScanCommoditydata/redata'].posticketcode;
            }

            let list={
                    "barCode":e.currentTarget.value,//条码
                    "posTicketCode":posTicketCode,
                    "memberCode":utils.getCookie('memberCode')
            }
                this.$store.dispatch('ScanCommoditydata/fgondlist',list).then(data=>{

                     console.log("页面接收的数据："+data);

                      
                      if(data.status==500){
                         document.getElementById("sahuoqu").value="";

                         Toast.fail({
                          mask: false,
                          message:"加入失败",
                          duration:2000,
                         });

                      }else{

                       //商品条码输入框
                       document.getElementById("sahuoqu").value="";
                  

             //扫描成功之后调初始化挂单列表接口
                if(data.status==0){

                  let lists={
                    payTypeId:"",
                  }
                  this.$store.dispatch('ScanCommoditydata/goulistdajax',lists).then(data=>{
                   
                     if(data.status==0){
                       document.getElementById("sahuoqu").value=""; //商品条码输入框
                       this.$store.commit('ScanCommoditydata/posticketcode',data.data.list[0].pos_ticket_code);
                     }else{
                          alert("a:"+data.message);
                     }
                  })
                }else{
                   document.getElementById("sahuoqu").value="";
                   alert("b:"+data.message);
                }

                      }
 
            })

/***************************用户选择会员卡支付扫描*********************************************************** */            
          }else{
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
                        document.getElementById("sahuoqu").value="";


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
                          document.getElementById("sahuoqu").value="";
                    }
               })
              //有会员信息
             }else{

             }

          }
          
       },
      sahuoqu(){
         console.log("页面2获取焦点")
           document.getElementById("sahuoqu").focus();
       }
  },
   mounted(){
       console.log("页面2初始化获取焦点")
       document.getElementById("sahuoqu").value="";
        document.getElementById("sahuoqu").focus();
         
         //初始化挂单列表
         let list={
                    payTypeId:"",
                  }
        this.$store.dispatch('ScanCommoditydata/goulistdajax',list).then(data=>{

                       // console.log('初始化数据：'+JSON.stringify(data));
                       let goodsName=data.data.list[0].short_name+"一"+data.data.list[0].goods_unit_name;//商品名称
                       //商品条码输入框
                       document.getElementById("sahuoqu").value="";
                       //语音播放
                       if(this.$store.state.sound.data=="1"){
                          utils.doTTS(goodsName);
                       }
                       
        });
        //初始化支付方式
        this.$store.dispatch('ScanCommoditydata/Payment').then(data=>{
        
        })



        window.addEventListener('beforeunload', e => {
          localStorage.setItem('abcde', 'asdas');
        });





   }
};
</script>
<style scoped>
.home{
  position: relative
}
#sahuoqu{
  width: 1px;
  position: absolute;
  top: -2000px;
}
.memberPassword{
        position: absolute;
        width: 100%;
        height:100%;
        top: 0px;
        left: 0px;
        z-index: 999;  
}

/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
.mav{
  position: absolute;
  width: 100%;
  height: 3.765281rem;
  top: 0px;
  left: 0px;
  background:url("../assets/img/portrait/brush_3.png") no-repeat;
   background-size: 100%;
  z-index: 99;
  background-size: 100%;
  
}
.body{
   position: absolute;
  width: 100%;
  height: 20.899902rem;
  left: 0px;
  top: 2.865281rem;
  background:url("../assets/img/portrait/background_2.png") no-repeat;
   background-size: 100%;
  background-size: 100%;

}

.tabbar{



 position: absolute;
  width: 100%;
 height:4.694377rem;
  left: 0px;
top: 21.966962rem;
  background: url("../assets/img/portrait/brush_4.png") no-repeat;
  background-size: 100%;


}


}

/* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
.mav{
  position: absolute;
  width: 100%;
  height: 2.320442rem;
  top: 0px;
  left: 0px;
  background:url("../assets/img/brush_1.png") no-repeat;
   background-size: 100%;
  z-index: 99;
  
}
.body{
  position: absolute;
  width: 100%;
  height: 12.246777rem;
  left: 0px;
  top: 1.197053rem;
  background: url("../assets/img/background_2.png") no-repeat;
   background-size: 100%;

}
.tabbar{
  position: absolute;
  width: 100%;
 height: 2.559853rem;
  left: 0px;
 top: 12.430939rem;
  background: url("../assets/img/brush_2.png") no-repeat;
   background-size: 100%;
}
 }
 /* 电脑端 */
@media screen and (min-width:1200px) {
  .home{
 position:fixed;
 width: 11.333333rem;
 height: 8.520833rem;
 
 top: 50%;
 left: 50%;
 margin-top:-4.260416rem;
 margin-left: -5.666666rem;
}
.mav{
  position: absolute;
  width: 100%;
  height: 1.3125rem;
  top: 0px;
  left: 0px;
  background:url("../assets/img/brush_1.png") no-repeat;
   background-size: 100%;
  z-index: 99;
  
}
.body{
  position: absolute;
  width: 100%;
  height: 6.604167rem;
  left: 0px;
  top: .875rem;
  background: url("../assets/img/background_2.png") no-repeat;
   background-size: 100%;

}
.tabbar{
  position: absolute;
  width: 100%;
 height: 1.65625rem;
  left: 0px;
 bottom: -.041667rem;
  background: url("../assets/img/brush_2.png") no-repeat;
   background-size: 100%;
}




}

</style>

