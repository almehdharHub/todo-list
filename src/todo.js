import { storage } from "./storage";
import { dom } from "./dom";
import { taskFactory } from "./task-factory";
export const todo = (function () {
  const inbox = taskFactory.createProject("inbox");
  inbox.tasks = storage.loadTasks();
  console.log(inbox);
  function addTask(task) {
    inbox.tasks.push(task);
    console.log("inbox", inbox);
    storage.saveTasks(inbox);
  }

  const getTasks = function () {
    console.log(inbox);
    console.log("inbox tasks", inbox.tasks);
    return inbox.tasks;
  };
  const deleteTask = function (index) {
    inbox.tasks.splice(index, 1);
    dom.renderTasksList();
    storage.saveTasks(tasks);
  };

  return {
    addTask,
    getTasks,
    deleteTask,
  };
})();
