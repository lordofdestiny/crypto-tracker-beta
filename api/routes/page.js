const axios = require("axios");
const express = require("express");

const env = require("../helpers/envLoader");
const images = require("../helpers/coinImages");

const router = express.Router();

router.get("/", async (req, res) => {
  const coinList = ["BTC", "ETH", "XRP", "LTC"];
  const currencyList = ["USD"];
  const request = axios({
    method: "get",
    url: `${env.apiTarget()}/data/pricemulti`,
    params: {
      fsyms: coinList.join(","),
      tsyms: currencyList.join(","),
      extraParams: "cryptochart",
      api_key: env.apiKey()
    }
  });

  try {
    const response = await request;
    const imgs = await images(coinList);

    //merge response and images for easy use in hbs
    const coinData = Object.keys(response.data).map(key => {
      const obj = { name: key };
      Object.assign(obj, response.data[key], imgs[key]);
      return obj;
    });

    res.render("index", {
      title: "Crypto Chart",
      bootstrap: true,
      chart: true,
      coinData,
      data: coinList
    });
  } catch (error) {
    const { stack, message } = error;
    res.render("error", { stack, message });
  }
});

module.exports = router;
