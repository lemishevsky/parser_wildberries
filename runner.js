const parsePage = require('./pageParser');
const parseSearch = require('./parseSearch');

console.log('Try to parse', process.argv[2]);

async function getParse(link) {
  const links = await parseSearch(link);
  const result = await Promise.all(links.map((elem) => parsePage(elem)));
  return result;
}

getParse(process.argv[2]).then((resolve) => console.log(resolve));
