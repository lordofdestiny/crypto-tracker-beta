require("dotenv").config();

const apiKey = () => {
  return process.env.COIN_MARKET_KEY;
};

const apiTarget = () => {
  return process.env.API_TARGET;
};

module.exports = {
  apiKey,
  apiTarget
};
