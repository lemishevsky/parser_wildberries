const ExcelJS = require('exceljs');
const fileName = 'Result';

async function createXLSX(arrayOfObj) {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Parsing results');
    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Brand', key: 'brand' },
      { header: 'Price', key: 'price' },
      { header: 'Color', key: 'color' },
      { header: 'Size', key: 'size' },
      { header: 'Description', key: 'description' },
      { header: 'ModelParams', key: 'modelParams' },
      { header: 'Images', key: 'picture' },
      { header: 'URL', key: 'url' },
    ];
    arrayOfObj.map((elem) => {
      sheet.addRow({
        id: elem.id,
        brand: elem.brand,
        price: elem.price,
        color: elem.color,
        size: elem.size,
        description: elem.description,
        modelParams: elem.modelParams,
        picture: elem.picture,
        url: elem.url,
      });
    });
    workbook.xlsx.writeFile(`${fileName}.xlsx`)
      .then(() => {
        console.log(`${fileName}.xlsx created!`);
      });
    return arrayOfObj;
  } catch (err) {
    return err;
  }
}
module.exports = createXLSX;
