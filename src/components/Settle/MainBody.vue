<template>
    
     <div class="sermian">

         <div class="serhe">
             <span class="hei">合计：</span>
              <span class="jine male" v-if="price.init_money!=undefined">{{price.init_money}}</span>
              <span class="jine male" v-else>{{price1.all_moeny}}</span>

              <span class="jine">元</span>
         </div>
         <div class="tisi">请展示{{paymentName}}付款码，用扫码枪扫码支付 </div>
         <div class="titu"></div>
        

     </div>
        

</template>
<script>
import $ from 'jquery';

export default {
    name:"MainBody",
    data(){
        return{

        }
    },
    computed:{
        //支付宝微信
        price(){
            
            return this.$store.getters['ScanCommoditydata/redata'].settlementSummary;
        },
        //会员
        price1(){
            
            return this.$store.getters['ScanCommoditydata/redata'].gondlist.data;
        },
         //保存支付方式名称
         paymentName(){
              return this.$store.getters['ScanCommoditydata/redata'].paymentName
         }
         
        
    }
   


   
}
</script>
<style scoped>
/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {
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
.sermian{
    width: 12.836186rem;
    height: 8.913444rem;
    /* border: 1px solid red; */
    margin: 2.273839rem auto 0px;
}
.serhe{
    width: 12.836186rem;
    height: 4.303178rem;
     background:url("../../assets/img/portrait/price_tag.png") no-repeat;
     background-size: 100%;
     margin: 2.322738rem auto 1.262983rem;
     text-align: center;
     font-size: .488998rem;
     color: #be0000;
     line-height: 4.303178rem;
}
.jine{
    font-size: 1.369193rem;
}
.male{
    margin-left: .184162rem
}
.tisi{
    width: 12.836186rem;
    height: .977995rem;
    line-height: .977995rem;
    font-family:STSongti-SC-Black;
font-size:.684597rem;
color:#000000;
margin: 0 auto

}
.titu{
    width: 4.572127rem;
    height: 6.801467rem;
    background:url("../../assets/img/portrait/pay.png") no-repeat;
     background-size: 100%;
     margin: 1.711491rem auto 0rem;
}




 }

/* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
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
.sermian{
    width: 8.950276rem;
    height: 10.013444rem;
    /* border: 1px solid red; */
    margin: 1.904972rem auto 0px;
}
.serhe{
    width: 7.366483rem;
    height: 2.541436rem;
     background:url("../../assets/img/price_tag.png") no-repeat;
     background-size: 100%;
     margin: .468324rem auto .662983rem;
     text-align: center;
     font-size: .368324rem;
     color: #be0000;
     line-height: 2.541436rem;
}
.jine{
    font-size: 1.031308rem;
}
.male{
    margin-left: .184162rem
}
.tisi{
    width: 9.403315rem;
    height: .736648rem;
    line-height: .736648rem;
    font-family:STSongti-SC-Black;
font-size:.515654rem;
color:#000000;
margin: 0 auto

}
.titu{
    width: 2.504604rem;
    height: 3.783241rem;
    background:url("../../assets/img/pay.png") no-repeat;
     background-size: 100%;
     margin: .902394rem auto 0rem;
}
}

@media screen and (min-width:1200px)  {

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
.sermian{
    width:5.051917rem;
    height: 5.455406rem;
    /* border: 1px solid red; */
    margin: 1.0775rem auto 0px;
}
.serhe{
    width: 4.166667rem;
    height: 1.427083rem;
     background:url("../../assets/img/price_tag.png") no-repeat;
     background-size: 100%;
     margin: .264583rem auto .375rem;
     text-align: center;
     font-size: .208333rem;
     color: #be0000;
     line-height: 1.427083rem;
}
.jine{
    font-size: .583333rem;
}
.male{
    margin-left: .104167rem
}
.tisi{
    width: 5.31374rem;
    height:.416667rem;
    line-height: .416667rem;
    font-family:STSongti-SC-Black;
font-size:.291667rem;
color:#000000;
margin: 0 auto

}
.titu{
    width: 1.416667rem;
    height: 2.139813rem;
    background:url("../../assets/img/pay.png") no-repeat;
     background-size: 100%;
     margin: .510417rem auto 0rem;
}


}

</style>
