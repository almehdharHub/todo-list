import "./style.css";
import { todo } from "./todo";
import { dom } from "./dom";

const task = todo.createTask("Task 1", "Description 1", new Date(), 1);

task.addNote("Note 1");
task.addChecklistItem("Checklist item 1");
task.toggleIsCompleted();
todo.addTask(task);
todo.displayTasks();
const task2 = todo.createTask("Task 2", "Description 2", new Date(), 2);
todo.addTask(task2);

todo.displayTasks();
todo.displayTasks();
console.log(todo.getTasks());
dom.renderTasksList();
