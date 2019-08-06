const axios = require("axios");
const env = require("./envLoader");

const base = "https://www.cryptocompare.com";

module.exports = coins => {
  return new Promise((resolve, reject) => {
    const params = {
      fsyms: coins.join(","),
      tsym: "USD",
      api_key: env.apiKey()
    };
    axios
      .get(`${env.apiTarget()}/data/coin/generalinfo`, { params })
      .then(response => {
        const { Data } = response.data;
        const images = Data.reduce((acc, coin) => {
          const { Name, ImageUrl, Url } = coin.CoinInfo;
          acc[Name] = { img: `${base}${ImageUrl}`, url: `${base}${Url}` };
          return acc;
        }, {});
        resolve(images);
      })
      .catch(error => {
        error.status = 500;
        reject(error);
      });
  });
};
