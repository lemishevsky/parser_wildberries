const fs = require('fs');
const request = require('request');

function photoSaver(link) {
  const name = link.slice(link.lastIndexOf('/') + 1);
  const nameDir = name.split('-')[0];
  fs.mkdirSync('pictures');
  fs.mkdirSync(`pictures/${nameDir}`);
  request(encodeURI(`https:${link}`)).pipe(fs.createWriteStream(`pictures/${nameDir}/${name}`));
}

photoSaver('//img2.wbstatic.net/big/new/10590000/10595148-4.jpg');
