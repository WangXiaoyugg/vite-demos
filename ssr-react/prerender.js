const fs = require("fs");
const path = require("path");

const template = fs.readFileSync("./dist/client/index.html", "utf-8");

const render = require("./dist/server/server-entry").render;

const routesToRender = fs.readdirSync("./src/pages").map((file) => {
  const name = file.replace(/\.jsx$/, "").toLowerCase();
  return name;
});
(async () => {
  for (let url of routesToRender) {
    const context = {};
    const appHtml = await render(url, context);
    const html = template.replace(`<!--ssr-outlet-->`, appHtml);
    const filePath = `dist/static/${url}.html`;
    fs.writeFileSync(filePath, html);
    console.log("pre-rendered:", filePath);
  }
})();
