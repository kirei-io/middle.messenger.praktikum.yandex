const { JSDOM } = require("jsdom");
const Handlebars = require("handlebars");
const fs = require("fs");

const { window } = new JSDOM('<div id="app"></div>', {
  url: "http://localhost:3000",
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.window.crypto.randomUUID = () => 1;
global.FormData = window.FormData;

require.extensions[".hbs"] = function (module, filename) {
  let compiled;
  const raw = fs.readFileSync(filename, "utf8");
  compiled = Handlebars.compile(raw);
  module.exports = compiled;
};
require.extensions[".sass"] = function () {
  module.exports = () => ({});
};
