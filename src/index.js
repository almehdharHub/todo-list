import "./style.css";
import { dom } from "./dom/dom-projects";
import { domTasks } from "./dom/dom-tasks";
import { taskFactory } from "./task-factory";
import { todo } from "./todo";
import { domProjects } from "./dom/dom-projects";
import { storage } from "./storage";
document.addEventListener("DOMContentLoaded", () => {
  // localStorage.clear(); // Clear tasks for testing
  // localStorage.removeItem("tasks"); // Replace 'projects' with the key you want to remove
  // const inbox = taskFactory.createProject("Inbox");
  // todo.addProject(inbox);
  // todo.addProject(taskFactory.createProject("new"));
  // const allTasks = todo.getAllTasks();
  // if (allTasks === []) {
  //   const inbox = taskFactory.createProject("Inbox");
  //   todo.addProject(inbox);
  //   domProjects.renderProjectsList();
  //   const projectIndex = document
  //     .getElementById("page-title")
  //     .getAttribute("data-project-index");
  //   domTasks.renderTasksList(todo.getTasks(projectIndex));
  // }
  let tasks = storage.loadTasks();
  console.log("loaded tasks in index", tasks);
  const projectIndex = document
    .getElementById("page-title")
    .getAttribute("data-project-index");
  if (tasks.length === 0) {
    const inbox = taskFactory.createProject("Inbox");
    todo.addProject(inbox);
    domProjects.renderProjectsList();
    domTasks.renderTasksList(todo.getTasks(projectIndex));
  } else {
    domProjects.renderProjectsList();
    domTasks.renderTasksList(todo.getTasks(projectIndex));
  }
  // const projectIndex = document
  //   .getElementById("page-title")
  //   .getAttribute("data-project-index");
  // domTasks.renderTasksList(todo.getTasks(projectIndex));
  // domProjects.renderProjectsList();
});
