const ExcelJS = require('exceljs');
const {test, expect} = require("@playwright/test");

async function excelReadTest(worksheet,searchText) {
    let output = {row:-1,col:-1};
    
    worksheet.eachRow((row, rowNumber)=>{
        row.eachCell((cell, colNumber) => {

            if(cell.value === searchText){
                output = { row: rowNumber, column: colNumber };

            }

        })
    })
    return output;
}

async function writeExcelTest(searchText, replaceText,change, filePath) {

    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await excelReadTest(worksheet, searchText);
    

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath);
}

 
test.only('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';
 
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  await download;
  const filePath = 'C:/Users/Akshay/Downloads/download.xlsx'; 
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
 
  await page.locator('#fileinput').setInputFiles(filePath);
 
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});