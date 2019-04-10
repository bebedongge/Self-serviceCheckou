<template>
  <div class="home" @click="huoqu">
    
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
<div class="inpue">
  <input type="text"  @keyup.enter="tiao($event)" id="huoqu" style="width: 1px;">
</div>

<div id="bdtts_div_id">
      <!-- 语音播放器 -->
    <audio id="tts_autio_id" autoplay="autoplay">
       
    </audio>
</div>


  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
 import {Toast} from 'vant';
 import 'vant/lib/toast/style';
// @ is an alias to /src
import NavigationBar from "../components/Home/NavigationBar.vue";
import MainBody from "@/components/Home/MainBody.vue";
import NavTabbar from "@/components/Home/NavTabbar.vue";
import utils from '../assets/js/geturl';//公共方法；

export default {
  components: {
    NavigationBar,
    MainBody,
    NavTabbar
  },
  data(){
    return {}
  },
   methods:{
       tiao(e){


          if(e.currentTarget.value.length==13){

         

           console.log(e);
           console.log(e.currentTarget.value);
            let list={
                    "barCode":e.currentTarget.value,//条码
                    "posTicketCode":this.$store.getters['redata'].information.posTicketCode,
                    "memberCode":this.$store.getters['redata'].information.memberCode
            }
            this.$store.dispatch('ScanCommoditydata/fgondlist',list).then(data=>{
             //扫描成功之后调初始化挂单列表接口
                if(data.status==0){
                  let list={
                    payTypeId:"",
                  }
                  this.$store.dispatch('ScanCommoditydata/goulistdajax',list).then(data=>{
                     if(data.status==0){
                        this.$store.commit('ScanCommoditydata/posticketcode',data.data.list[0].pos_ticket_code);
                            this.$router.push('/Scanning');
                     }else{
                          alert(data.message);
                     }
                  })
                }else{
                   alert(data.message);
                }

                 document.getElementById("huoqu").value="";
                 document.getElementById("huoqu").focus();
             })   
             }else{
               Toast.fail({
                          mask: false,
                          message: '商品条码错误',
                          duration:1000,
                         }); 
                     //语音播放
                        if(this.$store.state.sound.data=="1"){
                          utils.doTTS("商品条码错误");
                        }
                         
                          document.getElementById("huoqu").value="";
                          document.getElementById("huoqu").focus();
          }        
       },
       huoqu(){
          console.log("获取焦点");
          document.getElementById("huoqu").value="";
          document.getElementById("huoqu").focus();
       },

 

   },
  mounted(){
       console.log("初始化获取焦点")
       document.getElementById("huoqu").value="";
        document.getElementById("huoqu").focus();

   

   }
  
};
</script>
<style scoped>
.inpue{
  width: 100%;

  height: 1.064457rem;
  /* background: red; */
}


.home{
  position: relative;

}
#sahuoqu{
  width: 1px;
}

/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
 
.body{
  position: absolute;
  width: 100%;
  height: 20.099902rem;
  left: 0px;
  top: 2.865281rem;
  background: url("../assets/img/home/back1.png") no-repeat;
  background-size: 100%;

}

.mav{
  position: absolute;
  width: 100%;
  height: 3.765281rem;
  top: 0px;
  left: 0px;
  background:url("../assets/img/portrait/brush_3.png") no-repeat;
  z-index: 99;
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
  background: url("../assets/img/home/back.png") no-repeat;
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
 @media screen and (min-width:1200px){
.home{
 position:fixed;
 width: 11.333333rem;
 height: 8.520833rem;
 /* background: red; */
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
   background: url("../assets/img/home/back.png") no-repeat;
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

