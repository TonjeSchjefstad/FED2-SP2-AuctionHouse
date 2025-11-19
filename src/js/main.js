import "../css/style.css";
import { renderFooter } from "../js/components/footer.js";
import { renderHeader } from "../js/components/header.js";
import { renderNavigation, initNavigation } from "./components/navigation.js";

const header = document.querySelector("header");
if (header) {
  header.innerHTML = renderHeader();
}

const footer = document.querySelector("footer");
if (footer) {
  footer.innerHTML = renderFooter();
}

document.body.insertAdjacentHTML("beforeend", renderNavigation());

initNavigation();
