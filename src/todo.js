import { storage } from "./storage";
import { dom, domProjects } from "./dom/dom-projects";
import { taskFactory } from "./task-factory";
import { domTasks } from "./dom/dom-tasks";
export const todo = (function () {
  const tasks = storage.loadTasks();

  function addProject(project) {
    tasks.push(project);
    console.log(tasks);
    storage.saveTasks(tasks);
  }
  function getProjectsNames() {
    return tasks.map((task) => task.name);
  }
  function getProject(projectIndex) {
    console.log(tasks[projectIndex]);
    console.log(tasks[0]);
    return tasks[projectIndex];
  }
  function deleteProject(index) {
    tasks.splice(index, 1);
    storage.saveTasks(tasks);
    console.log("tasks", tasks);
  }
  function addTask(task, projectIndex) {
    console.log("inbox", inbox);
    tasks[projectIndex].tasks.push(task);
    storage.saveTasks(tasks);
  }
  const getTasks = function (projectIndex) {
    console.log(projectIndex);
    return tasks[projectIndex].tasks;
  };
  function getAllTasks() {
    return tasks;
  }

  const deleteTask = function (index, projectIndex) {
    tasks[projectIndex].tasks.splice(index, 1);

    storage.saveTasks(tasks);
  };

  return {
    addTask,
    getTasks,
    getAllTasks,
    deleteTask,
    addProject,
    getProjects: getProjectsNames,
    deleteProject,
    getProject,
  };
})();
