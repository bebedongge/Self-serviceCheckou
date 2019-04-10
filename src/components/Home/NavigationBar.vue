<template>
    <div class="mian" style="">
     <img class="log" style="" src="../../assets/img/logo.png" alt="log">

     <div class="title">自助收银</div>

      <!-- <button @click.stop="tiao($event)">跳转</button> -->
    </div>
</template>
<script>
export default {
       methods:{
       tiao(e){
           console.log(e);
           this.$router.push('/Scanning');
       },
       
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



}

/* 电脑端 */
@media screen and (min-width:1200px){
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
}

</style>
