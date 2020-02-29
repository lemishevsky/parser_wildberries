const request = require('request-promise');
const parse = require('cheerio');
const path = require('path');
const urlGrabber = require('./pictureUrlGrabber');
const photoSaver = require('./photoSaver');

function sizeParser(page, article) {
  const rx = new RegExp('data: {[^\n]+');
  const data = page.match(rx)[0].slice(6, -1);
  const obj = JSON.parse(data);
  const arrOfSizes = [];
  const rusSize = [];
  const manSize = [];
  const objWithSize = obj.nomenclatures[article].sizes;
  for (let key in objWithSize) {
    arrOfSizes.push(objWithSize[key])
  }
  arrOfSizes.sort((a, b) => a.id - b.id).forEach(elem => {
    rusSize.push(elem.sizeName);
    manSize.push(elem.sizeNameRus);
  })
  const sizeObj = {
    rusSize: rusSize,
    manSize: manSize,
    // cSize: '',
    // wSize: '',
    // hSize: '',
  }
  return sizeObj;
}

async function parsePage(link) {
  try {
    const html = await request(encodeURI(link));
    const pics = await urlGrabber(html);
    photoSaver(pics);

    const article = parse('.j-article', html)
      .text()
      .trim();

    const name = parse('.name', html)
      .text()
      .trim();

    const type = name.split(' ')[0];

    const size = sizeParser(html, article);

    const result = {
      brand: parse('.brand', html)
        .text()
        .trim(),
      article,
      name,
      type,
      price: parse('.final-cost', html)
        .text()
        .trim(),
      color: parse('.color > span', html)
        .text()
        .trim(),
      rusSize: size.rusSize,
      manSize: size.manSize,
      // cSize: size.cSize,
      // wSize: size.wSize,
      // hSize: size.hSize,
      description: parse('.j-description p', html)
        .text()
        .trim(),
      picture: path.resolve('pictures', article),
      url: link,
    };
    console.log(`Parse ${link} successful!`);
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = parsePage;
