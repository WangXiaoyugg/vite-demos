const express = require("express");
const app = express();
const manifest = require("./dist/manifest.json");
app.set("view engine", "pug");

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hey",
    msg: "I Love Vue",
    index: manifest["index.html"].file,
    vendor: manifest["index.html"].imports.vendor,
    css: manifest["index.html"].css[0],
  });
});

app.listen(4000, () => {
  console.log("server is start at localhost:4000");
});
