import { createTask } from "./task-factory";
import { storage } from "./storage";
import { dom } from "./dom";
export const todo = (function () {
  let tasks = storage.loadTasks();

  const addTask = function (task) {
    tasks.push(task);
    storage.saveTasks(tasks);
  };
  const getTasks = function () {
    return tasks;
  };
  const deleteTask = function (index) {
    tasks.splice(index, 1);
    dom.renderTasksList();
    storage.saveTasks(tasks);
  };
  const displayTasks = function () {
    const tasks = getTasks();
    let tasksTitles = "";
    for (let task of tasks) {
      tasksTitles += `${task.title}\n`;
    }
    console.log(tasksTitles);
  };
  return {
    createTask,
    addTask,
    getTasks,
    displayTasks,
    deleteTask,
  };
})();
