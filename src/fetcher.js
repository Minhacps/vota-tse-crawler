var fs = require('fs');
var path = require('path');
const fetch = require('node-fetch');
const firestore = require('./json-to-firestore');

var estadualCandidates = require('../candidates-data/estadual.json');
var federalCandidates = require('../candidates-data/federal.json');

const dataDir = path.resolve(__dirname, '..', 'candidates-data');
const candidateUrl =
  'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/SP/2022802018/candidato';

const fetchCandidatesDetails = async (data, outputFile) => {
  for (let i = 0; i < data.candidatos.length; i++) {
    const candidate = data.candidatos[i];

    await fetch(`${candidateUrl}/${candidate.id}`)
      .then(response => response.json())
      .then(details => {
        const data = {
          tseId: candidate.id,
          number: details.numero,
          picture: details.fotoUrl
        };

        fs.appendFile(`${dataDir}/${outputFile}`, JSON.stringify(data), error => {
          if (error) {
            console.log(candidate.id);
            console.log(error);
            return;
          }

          console.log(i, candidate.id);
        });
      })
      .catch(() => console.error(candidate.id));
  }
};

fetchCandidatesDetails(estadualCandidates, 'estadual-details.json');
