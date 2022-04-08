const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");

const handlebarsHelpers = require("./api/helpers/hbs");

const pageRoutes = require("./api/routes/page");
const dataRoutes = require("./api/routes/price");

//inicijalizacija handlebarsa
const hbs = handlebars.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  helpers: handlebarsHelpers,
});

const app = express();

app.engine("hbs", hbs.engine); //kreiranje viewengina
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", pageRoutes);
app.use("/", dataRoutes);

module.exports = app;
