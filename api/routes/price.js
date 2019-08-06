const axios = require("axios");
const express = require("express");

const env = require("../helpers/envLoader");

const router = express.Router();

router.get("/data", async (req, res) => {
  const { coin } = req.body || req.query;
  const { currency } = req.body || req.query;

  const request = axios({
    method: "get",
    url: `${env.apiTarget()}/data/histohour`,
    params: {
      fsym: coin || "BTC",
      tsym: currency || "USD",
      extraParams: "cryptochart",
      limit: 7 * 24,
      api_key: env.apiKey()
    }
  });

  try {
    const response = await request;
    const result = response.data.Data.map(day => {
      const { time, close, open } = day;
      return {
        timestamp: time,
        value: ((open + close) / 2).toPrecision(3)
      };
    });

    res.json(result);
  } catch (error) {
    res.render("error", { message: error.message });
  }
});

router.get("/value", async (req, res) => {
  const { coin } = req.query;
  const { currency } = req.query;

  const request = axios({
    method: this.get,
    url: `${env.apiTarget()}/data/price`,
    params: {
      fsym: coin || "BTC",
      tsyms: currency || "USD",
      api_key: env.apiKey()
    }
  });

  try {
    const response = await request;
    res.json(response.data);
  } catch (error) {
    res.render("error", { message: error.message });
  }
});

module.exports = router;
