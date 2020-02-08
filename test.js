const request = require('request');

const URL = 'https://www.wildberries.ru/catalog/10595148/detail.aspx';

request(URL, (err, res, body) => {
  if (err) throw err;
  console.log(body);
  console.log(res.statusCode);
});
