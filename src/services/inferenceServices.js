const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

const predictClassification = async (image, model, classList) => {
  try {
    // Load and preprocess the image
    const imgTensor = tf.node.decodeImage(image);
    const resizedImg = tf.image.resizeBilinear(imgTensor, [416, 416]);
    const expandedImg = resizedImg.expandDims();
    const normalizedImg = expandedImg.div(255);

    // Predict the class
    const predictions = model.predict(normalizedImg);
    const predictionData = await predictions.data();
    const predictedClassIndex = predictionData.indexOf(
      Math.max(...predictionData)
    );
    const predictedClassName = classList[predictedClassIndex];

    return {
      predictedClassName,
      predictions: predictionData,
      predictedClassIndex,
    };
  } catch (error) {
    throw new Error(`An error occurred while predicting: ${error.message}`);
  }
};

module.exports = predictClassification;
