export default{

    // 获取url参数
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },

    //设置cookie
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
    },
    //获取cookie
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //语音播放
    doTTS:function(ttsText) {
       
        var ttsAudio = document.getElementById('tts_autio_id');
        var ttsDiv = document.getElementById('bdtts_div_id');

        // 文字转语音
        let vaiodata="http://tsn.baidu.com/text2audio?tex="+ttsText+"&per=4&spd=5&pit=5&vol=5&cuid=6570938&tok=24.19239aa24bd166c3a4e7981429c08700.2592000.1553998992.282335-6570938&aue=6&lan=zh&ctp=1"
     
        var au1 = '<audio id="tts_autio_id" autoplay="autoplay">'+
        '<source id="tts_source_id" src='+vaiodata+' type="audio/mpeg">'+
        //  '<source id="tts_source_id" src="http://192.168.0.210:8010/tts/speechSynthesizer?text=' + ttsText + '" type="audio/mpeg">'+
        
         '<embed id="tts_embed_id" height="0" width="0" src="">'+
         '</audio>';
        ttsDiv.innerHTML = au1;

        ttsAudio = document.getElementById('tts_autio_id');

        ttsAudio.play();
    },


    



}