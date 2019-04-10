<template>
    <div class="mian" style="">
     <img class="log" style="" src="../../assets/img/logo.png" alt="log">
     <div class="title">自助收银</div>
      <button class="baack" @click="back">返回</button>
    </div>
</template>
<script>
export default {
       methods:{
        
       //返回到商品添加页面
        back(){
          this.$router.push('/Scanning');
     }    
   },
}
</script>
<style scoped>
/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
.mian{
    width: 19.266504rem;
    height: 2.200489rem;
    margin: 0 auto;
    margin-top: .586797rem; 
}
.log{
    width:5.085575rem;
    height: 1.95599rem;
    float: left;
}
.title{
   width: 3.667482rem;
   height: .977995rem;
   font-size: .684597rem;
   font-family:PingFangSC-Regular;
color:#ffffff;
letter-spacing:0;
line-height:.977995rem;
text-align:left;
float: left;
margin:0.600244rem .488998rem;
opacity:0.8;

}
.baack{
    width: 3.080685rem /* 126/40.9 */;
    height: 1.515892rem /* 62/40.9 */;
    font-size: .440098rem /* 18/40.9 */;
    border-radius: .0978rem /* 4/40.9 */;
    background: #F5ECD9;
    color: #333333; 
    float: right;
    margin-right: .2625rem /* 150/96 */;
    border: none
}



 }

/* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
.mian{
    width: 11.178637rem;
    height: 1.104972rem;
    margin: 0 auto;
    margin-top: .313076rem; 
}
.log{
    width:2.872928rem;
    height: 1.104972rem;
    float: left;
}

.title{
   width: 2.062615rem;
   height: .736648rem;
   font-size: .515654rem;
   font-family:PingFangSC-Regular;
color:#ffffff;
letter-spacing:0;
line-height:.736648rem;
text-align:left;
float: left;
margin: .294659rem .276243rem;
opacity:0.8;
}
.baack{
    width: 2.320442rem /* 126/54.3 */;
    height: 1.141805rem /* 62/54.3 */ /* 62/40.9 */;
    font-size: .331492rem /* 18/54.3 */;
    border-radius: .073665rem /* 4/54.3 */;
    background: #F5ECD9;
    color: #333333; 
    float: right;
    margin-right: -4.02081rem /* 50/54.3 */;
    border: none
}



}
/* 电脑端 */
@media screen and (min-width:1200px)  {
.mian{
    width: 6.322917rem;
    height: 1.3125rem;
    margin: 0 auto;
    margin-top: .1875rem; 
}
.log{
    width:1.625rem;
    height: .625rem;
    float: left;
}

.title{
   width: 2.166667rem;
   height: .416667rem;
   font-size: .291667rem;
   font-family:PingFangSC-Regular;
color:#ffffff;
letter-spacing:0;
line-height:.736648rem;
text-align:left;
float: left;
margin: .020833rem .25rem;
opacity:0.8;
}

.baack{
    width: 1.3125rem /* 126/96 */;
    height: .545833rem /* 62/96 */;
    font-size: .1875rem /* 18/96 */;
    border-radius: .041667rem /* 4/96 */;
    background: #F5ECD9;
    color: #333333; 
    float: right;
    margin-right: -2.2625rem /* 150/96 */;
    border: none
}
}

</style>
