<template>
<div class="passmian">
 <div class="hear">
                <span class="huiti" style="">会员卡</span>
                <span class="closed" @click.stop="coles">
                    <i class="el-icon-error"></i>
                </span>
                
            </div>
            <div class="pass">
                 <span style="float: left; color: #f8f8f8">支付密码：</span>
                <input @click.stop="maop"  type="password" class="inp" id="inp" v-model="pass" style=""/>
            </div>

            <div>
                <button class="btn" @click='payment' >确定</button>
                <button class="btn qux close" @click.stop="coles">取消</button>
            </div>
</div>
</template>
<script>
 import Vue from 'vue';
export default {
    name:"MemberPassword",
    data(){
        return{
            pass:"",
        }
    },
    computed:{},
    methods:{
        //关闭窗口
        coles(){
           this.$store.commit('ScanCommoditydata/showHidden',false);
           this.pass="";
        },
        //点击input阻止冒泡事件
        maop(){
           document.getElementById("inp").focus();
        },

         //确认支付
            payment(){
                Vue.$http.get('/member/verificationMember',{params:{
                    "memberCode":this.$store.getters['ScanCommoditydata/redata'].accountinfo.memberCode,
                    "password":this.pass,
                }}).then(data=>{



                // let lists={
                //     payTypeId:this.$store.getters['ScanCommoditydata/redata'].confirmpy.id,
                //   }
                //   this.$store.dispatch('ScanCommoditydata/goulistdajax',lists).then(data=>{

                //   })

             let list={
                    "payTypeCode":this.$store.getters['ScanCommoditydata/redata'].confirmpy.payTypeCode,
                    "payTypeId":this.$store.getters['ScanCommoditydata/redata'].confirmpy.id,
                    "posTicketCode":this.$store.getters['ScanCommoditydata/redata'].gondlist.data.list[0].pos_ticket_code,
                    "state":10,
                    "payMoney":this.$store.getters['ScanCommoditydata/redata'].gondlist.data.all_moeny,
                    "posTicketType":10,
                    "restingOrderType":10,
                    "sysParamId":"",
                    "authCode":"",
                     "memberPwd":this.pass,
                }
               this.$store.dispatch('ScanCommoditydata/billinginfo',list).then(data=>{
                    this.$store.commit('ScanCommoditydata/showHidden',false);
                     this.pass="";
                  if(data.status==0){
                    this.$store.commit('ScanCommoditydata/membershipcess',"会员卡支付成功");
                   let paytype=this.$store.getters['ScanCommoditydata/redata'].mpayment.data[0];
                    this.$store.commit('ScanCommoditydata/confirmpy',paytype);//会员卡支付
                    this.$router.push('/settle');  


                  }else{
                     alert(data.message);
                  }
               })



                })
            }



    },
    mounted(){

    }
}
</script>
<style scoped>
/*竖屏*/
 @media screen and (min-width:618px) and (max-width: 820px) {
.closed{
    font-size: .515654rem;
    float:right;
    margin-right: .184162rem
}

.passmian{
         width: 11.589242rem;
        height: 7.334963rem;
        margin: 5.378973rem auto;
        background: #767676;
        border: .0489rem solid #979797;
        border-radius: .122249rem;
        
        
}
   .hear{
        width: 100%;
        height: 1.369193rem;
        line-height: 1.369193rem;
        color: #f8f8f8;
        font-size: .440098rem;
        background: #494949;
       border-top-left-radius: .122249rem;
        border-top-right-radius: .122249rem;
    }
    .pass{
        width: 8.906077rem;
        height: .736648rem;
        line-height: .736648rem;
        margin: 1.289134rem auto ;
        font-size: .515654rem
    }
    .btn{
        width: 4.841076rem;
        height: 1.222494rem;
        background:#F27D3A;
        color: #f8f8f8;
        border: none;
        border-radius: .195599rem;float: left;
        margin-left: .488998rem;
        font-size: .515654rem;
    }
    .qux{
        background:#DFDFDF;
        color: #474747;
        float: right;
        margin-right: .488998rem;
    }
    .btn:hover{
        opacity: 0.9;
    }
    .close:hover{
    opacity: 0.9;
}
.huiti{
float: left; margin-left: .244499rem
}
.close{
float: right;margin:0rem .244499rem 0px 0px;
font-size:.684597rem 
}
.inp{
width: 5.378973rem;
height: .736648rem;
border: .02445rem solid #020101;
font-size: .515654rem;
text-indent: .244499rem;

}
 }
 /* 横屏 */
@media screen and (min-width:1018px) and (max-width: 1200px) {
    .closed{
        font-size:.515654rem;
        float:right;
        margin-right: .092081rem
    }
    .passmian{
         width: 8.729282rem;
        height:5.524862rem;
        margin: 4.051565rem auto;
        background: #767676;
        border: .036832rem solid #979797;
        border-radius: .092081rem;
     }
   .hear{
        width: 100%;
        height: 1.031308rem;
        line-height: 1.031308rem;
        color: #f8f8f8;
        font-size: .331492rem;
        background: #494949;
        border-top-left-radius: .092081rem;
        border-top-right-radius: .092081rem;
    }
    .pass{
        width: 6.906077rem;
        height: .736648rem;
        line-height: .736648rem;
        margin: 1.289134rem auto ;
        font-size: .515654rem

    }
    .btn{
        width: 3.646409rem;
        height: .92081rem;
        background:#F27D3A;
        color: #f8f8f8;
        border: none;
        border-radius: 8px;float: left;
        margin-left: .368324rem;
        font-size: .405157rem;
    }
    .qux{
        background:#DFDFDF;
        color: #474747;
        float: right;
        margin-right: .368324rem;
    }
    .btn:hover{
        opacity: 0.9;
    }
    .close:hover{
    opacity: 0.9;
}


.huiti{
float: left; margin-left: .184162rem
}
.close{
float: right;margin:.0rem .184162rem 0px 0px;
font-size:.515654rem; 
}
.inp{
width: 4.051565rem;
height: .699816rem;border: .018416rem solid #020101;font-size: .515654rem;text-indent: .184162rem
}
}
/* 电脑端 */
@media screen and (min-width:1200px){
    .closed{
    font-size: .291667rem /* 28/96 */;
    
    float:right;
    margin-right: .104167rem /* 10/96 */;
}

.passmian{
        width:4.9375rem;
        height: 3.125rem;
        margin: 2.291667rem auto;
        background: #767676;
        border: .020833rem solid #979797;
        border-radius: .052083rem;
        
      
}
 .hear{
        width: 100%;
        height: .583333rem;
        line-height: .583333rem;
        color: #f8f8f8;
        font-size: .1875rem;
        background: #494949;
       border-top-left-radius: .052083rem;
        border-top-right-radius: .052083rem;
    }
    .pass{
        width: 3.908333rem;
        height: .416667rem;
        line-height: .416667rem;
        margin: .729167rem auto .729167rem;
        font-size: .291667rem

    }
    .btn{
        width: 2.0625rem;
        height: .520833rem;
        background:#F27D3A;
        color: #f8f8f8;
        border: none;
        border-radius: .083333rem;float: left;
        margin-left: .208333rem;
        font-size: .229167rem;
    }
    .qux{
        background:#DFDFDF;
        color: #474747;
        float: right;
        margin-right: .208333rem;
    }
    .btn:hover{
        opacity: 0.9;
    }
    .close:hover{
    opacity: 0.9;   
}
.huiti{
float: left; margin-left: .104167rem
}
.close{
float: right;
font-size: .291667rem
}
.inp{
width: 2.291667rem;
height: .395833rem;
border: .010417rem solid #020101;
font-size: .229167rem;text-indent: .104167rem;
}
}





</style>
