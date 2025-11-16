import "../css/style.css";
import { renderFooter } from "../js/components/footer.js";

const footer = document.querySelector("footer");
if (footer) {
  footer.innerHTML = renderFooter();
}
