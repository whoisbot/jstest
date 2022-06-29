/*
腾讯视频-福利中心
邀请码：8303
邀请注册：https://fuli.v.qq.com/h5/activity/welfare_center_new/index.html?source=page_id%3Ddefault%26pgid%3Dpage_personal_center%26page_type%3Dpersonal%26is_interactive_flag%3D1%26pg_clck_flag%3D1%26eid%3Dwelfare_center%26mod_id%3Dsp_mycntr_common%26sectiontype%3D2%26styletype%3D202%26flush_num%3D0%26section_idx%3D0%26red_dot%3D0%26mod_title%3D%25E5%25B8%25B8%25E7%2594%25A8%25E5%258A%259F%25E8%2583%25BD%26blocktype%3D6001%26mod_idx%3D5%26item_idx%3D4%26layouttype%3D2%26action_pos%3Djump&ptag=grzx%23/&isDarkMode=0&uiType=REGULAR&url_from=share&second_share=0&share_from=copy#/invite?vuid=813292650

签到+互助，一天40金币
腾讯视频app->我的->常用功能-福利兑换，捉里面pbaccess.video.qq.com的CK
放到txspCookie里，多账号换行或者@或者&隔开

重写：
[task_local]
#腾讯视频-福利中心
3 0,8 * * * https://raw.githubusercontent.com/leafTheFish/DeathNote/main/txspfl.js, tag=腾讯视频-福利中心, enabled=true
[rewrite_local]
https://pbaccess.video.qq.com/activity/welfare_center/queryUserActivity url script-request-header https://raw.githubusercontent.com/leafTheFish/DeathNote/main/txspfl.js
[MITM]
hostname = pbaccess.video.qq.com

cron: 3 0,10 * * *
*/

const $ = new Env("腾讯视频-福利中心")

const txspCookie=$.getdata('txspCookie');



let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 

!(async () => {
if (!txspCookie) {
    $.msg( '【提示】请先获取腾讯视频一cookie')
    return;
  }
   /*console.log(`------------- 共${kkdcookieArr.length}个账号----------------\n`)
  for (let i = 0; i < kkdcookieArr.length; i++) {*/
    else if (txspCookie) {
  
    await getSign();

      await Browse();
      await watchVid();
       
  //}
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())




function jlHost(api, body) {
    return {
        url: 'https://pbaccess.video.qq.com/activity/platform/gateway/v2/' + api,
        headers: {
          'Origin' : `https://fuli.v.qq.com/`,
'Cookie' : txspCookie,
'Accept' : `*/*`,
'Content-Type' : `application/json`,
'Referer' : `https://fuli.v.qq.com/`,
'Host' : `pbaccess.video.qq.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.23(0x18001729) NetType/WIFI Language/zh_CN`,
'Accept-Language' : `en-us`,
'Accept-Encoding' : `gzip, deflate`,
'Connection' : `keep-alive`
        },
        body: body,
        //timeout: 1000,
    }
}


function jl1Host(api, body) {
    return {
        url: 'https://pbaccess.video.qq.com/activity/platform/gateway/v2/' + api,
        headers: {"Accept": "application/json, text/plain, */*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-CN,zh-Hans;q=0.9","Connection": "keep-alive","Content-Type": "application/json","Cookie":txspCookie ,"Host": "pbaccess.video.qq.com","Origin": "https://fuli.v.qq.com","Referer": "https://fuli.v.qq.com/","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 QQLiveBrowser/8.6.25 AppType/UN WebKitCore/WKWebView iOS GDTTangramMobSDK/4.370.6 GDTMobSDK/4.370.6 cellPhone/iPhone 13"},
        body: body,
        //timeout: 1000,
    }
}




//签到

function getSign(){
        return new Promise((resolve, reject) => {
        $.post(jlHost('signPlay','{"activity_id":"1001","task_group_id":5}'),async(error, resp, data) => {
       signres = JSON.parse(data);


  console.log(`=============签到============`);
if (signres.err_code == 20011) {
                
                $.log(`今日已签到☀️`);
                
            } else if (signres.err_code == 0) {
                $.log('【签到结果】成功 🎉 金币: '+signres.data.reward_count+'，连续签到天数: '+signres.data.days);
              
            }else if (signres.err_code == 22001) {
                $.log('该账号存在安全风险‼️');
                 //return;
              
            }
else {
           $.log(`cookie失效‼️`);
            return;

}

            

            resolve()
        })

    })

}
//$request.headers['Cookie'];

//浏览草地商城



function Browse(){
        return new Promise((resolve, reject) => {
        $.post(jl1Host('browse','{"activity_id":1001,"browse_page":"caochangdi","task_group_id":"4"}'),async(error, resp, data) => {
       result = JSON.parse(data);

console.log(`=============浏览任务============`);

if (result.err_msg == "") {
                
                $.log(`浏览任务完成☀️`);
                
            } else if (result.err_msg == 'success') {
                $.log('【浏览结果】成功 🎉 金币: 10');
              
            }
else {
           $.log(`cookie失效‼️`);

}
                
            resolve()
        })

    })

}



//看视频

function watchVid(){
        return new Promise((resolve, reject) => {
        $.post(jl1Host('WatchVideo','{"activity_id":1001,"vid":"mzc00200p51jpn7","task_group_id":"1"}'),async(error, resp, data) => {
       result = JSON.parse(data);

console.log(`=============看视频任务============`);

if (result.err_msg == "") {
                
                $.log(`看视频完成☀️`);
                
            } else if (result.err_msg == 'success') {
                $.log('【观看结果】成功 🎉 金币: 10');
              
            }
else {
           $.log(`cookie失效‼️`);

}
              
            

            resolve()
        })

    })

}




//获取ck
function GetCookie() {
  try {
    if ($request && $request.url.match(/v\.qq\.com/)) {
        var CookieName = "腾讯视频";
        var CookieKey = "txspCookie";
        var CookieValue =$request.headers['Cookie'];
      if ($.getdata(CookieKey)) {
        if ($.getdata(CookieKey) != CookieValue) {
          var cookie = $.setdata(CookieValue, CookieKey);
          if (cookie) {
            $.msg("", "", "更新" + CookieName + "Cookie成功 🎉"+CookieValue);
          }
        }
      } else {
        var cookie = $.setdata(CookieValue, CookieKey);
        if (cookie) {
          $.msg("", "", "首次写入" + CookieName + "Cookie成功 🎉"+CookieValue);
        }
      }
    } 
  } catch (eor) {
    $.msg("写入Cookie失败", "", "未知错误 ‼️")
    $.log(JSON.stringify(eor) + "\n" + eor + "\n" + JSON.stringify($request.headers))
  }
  $.done();
}







function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,a]=i.split("@"),h={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"}};this.post(h,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=t,h=s.decode(a,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:a,body:h},h)},t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then(t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=t,h=i.decode(a,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:a,body:h},h)},t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",o){const r=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}
