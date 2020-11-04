const fs = require('fs');
const path = require('path');
const request = require('request');
const filePath = path.join(__dirname, 'Coaches.csv');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        //console.log('received data: ' + data);
        let imgs = [];
        let dataArr = data.split('","');
        //console.log(dataArr);
        for (let i = 0; i < dataArr.length; i++) {
                let url = getFullImageURL(dataArr[i]);
                //console.log(url);
                if (url.includes('https')) {
                  //console.log(url);
                  imgs.push(url);
                }
        }
        for (let i = 0; i < imgs.length; i++) {
          fs.appendFile('imgs.txt', imgs[i] + '",\n,"', (err) => {
            if (err) console.log(err);
          })             
        }
    } else {
        console.log(err);
    }
  });

//https://www.wix.com/corvid/forum/community-discussion/how-can-i-export-images-in-database
function getFullImageURL(imageSRC) {
 //convert the wix:image url to something that can be displayed inside html-component
 let strReturnImage = "";
 if (imageSRC.startsWith("image:")) {
 let wixImageURL = "";
        wixImageURL = "https://static.wixstatic.com/media/";
 let wixLocalURL = "";
        wixLocalURL = imageSRC.replace('image://v1/', '');
        wixLocalURL = wixLocalURL.substr(0, wixLocalURL.indexOf('/'));
        strReturnImage = wixImageURL + wixLocalURL;
    } 
 else if (imageSRC.startsWith("wix:image:")) {
 let wixImageURL = "";
        wixImageURL = "https://static.wixstatic.com/media/";
 let wixLocalURL = "";
        wixLocalURL = imageSRC.replace('wix:image://v1/', '');
        wixLocalURL = wixLocalURL.substr(0, wixLocalURL.lastIndexOf('/'));
        strReturnImage = wixImageURL + wixLocalURL;
    }
 else {
        strReturnImage = imageSRC;
    }
 return strReturnImage;
}