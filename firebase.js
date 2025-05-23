const admin = require('firebase-admin');
const contaDeServico = require('./chavePrivada.json');

admin.initializeApp({
  credential: admin.credential.cert(contaDeServico),
  projectId: contaDeServico.project_id  
});
;

const db = admin.firestore();

module.exports = db;
