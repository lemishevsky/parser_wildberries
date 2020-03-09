const parsePage = require('./pageParser');
const parseSearch = require('./parseSearch');
const photoSaver = require('./photoSaver');
const createXLSX = require('./excelizer');
const mongoose = require('mongoose');

const Item = require('./model');

mongoose.connect('mongodb://localhost/parser_wildberries', { useNewUrlParser: true, useUnifiedTopology: true });

console.log('Try to parse', process.argv[2]);

// async function getParse(link) {
//   const links = await parseSearch(link);
//   const result = await Promise.all(links.map((elem) => parsePage(elem)));
//   return result;
// }

// Try to parse with timeout

async function getParse(link) {
  const links = await parseSearch(link);
  let counter = links.length;
  const result = await Promise.all(links.map((elem, idx) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(parsePage(elem));
      console.log(`\nThere are still ${counter} items left\n`);
      counter -= 1;
    },
      500 * idx)
  })));
  return result;
}

getParse(process.argv[2])
  .then(resolve => {
    Item.insertMany(resolve);
    return resolve
  })
  .then((resolve) => {
    const arrOfPics = [];
    resolve.forEach(elem => arrOfPics.push(elem.imgUrl))
    createXLSX(resolve);
    console.log('\x1b[1m \x1b[34m');
    console.log(`${resolve.length} item was parsed!`);
    console.log('\x1b[0m');
    return arrOfPics;
  })
  .then((resolve) => {
    let counter = resolve.flat(1).length;
    const numberOfPictures = counter;
    resolve.forEach((item, idx) => setTimeout(() => {
      console.log(`\nThere are still ${counter} pictures left\n`);
      counter -= item.length;
      photoSaver(item);
      if (!counter) setTimeout(() => {
        console.log(numberOfPictures, 'pictures are saved!');
        mongoose.connection.close();
      }, 5000);
    }, ((3000 + Math.random() * 2000) * idx)));
  })
  .catch(err => console.log(err));

