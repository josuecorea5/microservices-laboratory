const path = require('path');
const csvFile = path.resolve(__dirname, 'race_info.csv');
const csv = require('csvtojson');

const { writeFile } = require('fs/promises');

const csvToJson = async () => {
  try {
    const jsonArray = await csv().fromFile(csvFile);

    const jsonResult =  jsonArray.map((item) => {
      const itemColorArray = item.color_de_pelo.split(';');
      return {
        ...item,
        color_de_pelo: itemColorArray.reduce((acc,color) => {
          if(color.includes('Tricolor')) {
            const indexColor = item.color_de_pelo.split(';').indexOf(color)
            color = `${color}${item.color_de_pelo.split(';')[indexColor + 1]}`
            itemColorArray.splice(indexColor, 2)
            return [...acc, color];
          }
          return [...acc, color];
        },[]),
      }
    })
    await writeFile(`${__dirname}/races_info.json`, JSON.stringify(jsonResult));
  } catch (error) {
    console.log(error);
  }
};

csvToJson();