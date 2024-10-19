import "./style.css";
import { dom } from "./dom";
// localStorage.removeItem("tasks"); // Clear tasks for testing

document.addEventListener("DOMContentLoaded", () => {
  dom.renderTasksList();
});
