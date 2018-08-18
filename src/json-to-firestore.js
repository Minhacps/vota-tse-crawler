const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');
const estadualDetails = require('../candidates-data/estadual-details.json');
const federalDetails = require('../candidates-data/federal-details.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const insertData = async (details, level) => {
  for (let i = 0; i < details.length; i++) {
    const candidateDetails = details[i];

    await admin
      .firestore()
      .collection('candidates_pictures')
      .doc(String(candidateDetails.tseId))
      .set(
        {
          ...candidateDetails,
          level
        },
        { merge: true }
      )
      .catch(console.error);
  }
};

insertData(estadualDetails, 'estadual');
