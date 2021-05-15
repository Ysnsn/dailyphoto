const updataImg = require('./updataImg');
const fs = require("fs");
const axios = require("axios");
const chatid = process.env.chatid;
const botapi = process.env.botapi;

function image() {

  return new Promise(async (resolve) => {

    try {

      let resp = await axios.get(`http://lab.zuimeia.com/wallpaper/category/1`);

      let data = resp.data.data.images[0];

      a = {

        title: data.description,

        thumb: "http://wpstatic.zuimeia.com/" + data.image_url,

        time: data.pub_time,

      };

      console.log(a);

    } catch (err) {

      console.log(err);

    }

    resolve();

  });

}

function tgbot(imgg,text) {
    return new Promise(async (resolve) => {
        try {
            let url = `https://api.telegram.org/bot${botapi}/sendMessage?chat_id=${chatid}`;
            let data =`parse_mode=MarkdownV2&text=[ ](${imgg}) ${text}`
            let res = await axios.post(url,data);
            if (res.data.ok) {
                console.log("Tg：发送成功");
            } else {
                console.log("Tg：发送失败!");
                console.log(res.data);
            }
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}
 
function task() {

  return new Promise(async (resolve) => {

    try {

      await image();

      fs.writeFile('./images/daily/imglist', JSON.stringify(a)+`,
`,{'flag':'a'}, err=>{
            if(err){
                throw err
            }else{
                console.log("success")
            }
        })

      updataImg(a.thumb,a.time+"  " +a.title)
      tgbot(a.thumb,a.title)

    } catch (err) {

      console.log(err);

    }

    resolve();

  });

}

task()
