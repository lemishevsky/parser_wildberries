const parsePage = require('./pageParser');
const parseSearch = require('./parseSearch');
const createXLSX = require('./excelizer');

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
      console.log(`\n There are still ${counter} items left\n`);
      counter -= 1;
    },
      8000 * idx)
  })));
  return result;
}

getParse(process.argv[2])
  .then((resolve) => {
    createXLSX(resolve);
    console.log('\x1b[1m \x1b[34m');
    console.log(`WHOA! ${resolve.length} item was parsed!`);
    console.log('\x1b[0m');
  })
  .catch(err => console.log(err));

