import { todo } from "../todo";
import { taskFactory } from "../task-factory";
import { domTasks } from "./dom-tasks";
export const domProjects = (function () {
  function renderProjectsList() {
    // localStorage.clear(); // Clear tasks for testing

    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";
    const projectsArr = todo.getProjects().filter((project) => {
      return project !== "Inbox";
    });
    projectsArr.forEach((project, index) => {
      projectsList.innerHTML += `
        <li data-project-index="${index + 1}">
          <span class="project-name" data-project-index="${index + 1}">
            <span data-project-index="${index + 1}">&num;</span>
            <p data-project-index="${index + 1}"> ${project}</p>
          </span> 
          <span class="detele-project" data-project-index="${index + 1}">
          &times;
          </span> 
        </li>
      `;
    });
    const pageTitle = document.getElementById("page-title");
    const projects = document.querySelectorAll(".project");

    projects.forEach((Btn) => {
      Btn.addEventListener("click", function (e) {
        const projectNameDisplay = document.getElementById(
          "project-name-display"
        );
        const projectIndex = e.target.getAttribute("data-project-index");
        const project = todo.getProject(projectIndex);
        console.log("project index", projectIndex);
        console.log(project);
        pageTitle.innerText = project.name;
        domTasks.renderTasksList(project.tasks);
        document
          .getElementById("page-title")
          .setAttribute("data-project-index", projectIndex);
        pageTitle.innerText = project.name;
        projectNameDisplay.innerText = project.name;
      });
    });

    const deleteProjectBtns = document.querySelectorAll(".detele-project");

    deleteProjectBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const index = e.target.getAttribute("data-project-index");
        todo.deleteProject(index);
        renderProjectsList();
      });
    });
  }

  const addProjectBtn = document.getElementById("add-project");

  addProjectBtn.addEventListener("click", function () {
    document.getElementById("project-form").style.display = "block";
    document.getElementById("add-project").style.display = "none";
  });
  const addProjectForm = document.getElementById("project-form");
  addProjectForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const projectName = document.getElementById("project-name").value;
    const newProject = taskFactory.createProject(projectName);
    todo.addProject(newProject);
    renderProjectsList();
    addProjectForm.reset();
    console.log(newProject);
  });
  const cancelNewProjectFormBtn = document.getElementById("cancel-project");
  cancelNewProjectFormBtn.addEventListener("click", function () {
    document.getElementById("project-form").style.display = "none";
    document.getElementById("add-project").style.display = "block";
    document.getElementById("project-name").value = "";
    console.log("cancel");
  });

  return {
    renderProjectsList,
  };
})();
