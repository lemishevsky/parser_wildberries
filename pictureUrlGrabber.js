const parse = require('cheerio');

async function urlGrabber(html) {
  try {
    const part = Object.values(parse('.j-carousel-image', html)).slice(0, -3);
    const links = part.map((item) => {
      return Object.values(item.attribs)[2];
    });
    return links.map(elem => elem.slice(2));
  } catch (err) {
    return err;
  }
}

module.exports = urlGrabber;
