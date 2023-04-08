const express = require("express");
var fallback = require("express-history-api-fallback");
const path = require("path");

const app = express();
const port = process.env.PORT ?? 3000;
const dist = path.join(__dirname, "dist");

app.use(express.static(dist));
app.use(fallback("index.html", { root: dist }));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: dist });
});

app
  .listen(port, () => {
    console.info(`Server ready on ${port}! (~ -_-)~`);
  })
  .on("error", console.error);
