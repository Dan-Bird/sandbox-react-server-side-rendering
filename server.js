import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

const parts = html.split("<!-- server split -->");

const app = express();

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);
app.use((req, res) => {
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    onShellReady() {
      // If search engine crawler don't pipe because they may see this as being slow
      // instead just hold back and serve everyone onAllReady so it looks like a whole
      // complete request.
      stream.pipe(res);
    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
