<template>
    <div class="prolistmian">
        <!-- 商品列表 -->
       <div class="gondlist">

         <table v-if="goolist.data!=null">
                 <tr v-for="(text,index) in goolist.data.list" :key="index">
                 <td class="td1" style="text-align: left">
                     <img v-if="text.homepage_picture!=null" class="gogimg" :src="text.homepage_picture" alt="">
                      <img v-else class="gogimg" src="../../assets/img/portrait/banana.png" alt="">
                    
                 </td>
                 <td class="td2" style="text-align: left">{{text.goods_name}}</td>
                 <td class="td3">{{text.goods_price}}/{{text.goods_unit_name}}</td>
                  <td class="td4">{{(text.goods_price*text.goods_num)}}</td>
                  <td class="td5">
                      <img @click="removeItem(text)" class="guanb" src="../../assets/img/delete.png" alt="">
                  </td>
                  </tr>             
         </table>
         <table v-else>
           

         </table>

       </div>
       <!-- 合计 -->
       <div class="heji" v-if="goolist.data!=null" >
          <span class="heijo">
              <span>合计：</span>
              <span class="heiz">{{goolist.data.all_moeny}}</span>
          </span>
           <span class="youh">
              <span>已优惠：</span>
              <span v-if="goolist.data.discount_money!=''" class="yheiz">{{goolist.data.discount_money}}</span>
              <span v-else>0.00</span>
          </span>

       </div>
       <div v-else></div>
<div id="bdtts_div_id">
      <!-- 语音播放器 -->
    <audio id="tts_autio_id" autoplay="autoplay">
       
    </audio>
</div>
      

    </div>

</template>
<script>
import utils from '../../assets/js/geturl';//公共方法；
export default {
    name:"ProductList",
    data(){
        return{}
    },
    computed:{
        //挂单列表
        goolist(){
            return this.$store.getters['ScanCommoditydata/redata'].gondlist;
        }
    },
    methods:{
       //删除商品
       removeItem(tex){
           let list={
                   "goodsNum":1,
                    "restingOrderId":tex.id,
                    "operateType":"SC"
           }
        this.$store.dispatch('ScanCommoditydata/gouremove',list).then(data=>{
          

            console.log(data.status);
             if(data.status==0){
                 let id=""
                 if(this.$store.getters['ScanCommoditydata/redata'].confirmpy!=""){
                    id=this.$store.getters['ScanCommoditydata/redata'].confirmpy.id
                 } 
               let list={
                    payTypeId:id,
                }
                 this.$store.dispatch('ScanCommoditydata/goulistdajax',list).then(data=>{


                      // console.log('初始化数据：'+JSON.stringify(data));
                       let goodsName="删除"+tex.short_name+"一"+tex.goods_unit_name//商品名称
                       //语音播放
                        if(this.$store.state.sound.data=="1"){
                       utils.doTTS(goodsName);
                        }
                   
                            
                         if(data.data.list.length==0){
                             // this.$router.goBack();
                             //没有商品数据返回主页
                                this.$router.push('/');
                         }
                       
                    
                  })
               
             }else{
                alert(data.message);                 
             }

        })

       }
    },
    mounted(){
        
    }
    
}
</script>
<style scoped>
 .gondlist::-webkit-scrollbar{
        display: none;
    }

/*竖屏*/
 @media screen and (min-width:218px) and (max-width: 1018px) {

.prolistmian{
    width: 100%;
    height: 100%;
    
   
}
.gondlist{
    width: 100%;
    height: 11.897946rem;
    overflow: auto;

   
}
.gondlist gogimg{
    width: 1.515892rem;
    height: 1.515892rem;
  
}
.heji{
    width:100%;
    height: .736648rem;
    margin-top: 0.484162rem
   
}
table{
    width: 100%;
}
table td{
    font-family:STSongti-SC-Black;
font-size: .440098rem;
color:#333333;
letter-spacing:0;
height: 1.715892rem;
};

.td1{
    width: 15%;
}
.td1 img{
    width: 1.466993rem;
    height: 1.466993rem;
    border-radius: .7334965rem;
}

.td2{
    width: 39%;
    font-weight: bolder
    
}

.td3{
    width: 20%;
      font-weight: bolder
}

.td4{
    width: 16%;
      font-weight: bolder
}
.td5{
    width: 10%;
    text-align: right;
}
.heijo{
    float:right;
    font-family:STSongti-SC-Bold;
font-size: .368324rem;
color:#be0000;
letter-spacing:0;
line-height:.368324rem;
}
.heiz{
font-size: .806846rem;
}
.youh{
    font-family:STSongti-SC-Bold;
font-size: .440098rem;
color:#333333;
letter-spacing:0;
float:right;
line-height:.668324rem;
margin-right: .276243rem
}
.yheiz{
font-size: .440098rem;
}





 }
 /* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {



.prolistmian{
    width: 100%;
    height: 100%;
    
   
}
.gondlist{
    width: 100%;
    height: 6.551013rem;
    overflow: auto;

   
}
.gondlist gogimg{
    width: 1.222494rem;
    height: 1.222494rem;
   

}
.heji{
    width:100%;
    height: .736648rem;
    margin-top: .184162rem
   
}
table{
    width: 100%;
}
table td{
    font-family:STSongti-SC-Black;
font-size:18px;
color:#333333;
letter-spacing:0;
height: 1.112891rem;
};

.td1{
    width: 12%;
}
.td1 img{
    width: .92081rem;
    height: .92081rem;
    border-radius: .460405rem

    
}

.td2{
    width: 50%;
    font-size: .331492rem /* 18/54.3 */;
    font-weight: bolder
    
}

.td3{
    width: 17%;
    font-size: .257827rem /* 14/54.3 */;
    font-weight: bolder
}

.td4{
    width: 12%;
    font-size: .257827rem /* 14/54.3 */;
    font-weight: bolder
   
}
.td5{
    width: 8%;
    text-align: right;
}
.heijo{
    float:right;
    font-family:STSongti-SC-Bold;
font-size: .488998rem;
color:#be0000;
letter-spacing:0;
line-height:.368324rem;
}
.heiz{
font-size: .607735rem
}
.youh{
    font-family:STSongti-SC-Bold;
font-size: .331492rem;
color:#333333;
letter-spacing:0;
float:right;
line-height:.668324rem;
margin-right: .276243rem
}
.yheiz{
font-size: .331492rem
}

}


 /* 电脑端 */
@media screen and (min-width:1200px) {

.prolistmian{
    width: 100%;
    height: 100%;
    
   
}
.gondlist{
    width: 100%;
    height: 3.705406rem;
    overflow: auto;

   
}
.gondlist gogimg{
    width: 1.222494rem;
    height: 1.222494rem;
   

}
.heji{
    width:100%;
    height: .416667rem;
    margin-top: .104167rem
   
}
table{
    width: 100%;
}
table td{
    font-family:STSongti-SC-Black;
font-size:.1875rem;
color:#333333;
letter-spacing:0;
height: .624838rem
};

.td1{
    width: 13%;
}
.td1 img{
    width: .520833rem;
    height: .520833rem;
    border-radius: .260417rem

    
}

.td2{
    width: 50%;
    font-weight: bolder;
    font-size: .1875rem /* 18/96 */;
    
}

.td3{
    width: 17%;
    font-weight: bolder;
    font-size: .166667rem /* 16/96 */;
}

.td4{
    width: 14%;
    /* color:#be0000; */
     font-weight: bolder;
    font-size: .166667rem /* 16/96 */;
}
.td5{
    width: 6%;
    text-align: right;
}
.heijo{
    float:right;
    font-family:STSongti-SC-Bold;
font-size: .270833rem;
color:#be0000;
letter-spacing:0;
line-height:20px;
}
.heiz{
font-size: .34375rem
}
.youh{
    font-family:STSongti-SC-Bold;
font-size: .331492rem;
color:#333333;
letter-spacing:0;
float:right;
line-height:.378021rem;
margin-right: .15625rem
}
.yheiz{
font-size: .331492rem
}
.guanb{
    width: .258333rem;
    height: .258333rem;
}
}

</style>
