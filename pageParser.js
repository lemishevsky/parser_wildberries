const request = require('request-promise');
const parse = require('cheerio');
const path = require('path');
const urlGrabber = require('./pictureUrlGrabber');
const photoSaver = require('./photoSaver');

async function parsePage(link) {
  try {
    const html = await request(encodeURI(link));
    const pics = await urlGrabber(html);
    photoSaver(pics);
    const article = parse('.j-article', html)
      .text()
      .trim();

    const result = {
      brand: parse('.brand', html)
        .text()
        .trim(),
      article,
      name: parse('.name', html)
        .text()
        .trim(),
      price: parse('.final-cost', html)
        .text()
        .trim(),
      color: parse('.color > span', html)
        .text()
        .trim(),
      size: parse('.j-sizes-info-popup-sizetable-tab', html)
        .text()
        .trim(),
      description: parse('.j-description p', html)
        .text()
        .trim(),
      modelParams: parse('.params', html)
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
