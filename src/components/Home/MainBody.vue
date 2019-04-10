<template>
    <div>
      <div class="mian">请扫描商品条码</div>

      <div class="goodimg"></div>

      
        
</div>
</template>
<script>
import $ from 'jquery';

export default {
    name:"MainBody",
   


   
}
</script>
<style scoped>
.wi{
    width: 100%;
    height: 3.683241rem
}
#huoqu{
    -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
}

/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
.mian{
    background-image:url(../../assets/img/home/title.png);
    background-size: 100%;

width:9.486553rem /* 388/40.9 */;
height:2.202689rem /* 86/40.9 */;
line-height: 2.102689rem /* 86/40.9 */;
position:absolute;
top: 6.562431rem /* 150/54.3 */;
left: 5.476773rem /* 224/40.9 */;
font-size:.684597rem /* 28/40.9 */;
color:#000000;
font-weight: bolder;
font-family:STSongti-SC-Black;
}
.goodimg{
    background-image: url(../../assets/img/home/scanning_h.png);
    background-size: 100%;
    width: 4.914425rem /* 201/40.9 */;
    height: 4.132029rem /* 169/40.9 */;
    position: absolute;
    top: 11.112469rem /* 250/40.9 */;
    left: 7.612469rem /* 250/40.9 */;
}
 }
 /* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
.mian{
    background-image:url(../../assets/img/home/title.png);
    background-size: 100%;

width:7.145488rem /* 388/54.3 */;
height:1.683794rem /* 86/54.3 */;
line-height: 1.583794rem /* 86/54.3 */;
position:absolute;
top: 2.062431rem /* 150/54.3 */;
left: 6.590424rem /* 347/54.3 */;
font-size:.515654rem /* 28/54.3 */;
color:#000000;
font-weight: bolder;
font-family:STSongti-SC-Black;
}
.goodimg{
    background-image: url(../../assets/img/home/scanning_h.png);
    background-size: 100%;
    width: 3.701657rem /* 201/54.3 */;
    height: 3.112339rem /* 169/54.3 */;
    position: absolute;
    top: 5.841621rem /* 100/54.3 */;
    left: 8.345672rem /* 350/54.3 */;
}
}
/* 电脑端 */
@media screen and (min-width:1200px){
.mian{
    background-image:url(../../assets/img/home/title.png);
    background-size: 100%;

width:4.041667rem /* 388/96 */;
height:.955833rem /* 86/96 */;
line-height: .955833rem /* 86/96 */;
position:absolute;
top: 0.8625rem /* 150/96 */;
left: 3.614583rem /* 347/96 */;
font-size:.291667rem /* 28/96 */;
color:#000000;
font-weight: bolder;
font-family:STSongti-SC-Black;
}
.goodimg{
    background-image: url(../../assets/img/home/scanning_h.png);
    background-size: 100%;
    width: 2.09375rem /* 201/96 */;
    height: 1.760417rem /* 169/96 */;
    position: absolute;
    top: 3.241667rem /* 100/96 */;
    left: 4.645833rem /* 350/96 */ /* 350/54.3 */;
}
}

</style>
