const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');
const estadualDetails = require('../candidates-data/estadual-details.json');
const federalDetails = require('../candidates-data/federal-details.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const updatePicture = async () => {
  const allCandidatesDetails = [...estadualDetails, ...federalDetails];
  const candidates = await admin
    .firestore()
    .collection('users')
    .where('role', '==', 'candidate')
    .get()
    .then(querySnapshot => querySnapshot);

  candidates.forEach((candidate) => {
    const candidateData = candidate.data();

    const filteredData = { ...allCandidatesDetails.find(i => i.number === Number(candidateData.number))};
    const picture = filteredData.picture || null;

    admin
      .firestore()
      .collection('users')
      .doc(candidate.id)
      .update({ picture })
      .catch(console.log)
  })
}

updatePicture();