const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');
const candidatesDetails = require('../../candidates-data/2020/campinas-details.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const updatePicture = async () => {
  const candidates = await admin
    .firestore()
    .collection('users')
    .where('role', '==', 'candidate')
    .where('city', '==', 'campinas')
    .get()
    .then(querySnapshot => querySnapshot);

  candidates.forEach((candidate) => {
    const candidateData = candidate.data();

    if (candidateData.picture) {
      return;
    }

    const filteredData = { ...candidatesDetails.find(i => i.number === Number(candidateData.candidateNumber)) };

    if (!filteredData.picture) {
      return false;
    }

    admin
      .firestore()
      .collection('users')
      .doc(candidate.id)
      .update({ picture: filteredData.picture })
      .then(() => console.log(candidateData.candidateNumber))
      .catch(console.log)
  })
}

updatePicture();