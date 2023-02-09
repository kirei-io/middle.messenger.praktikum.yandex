import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const port = process.env.PORT ?? 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "dist");

app.use(express.static(dist));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: dist });
});

app
  .listen(port, () => {
    console.info(`Server ready on ${port}! (~ -_-)~`);
  })
  .on("error", console.error);
