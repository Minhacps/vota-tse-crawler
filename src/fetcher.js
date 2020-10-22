var fs = require('fs');
var path = require('path');
const fetch = require('node-fetch');

const dataDir = path.resolve(__dirname, '..', 'candidates-data', '2020');

const cities = {
  americana: {
    candidates: require('../candidates-data/2020/americana.json'),
    candidatesUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2020/61310/2030402020/13/candidatos',
    candidateDetailsUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2020/61310/2030402020/candidato',
    outputFile: 'americana-details.json'
  },
  campinas: {
    candidates: require('../candidates-data/2020/campinas.json'),
    candidatesUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2020/62910/2030402020/13/candidatos',
    candidateDetailsUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2020/62910/2030402020/candidato',
    outputFile: 'campinas-details.json'
  },
  portoAlegre: {
    candidates: require('../candidates-data/2020/porto-alegre.json'),
    candidatesUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2020/88013/2030402020/13/candidatos',
    candidateDetailsUrl: 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2020/88013/2030402020/candidato',
    outputFile: 'porto-alegre-details.json'
  }
}

const fetchCandidatesDetails = async (city) => {
  const getMissingCandidates = () => {
    const data = city.candidates.candidatos;
    const details = require(`../candidates-data/2020/${city.outputFile}`);

    const candidateNumbers = details.map(i => i.tseId);
    return data.filter(i => !candidateNumbers.includes(i.id));
  };

  const missingCandidates = getMissingCandidates();

  for (let i = 0; i < missingCandidates.length; i++) {
    const candidate = missingCandidates[i];

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
  }
};

fetchCandidatesDetails(cities.campinas);
