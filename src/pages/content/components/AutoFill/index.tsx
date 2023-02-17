import { createRoot } from "react-dom/client";
import App from "./app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content/components/AutoFill");

const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);

export function eventOn(eventType, selector, callback) {
  document.body.addEventListener(eventType, function (event) {
    if (event.target.matches(selector)) {
      callback(event.target);
    }
  });
}

createRoot(root).render(<App />);
