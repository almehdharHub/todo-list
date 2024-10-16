import { dom } from "./dom";
export const todo = (function () {
  let tasks = [];
  const createTask = function (title, description, dueDate, priority) {
    return {
      title,
      description: "",
      dueDate: "",
      priority: 4,
      isCompleted: false,
      notes: [],
      checklist: [],
      toggleIsCompleted() {
        this.isCompleted = !this.isCompleted;
      },
      addNote(note) {
        this.notes.push(note);
      },
      addChecklistItem(item) {
        this.checklist.push({ description: item, done: false });
      },
      toggleChecklistItem(index) {
        this.checklist[index].done = !this.checklist[index].done;
      },
    };
  };
  const addTask = function (task) {
    tasks.push(task);
  };
  const getTasks = function () {
    return tasks;
  };
  const deleteTask = function (e) {
    const index = e.target.getAttribute("data-index");
    tasks.splice(index, 1);
    dom.renderTasksList();
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
