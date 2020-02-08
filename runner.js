const parsePage = require('./pageParser');
const parseSearch = require('./brandParser');

console.log(process.argv[2]);

async function getParse(link) {
  const result = await parsePage(link);
  return result;
}

console.log(getParse(process.argv[2]));
