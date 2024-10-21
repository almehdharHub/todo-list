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
        console.log("Tasks before toggle:", todo.getTasks());
        this.isCompleted = !this.isCompleted;
        console.log("Toggled Completion for Task:", this);
        console.log("Tasks after toggle:", todo.getTasks());
        storage.saveTasks(todo.getTasks());
      },
      addNote(note) {
        this.notes.push(note);
        storage.saveTasks(todo.getTasks());
      },
      addChecklistItem(item) {
        this.checklist.push({ description: item, done: false });
        storage.saveTasks(todo.getTasks());
      },
      toggleChecklistItem(index) {
        this.checklist[index].done = !this.checklist[index].done;
        storage.saveTasks(todo.getTasks());
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
