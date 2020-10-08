var fs = require('fs');
var path = require('path');
const fetch = require('node-fetch');

const dataDir = path.resolve(__dirname, '..', 'candidates-data');
// const candidateUrl =
//   'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2020/25313/2030402020/candidato';

const campinas = {
  candidates: require('../candidates-data/2020/campinas.json'),
  candidatesUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2020/62910/2030402020/13/candidatos',
  candidateDetailsUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2020/62910/2030402020/candidato',
  outputFile: 'campinas-details2.json'
}

const fetchCandidatesDetails = async (city) => {
  // for (let i = 0; i < city.candidates.candidatos.length; i++) {
  const candidate = city.candidates.candidatos.filter(i => i.id === 250000898203)[0];

  await fetch(`${city.candidateDetailsUrl}/${candidate.id}`)
    .then((response) => response.json())
    .then((details) => {
      const data = {
        tseId: candidate.id,
        number: details.numero,
        picture: details.fotoUrl,
      };

      fs.appendFile(`${dataDir}/${city.outputFile}`, `${JSON.stringify(data)},\n`, (error) => {
        if (error) {
          console.log('Falhou escrita' + candidate.id);
          console.log(error);
          return;
        }

        console.log(i, candidate.id);
      });
    })
    .catch(() => console.error('Falhou busca' + candidate.id));
  // }
};

fetchCandidatesDetails(campinas);
