<template>
    <div>
        <div  class="mian" v-if="GetInformation.data!=null">
         <img class="inmg" src="../../assets/img/bei.png" alt="">

         <div class="goodlist">
             <!-- 主体 -->
             <div class="goodte">
                 <div class="martop" ></div>
                 <!-- 无会员头像 -->
                <div class="toux" v-if="GetInformation.data.level_nickname==''">
                    <img  src="../../assets/img/members/head_portrait_one.png" alt=""/>
               
                </div>
                 <!--有会员头像-->
                <div class="toux1" v-else>

                    <span v-if="GetInformation.data.member_pictures!=null&&GetInformation.data.member_pictures!=''">
                        <img  :src="GetInformation.data.member_pictures" alt="" />        
                </span>  
                <span v-else>
                         <img  src="../../assets/img/members/head_portrait_one.png" alt=""/>
                         
                </span>
                   
                </div>
                 <div class="xinx" v-if="GetInformation.data.level_nickname!=''">
                   <span class="se">{{GetInformation.data.member_name}}</span> <span class="fi">{{GetInformation.data.level_nickname}}</span>
                </div>
                <!-- 会员 -->
                 <div class="shej" v-if="GetInformation.data.level_nickname!=''">
                 <div class="ka">{{GetInformation.data.level_nickname}}</div>
                 <div class="shend">
                     <!-- <img style="width:90%" class="shenim" src="../../assets/img/progressbar_2.png" alt=""> -->
                     <p :style="{width:upgrade}"></p>
                 </div>
                   <div class="js">{{GetInformation.data.level_next_nickname}}</div>
                 
                 </div>
                 


                 <!-- 会员升级说明 -->
                 <div class="shum" v-if="GetInformation.data.up_type==2">
                     {{GetInformation.data.level_change_duration}}天/{{GetInformation.data.level_stay_consume}}元，可升级到{{GetInformation.data.level_next_nickname}}；当前{{GetInformation.data.discount}}折，离升级还差{{GetInformation.data.up_type_value}}元
                 </div>
                  <div class="shum" v-else-if="GetInformation.data.up_type==1">
                     {{GetInformation.data.level_change_duration}}个月/{{GetInformation.data.level_stay_consume}}次，可升级到{{GetInformation.data.level_next_nickname}}；当前{{GetInformation.data.discount}}折，离升级还差{{GetInformation.data.up_type_value}}次
                 </div>
                 <div v-else></div>

                 <!-- 商品信息 -->
                 <div class="gongda" v-if="GetInformation.data.level_nickname!=''">
                     <product-list></product-list>
                 </div>

                  <div class="gongda1" v-else>
                     <product-list></product-list>
                 </div>
             </div>
         </div>

        </div>
      
</div>
</template>
<script>
import ProductList from "@/components/Scanning/ProductList.vue";
export default {
    components:{
        ProductList
    },
    name:"MainBody",
    data(){
        return {}
    },
   computed:{
       //获取会员信息
       GetInformation(){
            return this.$store.getters['ScanCommoditydata/redata'].gondlist;
        },
        //当前等级到下一个等级
        upgrade(){
            let da=Number(this.$store.getters['ScanCommoditydata/redata'].gondlist.data.level_stay_consume);
            let zo=Number(this.$store.getters['ScanCommoditydata/redata'].gondlist.data.up_type_value);
            let ba=da/(da+zo);


           return ba*100+"%";
        }

   },
   methods:{
      
   },
   mounted(){

   }

}
</script>
<style scoped>
.martop{
    width: 100%;
    height: 1px;
}

/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
.mian{
   width: 100%;
   height: 19.704156rem;
     margin: 0 auto;
     /* background: url("../../assets/img/bei.png") 100% 10% no-repeat; */
     margin-top: .642486rem;
     position: relative;
}
.inmg{
    position: absolute;
    top: 0px;
    left: 0px;
   width: 19.801956rem;
   height: 19.404156rem;
}
.goodlist{
     position: absolute;
    top: 0px;
    left: 0px;
   width: 100%;
   height: 18.704156rem;
  /* border: 1px solid red; */
}
.goodte{
    width: 559px;
    height: 18.704156rem;
   /* border: .018416rem solid red; */
   margin: 0 auto;
   position: relative;
}
.toux{
    width: 2.518582rem;
    height: 2.569682rem;
  
  border-radius: 100%;
   position: absolute;
   left: 5.546593rem;
   top: -.917643rem;
   z-index: 99;

}




.toux img{
   width: 100%;
   height: 100%;
   border-radius: 100%;
}


.toux1{
    width: 3.618582rem;
    height: 3.569682rem;
   position: absolute;
   left: 5.046593rem;
   top: -.917643rem;
   z-index: 99;

}
.toux1 img{
    position: absolute;
    left: .636832rem;
    top: -.134162rem;
    width: 2.473297rem;
    height: 2.473297rem;
    border-radius: 1.736648rem;

}




.xinx{
    width: 100%;
    height: 1.149144rem;
    text-align: center;
    margin-top: 1.241667rem /* 100/96 */;
   
}
.fi{
    font-family:STSongti-SC-Bold;

color:#ffffff;
letter-spacing:0;
line-height: 1.149144rem;

font-weight: 600;
font-size: .391198rem /* 16/40.9 */;
padding: .07335rem /* 3/40.9 */ .146699rem /* 6/40.9 */;
background: #71593d;
border-radius: .0978rem /* 4/40.9 */;


}
.se{
    font-family:STSongti-SC-Bold;
font-size:.342298rem;
color:#000000;
letter-spacing:0;
text-align:left;
margin-right: .142249rem /* 5/40.9 */;
font-size: .488998rem /* 20/40.9 */
;
}
.shej{
    width:8.932518rem;
    height: 1.124694rem;
    /* border: .018416rem solid red; */
    position: absolute;
    left: 2.741621rem;
    top: .061621rem;
    position: relative;

}

.ka{
    width: 1.833741rem;
    height: 1.053545rem;
   
    font-family:STSongti-SC-Black;
font-size: .391198rem;
color:#f51900;
letter-spacing:0;
text-align:center;
line-height: 1.053545rem;
font-weight: 600;
position: absolute;
left: -.444499rem /* 10/40.9 */;
z-index: 10
}


.shend{
    width: 6.762431rem;
    height: .276243rem;
    background: #b29d82;
    background-size: 100%;
    position: absolute;
    left: 0.996556rem;
    top: .429243rem;
    border-radius: .0978rem /* 4/40.9 */
}
.shend p{
   
    height: .276243rem;
    background: #AB6601;
   border-radius: .0978rem /* 4/40.9 */
}
.shenim{
     position: absolute;
    left: -.092081rem;
    top: -.150497rem;
}
.js{
   width: 1.833741rem;
  height: 1.053545rem;
   
    font-family:STSongti-SC-Black;
font-size:.294659rem;
font-family:STSongti-SC-Black;
font-size: .391198rem;
color:#876a49;
letter-spacing:0;
line-height: 1.053545rem;;
font-weight: 600;
position: absolute;
right: -.244499rem /* 10/40.9 */;
z-index: 10
}

.shum{
    width: 10.244499rem;
    height: .368324rem;
    /* border: 1px solid red; */
    position: absolute;
    left: 1.841621rem;
    top: 0.244015rem;
    position: relative;
    font-family:STSongti-SC-Black;
font-size: .342298rem;
color:#f51900;
letter-spacing:0;
line-height:.368324rem;
text-align:center;
}
.gongda{
    width: 16.618582rem;
    height: 10.806846rem;
    /* border: 1px solid red; */
    position: absolute;
    top: 4.541621rem;
    left: -1rem;
}
.gongda1{
    width: 13.618582rem;
    height: 12.106846rem;
    /* border: 1px solid red; */
    position: absolute;
    top: 3.141621rem;
    left:0rem;
}


 }


/* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
.mian{
    width: 11.478637rem;
     height: 10.806777rem;
     margin: 0 auto;
     /* background: url("../../assets/img/bei.png") 100% 10% no-repeat; */
     margin-top: .752486rem;
     position: relative;
}
.inmg{
    position: absolute;
    top: 0px;
    left: 0px;
   width: 10.939227rem;
   height: 11.265562rem;
   src: ""
}
.goodlist{
     position: absolute;
    top: 0px;
    left: 0px;
   width: 10.939227rem;
   height: 11.065562rem;
  /* border: 1px solid red; */
}
.goodte{
    width: 7.808471rem;
    height: 10.644567rem;
   /* border: .018416rem solid red; */
   margin: 0 auto;
   position: relative;
}
.toux{
    width: 1.644199rem;
    height: 1.644199rem;
  
   background-size:100% 100%;
   position: absolute;
   left: 2.946593rem;
   top: -.517643rem;
   z-index: 99;

}
.toux img{
     width: 100%;
   height: 100%;
   border-radius: 100%;
}

.toux1{
    width: 1.044199rem;
    height: 1.044199rem;
   position: absolute;
   left: 2.946593rem;
   top: -.517643rem;
   z-index: 99;

}
.toux1 img{
    position: absolute;
    left: .246832rem;
    top: -.114162rem;
   width: 1.473297rem;
   height: 1.473297rem;
   border-radius: .736648rem;
}



.xinx{
    width: 100%;
    height: .626151rem;
    position: absolute;
    top:.936648rem /* 40/54.3 */;
    left: 0px;
    font-size: .352486rem;
    line-height: .626151rem;
    font-weight: 600
}
.fi{
    font-family:STSongti-SC-Bold;
font-size:.257827rem /* 14/54.3 */;
color:#ffffff;
letter-spacing:0;
line-height:14px;
text-align:left;
font-weight: 600;
padding: .036832rem /* 2/54.3 */ .184162rem /* 10/54.3 */;
background: #71593d;
border-radius: .092081rem /* 5/54.3 */;

}
.se{
    font-family:STSongti-SC-Bold;
font-size:.331492rem /* 18/54.3 */;
color:#000000;
letter-spacing:0;
line-height:14px;
text-align:left;
padding: .036832rem /* 2/54.3 */ .092081rem /* 5/54.3 */;



;
}
.shej{
    width: 6.464641rem;
    height: .736648rem;
    /* border: .018416rem solid red; */
    position: absolute;
    left: 0.741621rem;
    top: 1.641621rem;
    position: relative;

}
.ka{
    width: 1.149724rem;
    height: .652486rem;
   
    font-family:STSongti-SC-Black;
font-size:.294659rem;
color:#876f52;
letter-spacing:0;
text-align:center;
line-height: .552486rem;
font-weight: 600;
position: absolute;
left: 0px;
z-index: 10
}


.shend{
    width: 4.462431rem;
    height: .176243rem;
    background: #998870;
    background-size: 100%;
    position: absolute;
    left: 0.996556rem;
    top: .176243rem;
    border-radius: .073665rem /* 4/54.3 */;
}
.shend p{
   
   height: .176243rem;
    background: #AB6601;
    border-radius: .073665rem/* 5/96 */
}
.shenim{
     position: absolute;
    left: -.092081rem;
    top: -.110497rem;
}
.js{
    width: 1.149724rem;
    height: .652486rem;
   
    font-family:STSongti-SC-Black;
font-size:.294659rem;
font-family:STSongti-SC-Black;
font-size:16px;
color:#876a49;
letter-spacing:0;
line-height: .552486rem;
font-weight: 600;
position: absolute;
right: 0px;
z-index: 10
}
.shum{
    width: 10.037937rem;
    height: .368324rem;
    /* border: 1px solid red; */
    position: absolute;
    left:-1.041621rem;
    top: 1.744015rem;
    position: relative;
    font-family:STSongti-SC-Black;
font-size:14px;
color:#71593d;
letter-spacing:0;
line-height:.368324rem;
text-align:center;
}
.gongda{
    width: 9.508471rem;
    height: 7.26151rem;
    /* border: 1px solid red; */
    position: absolute;
    top: 3.141621rem;
    left: -0.77rem;
}
.gongda1{
    width: 7.808471rem;
    height: 7.26151rem;
    /* border: 1px solid red; */
    position: absolute;
    top: 2.141621rem;
    left: 0rem;
}












}
/* 电脑端 */
@media screen and (min-width:1200px){


    .mian{
     width:6.49251rem;
     height: 6.112469rem;
     margin: 0 auto;
     /* background: url("../../assets/img/bei.png") 100% 10% no-repeat; */
     margin-top: .125625rem;
     position: relative;
}
.inmg{
    position: absolute;
    top: 0px;
    left: 0px;
   width: 6.1875rem;
   height: 6.372073rem;
   src: ""
}
.goodlist{
     position: absolute;
    top: 0px;
    left: 0px;
   width: 6.1875rem;
   height: 6.258948rem;
  /* border: 1px solid red; */
}
.goodte{
    width: 4.40625rem;
    height: 6.020833rem;
   /* border: .018416rem solid red; */
   margin: 0 auto;
   position: relative;
}
.toux{
    width: 0.85625rem;
    height: 0.85625rem;
  
   background-size:100% 100%;
   position: absolute;
   left: 1.666667rem;
   top: -.322792rem;
   z-index: 99;

}
.toux img{
    width: 100%;
   height: 100%;
   border-radius: 100%;
}

.toux1{
    width: 1.15625rem;
    height: 1.15625rem;
   position: absolute;
   left: 1.666667rem;
   top: -.292792rem;
   z-index: 99;

}
.toux1 img{
    position: absolute;
    left: .159615rem;
    top: .100573rem;
   width: .8625rem;
   height:.8625rem;
   border-radius: 100%;
  
}



.xinx{
    width: 100%;
    height: .354167rem;
    font-size: .199375rem;
    line-height: .354167rem;
    font-weight: 600;
    margin-top: 0.641667rem /* 100/96 */
   
}
.fi{
    font-family:STSongti-SC-Bold;
font-size: .145833rem /* 14/96 */;
color:#ffffff;
letter-spacing:0;
line-height:.145833rem;
text-align:left;
font-weight: 600;
padding: .020833rem /* 2/96 */ .152083rem /* 5/96 */;
background: #71593D;
border-radius: .052083rem /* 5/96 */
}
.se{
    font-family:STSongti-SC-Bold;
font-size: .1875rem /* 18/96 */;
color:#71593D;
letter-spacing:0;
line-height:.195833rem;
text-align:left;
margin-right: .104167rem /* 10/96 */


;
}
.shej{
    width: 3.525229rem;
    height: .416667rem;
    /* border: .018416rem solid red; */
    position: absolute;
    left: .379167rem;
    /* top: .927083rem; */
    position: relative;

}
.ka{
    width: .65625rem;
     height: .368978rem;
  
    background-size: 100%;
    font-family:STSongti-SC-Black;
font-size:.166667rem;
color:#876a49;;
letter-spacing:0;
text-align:center;
line-height: .368978rem;
font-weight: 600;
position: absolute;
left: -.052083rem /* 5/96 */;
z-index: 10
}


.shend{
    width: 2.4625rem;
    height: .08625rem;
    /* background: url("../../assets/img/progressbar_1.png") no-repeat; */
    background: #998870;
    background-size: 100%;
    position: absolute;
    left: .5625rem;
    top: .15625rem;
    border-radius: .052083rem /* 5/96 */
}
.shend img{
    width: .875rem;
    height: .186667rem;
}
.shend p{
    width: .875rem;
   height: .08625rem;
    background: #AB6601;
    border-radius: .052083rem /* 5/96 */
}

.shenim{
     position: absolute;
    left: -.052083rem;
    top:-.062499rem;
}
.js{
    width: .650228rem;
    height: .368978rem;
   
    background-size: 100%;
    font-family:STSongti-SC-Black;
font-size:.166667rem;
font-family:STSongti-SC-Black;
color:#876a49;
letter-spacing:0;
line-height: .368978rem;
font-weight: 600;
position: absolute;
right: -.052083rem /* 5/96 */;
z-index: 10
}
.shum{
    width: 4.685417rem;
    height: .208333rem;
    /* border: 1px solid red; */
    position: absolute;
   
    
    position: relative;
    font-family:STSongti-SC-Black;
font-size:.145833rem;
color:#876a49;
letter-spacing:0;
line-height:.208333rem;
text-align:center;
font-weight: bolder
}
.gongda{
    width:5.216667rem;
    height: 4.104167rem;
    /* border: 1px solid red; */
    position: absolute;
    top: 1.770833rem;
    left: -0.35rem;
}
.gongda1{
    width: 4.4165rem;
    height: 4.10726rem;
    /* border: 1px solid red; */
    position: absolute;
    top: 1.211354rem;
    left: 0rem;
}


} 



</style>
