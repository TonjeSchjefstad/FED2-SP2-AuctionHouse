import "../css/style.css";
import { renderFooter } from "../js/components/footer.js";
import { renderHeader } from "../js/components/header.js";
import { renderNavigation, initNavigation } from "./components/navigation.js";

function initAlertSystem() {
  const container = document.createElement("div");
  container.id = "alert-container";
  container.className =
    "fixed top-24 z-50 space-y-2 right-3 left-auto max-w-xs sm:right-4 sm:max-w-md sm:space-y-3";
  document.body.appendChild(container);
}

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

initAlertSystem();
