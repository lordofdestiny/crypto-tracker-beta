const axios = require("axios");
const express = require("express");

const env = require("../helpers/envLoader");
const images = require("../helpers/coinImages");

const router = express.Router();

router.get("/", async (req, res) => {
  const coinList = ["BTC", "ETH", "XRP", "LTC"];
  const currencyList = ["USD"];

  try {
    const { data } = await axios({
      method: "get",
      url: new URL("/data/pricemulti", env.apiTarget()).href,
      params: {
        fsyms: coinList.join(","),
        tsyms: currencyList.join(","),
        extraParams: "cryptochart",
        api_key: env.apiKey(),
      },
    });

    const imgs = await images(coinList);

    res.render("index", {
      title: "Crypto Chart",
      bootstrap: true,
      chart: true,
      coinData: Object.keys(data).map((key) => ({
        name: key,
        ...data[key],
        ...imgs[key],
      })),
      data: coinList,
    });
  } catch (error) {
    const { stack, message } = error;
    res.render("error", { stack, message });
  }
});

module.exports = router;
