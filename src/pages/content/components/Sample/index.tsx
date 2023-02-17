import { createRoot } from "react-dom/client";
import App from "./app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content/components/Sample");

const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);

createRoot(root).render(<App />);
