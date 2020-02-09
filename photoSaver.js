const fs = require('fs');
const request = require('request');
const path = require('path');

async function photoSaver(arrOfLink) {
  const nameDir = arrOfLink[0].slice(arrOfLink[0].lastIndexOf('/') + 1).split('-')[0];
  try {
    if (!fs.existsSync('pictures')) {
      fs.mkdirSync('pictures');
      console.log('Directory', '\x1b[31m', '"pictures/"', '\x1b[0m', 'created');
    }
  } catch (err) {
    console.error(err);
  }
  const dirPath = path.resolve('pictures', nameDir);
  fs.mkdirSync(dirPath);
  console.log('Directory', '\x1b[31m', `"${nameDir}/"`, '\x1b[0m', 'created');
  arrOfLink.map((link) => {
    const name = link.slice(link.lastIndexOf('/') + 1);
    request(encodeURI(`https:${link}`)).pipe(fs.createWriteStream(`pictures/${nameDir}/${name}`));
    console.log('Picture', '\x1b[34m', name, '\x1b[0m', 'is saved');
  });
}

module.exports = photoSaver;
