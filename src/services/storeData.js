const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore();
const collectionName = "predictions";

const storeData = async (id, data) => {
  return db.collection(collectionName).doc(id).set(data);
};

const getDatas = async () => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => doc.data());
};

module.exports = { storeData, getDatas };
