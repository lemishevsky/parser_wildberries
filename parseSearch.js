const request = require('request-promise');
const cheerio = require('cheerio');

async function parseSearch(link) {
  try {
    const html = await request(encodeURI(link));
    const links = [];
    const $ = cheerio.load(html);
    const smthng = $('.j-products-container');
    $('.ref_goods_n_p', smthng).each((idx, elem) => {
      const productLink = $(elem).attr('href');
      links.push(productLink);
    });
    console.log(links.length, 'products found');
    return links;
  } catch (err) {
    return err;
  }
}

module.exports = parseSearch;
