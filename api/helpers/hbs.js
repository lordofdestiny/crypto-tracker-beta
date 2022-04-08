//this file loads file Handlebars helpers into a single file
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "hbsHelpers");

module.exports = fs.readdirSync(dir).reduce((acc, file) => {
  const [name] = file.split(".");

  return {
    ...acc,
    [name]: require(path.join(dir, name)),
  };
}, {});
