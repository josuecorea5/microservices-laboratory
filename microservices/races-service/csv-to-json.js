const path = require('path');
const csvFile = path.resolve(__dirname, 'race_info.csv');
const csv = require('csvtojson');

const { writeFile } = require('fs/promises');

const csvToJson = async () => {
  try {
    const jsonArray = await csv().fromFile(csvFile);
    await writeFile(`${__dirname}/races_info.json`, JSON.stringify(jsonArray));
  } catch (error) {
    console.log(error);
  }
};

csvToJson();