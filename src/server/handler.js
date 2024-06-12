const predictClassification = require("../services/inferenceServices");
const crypto = require("crypto");

//const { storeData, getDatas } = require("../services/storeData");

const color_palette = {
  light: ["#ffffff", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
  dark: ["#03045e", "#832161", "#363062", "#751628", "#bc455a"],
  "mid-light": ["#fff8e7", "#b91d2e", "#a2d6f9", "#fd969a", "#e6ccb2"],
  "mid-dark": ["#8c001a", "#d7c0d0", "#64113f", "#2e294e", "#f29ca3"],
};

const getColorRecommendation = (predictedClassName) => {
  return color_palette[predictedClassName] || [];
};

const postPredictHandler = async (request, h) => {
  try {
    const { image } = request.payload;

    if (!image) {
      return h
        .response({ status: "error", message: "No image provided" })
        .code(400);
    }

    const { model } = request.server.app;

    const CLASS_NAMES = ["dark", "light", "mid-dark", "mid-light"];

    const { predictedClassName, predictions, predictedClassIndex } =
      await predictClassification(
        image, // Pass image data directly
        model,
        CLASS_NAMES
      );

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const recommendation = getColorRecommendation(predictedClassName);

    const newPrediction = {
      id,
      predictedClassName,
      predictions,
      predictedClassIndex,
      createdAt,
      recommendation,
    };

    // await storeData(id, newPrediction);

    return h
      .response({
        status: "success",
        message: "Model predicted successfully",
        data: newPrediction,
      })
      .code(201);
  } catch (error) {
    console.error("Error predicting:", error);
    return h
      .response({ status: "error", message: "Failed to predict" })
      .code(500);
  }
};


const getPredictHistoriesHandler = async (request, h) => {
  const histories = await getDatas();

  const formattedHistories = histories.map((data) => ({
    id: data.id,
    history: {
      result: data.result,
      createdAt: data.createdAt,
      suggestion: data.suggestion,
      id: data.id,
    },
  }));

  const response = h.response({
    status: "success",
    data: formattedHistories,
  });

  return response;
};

module.exports = { postPredictHandler, getPredictHistoriesHandler };
