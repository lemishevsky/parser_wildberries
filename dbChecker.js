const mongoose = require('mongoose');
const Item = require('./model');

async function dbChecker(links) {
  const linksToParse = [];
  const dataFromDB = await Item.find({}, { _id: 0, url: 1 });
  const linksFromDB = dataFromDB.map(e => e.url);
  links.forEach(element => {
    if (!linksFromDB.includes(element)) linksToParse.push(element);
  });
  return linksToParse;
}

module.exports = dbChecker;
