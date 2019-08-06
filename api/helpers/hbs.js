//this file loads file Handlebars helpers into a single file
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "hbsHelpers");

const modules = fs.readdirSync(dir).reduce((acc, file) => {
  const name = file.split(".")[0];
  acc[name] = require(path.join(dir, name));
  return acc;
}, {});

module.exports = modules;
