/*

 @𝐗𝐢𝐝𝐍 𝐃𝐃    感谢红鲤鱼大佬
//++++++++++++++++++++++++++++++++-


⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
先看说明 先看说明 先看说明

说明:

今日头条极速版APP 只有签到和农场签到

签过了有可能就获取不到ck要等第二天

圈x获取不到ck就把body改成header

打开软件签到获取ck 签过到可能获取不到ck

⚠️签到 签到奖励 农场签到 签到奖励 4处获取ck的地方



小火箭:签到获取ck
今日头条极速版 = type=http-request,script-path=jrttSign.js,pattern=^https:\/\/.+\.snssdk\.com\/*,max-size=131072,requires-body=true,timeout=10,enable=true

定时 今日头条极速版 = type=cron,script-path=jrttSign.js,cronexpr="0 0 0 * * *",timeout=10,enable=true






surge:签到获取ck
今日头条极速版 = type=http-request,pattern=^https:\/\/.+\.snssdk\.com\/*,requires-body=1,max-size=0,script-path=jrttSign.js

定时 今日头条极速版 = type=cron,cronexp=0 10 0 * * *,script-path=jrttSign.js





圈x:签到获取ck
^https:\/\/.+\.snssdk\.com\/* url script-request-body jrttSign.js

定时 0 10 0 * * * jrttSign.js, tag=今日头条极速版, enabled=true






loon:签到获取ck
http-request ^https:\/\/.+\.snssdk\.com\/* script-path=jrttSign.js, requires-body=true, timeout=10, tag=今日头条极速版


定时 cron "0 10 0 * * *" script-path=jrttSign.js 




MITM=*.snssdk.com






*/










const DD ='今日头条极速版APP';

const $ = new Env(DD);


const logs=0;//设置0关闭日志,1开启日志


console.log(`\n============ 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})}  =============\n`)


!(async () => {
  if (typeof $request != "undefined") {
    await jrttSignData()
  } else {
    await jrttSign()
    await detailSign()
    await rewardSign()
    await listSign()
    await msgShow()
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function jrttSignData() {
  if ($request.url.indexOf("sign_in/?") > -1) {
    $.setdata($request.url,'jrttsignurl')
    $.setdata(JSON.stringify($request.headers),'jrttsignheader')
    
    $.msg($.name,"","[获取签到数据]✅成功")}
else
if ($request.url.indexOf("detail/?") > -1) {
    $.setdata($request.url,'detailsignurl')
        
    $.msg($.name,"","[获取连续签到数据]✅成功")}

   else
if ($request.url.indexOf("reward/sign_in?") > -1) {
    $.setdata($request.url,'rewardsignurl')
        
    $.msg($.name,"","[获取农场签到数据]✅成功")}
  else
if ($request.url.indexOf("sign_in/list?") > -1) {
    $.setdata($request.url,'listsignurl')
        
    $.msg($.name,"","[获取农场数据]✅成功")}
}

 function jrttSign() {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : $.getdata('jrttsignurl'),
        headers : JSON.parse($.getdata('jrttsignheader')),
     
      }
      $.post(url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.result = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },)
  })
}


function detailSign() {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : $.getdata('detailsignurl'),
        headers : JSON.parse($.getdata('jrttsignheader')),
     
      }
      $.get(url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.sign = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },)
  })
}

function rewardSign() {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : $.getdata('rewardsignurl'),
        headers : JSON.parse($.getdata('jrttsignheader')),
     
      }
      $.get(url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.reward = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },)
  })
}


function listSign() {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : $.getdata('listsignurl'),
        headers : JSON.parse($.getdata('jrttsignheader')),
     
      }
      $.get(url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.list = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },)
  })
}








function msgShow() {
  let dd = ""
  if ($.result.err_no === 0) 
    dd +="【每日签到打卡】"+"打卡✅"+$.result.data.score_amount+"💰金币";
    if ($.result.err_no === 1025) 
      dd +="【每日签到打卡】"+$.result.err_tips ;
    
    if ($.sign.err_no === 0) 
      dd +=",明日签到获得"+$.sign.data.tomorrow_score_amount+"💰金币\n" ;

    if ($.reward.status_code === 0) 
      dd +="【农场签到打卡】"+"打卡成功✅";
    if ($.reward.status_code === 5066) 
      dd +="【农场签到打卡】"+$.reward.message ;
   if ($.list.status_code === 0) 
      dd +=",连续签到"+"[第一天奖励]:"+$.list.data.sign[0].num+"💧"+"[第二天奖励]:"+$.list.data.sign[1].num+"袋化肥"+"[第三天奖励]:"+$.list.data.sign[2].num+"💧"+"[第四天奖励]:"+$.list.data.sign[3].num+"瓶杀虫剂"+"[第五天奖励]:"+$.list.data.sign[4].num+"💧"+"[第六天奖励]:"+$.list.data.sign[5].num+"瓶杀虫剂"+"[第七天奖励]:"+$.list.data.sign[6].num+"💧" ;

  $.msg($.name,"",dd)
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
