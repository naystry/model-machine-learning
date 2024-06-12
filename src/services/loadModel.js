const tf = require("@tensorflow/tfjs-node");

const loadModel = async () => {
  //return tf.loadLayersModel("file://InceptionV3/model.json");
return tf.loadLayersModel(process.ENV.MODEL_URL);
}

module.exports = loadModel;
