const axios = require("axios");
const env = require("./envLoader");

const base = "https://www.cryptocompare.com";

module.exports = async (coins) => {
  const {
    data: { Data },
  } = await axios.get(new URL("/data/coin/generalinfo", env.apiTarget()).href, {
    params: {
      fsyms: coins.join(","),
      tsym: "USD",
      api_key: env.apiKey(),
    },
  });

  return Data.reduce((acc, coin) => {
    const { Name, ImageUrl, Url } = coin.CoinInfo;
    return {
      ...acc,
      [Name]: {
        img: new URL(ImageUrl, base).href,
        url: new URL(Url, base).href,
      },
    };
  }, {});
};
