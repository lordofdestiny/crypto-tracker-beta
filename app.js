const path = require("path");
const axios = require("axios");
const express = require("express");
const handlebars = require("express-handlebars");

const env = require("./api/misc/envLoader");

//inicijalizacija handlebarsa
const hbs = handlebars.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  helpers: null
});

const app = express();

app.engine("hbs", hbs.engine); //kreiranje viewengina
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { greet: "Hello World!", title: "Charts" });
});

app.get("/test", (req, res) => {
  const params = {
    symbol: "BTC,ETH,XRP"
  };
  axios
    .get(`${env.apiTarget()}/v1/cryptocurrency/map`, {
      headers: { "X-CMC_PRO_API_KEY": env.apiKey() },
      params
    })
    .then(response => {
      res.render("test", { data: JSON.stringify(response.data) });
    })
    .catch(error => {
      res.render("error", { msg: error.message });
    });
});

module.exports = app;
