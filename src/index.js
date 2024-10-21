import "./style.css";
import { dom } from "./dom";

document.addEventListener("DOMContentLoaded", () => {
  // localStorage.clear(); // Clear tasks for testing
  // localStorage.removeItem("tasks"); // Replace 'projects' with the key you want to remove

  dom.renderTasksList();
});
