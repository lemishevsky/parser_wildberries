const fs = require('fs');
const request = require('request');

function photoSaver(arrOfLink) {
  const nameDir = arrOfLink[0].slice(arrOfLink[0].lastIndexOf('/') + 1).split('-')[0];
  try {
    if (!fs.existsSync('pictures')) {
      fs.mkdirSync('pictures');
      console.log('Directory pictures is create');
    }
  } catch (err) {
    console.error(err);
  }

  fs.mkdirSync(`pictures/${nameDir}`);
  console.log(`Directory pictures/${nameDir} is create`);
  arrOfLink.forEach((link) => {
    const name = link.slice(link.lastIndexOf('/') + 1);
    request(encodeURI(`https:${link}`)).pipe(fs.createWriteStream(`pictures/${nameDir}/${name}`));
    console.log(`Picture ${name} is saved`);
  });
}

module.exports = photoSaver;
