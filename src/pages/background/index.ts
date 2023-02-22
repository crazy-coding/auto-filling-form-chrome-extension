import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { jSearchEngine } from "./jSearchEngine";

reloadOnUpdate("pages/background");

console.log("background loaded");

jSearchEngine();
