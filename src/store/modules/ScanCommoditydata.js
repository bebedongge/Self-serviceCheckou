import Vue from 'vue';
import Vuex from 'vuex';
export default{
 //启动命名空间
 namespaced:true,

 state:{
     gondlist:[],//商品数据；
     posticketcode:"",
     mpayment:"",//支付方式列表
     confirmpy:"",//用户选择的支付方式
     ScanType:"商品",//判断用户使用会员卡支付是否登录
     accountinfo:"",//会员信息
     membershipcess:"未知",//会员卡支付状态,
     showHidden:false,//会员卡支付需要密码显示输入框
     settlementSummary:"",//结算汇总信息
     paymentName:"",//支付方式名称
 },
 getters:{
     redata(state){
       return state;
     }

 },
 mutations:{
    //支付方式名称
    paymentName(state,list){
        state.paymentName=list;
    },
     //结算汇总信息
    settlementSummary(state,list){
        state.settlementSummary=list;
    },
     //会员卡支付需要密码显示输入框
    showHidden(state,list){
        state.showHidden=list;
    },

     //会员卡支付状态
    membershipcess(state,list){
         state.membershipcess=list;
    },
    accountinfo(state,list){
       state.accountinfo=list;
    },
    ScanType(state,list){
        state.ScanType=list;
    },
    gondlist(state,list){
        state.gondlist=list;
    },
    posticketcode(state,list){
     state.posticketcode=list;
    },
    mpayment(state,list){
       state.mpayment=list
    },
    confirmpy(state,list){
        state.confirmpy=list;
    }

 },
 actions:{
     //扫描条码调接口
    fgondlist(coomt,list){
        return new Promise(async (resolved,reject)=>{
            Vue.$http.post('/pc/posRestingOrder/addGoodsToRestingOrderByBarCode',{
                    "barCode":list.barCode,
                    "posTicketCode":list.posTicketCode,
                    "state":10,
                    "posTicketType":10,
                    "restingOrderType":10,
                    "memberCode":list.memberCode
                }).then(data=>{
                    console.log("返回数据："+data);
                if(data.status==200){
                    var cuve=data.data;
                    resolved(cuve);
                }else{
                    alert("服务器异常");
                }
            })
        })
    },

    //初始化挂单
    goulistdajax(comm,list){
        return new Promise(async (resolved,reject)=>{
            Vue.$http.get('/pc/posRestingOrder/initAutoPosRestingOrder',{params:{
                "state":10,
                "posTicketType":10,
                "payTypeId":list.payTypeId
            }}).then(data=>{
                // alert(data);
                if(data.status==200){
                    let cuve=data.data;
                    comm.commit('gondlist', data.data);
                    resolved(cuve);
                }else {
                    alert("服务器异常");
                }
               
            })
        })
    },
     //删除修改单个商品
     gouremove(comm,list){
        return new Promise(async (resolved,reject)=>{
            Vue.$http.post('/pc/posRestingOrder/updateGoodsNum',{
                    "goodsNum":list.goodsNum,
                    "restingOrderId":list.restingOrderId,
                    "operateType":list.operateType
                }).then(data=>{
                if(data.status==200){
                    let cuve=data.data;
                    resolved(cuve);
                }else {
                    alert("服务器异常")
                }
                
            })
        })
    },

    //获取支付方式
    Payment(comm){
        return new Promise(async (resolved,reject)=>{
            Vue.$http.get('/pc/payType/getPayTypeList').then(data=>{
                if(data.status==200){
                    let cuve=data.data;
                    comm.commit('mpayment',cuve);
                    resolved(cuve);
                }else {
                    alert("服务器异常")
                }
            })
        })
    },
    //结算操作
     billinginfo(context,list){
        return new Promise(async (resolved,reject)=>{
            let jsdata={
                "payTypeCode":list.payTypeCode,
                "payTypeId":list.payTypeId,
                "posTicketCode":list.posTicketCode,
                "state":list.state,
                "payMoney":list.payMoney,
                "posTicketType":list.posTicketType,
                "restingOrderType":list.restingOrderType,
                "sysParamId":list.sysParamId,
                "authCode":list.authCode,
               
                    "memberPwd":list.memberPwd,//会员密码
                    "manualDiscount":list.manualDiscount,//口令优惠金额
                    "manualDiscountPassword":list.manualDiscountPassword,//口令密码
                    "isInputMember":list.isInputMember,//是否手动输入会员号
                    "isNoMemberToPay":list.isNoMemberToPay,//是否未登录会员可以支付
                    "sourceType":20//订单来源订单来源（商城APP：10，自助收银：20，后端做单：30）

            }
            Vue.$http.post('/pc/posPayment/posPaymentAction',jsdata).then(data=>{
                // alert(data);
               
                    var cuve=data.data;
                    resolved(cuve);
               

            })
        })
    },
     //扫描会员卡获取会员信息
     search(comm,list){
        return new Promise(async (resolved,reject)=>{
            Vue.$http.post('/pc/pos/ticketSearch',{
                 //   Vue.$http.get('/pc/pos/ticketSearch',{params:{//get方式提交
                    "search":list.search,
                    "posTicketCode":list.posTicketcCode,
                    "level2TypeId":list.level2TypeId,
                    "pageSize":list.pageSize,
                    "pageIndex":list.pageIndex
                }).then(data=>{
                if(data.status==200){
                    var cuve=data.data;
                    if (data.data.data!=null){
                        if (data.data.data.type=="GOODS"){
                        }else if (data.data.data.type=="HY"){//搜索会员
                            comm.commit('accountinfo',data.data.data);
                        }else if (data.data.data.type=="POS"){//小票

                        }
                    }else {
                      
                    }



                  //  comm.commit('shouxa', data.data.data.list);
                }
                resolved(cuve);
            })
        })
    },
    //结算汇总信息
    //初始化结算页面
    settlementSummary(context,list){
        return new Promise(async (resolved,reject)=>{
            let jsdata={
                "payTypeId":list.payTypeId,
                "state":10,
                "posTicketCode":list.posTicketCode,
                "posTicketType":10,
                "restingOrderType":10,
            }
            Vue.$http.post('/pc/posPayment/initPosPaymentAction',jsdata).then(data=>{
                // alert(data);
                    var cuve=data.data.data;
                    context.commit('settlementSummary',cuve);
                resolved(data.data);
            })
        })
    },

   
 //打印小票
 javaperitertput(comm,list){

    console.log("调用打印接口的时候："+JSON.stringify(list));
   // let  url=utils.URLflie();
    let url=list.url;
    if(url==""){
        url="http://192.168.0.214:8010"
    }
    return new Promise(async (resolved,reject)=>{
        Vue.$http.post(url+'/print/posTicketPrint',JSON.stringify(list),{ isPayload:true}).then(data=>{

            resolved(data);
        })
    })
}


 }



}