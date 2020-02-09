const request = require('request-promise');
const parse = require('cheerio');
const urlGrabber = require('./pictureUrlGrabber');
const photoSaver = require('./photoSaver');

let counter = 0;

function generateId() {
  counter += 1;
  return counter;
}

async function parsePage(link) {
  try {
    const html = await request(encodeURI(link));
    const pics = await urlGrabber(html);
    photoSaver(pics);
    const article = parse('.j-article', html)
      .text()
      .trim();

    const result = {
      id: generateId(),
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
      size: parse('.j-size-list', html)
        .text()
        .trim(),
      description: parse('.j-description p', html)
        .text()
        .trim(),
      modelParams: parse('.params', html)
        .text()
        .trim(),
      picture: `papka/${article}-1`,
      url: link,
    };
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = parsePage;
