const ExcelJS = require('exceljs');
const fileName = 'result';

const date = new Date();
const year = date.getFullYear() % 100;
let month = date.getMonth() + 1;
if (month < 10) month = '0' + month;
const today = date.getDate();
const dateString = year + month + today;

let counterId = 1;

async function createXLSX(arrayOfObj) {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Parsing results');
    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Brand', key: 'brand' },
      { header: 'Article', key: 'article' },
      { header: 'Name', key: 'name' },
      { header: 'Type', key: 'type' },
      { header: 'Price', key: 'price' },
      { header: 'Color', key: 'color' },
      { header: 'Russian size', key: 'rusSize' },
      { header: 'Manufacture size', key: 'manSize' },
      // { header: 'Chest girth', key: 'cSize' },
      // { header: 'Waist girth', key: 'wSize' },
      // { header: 'Hip girth', key: 'hSize' },
      { header: 'Description', key: 'description' },
      { header: 'Images', key: 'picture' },
      { header: 'URL', key: 'url' },
    ];
    arrayOfObj.map((elem) => {
      sheet.addRow({
        id: counterId,
        brand: elem.brand,
        article: elem.article,
        name: elem.name,
        type: elem.type,
        price: elem.price,
        color: elem.color,
        rusSize: elem.rusSize.join(', '),
        manSize: elem.manSize.join(', '),
        // cSize: elem.cSize,
        // wSize: elem.wSize,
        // hSize: elem.hSize,
        description: elem.description,
        picture: {
          text: elem.picture,
          hyperlink: elem.picture
        },
        url: {
          text: elem.url,
          hyperlink: elem.url,
          tooltip: elem.url
        },
      });
      counterId += 1;
    });
    workbook.xlsx.writeFile(`${fileName + '_' + dateString}.xlsx`)
      .then(() => {
        console.log(`${fileName + '_' + dateString}.xlsx created!`);
      });
    return arrayOfObj;
  } catch (err) {
    return err;
  }
}
module.exports = createXLSX;
