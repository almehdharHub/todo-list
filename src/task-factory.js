import { storage } from "./storage";
import { todo } from "./todo";
export const taskFactory = (function () {
  function createTask(title, description = "", dueDate = "", priority) {
    return {
      title,
      description,
      dueDate,
      priority,
      isCompleted: false,
      notes: [],
      checklist: [],
      toggleIsCompleted() {
        console.log("Toggling Completion for Task:", this);
        this.isCompleted = !this.isCompleted;
        console.log("Toggled Completion for Task:", this);
        storage.saveTasks(todo.getAllTasks());
      },
      addNote(note) {
        this.notes.push(note);
        storage.saveTasks(todo.getAllTasks());
      },
      addChecklistItem(item) {
        this.checklist.push({ description: item, done: false });
        storage.saveTasks(todo.getAllTasks());
      },
      toggleChecklistItem(index) {
        this.checklist[index].done = !this.checklist[index].done;
        storage.saveTasks(todo.getAllTasks());
      },
    };
  }
  function createProject(name) {
    return {
      name,
      tasks: [],
    };
  }

  return {
    createTask,
    createProject,
  };
})();
