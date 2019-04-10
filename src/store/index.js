import Vue from "vue";
import Vuex from "vuex";
import ScanCommoditydata from './modules/ScanCommoditydata'

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        ScanCommoditydata,

    },

    //状态
    state: {
        information:"",
        loding:false,//加载效果
        sound:"",//声音是否开启

    },
    getters: {
       redata(state){
           return state;
       }
    },
    //状态变化
    mutations: {
        information(state,list){
            state.information=list;
        },
        //声音是否开启
        sound(state,list){
            state.sound=list;
        },


    },
    //操作
    actions: {
 //声音是否打开
 sound(comm,list){
    return new Promise(async (resolved,reject)=>{
        Vue.$http.post('/pc/posRestingOrder/isPlaySound').then(data=>{
            // alert(data);
                let cuve=data.data;
                comm.commit('sound', data.data);
                resolved(cuve);
        })
    })
},
    }

})




