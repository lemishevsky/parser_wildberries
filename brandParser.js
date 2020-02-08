const request = require('request-promise');
const parse = require('cheerio');

async function parseSearchPageVV(productName) {
  const link = encodeURI(`https://vkusvill.ru/search/?q=${productName}`);
  const products = [];
  try {
    const html = await request(link);
    const links = [];
    parse('.ProductCards__item', html).map(function () {
      const link = parse('.ProductCard__link', this).attr('href');
      links.push(link);
    });

    // Асинхронный запуск
    await Promise.all(
      links.map(async (link) => {
        productInfo = await parseProductPageVV(link);
        products.push(productInfo);
      }),
    );

    return products;
  } catch (err) {
    return err;
  }
}