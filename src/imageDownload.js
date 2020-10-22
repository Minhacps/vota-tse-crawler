var fs = require('fs');
const request = require('request')
const city = 'porto-alegre';

let counter = 0;
const download = (url, path) => new Promise(resolve => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', resolve)
  })
});

const downloadList = async (items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    await download(item.picture, `../candidates-data/2020/pictures/${city}/${item.number}.jpg`);
    console.log(`Done - ${item.number} - ${counter}`);
    counter++
  }
}

const getMissingCandidates = () => new Promise(resolve => {
  const data = require(`../candidates-data/2020/${city}-details.json`);

  fs.readdir(`../candidates-data/2020/pictures/${city}`, (err, files = []) => {
    const candidateNumbers = files.map(i => String(i).replace('.jpg', ''));
    const missingCandidates = data.filter(i => !candidateNumbers.includes(String(i.number)));
    console.log(missingCandidates)
    resolve(missingCandidates);
  });
});

const downloadFullList = () => {
  getMissingCandidates()
    .then((candidatesList) => {
      console.log(`${candidatesList.length} missing`);
      const firstHalf = candidatesList.slice(0, candidatesList.length / 2);
      const secondHalf = candidatesList.slice(candidatesList.length / 2, candidatesList.length)

      downloadList(firstHalf);
      downloadList(secondHalf);
    })
};

downloadFullList()