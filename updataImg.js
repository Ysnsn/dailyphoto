const http = require('http');

const fs = require('fs');

let updataImg = (url, name) => {

    http.get(url, (res) => {

        let imgData = '';

        res.setEncoding("binary");

        res.on('data', (chunk) => {

            imgData += chunk;

        })

        res.on('end', () => {

            fs.writeFile(`./images/daily/${name}.jpg`, imgData, 'binary', (error) => {

                if (error) {

                    console.log('下载失败');

                } else {

                    console.log('下载成功！')

                }

            })

        })

    })

}

module.exports = updataImg
