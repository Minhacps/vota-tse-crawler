var fs = require('fs');
const request = require('request')
const data = require('../candidates-data/2020/recife-details.json');

const download = (url, path) => new Promise(resolve => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', resolve)
  })
});

const firstHalf = data.slice(0, data.length / 2);
const secondHalf = data.slice(data.length / 2, data.length)

let counter = 0;
const downloadList = async (items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await download(item.picture, `../candidates-data/2020/pictures/recife/${item.number}.jpg`);
    console.log(`Done - ${item.number} - ${counter}`);
    counter++
  }
}

downloadList(firstHalf);
downloadList(secondHalf);