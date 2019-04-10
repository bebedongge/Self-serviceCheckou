<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  //加载完毕之后清除加载动画
  //  beforeUpdate: function() {
  //           document.body.removeChild(document.getElementById('indexmian'));
  //       },

  data(){
    return{}
  },
  computed:{

  },
  methods:{
    //获取播放声音是否播放
    sound(){
      this.$store.dispatch('sound').then(data=>{
          
      })
    }

  },
  mounted(){
    //this.$store.getters['redata'].
    this.sound();
  },



}
</script>

<style lang="stylus">
*{outline:none}

body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
body{background:#fff;-webkit-text-size-adjust:100%;}
a{color:#2d374b;text-decoration:none}
a:hover{color:#cd0200;text-decoration:underline}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
