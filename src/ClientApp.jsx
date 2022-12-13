import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

/*
Only run on the browser, so any browser related stuff like analytics
can be done here.
*/

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
