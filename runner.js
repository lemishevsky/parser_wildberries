const parsePage = require('./pageParser');
const parseSearch = require('./parseSearch');
const createXLSX = require('./excelizer');

console.log('Try to parse', process.argv[2]);

async function getParse(link) {
  const links = await parseSearch(link);
  const result = await Promise.all(links.map((elem) => parsePage(elem)));
  return result;
}

getParse(process.argv[2])
  .then((resolve) => {
    createXLSX(resolve);
    console.log('\x1b[1m \x1b[34m');
    console.log(`WHOA! ${resolve.length} item was parsed!`);
    console.log('\x1b[0m');
    // resolve.forEach((elem) => console.log(elem));
  })
  // .then((resolve) => {
  //   console.log('\x1b[1m \x1b[34m');
  //   console.log(`WHOA! ${resolve.length} item was parsed!`);
  //   console.log('\x1b[0m');
  //   resolve.forEach((elem) => console.log(elem));
  // });
