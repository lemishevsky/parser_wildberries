const request = require('request-promise');
const parse = require('cheerio');


async function parseLinks(page) {
  const links = [];
  const $ = parse.load(page);
  const smthng = $('.j-products-container');
  $('.ref_goods_n_p', smthng).each((idx, elem) => {
    const productLink = $(elem).attr('href');
    links.push(productLink);
  });
  return links;
}

async function linksCollector(pages) {
  const promises = pages.map(page => parseLinks(page));
  const links = await Promise.all(promises);
  return links.flat(1);
}

async function parseSearch(link) {
  try {
    const html = await request(encodeURI(link));
    const pages = [html];
    const stopper = await parse('#catalog-content > div.pager.i-pager > div > span.total.many > span', html).text();
    const iter = Math.floor(stopper / 100);

    if (iter > 0) {
      for (let i = 1; i <= iter; i += 1) {
        const addUrl = `${link}?page=${i + 1}`;
        const html = await request(encodeURI(addUrl));
        pages.push(html);
      }
    }

    const links = await linksCollector(pages);

    console.log(links.length, 'products found');

    return links;
  } catch (err) {
    return err;
  }
}

module.exports = parseSearch;
