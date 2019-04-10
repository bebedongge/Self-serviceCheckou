<template>
    <div class="mian">
        <div class="botn"></div>
    <div class="tyoe">
    <div class="witype">
        <img class="img" src="../../assets/img/pay_treasure_blue.png" alt="">
        <p class="zie">支付宝支付</p>
    </div>
        <img class="fen" src="../../assets/img/fen.png" alt="">
<div class="witype">
        <img class="img" src="../../assets/img/wechat_green.png" alt="">
        <p class="zie">微信支付</p>
    </div>
     <img class="fen" src="../../assets/img/fen.png" alt="">
<div class="witype">
        <img class="hui" src="../../assets/img/card_yellow.png" alt="">
        <p class="zie">会员卡支付</p>
    </div>

      </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
     .mian{
    width: 17.310513rem;
   height: 2.811736rem;
    margin: 0 auto;
    margin-top: 1.466993rem; 
}
.botn{
    width: 100%;
    height: .018416rem;
}
.tyoe{
    margin-top: .368324rem
}
.witype{
    width: 2.266993rem;
    height: 1.466993rem;
    float: left;
}
.zie{
    font-family:AmericanTypewriter-Semibold;
font-size: .440098rem;
color:#ffffff;
letter-spacing:0;
/* text-align:left; */
height: .460405rem;
line-height: .460405rem;
margin-top: .244499rem;
}
.fen{
  float: left;
  margin: 0px 2.611215rem;
 

}
 }


/* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
.mian{
    width: 11.178637rem;
   height: 2.154696rem;
    margin: 0 auto;
    margin-top: .313076rem; 
}
.botn{
    width: 100%;
    height: .018416rem;
}
.tyoe{
    margin-top: .368324rem
}
.witype{
    width: 1.694291rem;
    height: 1.694291rem;
    float: left;
}
.zie{
    font-family:AmericanTypewriter-Semibold;
font-size: .331492rem;
color:#ffffff;
letter-spacing:0;
/* text-align:left; */
height: .460405rem;
line-height: .460405rem
}
.fen{
  float: left;
  margin:0px 1.481215rem;
 

}

}
/* 电脑端 */
@media screen and (min-width:1200px){
.mian{
    width: 6.322917rem;
   height: 100%;
    margin: 0 auto;
    margin-top: .204167rem;
}
.botn{
    width: 100%;
    height: .018416rem;
}
.tyoe{
    margin-top: .252083rem;
}
.witype{
    width: .947917rem;
    height: .635417rem;
    float: left;
    margin-top: -.260417rem
}
.zie{
    font-family:AmericanTypewriter-Semibold;
font-size: .1875rem;
color:#ffffff;
letter-spacing:0;
/* text-align:left; */
height: .260417rem;
line-height: .260417rem;
margin-top: -.104167rem
}
.fen{
  float: left;
  margin: 0rem .855rem;
  height: 1rem;
  width: .010417rem;
}
.img{
    width: .635417rem;
    height: .635417rem;
   
}
.hui{
    width: .625rem;
    height: .458333rem;
     
}

}
</style>
