const express = require("express");
const fs = require("fs");
const path = require("path");

// const { createServer: createViteServer } = require("vite");
const template = fs.readFileSync("./dist/client/index.html", "utf-8");

async function createServer() {
  const app = express();
  app.use(express.static("dist/client"));

  app.get("*", async (req, res) => {
    const render = require("./dist/server/server-entry").render;
    const context = {};
    const appHtml = await render(req.url, context);
    if (context.url) {
      res.redirect(301, context.url);
      return;
    }
    const html = template.replace(`<!--ssr-outlet-->`, appHtml);
    res.set("content-type", "text/html");
    res.send(html);
  });

  //   const vite = await createViteServer({
  //     server: { middlewareMode: "ssr" },
  //   });
  //   app.use(vite.middlewares);
  //   try {
  //     app.use("*", async (req, res) => {
  //       let template = fs.readFileSync("./index.html", "utf-8");
  //       template = await vite.transformIndexHtml(req.url, template);

  //       const { render } = await vite.ssrLoadModule("./src/server-entry.jsx");

  //       const appHtml = await render(req.url);
  //       const html = template.replace(`<!--ssr-outlet-->`, appHtml);
  //       res.set("content-type", "text/html");
  //       res.send(html);
  //     });
  //   } catch (e) {
  //     vite.ssrFixStacktrace(e);
  //     console.error(e);
  //     res.status(500).end(e.message);
  //   }

  app.listen(4000, () => {
    console.log("server is start at localhost:4000");
  });
}

createServer();
